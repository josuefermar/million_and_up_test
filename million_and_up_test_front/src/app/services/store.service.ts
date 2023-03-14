import { EventEmitter, Injectable } from '@angular/core';
import { CartItem } from '../interfaces/cart-item';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  productQuery = new EventEmitter<string>();
  categorySelect = new EventEmitter<number>();
  updateCart = new EventEmitter<boolean>();

  constructor() { }
}
