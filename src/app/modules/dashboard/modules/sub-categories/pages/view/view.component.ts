import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubCategories } from '../../models/sub-categories';
import { SubCategoriesService } from '../../services/sub-categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { sentenceCase } from 'change-case';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {

  /* --------------------------------- FIELDS -------------------------------- */
  categoriesDataById!: SubCategories;
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
    private _subcategoriesService: SubCategoriesService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.categoryId = this._activatedRoute.snapshot.paramMap.get('id');

  }

  /* ----------------------------- NG-LIFE-CYCLES ----------------------------- */
  ngOnInit(): void {
    this.subscription.push(
      this._subcategoriesService.getSubCategoriesByID(this.categoryId).subscribe(
        (res: any) => {
          this.categoriesDataById = res;          
          // console.log(this.categoriesDataById);
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
