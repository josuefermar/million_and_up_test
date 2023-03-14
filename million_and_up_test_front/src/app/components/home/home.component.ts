import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: Product[] = []
  page = 1
  categoryId = 0
  showSeeMoreButton = true
  query = ''
  orderBy = 'name_asc'
  minPrice: number | undefined = undefined
  maxPrice: number | undefined = undefined
  filtersSaved = {
    query: '',
    orderBy: 'name_asc'
  }

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private storeService: StoreService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.storeService.productQuery.subscribe(e => {
      this.query = e
      this.page = 1
      this.filtersSaved.query = e
      this.saveFilters()
      this.searchProducts()
    })

    this.route.paramMap.subscribe(params => {
      let categoryName = params.get('category_name')
      if (categoryName != null && categoryName != undefined && categoryName != '') {
        this.filterByCategory(categoryName)
        return
      }
      this.searchProducts()
    })
    this.getSavedFilters()
  }


  seeMore() {
    this.productService.getProducts(
      this.orderBy,
      this.page,
      9,
      this.categoryId != 0 ? this.categoryId : undefined,
      this.query != '' ? this.query : undefined
    ).subscribe(e => {
      this.showSeeMoreButton = !(e.length < 9);
      this.products = this.products.concat(e)
    })
  }

  filterByCategory(name: string) {
    this.categoryService.getCategoryByName(name).subscribe(e => {
      this.categoryId = e.id
      this.storeService.categorySelect.emit(e.id);
      this.searchProducts()
    })
  }

  searchProducts() {
    this.productService.getProducts(
      this.orderBy,
      this.page,
      9,
      this.categoryId != 0 ? this.categoryId : undefined,
      this.query != '' ? this.query : undefined,
      this.minPrice != undefined ? this.minPrice: undefined,
      this.maxPrice != undefined && this.maxPrice != 0 ? this.maxPrice: undefined,
    ).subscribe(e => {
      this.showSeeMoreButton = !(e.length < 9);
      this.products = e
    })
  }

  filterPrice(minPrice:HTMLInputElement, maxPrice:HTMLInputElement){
    this.minPrice = Number(minPrice.value)
    this.maxPrice = Number(maxPrice.value)
    this.searchProducts()
  }

  clearFilterPrice(minPrice:HTMLInputElement, maxPrice:HTMLInputElement){
    minPrice.value = ''
    maxPrice.value = ''
    this.minPrice = undefined
    this.maxPrice = undefined
    this.searchProducts()
  }

  orderProduct(orderBy: HTMLSelectElement) {
    let value = String(orderBy.value)
    this.orderBy = value
    this.filtersSaved.orderBy = value
    this.saveFilters()
    this.searchProducts()
  }

  getSavedFilters() {
    let filters: string = String(localStorage.getItem('filters'))
    if (filters != 'null') {
      this.filtersSaved = JSON.parse(filters)
      this.query = this.filtersSaved.query
      this.orderBy = this.filtersSaved.orderBy
    }
    this.saveFilters()
    this.searchProducts()
  }

  saveFilters() {
    localStorage.setItem('filters', JSON.stringify(this.filtersSaved))
  }
}
