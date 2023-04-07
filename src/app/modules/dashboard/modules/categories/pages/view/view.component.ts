import { Category } from './../../models/category';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { CategoriesService } from './../../services/categories.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { sentenceCase } from "change-case";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {

  /* --------------------------------- FIELDS -------------------------------- */
  categoriesDataById!: Category;
  subscription: Array<Subscription> = [];
  categoryId: any;
  createNewCategoryFlag: boolean = false;
  cancelCategoryFlag: any
  sentenceCase = sentenceCase;
  categoriesDetails: any;
  categoryDetails: any = [];
  categoryImage: any;
  /* ------------------------------- CONSTRUCTOR ------------------------------ */
  constructor(
    private _categoriesService: CategoriesService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.categoryId = this._activatedRoute.snapshot.paramMap.get('id');

  }

  /* ----------------------------- NG-LIFE-CYCLES ----------------------------- */
  ngOnInit(): void {
    this.subscription.push(
      this._categoriesService.getCategoriesByID(this.categoryId).subscribe(
        (res: any) => {
          this.categoriesDataById = res;          
          // console.log(this.categoriesDataById.name);
          this.categoryImage = res.image[0].imgURL
          // console.log(this.categoryImage);
          this.createNewCategoryFlag = false;
          this.categoryDetails = res;
        }
      )
    )
  }
  createNewCategory(categoryDetails: any) {
    this.createNewCategoryFlag = true;
    this.cancelCategoryFlag = false;
    this.categoriesDetails = categoryDetails;
  }

  /* ------------------------------ CUSTOM-METHODS ----------------------------- */
  // TODO ON DESTROY
  ngOnDestroy() {
    this.subscription.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    })
  }
  cancelReport(flag: any) {
    this.createNewCategoryFlag = false;
    this.cancelCategoryFlag = true;
    this._router.navigate([], { relativeTo: this._activatedRoute });
  }


  /* --------------------------------- GETTERS --------------------------------- */

}
