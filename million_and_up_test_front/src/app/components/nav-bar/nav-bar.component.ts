import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(
    private categoryService: CategoryService
  ){}

  ngOnInit(){
    this.categoryService.getCategories().subscribe(e => {
      console.log(e)
    })
  }
}
