import { Component, ElementRef, ViewChild } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { faSearch, faShoppingCart, faArrowLeft, faArrowRight, faX } from '@fortawesome/free-solid-svg-icons';
import { Category } from 'src/app/interfaces/category';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { CartItem } from 'src/app/interfaces/cart-item';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

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
  faX = faX
  categories: Category[] = []
  categoryId = 0
  cartItems: CartItem[] = []
  query = ''
  filtersSaved = {
    query: '',
    orderBy: ''
  }
  user: User | undefined = undefined


  constructor(
    private categoryService: CategoryService,
    private storeService: StoreService,
    private userService: UserService,
    private router: Router,
  ) { }


  ngOnInit() {
    this.categoryService.getCategories().subscribe(e => {
      this.categories = e
    })

    this.storeService.categorySelect.subscribe(e => {
      this.categoryId = e
    })

    this.storeService.updateCart.subscribe(e => {
      this.getCartData()
    })
    this.userService.userSession.subscribe(e => {
      this.user = e
      this.getUserData()
    })

    this.getCartData()
    this.getUserData()
    this.getSavedFilters()
  }

  ngAfterViewInit() {
    this.storeService.updateCart.subscribe(e => {
      this.getCartData()
    })
    this.userService.userSession.subscribe(e => {
      this.user = e
      this.getUserData()
    })

    this.getCartData()
    this.getUserData()
  }

  searchProductsByQuery(query: HTMLInputElement) {
    this.filtersSaved.query = query.value
    this.saveFilters()
    this.checkUrl()
    this.storeService.productQuery.emit(query.value);
  }

  clearQuerySearch(query: HTMLInputElement) {
    query.value = ''
    this.checkUrl()
    this.storeService.productQuery.emit('');
  }

  checkUrl() {
    if (this.router.url.includes('/product/')
      || this.router.url.includes('/login')
      || this.router.url.includes('/register')
      || this.router.url.includes('/cart')
    ) {
      this.router.navigate([''])
    }
  }

  searchByCategory(category_name: string) {
    this.router.navigate(['/' + category_name])
  }

  clearSearch(query: HTMLInputElement) {
    if (query.value == '') {
      this.filtersSaved.query = query.value
      this.saveFilters()
      this.storeService.productQuery.emit(query.value);
    }
  }

  getCartData() {
    let cart: string = String(localStorage.getItem('cart'))
    this.cartItems = []
    if (cart != 'null') {
      this.cartItems = JSON.parse(atob(cart))
    }
  }

  getUserData() {
    let user: string = String(localStorage.getItem('session'))
    this.user = undefined
    if (user != 'null') {
      this.user = JSON.parse(atob(user))
    }
  }

  getSavedFilters() {
    let filters: string = String(localStorage.getItem('filters'))
    if (filters != 'null') {
      this.filtersSaved = JSON.parse(filters)
      this.query = this.filtersSaved.query
    }
    this.saveFilters()
  }

  saveFilters() {
    localStorage.setItem('filters', JSON.stringify(this.filtersSaved))
  }

  goToCar() {
    if (this.cartItems.length > 0) {
      this.router.navigate(['/cart'])
    }
  }

  goToLogin() {
    this.router.navigate(['/login'])
  }

  goToRegister() {
    this.router.navigate(['/register'])
  }

  closeSesion() {
    this.user = undefined
    localStorage.removeItem('session')
    this.userService.userSession.emit(undefined)
    this.router.navigate([''])
  }
}
