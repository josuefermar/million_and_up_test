import { Component, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: Product = {
    id: 0,
    name: '',
    description: '',
    rating: 0,
    stock: 0,
    price: 0,
    image: '',
    id_origin: '',
    category_id: 0,
    created_at: '',
    updated_at: ''
  }

  ngOnInit(){
    this.product.price = Number(this.product.price)
  }
}
