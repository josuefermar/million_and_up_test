import { Component, ElementRef, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { faSearch, faShoppingCart, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/interfaces/category';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { CartItem } from 'src/app/interfaces/cart-item';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  faSearch = faSearch
  faShoppingCart = faShoppingCart
  faArrowLeft = faArrowLeft
  faArrowRight = faArrowRight
  categories: Category[] = []
  categoryId = 0
  cartItems: CartItem[] = []

  constructor(
    private categoryService: CategoryService,
    private storeService: StoreService,
    private router: Router,
    private elRef:ElementRef
  ){}

  
  ngOnInit(){
    this.categoryService.getCategories().subscribe(e => {
      this.categories = e
    })

    this.storeService.categorySelect.subscribe(e => {
      this.categoryId = e
    })

    this.storeService.updateCart.subscribe(e => {
      this.getCartData()
    })

    this.getCartData()
  }

  searchProductsByQuery(query: HTMLInputElement){
    this.storeService.productQuery.emit(query.value);
  }

  searchByCategory(category_name: string){
    this.router.navigate(['/'+category_name])
  }

  clearSearch(query: HTMLInputElement){
    if(query.value == ''){
      this.storeService.productQuery.emit(query.value);
    }
  }

  getCartData(){
    let cart: string = String(localStorage.getItem('cart'))
    if(!(cart == 'null')) {
      this.cartItems = JSON.parse(cart)
    }
  }


}
