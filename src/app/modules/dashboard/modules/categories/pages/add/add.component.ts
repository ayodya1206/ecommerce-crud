import { Observable, Subscriber } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from './../../services/categories.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { ServerResponse } from 'http';
interface CategoriesType {
  id: number,
  name: string;
}
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  /* --------------------------------- FIELDS -------------------------------- */
  addCategoryForm!: FormGroup;
  categoriesType: CategoriesType[] = [
    {
      id: 1,
      name: 'Convenience goods'
    },
    {
      id: 2,
      name: 'Shopping goods'
    },
    {
      id: 3,
      name: 'Specialty goods'
    },
    {
      id: 4,
      name: 'Unsought goods'
    }
  ];
  selectedType: string = 'Select Category Type';
  isImage: boolean = false;
  imageUrl: string = '';
  selectedFile!: File;
  // selectedFile!: any;
  categoryImages!: Observable<any>;
  base64Code: any;
  body: any;
  images: any[] = [];
  @Input() categoryDetails: any;
  // @Output() cancelCreateNewReport: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelCreateNewCategory: EventEmitter<any> = new EventEmitter<any>();
  flag: any;
  addUpdate = true;
  categoryId!: any;
  categoriesDataById: any;
  // @ViewChild('fileInput') fileInput!: ElementRef;
  // fileInput!: FormControl;
  fileControl = new FormControl();

  // inputElement = document.getElementById("fileInput") as HTMLInputElement;

  /* ------------------------------- CONSTRUCTOR ------------------------------ */
  constructor(
    private _fromBuilder: FormBuilder,
    private _categoryService: CategoriesService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _toastService: ToastrService
  ) {
    this.categoryId = this._activatedRoute.snapshot.paramMap.get('id');
    if (this.categoryId != '' && this.categoryId != null) {
      this.addUpdate = false;
      this.isImage = true;
      this._categoryService.getCategoriesByID(this.categoryId).subscribe(
        (res: any) => {
          this.categoriesDataById = res;
          // console.log(this.categoriesDataById);
          this.categoryImages = this.categoriesDataById.image[0].imgURL;
          let selectedImageName = this.categoriesDataById.image[0].imgName;
          // this.addCategoryForm.get('image')?.value(selectedImageName);
          // this.addCategoryForm.controls['image'].value(selectedImageName);
          // this.fileInput.nativeElement.value = selectedImageName;
          // console.log(this.addCategoryForm.get('image')?.setValue(selectedImageName));
          // this.inputElement.value = selectedImageName;
          // console.log(this.inputElement);
          // this.fileInput.setValue(this.categoriesDataById.image[0].imgName);
          // this.addCategoryForm.get('fileInput')?.setValue(selectedImageName);
          // this.fileControl.setValue(selectedImageName);
          this.addCategoryForm.setValue({
            id: this.categoriesDataById.id,
            created_at: this.categoriesDataById.created_at,
            updated_at: this.categoriesDataById.updated_at,
            name: this.categoriesDataById.name,
            type: this.categoriesDataById.type,
            image: this.categoriesDataById.image[0].imgName,
            status: this.categoriesDataById.status,
          });

        }
      )
    }


  }
  /* ----------------------------- NG-LIFE-CYCLES ----------------------------- */
  ngOnInit(): void {
    this.addCategoryForm = this._fromBuilder.group({
      id: [],
      created_at: [new Date()],
      updated_at: [new Date()],
      name: ['', Validators.required],
      type: [null, Validators.required],
      image: [''],
      status: ['ACTIVE', Validators.required],
    })
  }
  /* ------------------------------ CUSTOM-METHODS ----------------------------- */
  // TODO ON FILE SELECT METHOD
  onFileChanged(event: any) {
    // this.selectedFile = event.target.files[0];
    // console.log(this.selectedFile);
    const target = event.target as HTMLInputElement;
    this.selectedFile = (target.files as FileList)[0];
    // console.log(this.selectedFile);
    this.convertToBase64(this.selectedFile);
    if (event.target.files.length > 0) {
      this.addCategoryForm.patchValue({
        fileName: event.target.files[0]
      });
    }
  }
  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    observable.subscribe((img: any) => {
      // console.log(img);
      const newImage = {
        imgId: '',
        imgURL: img,
        imgName: this.selectedFile.name
      };
      this.images.push(newImage);
      // console.log(this.images);
      this.categoryImages = img;
      this.base64Code = img;
      this.isImage = true;
    })
  }
  readFile(file: File, subscriber: Subscriber<any>) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      this.fileControl.setValue(fileReader.result);
      subscriber.next(fileReader.result);
      subscriber.complete();
    }
    fileReader.onerror = () => {
      subscriber.error();
      subscriber.complete();
    }
  }
  // TODO SUBMIT CATEGORIES
  onSubmitCategory() {
    // const uploadData = new FormData();
    // uploadData.append('CategoryImage', this.selectedFile, this.selectedFile.name);
    let formSubmitBody = this.createBody();
    // console.log(this.addCategoryForm.value);
    // console.log(formSubmitBody);
    if (this.addCategoryForm.invalid) {
      this._toastService.error('Please Enter Valid Data');
      this.addCategoryForm.markAllAsTouched();
      return;
    } try {
      if (this.addCategoryForm.valid) {
        // console.log(this.addTenetForm.value);
        if(this.addUpdate){
        this._categoryService.addCategories(this.body).subscribe({
          next: (res: any) => {
            // console.log(res);
            if (res) {
              this._toastService.success('Category Added Successfully');
              this.addCategoryForm.reset();
              this.addCategoryForm.markAsUntouched();
              this.isImage = false;
            }
          },
          error: (err: any) => {
            this._toastService.warning('unable to add category' + err);
            console.log(err);
          },
          complete: () => {
            console.log('Successfully Category Added');
            this.addCategoryForm.markAsUntouched();
          }
        });
      }else{
        this._categoryService.updateCategoriesById(this.body, this.categoryId).subscribe({
          next: (res: any) => {
            // console.log(res);
            if (res) {
              this._toastService.success('Category Added Successfully');
              this.addCategoryForm.reset();
              this.addCategoryForm.markAsUntouched();
              this.isImage = false;
            }
          },
          error: (err: any) => {
            this._toastService.warning('unable to add category' + err);
            console.log(err);
          },
          complete: () => {
            // console.log('Successfully Category Added');
            this.addCategoryForm.markAsUntouched();
          }
        });
      }
      }
      return;
    } catch (error: any) {
      const errorResponse = error as ServerResponse;
      console.log(errorResponse);
    }
  }
  // TODO CANCEL METHOD
  cancel() {
    this._router.navigate(["../list"], { relativeTo: this._activatedRoute });
    this.addCategoryForm.markAsUntouched();
    this.cancelCreateNewCategory.emit(true);
  }
  createBody() {
    this.body = {
      'created_at': new Date(),
      'updated_at': new Date(),
      'name': this.addCategoryForm.value.name,
      'type': this.addCategoryForm.value.type,
      'image': this.images,
      'status': this.addCategoryForm.value.status,

    }
    return this.body;
  }
  /* --------------------------------- GETTERS --------------------------------- */
  get created_at() {
    return this.addCategoryForm.get('created_at') as FormControl;
  }
  get updated_at() {
    return this.addCategoryForm.get('updated_at') as FormControl;
  }
  get name() {
    return this.addCategoryForm.get('name') as FormControl;
  }
  get type() {
    return this.addCategoryForm.get('type') as FormControl;
  }
  get image() {
    return this.addCategoryForm.get('image') as FormControl;
  }
  get status() {
    return this.addCategoryForm.get('status') as FormControl;
  }

}
