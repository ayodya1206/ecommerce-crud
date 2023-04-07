import { CategoriesService } from './../../services/categories.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TenetsService } from '../../../user-management/services/tenets.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Category } from '../../models/category';
import { SelectionModel } from '@angular/cdk/collections';
import { DeleteComponent } from '../../components/delete/delete.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  /* --------------------------------- FIELDS -------------------------------- */
  categoriesData: any[] = [];
  // dataSource: any;
  tenetID: any;
  isDisabled: boolean = true;
  subscription: Array<Subscription> = [];
  whoAmI: any;
  deleteDialog: any;
  searchValue!: any;
  displayedColumns: string[] = ['select', 'position', 'created_at', 'updated_at', 'name', 'type', 'image', 'status', 'action'];
  dataSource!: MatTableDataSource<Category>;
  selection = new SelectionModel<Category>(true, []);
  categoryImage: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  /* ------------------------------- CONSTRUCTOR ------------------------------ */
  constructor(
    private _categoriesService: CategoriesService,
    private _dialog: MatDialog,
    private _toaster: ToastrService,
    private _liveAnnouncer: LiveAnnouncer,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _spinner: NgxSpinnerService
  ) {
    // TODO CHECKING WHOAMI
    if (localStorage.getItem('loginDetails')) {
      this.whoAmI = localStorage.getItem('userRole');
    }
  }
  /* ----------------------------- NG-LIFE-CYCLES ----------------------------- */
  // TODO NG ONIT
  ngOnInit(): void {
    this.getAllCategories();
    /** spinner starts on init */
    this._spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this._spinner.hide();
    }, 5000);
  }
  /* ------------------------------ CUSTOM-METHODS ----------------------------- */
  // TODO GET TENTS ALL
  getAllCategories() {
    this.subscription.push(
      this._categoriesService.getAllCategories().subscribe(
        (res: any) => {
          if (this.categoriesData) {
            this.categoriesData = res;
            this.dataSource = new MatTableDataSource(this.categoriesData);
            // console.log('Filter Data Source');
            let filterDataSource = this.dataSource.filteredData;
            // console.log(this.categoriesData);
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
  viewCategorie(id: any) {
    this._router.navigate(['../view', id], { relativeTo: this._activatedRoute })
  }
  // TODO EDIT TENTS METHOD
  editCategorie(id?: any): void {
    this._router.navigate(['../edit', id], { relativeTo: this._activatedRoute });
  }
  // TODO DELETE TENTS METHOD
  deleteCategorie(id: any) {
    // console.log(id);
    this.deleteDialog = this._dialog.open(DeleteComponent, {
      panelClass: 'custom-modal',
      width: '30%',
      disableClose: true,
      data: {
        dataID: id,
      }
    });
    this.deleteDialog.afterClosed().subscribe(
      (res: any) => {
        // console.log(res);
        if (res === 'deleted') {
          // console.log('Deleted Response from Dialog');
          this.getAllCategories();
        } else if (res === 'cancel') {
          // console.log('User cancelled delete');
        }
      }
    )
  }
  // TODO SEARCH BY CATEGORIES
  searchByCategory(event: Event) {
    // console.log(this.dataSource);
    this.searchValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.searchValue.trim().toLocaleLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //  TODO Whether the number of selected elements matches the total number of rows.
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    // console.log(numSelected);
    const numRows = this.categoriesData.length;
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
  checkboxLabel(row?: Category): string {
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
  // TODO NG ON DESTROY
  ngOnDestroy(): void {
    this.subscription.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    })
  }
  /* --------------------------------- GETTERS --------------------------------- */
}
