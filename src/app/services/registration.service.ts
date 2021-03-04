import { iLanguage } from './../models/iLanguage';
import { RootService } from '@app/services/root.service';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { iUserRoles, UserRoles } from '@app/models/iUserRoles';
import { catchError, retry } from 'rxjs/operators';
import { iCultures } from '@app/models/Cultures';
import { iRegistrationAuth } from '@app/models/Auth/RegistrationAuth';
import { ServerToken } from '@app/models/ServerToken';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httRoot: RootService) { }

  public GetRoles(): Observable<iUserRoles[]> {
    return this.httRoot.get<iUserRoles[]>('roles').pipe(
      retry(2)
      // ,catchError(this.handleError)
    );
  }
  /*** GetCultures   */
  public GetCultures(): iCultures[] {

    let cultureList: iCultures[] = [
      { id: "1",Code: 'Az', Name: 'Azərbaycan' },
      { id: "1",Code: 'Gr', Name: 'საქართველო' },
      { id: "1",Code: 'Kz', Name: 'Қазақстан' },
      { id: "1",Code: 'Ua', Name: 'Україна' },
      { id: "1",Code: 'Tr', Name: 'Türkiye' },
      { id: "1",Code: 'Lt', Name: 'Latvija' }
    ];

    return cultureList;
  }

  /**
   * GetLanguages
   */
  public GetLanguages(): iLanguage[] {
    let languagesList: iLanguage[] = [
      { id: "1", Code: 'Az', Name: 'Azərbaycan' },
      { id: "1", Code: 'Gr', Name: 'ქართული' },
      { id: "1", Code: 'Kz', Name: 'Қазақстан' },
      { id: "1", Code: 'Ua', Name: 'Україна' },
      { id: "1", Code: 'Tr', Name: 'Türkiye' },
      { id: "1", Code: 'Lt', Name: 'Latvija' },
      { id: "1", Code: 'Ru', Name: 'Русский' }
    ];
    return languagesList;
  }

  /*** SetRegistrationAuth */
  public SetRegistrationAuth(newUser: iRegistrationAuth): Observable<string> {
    return this.httRoot.post<string>('registration', newUser)
  }
}




   // Handle API errors
/*
handleError(error: HttpErrorResponse) {
 if (error.error instanceof ErrorEvent) {
   // A client-side or network error occurred. Handle it accordingly.
   console.error('An error occurred:', error.error.message);
 } else {
   // The backend returned an unsuccessful response code.
   // The response body may contain clues as to what went wrong,
   console.error(
     `Backend returned code ${error.status}, ` +
     `body was: ${error.error}`);
 }
 // return an observable with a user-facing error message
 return throwError(
   'Something bad happened; please try again later.');
}

*/

