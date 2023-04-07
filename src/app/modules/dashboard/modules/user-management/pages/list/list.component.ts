import { DeleteConfirmComponent } from './../../componenets/delete-confirm/delete-confirm.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TenetsService } from './../../services/tenets.service';
import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
// import { ServerResponse } from 'http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy {
  /* --------------------------------- FIELDS -------------------------------- */
  tenetsData: any[] = [];
  dataSource: any;
  tenetID: any;
  isDisabled: boolean = true;
  subscription: Array<Subscription> = [];
  whoAmI: any;
  deleteDialog: any;
  displayedColumns: string[] = ['sNo', 'tentName', 'email', 'phone', 'gender', 'role', 'status', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  /* ------------------------------- CONSTRUCTOR ------------------------------ */
  constructor(
    private _tenetService: TenetsService,
    private _dialog: MatDialog,
    private _toaster: ToastrService,
    private _liveAnnouncer: LiveAnnouncer,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {

    // TODO CHECKING WHOAMI
    if (localStorage.getItem('loginDetails')) {
      this.whoAmI = localStorage.getItem('userRole');
    }

  }
  /* ----------------------------- NG-LIFE-CYCLES ----------------------------- */
  ngOnInit(): void {
    this.getAllTenets();
  }
  /* ------------------------------ CUSTOM-METHODS ----------------------------- */
  // TODO GET TENTS ALL
  getAllTenets() {
    this.subscription.push(
      this._tenetService.getAllTenets().subscribe(
        (res: any) => {
          if (this.tenetsData) {
            this.tenetsData = res;
            // console.log(this.tenetsData);
            this.dataSource = new MatTableDataSource(this.tenetsData);
            this.dataSource.paginator = this.paginator;
          }
        })
    )
  }
  // TODO ng After View Init
  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  // TODO CHANGE TENTS STATUS
  changeStatusDialog(id: any) {

  }
  // TODO VIEW TENTS METHOD
  viewTenets(id: any) {

  }
  // TODO EDIT TENTS METHOD
  editTenet(id?: any): void {
    this._router.navigate(['../edit', id], { relativeTo: this._activatedRoute });
  }
  // TODO DELETE TENTS METHOD
  deleteTenet(id: any) {
    // console.log(id);
    this.deleteDialog = this._dialog.open(DeleteConfirmComponent, {
      panelClass: 'custom-modal',
      width: '30%',
      disableClose: true,
      data: {
        dataID: id,
      }
    });
    this.deleteDialog.afterClosed().subscribe(
      (res: any) => {
        if (res === 'deleted') {
          this.getAllTenets();
        } else if (res === 'cancel') {
          // console.log('User cancelled delete');
        }
      }
    )
  }

  // TODO Announce the change in sort state for assistive technology
  sortData(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);

    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  // TOTO NG ON DESTROY
  ngOnDestroy(): void {
    this.subscription.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    })
  }
  /* --------------------------------- GETTERS --------------------------------- */

}
