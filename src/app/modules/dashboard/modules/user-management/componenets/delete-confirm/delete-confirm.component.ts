import { Subscription } from 'rxjs';
import { SharedService } from './../../../../../../shared/services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { TenetsService } from './../../services/tenets.service';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { time } from 'console';
import { ServerResponse } from 'http';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit, OnDestroy {

  /* --------------------------------- FIELDS -------------------------------- */
  subscription: Array<Subscription> = [];
  tenetPhone: any;
  tenetData:any;
  /* ------------------------------- CONSTRUCTOR ------------------------------ */
  constructor(
    public _dialogRef: MatDialogRef<DeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _tenetService: TenetsService,
    private _toastService: ToastrService,
    private _sharedService: SharedService
  ) {
  }
  /* ----------------------------- NG-LIFE-CYCLES ----------------------------- */
  ngOnInit(): void {
    if (this.data.dataID != '' && this.data.dataID != null) {
      this.subscription.push(
        this._tenetService.getTenetByID(this.data.dataID).subscribe(
          {
            next: (res: any) => {
              this.tenetData = res;
              this.tenetPhone = res.phone;
            },
            error: (error: any) => {
              const errorResponse = error as ServerResponse;
              console.log(errorResponse);
            },
            complete: () => {
              console.log("Successfully fetched Tenet By iID")
            }
          }
        )
      )
    }
  }
  /* ------------------------------ CUSTOM-METHODS ----------------------------- */

  async deleteTenet(data: any) {
    try {
      this._tenetService.deleteTenetByID(this.data.dataID).subscribe({
        next: (res: any) => {
          if (res) {
            this._toastService.success('Tenet Deleted Successfully');
            this._dialogRef.close('deleted');
          }
        },
        error: (err: Error) => {
          this._toastService.warning('unable to delete tenet' + err);
          console.log(err);
        },
        complete: () => {
          console.log('Tenet deleted successfully');
        },
      });
      const found = this.tenetData.find((item: any) => item.phone === this.tenetData.phone);
      console.log(found);
      // this._sharedService.removeImageByPhone(this.tenetPhone).subscribe(
      //   (res: any) => {
      //       console.log(res);
      //   }
      // )
    } catch (error) {
      console.log(error);
      const errorResponse = error as ServerResponse;
      // this._toastService.warning(`Unable to delete home banner`);
    }

  }

  dialogClose(data: any) {
    this._dialogRef.close('cancel')
  }
  // TODO ON DESTROY
  ngOnDestroy() {
    this.subscription.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    })
  }
  /* --------------------------------- GETTERS --------------------------------- */
}
