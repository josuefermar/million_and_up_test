import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/interfaces/cart-item';
import { Product } from 'src/app/interfaces/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  product: Product = {
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
  totalPrice = 0
  cartItems: CartItem[] = []

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private storeService: StoreService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let idOrigin = params.get('id_origin')
      if (idOrigin != null && idOrigin != undefined && idOrigin != '') {
        this.getProductDetail(idOrigin)
      }
    })

    let cart: string = String(localStorage.getItem('cart'))
    if(!(cart == 'null')) {
      this.cartItems = JSON.parse(cart)
    }
  }

  getProductDetail(idOrigin: string) {
    this.productService.getProduct(idOrigin).subscribe(e => {
      this.product = e
      this.product.price = Number(this.product.price)
      this.totalPrice = this.product.price
      this.getProductCategory()
    })
  }

  getProductCategory(){
    this.categoryService.getCategoryById(this.product.category_id).subscribe(e => {
      this.product.category_name = e.name
    })
  }

  createRange(number: number) {
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }

  increaseQuantity(quantity: HTMLInputElement) {
    let value = Number(quantity.value)
    quantity.value = String(++value <= this.product.stock ? value : this.product.stock);
    this.updatePrice(Number(quantity.value))
  }

  decreaseQuantity(quantity: HTMLInputElement) {
    let value = Number(quantity.value)
    quantity.value = String(--value < 1 ? 1 : value);
    this.updatePrice(Number(quantity.value))
  }

  changeQuantity(quantity: HTMLInputElement) {
    let value = Number(quantity.value)
    if (value < 1) {
      quantity.value = String(1);
    }
    if (value > this.product.stock) {
      quantity.value = String(this.product.stock);
    }
    this.updatePrice(Number(quantity.value))
  }

  addToCart(quantity: HTMLInputElement){
    let value = Number(quantity.value)
    let item: CartItem = {
      productId: this.product.id,
      quantity: value,
      price: this.product.price
    }

    this.cartItems.push(item)

    localStorage.setItem('cart', JSON.stringify(this.cartItems))
    this.storeService.updateCart.emit(true)
    Swal.fire(
      'Producto Agregado!',
      'success'
    )
  }

  updatePrice(quantity: number){
    this.totalPrice = quantity * this.product.price
  }
}
