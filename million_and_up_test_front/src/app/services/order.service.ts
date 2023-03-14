import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalComponent } from '../global-component';
import { CartItem } from '../interfaces/cart-item';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public createOrder(userId: number, items: CartItem[]): Observable<{
    status: string,
    message?: string
  }>{
    let data = items.map(e => {
      return {
        product_id: e.product.id,
        price: e.product.price,
        quantity: e.quantity,
      }
    })
    
    return this.httpClient.post<{
      status: string,
      message: string
    }>(GlobalComponent.apiUrl + '/order/create', {
      userId,
      data
    })
  }
}
