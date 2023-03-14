import { EventEmitter, Injectable } from '@angular/core';
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
  public getProducts(page: number = 1, limit: number = 12, categoryId?: number, query?: string, minPrice?: number, maxPrice?: number): Observable<Product[]> {
    return this.httpClient.post<Product[]>(GlobalComponent.apiUrl + '/list_products', {
      page,
      limit,
      categoryId,
      query,
      minPrice,
      maxPrice
    })
  }

  public getProduct(idOrigin: string): Observable<Product> {
    return this.httpClient.post<Product>(GlobalComponent.apiUrl + '/product_detail', {
      idOrigin
    })
  }
}
