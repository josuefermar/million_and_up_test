import { Component } from '@angular/core';
import { Product } from './interfaces/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  shoppingCart: Product[] = [];
  filteredCategory: number = 0;
  title = 'million_and_up_test_front';
}
