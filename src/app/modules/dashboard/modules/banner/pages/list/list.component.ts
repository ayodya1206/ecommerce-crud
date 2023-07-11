import { Component, OnInit, ViewChild } from '@angular/core';
import { Banner } from '../../model/banner';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  /* --------------------------------- FIELDS -------------------------------- */
  bannerData: any[] = [];
  whoAmI: any;
  searchValue!: any;
  displayedColumns: string[] = ['select', 'position', 'created_at', 'updated_at', 'image', 'status', 'action'];
  dataSource!: MatTableDataSource<Banner>;
  selection = new SelectionModel<Banner>(true, []);
  isDisabled: boolean = true;
  subscription: Array<Subscription> = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  /* ------------------------------- CONSTRUCTOR ------------------------------ */
  constructor(
    private _dialog: MatDialog,
    private _toaster: ToastrService,
    private _liveAnnouncer: LiveAnnouncer,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _spinner: NgxSpinnerService
  ) { }
  /* ----------------------------- NG-LIFE-CYCLES ----------------------------- */
  ngOnInit(): void {
        // TODO CHECKING WHOAMI
        if (localStorage.getItem('loginDetails')) {
          this.whoAmI = localStorage.getItem('userRole');
        }
  }
  /* ------------------------------ CUSTOM-METHODS ----------------------------- */
  // TODO ADD BANNER METHOD
  addBanner() {
    this._router.navigate(['../add'],{ relativeTo: this._activatedRoute })
  }
  viewBanner(id:any){

  }
  editBanner(id:any) {

  }
  deleteBanner(id:any){

  }
  searchByCategory(event:any) {

  }
  
  
   //  TODO Whether the number of selected elements matches the total number of rows.
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    // console.log(numSelected);
    const numRows = this.bannerData.length;
    // console.log(numRows);
    return numSelected === numRows;

  }
  // TODO Selects all rows if they are not all selected; otherwise clear selection
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }
  //  TODO The label for the checkbox on the passed row
  checkboxLabel(row?: Banner): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  // TODO Announce the change in sort state for assistive technology
  sortData(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  /* --------------------------------- GETTERS --------------------------------- */
}
