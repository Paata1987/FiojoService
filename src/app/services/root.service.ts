import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RootService {
  private httpOptions = {
    headers: new HttpHeaders().append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', 'Content-Type')
  };

  constructor(private http: HttpClient) { }

  public post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(environment.apiUrl + '/' + endpoint, body, this.httpOptions);
  }

  public get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(environment.apiUrl + '/' + endpoint);
  }
  public delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(environment.apiUrl + '/' + endpoint, this.httpOptions);
  }
}
