import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';
import { GlobalComponent } from '../global-component';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getCategories(): Observable<Category> {
    return this.httpClient.post<Category>(GlobalComponent.apiUrl+'/categories', {})
  }
}
