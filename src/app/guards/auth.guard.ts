import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '@app/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private IsAuthorized: boolean = false;
  private IsRefreshed : boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot,) {


    this.IsAuthorized = this.authService.IsAuthorized();

    if (!this.IsAuthorized) {
      try {
        const expiration = localStorage.getItem("expires_at");
        const token = localStorage.getItem('access_Token');
        this.IsRefreshed = this.authService.Refresh();

      } catch (error) {
        return false;
      }

    } else
    {
      return true;
    }



    if (this.IsRefreshed) {
      return true;
    }
    else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }



    // not logged in so redirect to login page with the return url


  }
}
