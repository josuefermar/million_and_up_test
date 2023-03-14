import { Component, ElementRef, ViewChild } from '@angular/core';
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
  }


  seeMore() {
    this.productService.getProducts(
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
      this.page,
      9,
      this.categoryId != 0 ? this.categoryId : undefined,
      this.query != '' ? this.query : undefined
    ).subscribe(e => {
      this.showSeeMoreButton = !(e.length < 9);
      this.products = e
    })
  }
}
