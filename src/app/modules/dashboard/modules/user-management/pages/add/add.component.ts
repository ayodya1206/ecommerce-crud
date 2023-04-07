import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from './../../../../../../shared/services/shared.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { TenetsService } from './../../services/tenets.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GeneralConstants as constants } from '../../../../../../shared/constants/constant-variables'
import { ServerResponse } from 'http';
interface Categories {
  id: number,
  name: string;
}
interface Roles {
  id: number,
  name: string;
}
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {
  /* --------------------------------- FIELDS -------------------------------- */
  subscription: Array<Subscription> = [];
  addTenetForm!: FormGroup;
  rolesFlag = false;
  addressFlag = false;
  gstFlag = false;
  sellingFlag = false;
  formId: number = 0;
  addUpdate!:true;
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
  tenetID: number = 0;
  rolesList: any;
  selectedStatus = 'INACTIVE';
  selectedRole = '';
  imageUrl!: string;
  fileToUpload!: File;
  images: any[] = [];
  isImage: boolean = false;
  mimeArray: string[] = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/vnd.microsoft.icon', 'image/svg+xml', 'image/tiff', 'image/webp'];
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef
  /* ------------------------------- CONSTRUCTOR ------------------------------ */
  constructor(
    private _formBuilder: FormBuilder,
    private _toastService: ToastrService,
    private _tenetService: TenetsService,
    private _sharedServices: SharedService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _httpClient: HttpClient
  ) { }
  /* ----------------------------- NG-LIFE-CYCLES ----------------------------- */
  ngOnInit(): void {
    // TODO ADD FORM BUILDER
    this.addTenetForm = this._formBuilder.group({
      id: [this.formId++],
      tenetName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['+91', [Validators.required, Validators.pattern(/(\+91)[5-9]{1}[0-9]{9}/)]],
      gender: ['MALE', Validators.required],
      tenetImage: ['', Validators.required],
      role: [''],
      status: ['INACTIVE', Validators.required],
      address: [''],
      gst_number: [''],
      sell_categories: [''],
      createdAt: [new Date()],
      updatedAt: [new Date()]
    });
    // TODO GET ROLES FROM DB METHOD
    this.subscription.push(this._sharedServices.getRole().subscribe(
      {
        next: (res: any) => {
          if (res) {
            this.rolesList = res;
            // console.log(this.rolesList);
          }
        },
        error: (err: any) => {
          console.log('Error', err)
        },
        complete: () => {
          console.log('Successfully Roles Accessed');
        }
      }
    ));
    // TODO SET FALSE TO DROP DOWN
    // this.isActive = constants.CONST_ACTIVE;
    // this.isInActive = constants.CONST_IN_ACTIVE;
    // TODO get uploaded images
    // this._sharedServices.addImages().subscribe(
    //   (res: any) => {
    //     this.images = res;
    //   }
    // )
  }
  /* ------------------------------ CUSTOM-METHODS ----------------------------- */
  // TODO CHANGES STATUS METHOD
  onChangeStatus($event: any, value: any) {
    console.log(event);
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
    // console.log('Selected Role => ' + this.selectedRole);
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
  cancel() {
    this._router.navigate(["../list"], { relativeTo: this._activatedRoute });
    this.addTenetForm.markAsUntouched();
  }
  // TODO ON DESTROY
  ngOnDestroy() {
    this.subscription.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    })
  }
  // TODO ON IMAGE UPLOAD METHD
  onFileSelected(event: any) {
    event.preventDefault();
    this.fileToUpload = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.imageUrl = fileReader.result as string;
      const imageBase64String = fileReader.result as string;
      const newImage = {
        phone: this.addTenetForm.value.phone,
        name: this.addTenetForm.value.tenetName,
        data: imageBase64String
      };
      this.images.push(newImage);
      if (this.images) {
        this.isImage = true;
      }
      this.subscription.push(
        this._sharedServices.addImages(this.images).subscribe(
          (res: any) => {
            // console.log(res);
          }, (error: HttpErrorResponse) => {
            console.log(error);
          }
        )
      )
    }
    // console.log(this.images);
    fileReader.readAsDataURL(this.fileToUpload);
  }
  // TODO ADD TENETS METHOD
  async onSubmitTenet(event: any): Promise<any> {
    const formData = new FormData();
    formData.append('files', this.fileToUpload, this.fileToUpload.name);
    // console.log(formData)
    if (this.addTenetForm.invalid) {
      this._toastService.error('Please Enter Valid Data');
      this.addTenetForm.markAllAsTouched();
      return;
    } try {
      if (this.addTenetForm.valid) {
        // console.log(this.addTenetForm.value);
        this._tenetService.addTenets(this.addTenetForm.value).subscribe({
          next: (res: any) => {
            // console.log(res);
            if (res) {
              this._toastService.success('Tenet Added Successfully');
              this.addTenetForm.reset();
              this.addTenetForm.markAsUntouched();
              this.isImage = false;
            }
          },
          error: (err: any) => {
            this._toastService.warning('unable to add tenet' + err);
            console.log(err);
          },
          complete: () => {
            // console.log('Tenet Added');
            this.addTenetForm.markAsUntouched();
          }
        })
      }
      return;
    } catch (error: any) {
      const errorResponse = error as ServerResponse;
      console.log(errorResponse);
    }
  }
  /* --------------------------------- GETTERS --------------------------------- */
  get id() {
    return this.addTenetForm.get('id') as FormControl;
  }
  get tenetName() {
    return this.addTenetForm.get('tenetName') as FormControl;
  }
  get email() {
    return this.addTenetForm.get('email') as FormControl;
  }
  get password() {
    return this.addTenetForm.get('password') as FormControl;
  }
  get confirmPassword() {
    return this.addTenetForm.get('confirmPassword') as FormControl;
  }
  get phone() {
    return this.addTenetForm.get('phone') as FormControl;
  }
  get gender() {
    return this.addTenetForm.get('gender') as FormControl;
  }
  get status() {
    return this.addTenetForm.get('status') as FormControl;
  }
  get role() {
    return this.addTenetForm.get('role') as FormControl;
  }
  get tenetImage() {
    return this.addTenetForm.get('tenetImage') as FormControl;
  }
  get address() {
    return this.addTenetForm.get('address') as FormControl;
  }
  get gst_number() {
    return this.addTenetForm.get('gst_number') as FormControl;
  }
  get sell_categories() {
    return this.addTenetForm.get('sell_categories') as FormControl;
  }
}
