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
  wrongQuantity: boolean = false

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
    if (!(cart == 'null')) {
      this.cartItems = JSON.parse(atob(cart))
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

  getProductCategory() {
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
    quantity.value = String(++value);
    this.updatePrice(Number(quantity.value))
    this.checkQuantity(quantity)
  }

  decreaseQuantity(quantity: HTMLInputElement) {
    let value = Number(quantity.value)
    quantity.value = String(--value);
    this.updatePrice(Number(quantity.value))
    this.checkQuantity(quantity)
  }

  addToCart(quantity: HTMLInputElement) {
    let value = Number(quantity.value)
    let item: CartItem = {
      product: this.product,
      quantity: value,
    }

    item.product.description = item.product.description.replace(/[’&\/\\#,+()$~%.'":*?<>{}]/g, '');
    item.product.name = item.product.name.replace(/[’&\/\\#,+()$~%.'":*?<>{}]/g, '');

    let pushItem = true

    this.cartItems.forEach((cartItem, index) => {
      if (cartItem.product.id_origin == this.product.id_origin) {
        this.cartItems[index] = item
        pushItem = false
        return
      }
    });

    if (pushItem) {
      this.cartItems.push(item)
    }

    localStorage.setItem('cart', btoa(JSON.stringify(this.cartItems)))
    this.storeService.updateCart.emit(true)
    Swal.fire(
      pushItem ? 'Producto Agregado' : 'Producto Actualizado',
      '',
      'success'
    )
  }

  updatePrice(quantity: number) {
    this.totalPrice = quantity * this.product.price
  }

  checkQuantity(quantity: HTMLInputElement) {
    this.wrongQuantity = Number(quantity.value) <= 0 || Number(quantity.value) > this.product.stock
  }
}
