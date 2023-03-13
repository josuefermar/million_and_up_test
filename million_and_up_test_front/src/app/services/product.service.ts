import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from '../global-component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClient: HttpClient
  ) { }

  /**
   * getProducts
   */
  public getProducts(page: number = 1, limit: number = 12, query: string = '', minPrice: number = 0, maxPrice: number = 0): Observable<Product> {
    const body = {
      page,
      limit,
      query,
      minPrice,
      maxPrice
    }

    return this.httpClient.post<Product>(GlobalComponent.apiUrl, body)
  }
}
