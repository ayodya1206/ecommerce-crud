import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  /* --------------------------------- FIELDS -------------------------------- */
  addBannerForm!: FormGroup;
  addUpdate:any;
  isImage:boolean = false;
  categoryImages = ''
  /* ------------------------------- CONSTRUCTOR ------------------------------ */
  constructor(
    private _fb: FormBuilder
  ) { }
  /* ----------------------------- NG-LIFE-CYCLES ----------------------------- */
  ngOnInit(): void {
    this.addBannerForm = this._fb.group({
      id: [],
      created_at: [new Date()],
      updated_at: [new Date()],
      status: ['', Validators.required]
    })
  }
  /* ------------------------------ CUSTOM-METHODS ----------------------------- */
  // TODO ON SUBMIT BANNER METHOD
  onSubmitBanner(){

  }
  onFileChanged(event:any) {

  }
  cancel() {

  }
  /* --------------------------------- GETTERS --------------------------------- */
  get status() {
    return this.addBannerForm.get('status') as FormControl;
  }
}
