import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    let user: string = String(localStorage.getItem('session'))
    if(user != 'null'){
      this.router.navigate([''])
    }
  }

  login(email: HTMLInputElement, password: HTMLInputElement) {
    this.userService.createSesion(email.value, password.value).subscribe(e => {
      if (e.status == 'error') {
        Swal.fire(
          'Error',
          e.message,
          'error'
        )
        localStorage.removeItem('session')
        this.userService.userSession.emit(undefined)
      } else {
        localStorage.setItem('session', btoa(JSON.stringify(e.user)))
        this.userService.userSession.emit(e.user)
        this.router.navigate([''])
      }
    })
  }
}
