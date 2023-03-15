import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/interfaces/cart-item';
import { User } from 'src/app/interfaces/user';
import { OrderService } from 'src/app/services/order.service';
import { StoreService } from 'src/app/services/store.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems: CartItem[] = []
  total = 0
  wrongQuantity: boolean = false
  user: User | undefined = undefined

  constructor(
    private router: Router,
    private storeService: StoreService,
    private userService: UserService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.userService.userSession.subscribe(e => {
      this.user = e
      this.getUserData()
    })
    this.getCartData()
    this.getUserData()
  }

  getCartData() {
    let cart: string = String(localStorage.getItem('cart'))
    if (cart != 'null') {
      this.cartItems = JSON.parse(atob(cart))

      this.cartItems.forEach(item => {
        this.total += item.product.price * item.quantity
      });
    } else {
      this.wrongQuantity = true
    }
  }

  increaseQuantity(index: number, quantity: HTMLInputElement) {
    let value = Number(quantity.value)
    quantity.value = String(++value)
    this.cartItems[index].wrongQuantity = value <= 0 || value > this.cartItems[index].product.stock
    this.cartItems[index].quantity = value
    this.updatePrice()
  }

  decreaseQuantity(index: number, quantity: HTMLInputElement) {
    let value = Number(quantity.value)
    quantity.value = String(--value)
    this.cartItems[index].wrongQuantity = value <= 0 || value > this.cartItems[index].product.stock
    this.cartItems[index].quantity = value
    this.updatePrice()
  }

  validateQuantity(index: number, quantity: HTMLInputElement) {
    let value = Number(quantity.value)
    this.cartItems[index].wrongQuantity = value <= 0 || value > this.cartItems[index].product.stock
    this.cartItems[index].quantity = value
    this.updatePrice()
  }

  updatePrice() {
    this.total = 0
    this.cartItems.forEach(item => {
      this.total += item.product.price * item.quantity
    });
    this.checkItemsQuantity();
  }

  checkItemsQuantity() {
    this.wrongQuantity = false
    this.cartItems.forEach(element => {
      if (element.wrongQuantity) {
        this.wrongQuantity = true
      }
    });
  }

  createOrder() {
    if (this.user == undefined) {
      Swal.fire(
        'Opps!',
        'Debes iniciar sesion antes de proceder con la compra',
        'error'
      ).then(e => {
        this.router.navigate(['login'])
      })
    } else {
      this.orderService.createOrder(this.user.id, this.cartItems).subscribe(e => {
        if (e.status == 'error') {
          Swal.fire(
            'Opps!',
            e.message,
            'error'
          )
        } else {
          localStorage.removeItem('cart')
          this.storeService.updateCart.emit(true)
          this.router.navigate([''])
          Swal.fire(
            'Orden Creada',
            '',
            'success'
          )
        }
      })
    }
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1)
    localStorage.setItem('cart', btoa(JSON.stringify(this.cartItems)))
    this.storeService.updateCart.emit(true)
    this.getCartData()
    this.updatePrice()
  }

  getUserData() {
    let user: string = String(localStorage.getItem('session'))
    this.user = undefined
    if (user != 'null') {
      this.user = JSON.parse(atob(user))
    }
  }
}
