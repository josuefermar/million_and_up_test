import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalComponent } from '../global-component';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userSession = new EventEmitter<User | undefined>()

  constructor(
    private httpClient: HttpClient
  ) { }

  public createUser(email: string, name: string, password: string): Observable<{
    status: string,
    user: User,
    message?: string
  }> {
    return this.httpClient.post<{
      status: "create",
      user: User
    }>(GlobalComponent.apiUrl + '/user/create', {
      email,
      name,
      password
    })
  }

  public createSesion(email: string, password: string): Observable<{
    status: string,
    user: User,
    message?: string
  }> {
    return this.httpClient.post<{
      status: "create",
      user: User
    }>(GlobalComponent.apiUrl + '/session/create', {
      email,
      password
    })
  }

  public getUserInfo(userId: number): Observable<User> {
    return this.httpClient.post<User>(GlobalComponent.apiUrl + '/user/get', {
      userId,
    })
  }
}
