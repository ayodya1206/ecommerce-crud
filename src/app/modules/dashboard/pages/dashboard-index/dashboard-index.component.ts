import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BreakpointState, Breakpoints, MediaMatcher, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { GeneralConstants as getConst } from '../../../../shared/constants/constant-variables'

@Component({
  selector: 'app-dashboard-index',
  templateUrl: './dashboard-index.component.html',
  styleUrls: ['./dashboard-index.component.scss']
})
export class DashboardIndexComponent implements OnInit {
  /* --------------------------------- FIELDS -------------------------------- */
  mobileQuery: MediaQueryList;
  mobileListNone: boolean = false;
  notificationsCount: number = 20;
  customCollapsedHeight = '40px';
  customExpandedHeight = '40px';
  panelOpenState: boolean = false;
  hideExceptOrders: boolean = false;
  private _mobileQueryListener: () => void;
  loginBtnShow: boolean = true;
  haveMenuAccess: boolean = true;
  haveDashboardAccess: boolean = false;
  haveTenetAccess: boolean = false;
  haveCategoriesAccess: boolean = false;
  haveSubCategoriesAccess: boolean = false;
  userLoginDetails!: any;
  whoIAm: any;
  WhoAmIObj: any;
  userAccessCheckObj: any;
  userAccessCheck: any;
  userName: any;
  loginUserDetails: any;
  /* ------------------------------- CONSTRUCTOR ------------------------------ */
  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _media: MediaMatcher,
    private _router: Router
  ) {
    this.mobileQuery = _media.matchMedia('(max-width: 767px)');
    this._mobileQueryListener = () => _changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    
  }
  /* ----------------------------- NG-LIFE-CYCLES ----------------------------- */
  ngOnInit(): void {
    // TODO SET WHO AM I USER
    this.userLoginDetails = localStorage.getItem('loginDetails');
    this.WhoAmIObj = JSON.parse(this.userLoginDetails);
    this.userName = this.WhoAmIObj.userName;
    if (this.userLoginDetails) {
      this.loginBtnShow = false;
      this.whoIAm = this.WhoAmIObj.userRole;
    } else {
      this.loginBtnShow = true;
    }
    if (localStorage.getItem('accessCheckByRoles')) {
      this.userAccessCheckObj = localStorage.getItem('accessCheckByRoles');
      this.userAccessCheck = JSON.parse(this.userAccessCheckObj);
      // console.log(this.userAccessCheck);
      // console.log(this.userLoginDetails && (this.userLoginDetails.userRole == 'superadmin' || this.userLoginDetails.userRole == 'admin'));
      // TODO GIVE ACCESS TO ROLES

      if (this.whoIAm == getConst.CONST_SUPER_ADMIN) {
        this.haveDashboardAccess = true;
      } else if (this.whoIAm == getConst.CONST_ADMIN) {
        this.haveDashboardAccess = true;
      } else if (this.whoIAm == getConst.CONST_SELLER) {
        this.haveDashboardAccess = true;
      } else {
        this.haveDashboardAccess = true;
      }
    }
  }
  /* ------------------------------ CUSTOM-METHODS ----------------------------- */
  ngAfterViewInit() {
  }
  // TODO ROUTE TO LOGIN 
  gotoLogin() {
    this._router.navigate(['./login'])
  }
  // TODO LOGOUT METHOD
  logOut() {
    this._router.navigate(['./login']);
    localStorage.clear();
    localStorage.removeItem('user Role');
  }
  /* --------------------------------- GETTERS --------------------------------- */

}
