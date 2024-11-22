import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8080/api/products'; // Url for Spring Boot RestAPI

  // Inject HttpClient
  constructor(private httpClient: HttpClient) { }

  // This method will map the JSON data from Spring Data REST to Product array, will return an observable
  getProductList(theCategoryId: number): Observable<Product[]> {

    // build URL based on category id
    const searchURL = `${this.apiUrl}/search/findByCategoryId?id=${theCategoryId}`
    return this.httpClient.get<GetResponse>(searchURL).pipe(
      map(response => response._embedded.products)
    );
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `A client-side error occurred: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}

// Unwraps the JSON from Spring Data REST _embedded entry
interface GetResponse {
  _embedded: {
    products: Product[];
  }
}
