import { SharedService } from './../../../../../../shared/services/shared.service';
import { TenetsService } from './../../services/tenets.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { ServerResponse } from 'http';
import { GeneralConstants as constants } from '../../../../../../shared/constants/constant-variables'
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
interface Categories {
  id: number,
  name: string;
}
interface Roles {
  id: number,
  name: string;
}
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  /* --------------------------------- FIELDS -------------------------------- */
  tenetID: any;
  subscription: Array<Subscription> = [];
  updateTenetForm!: FormGroup
  rolesFlag = false;
  addressFlag = false;
  gstFlag = false;
  sellingFlag = false;
  selectedRole = '';
  rolesList: any;
  selectedStatus = '';
  selectedGender = '';
  tenetDataByID: any;
  passingRole: any;
  imageUrl!: string;
  fileToUpload!: File;
  images: any[] = [];
  imagesArray: any;
  tentProfileImage: any;
  sellCategories: Categories[] = [
    {
      id: 1,
      name: 'Electronics'
    },
    {
      id: 2,
      name: 'Grocery'
    },
    {
      id: 3,
      name: 'Mobiles'
    },
    {
      id: 4,
      name: 'Fashion'
    },
    {
      id: 5,
      name: 'Personal Care'
    },
    {
      id: 6,
      name: 'Appliances'
    },
  ];
  public obj: any = {};
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef
  /* ------------------------------- CONSTRUCTOR ------------------------------ */
  constructor(
    private _formBuilder: FormBuilder,
    private _toastService: ToastrService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _tenetService: TenetsService,
    private _sharedServices: SharedService,
    private _sanitizer: DomSanitizer
  ) {
  }
  /* ----------------------------- NG-LIFE-CYCLES ----------------------------- */
  ngOnInit(): void {
    this.tenetID = this._activatedRoute.snapshot.paramMap.get('id');
    this.updateTenetForm = this._formBuilder.group({
      id: [''],
      tenetName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['+91', [Validators.required, Validators.pattern(/(\+91)[5-9]{1}[0-9]{9}/)]],
      gender: ['', Validators.required],
      role: [''],
      status: ['', Validators.required],
      address: [''],
      gst_number: [''],
      sell_categories: [''],
      createdAt: [''],
      updatedAt: ['']
    });
    // TODO GET TENET DETAILS BY ID
    this.subscription.push(this._tenetService.getTenetByID(this.tenetID).subscribe(
      {
        next: (res: any) => {
          if (res) {
            this.tenetDataByID = res;
            if (res) {
              this.updateTenetForm.patchValue({
                id: this.tenetDataByID.id,
                tenetName: this.tenetDataByID.tenetName,
                email: this.tenetDataByID.email,
                password: this.tenetDataByID.password,
                confirmPassword: this.tenetDataByID.confirmPassword,
                phone: this.tenetDataByID.phone,
                gender: this.tenetDataByID.gender,
                status: this.tenetDataByID.status,
                role: this.tenetDataByID.role,
                address: this.tenetDataByID.address,
                gst_number: this.tenetDataByID.gst_number,
                sell_categories: this.tenetDataByID.sell_categories,
                createdAt: this.tenetDataByID.createdAt,
                updatedAt: this.tenetDataByID.updatedAt,
              });
              this.selectedStatus = this.tenetDataByID.status;
              this.selectedGender = this.tenetDataByID.gender;
              this.selectedRole = this.tenetDataByID.role;
              this.onChangeStatus(event, this.selectedStatus);
              this.onChangeRole(event, this.selectedRole);
            };
          }
        },
        error: (error: any) => {
          const errorResponse = error as ServerResponse;
          console.log(errorResponse);
        },
        complete: () => {
          console.log('Successfully Fetched tent Detailed');
          console.clear();
        }
      }
    ));
    // TODO GET ROLES FROM DB METHOD
    this.subscription.push(this._sharedServices.getRole().subscribe(
      {
        next: (res: any) => {
          if (res) {
            this.rolesList = res;
          }
        },
        error: (err: any) => {
          console.log('Error', err)
        },
        complete: () => {
          console.log('Successfully Roles Accessed');
          console.clear();
        }
      }
    ));
  }
  /* ------------------------------ CUSTOM-METHODS ----------------------------- */
  // TODO UPDATE TENET
  async onSubmitEditTenet(tenetID: string, formData: any): Promise<any> {
    if (this.updateTenetForm.invalid) {
      this._toastService.error('Please Enter Valid Data');
      return;
    } try {
      this._tenetService.updateTenetById(tenetID, formData).subscribe(
        {
          next: (res: any) => {
            if (res) {
              this._toastService.success('Tenet Edited Successfully');
            }
          },
          error: (err: Error) => {
            this._toastService.warning('unable to add tenet' + err);
            console.log(err);
          },
          complete: () => {
            console.log('Tenet Edited successfully');
            this.updateTenetForm.markAsUntouched();
            console.clear();
          }
        }
      )
      return;
    }
    catch (error: any) {
      const errorResponse = error as ServerResponse;
      console.log(errorResponse);
    }
  }
  // TODO CHANGES STATUS METHOD
  onChangeStatus($event: any, value: any) {
    this.selectedStatus = value;
    if (this.selectedStatus == constants.CONST_ACTIVE) {
      this.rolesFlag = true
    } else {
      this.rolesFlag = false;
    }
  }
  // TODO CHANGES ROLE METHOD
  onChangeRole(ev: any, value: any) {
    this.selectedRole = value;
    if (this.selectedRole == constants.CONST_SELLER) {
      this.addressFlag = true;
      this.gstFlag = true;
      this.sellingFlag = true;
    } else {
      this.addressFlag = false;
      this.gstFlag = false;
      this.sellingFlag = false;
    }
  }
  // TODO CHANGE GENDER METHOD
  // onChangeGender(event: any, value: any) {
  //   console.log(value);
  //   // this.selectedGender = value;
  // }
  // TODO CANCEL TO LIST
  cancel() {
    this._router.navigate(["../../list"], { relativeTo: this._activatedRoute });
    this.updateTenetForm.markAsUntouched();
  }
  // TODO ON DESTROY
  ngOnDestroy() {
    this.subscription.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    })
  }
  // TODO ON IMAGE UPLOAD METHD
  onFileSelected(event: any) {
    // this.fileToUpload = event.target.files[0];
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.imageUrl = reader.result as string;
    // };
    // reader.readAsDataURL(this.fileToUpload);
    event.preventDefault();
    this.fileToUpload = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.imageUrl = fileReader.result as string;
      const imageBase64String = fileReader.result as string;
      const newImage = {
        id: this.tenetID,
        tent_phone: this.updateTenetForm.value.phone,
        name: this.updateTenetForm.value.tenetName,
        data: imageBase64String
      };
      this.images.push(newImage);
      this._sharedServices.addImages(this.images).subscribe(
        (res: any) => {
        }, (error: HttpErrorResponse) => {
          console.log(error);
        }
      )
    }
    fileReader.readAsDataURL(event.target.files[0]);
  }
  /* --------------------------------- GETTERS --------------------------------- */
  get tenetName() {
    return this.updateTenetForm.get('tenetName') as FormControl;
  }
  get email() {
    return this.updateTenetForm.get('email') as FormControl;
  }
  get password() {
    return this.updateTenetForm.get('password') as FormControl;
  }
  get confirmPassword() {
    return this.updateTenetForm.get('confirmPassword') as FormControl;
  }
  get phone() {
    return this.updateTenetForm.get('phone') as FormControl;
  }
  get gender() {
    return this.updateTenetForm.get('gender') as FormControl;
  }
  get status() {
    return this.updateTenetForm.get('status') as FormControl;
  }
  get role() {
    return this.updateTenetForm.get('role') as FormControl;
  }
  get address() {
    return this.updateTenetForm.get('address') as FormControl;
  }
  get gst_number() {
    return this.updateTenetForm.get('gst_number') as FormControl;
  }
  get sell_categories() {
    return this.updateTenetForm.get('sell_categories') as FormControl;
  }
}
