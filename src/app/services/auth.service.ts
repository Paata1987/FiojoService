import { Observable, of } from 'rxjs';
import { RootService } from '@app/services/root.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ServerToken } from '@app/models/ServerToken';
import { LoginUserModel } from '@app/models/Auth/loginUser';
import { catchError, first, retry } from 'rxjs/operators';
import * as moment from "moment";
import { UserRefreshTokenModel } from '@app/models/user-refresh-token-model';
import { iUserIdentity } from '@app/models/iUserIdentity';






@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httRoot: RootService, private router: Router) { }


  /**
   // Verify user credentials on server to get token
   */
  public Login(user:LoginUserModel): Observable<ServerToken> {
    
    return this.httRoot.post<ServerToken>('login', user)
      .pipe(
        retry(2)

      );
  }


  public CheckUserName(_user: string): Observable<any> {
    return this.httRoot.get<any>('CheckUserName/' + _user).pipe(
      retry(2)
    );
  }


  // After clearing localStorage redirect to login screen
  public Logout(): boolean {

    let y = this.httRoot.delete<Response>("Logout")
      .pipe(
        catchError(error => of([]))

    ).subscribe(data => {
      
      localStorage.removeItem("access_Token");
      localStorage.removeItem("expires_at");

      return data
    }
    
    );
    
    //Logout
   

    localStorage.clear();
    // this.router.navigate(['login']);
    console.log("Local storage = " + localStorage.getItem("access_Token")?.toString());
    return (localStorage.getItem("access_Token") == null);

  }
  public SetToken(authResult: string) {

    let decodedToken = this.TokenDecode(authResult);
    const expiresAt = moment().add(decodedToken.exp, 'second');

    localStorage.setItem('access_Token', authResult);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  // Checking if token is not expired
  public IsAuthorized() {
    // let getDate: moment.Moment|boolean =this.getExpiration();
    let getDate: moment.Moment|boolean =this.getExpiration();
    let actualTime = moment().utc();
    let ch=actualTime.isBefore(getDate);
    return ch;
  }

  private getExpiration() {

    let expiration: any;
    try {
      expiration = localStorage.getItem("expires_at")?.toString();
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt).utc();
    } catch (e) {
      console.log("error decoding token");
      let timeNow_1= moment().utc().add(-1, 'hours');
     return timeNow_1;
    // return false;
    }
  }

  private TokenDecode(token: string) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      console.log("error decoding token");
    }
  }

  public Refresh(): boolean {
    let refreshed: boolean = false;

    let refreshUser: UserRefreshTokenModel = {}

    let token: any = localStorage.getItem('access_Token')?.toString();
   // delete
    if (token==null) {
      return false;
    }

    let decodedToken = this.TokenDecode(token);

    refreshUser.AccessToken = token;
    refreshUser.UserId = decodedToken.nameid;

    if (refreshUser.AccessToken != null && refreshUser.UserId != null) {

      this.httRoot.post<ServerToken>('refresh', refreshUser)
        .pipe(retry(2), first())
        .subscribe(
          data => {
            if (data) {
              let newToken = data;
              console.log("newToken Token = " + newToken.access_Token);

              this.SetToken(newToken.access_Token);

              refreshed = true;
            }
          });

    } else {
      refreshed = false;
    }
    return refreshed;
  }
/**
 * GetIdentity
 */
  public GetIdentity(): iUserIdentity {
    
    let token: any = localStorage.getItem('access_Token')?.toString();
    
    let _identity: iUserIdentity = {
      Id: "",
      Name: "",
      Roles: "",
      LanguageCode: "",
      CultureCode: "",
    }

    if (token == null) {
      return _identity;
    }
  let decodedToken = this.TokenDecode(token);

    const decodedRole  = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    const decodedName= decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    const decodedLanguage = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/country"];
    const decodedCulture = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/locality"];
    _identity.Id = decodedToken.nameid;
    _identity.Name = decodedName;
    _identity.Roles = decodedRole ;
    _identity.LanguageCode = decodedLanguage;
    _identity.CultureCode = decodedCulture;
    
    return _identity;
}

}
