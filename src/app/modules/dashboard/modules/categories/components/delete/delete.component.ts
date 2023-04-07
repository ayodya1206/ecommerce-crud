import { CategoriesService } from './../../services/categories.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServerResponse } from 'http';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {


  /* --------------------------------- FIELDS -------------------------------- */
  subscription: Array<Subscription> = [];
  tenetPhone: any;
  tenetData:any;
  /* ------------------------------- CONSTRUCTOR ------------------------------ */
  constructor(
    public _dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _categoriesService: CategoriesService,
    private _toastService: ToastrService,
    private _sharedService: SharedService
  ) {
  }
  /* ----------------------------- NG-LIFE-CYCLES ----------------------------- */
  ngOnInit(): void {
  }
  /* ------------------------------ CUSTOM-METHODS ----------------------------- */

  async deleteCategory(data: any) {
    try {
      this._categoriesService.deleteCategoriesByID(this.data.dataID).subscribe({
        next: (res: any) => {
          if (res) {
            this._toastService.success('Category Deleted Successfully');
            this._dialogRef.close('deleted');
          }
        },
        error: (err: Error) => {
          this._toastService.warning('unable to delete category' + err);
          console.log(err);
        },
        complete: () => {
          console.log('Category deleted successfully');
        },
      });
     
    } catch (error) {
      console.log(error);
      const errorResponse = error as ServerResponse;
      // this._toastService.warning(`Unable to delete home banner`);
    }

  }

  dialogClose(data: any) {
    this._dialogRef.close('no')
  }
  // TODO ON DESTROY
  ngOnDestroy() {
    this.subscription.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    })
  }
  /* --------------------------------- GETTERS --------------------------------- */

}
