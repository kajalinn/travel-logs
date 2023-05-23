import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

// Class with methods for making HTTP requests
export class WebApiService {

  //The constructor injects the HttpClient service, which is used for making HTTP requests.
  constructor(private httpClient: HttpClient) { }

  // Sends an HTTP GET request to the specified URL
  get(url: string): Observable<any> {
    return this.httpClient.get(
      url
    )
      .pipe(
        map((response: any) => this.ReturnResponseData(response)),
        catchError(this.handleError)
      );
  }

  // Send an HTTP GET request to the specified URL with query parameters
  getX(url: string, model: any): Observable<any> {
    return this.httpClient.get(
      url,
      model
    )
      .pipe(
        map((response: any) => this.ReturnResponseData(response)),
        catchError(this.handleError)
      );
  }

  // Send an HTTP POST request to the specified URL with the provided data
  post(url: string, model: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: "response" as 'body'
    };
    return this.httpClient.post(
      url,
      model,
      httpOptions)
      .pipe(
        map((response: any) => this.ReturnResponseData(response)),
        catchError(this.handleError)
      );
  }


  // Utility function to return the response data as-is
  private ReturnResponseData(response: any) {
    return response;
  }


  // Error handling function to throw the error
  private handleError(error: any) {
    return throwError(error);
  }
}
