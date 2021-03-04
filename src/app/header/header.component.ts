import { IMenuItem } from '@app/models/IMenuItem ';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { iUserIdentity } from '@app/models/iUserIdentity';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuItems: IMenuItem[] = [
    {
      label: 'Sign In',
      icon: 'login',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true,
      route:'/login'
    },
    {
      label: 'Home',
      icon: 'deck',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      route:'/home'
    },
    {
      label: 'New User',
      icon: 'person_add',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      route:'/registration'
    },
    {
      label: 'Log Out',
      icon: 'person_off',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true,
      route:'/home'
    },
    {
      label: 'Edit',
      icon: 'carpenter',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      route:'/EditWorkers'
    },
    {
      label: 'Add bussines',
      icon: 'add_business',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true,
      route:'/login'
    },
  ];
  private LoginUrl: string = this.route.snapshot.queryParams.returnUrl || 'login';
  public identity_name!: string;
  public identity_role!: string;
  public collapsed: boolean = false;
  public isLoggedInn: boolean = false;
  public step: string = "";
  public preStep: string = "";
  constructor(private route: ActivatedRoute, private router: Router,  private authService: AuthService) { }

  ngOnInit(): void {
    this.initializing();
  }

  async initializing() {
    this.isLoggedInn = this.authService.IsAuthorized();
    if (this.isLoggedInn) {
      let _identity: iUserIdentity = this.authService.GetIdentity();
      this.identity_name = _identity.Name.charAt(0).toLocaleUpperCase(_identity.CultureCode) + _identity.Name.substring(1);

      this.identity_role = _identity.Roles;
   } else {
     
   }
  }

  public onGoToPageSub(val: string) {
    this.step = val;
  }
  onGoToPage(mainLinkVal:string){
    this.preStep = mainLinkVal;
    this.step = "";
  }
    
  public logOutUser() {
    this.authService.Logout();
    this.initializing();  
    
    this.router.navigate([this.LoginUrl],);
  }

  public logInUser(): void {   
    this.router.navigate([this.LoginUrl]);
    this.initializing(); 
  };






}
