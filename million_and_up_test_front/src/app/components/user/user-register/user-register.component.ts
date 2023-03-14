import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    let user: string = String(localStorage.getItem('session'))
    if (user != 'null') {
      this.router.navigate([''])
    }
  }

  createUser(name: HTMLInputElement, email: HTMLInputElement, password: HTMLInputElement) {
    this.userService.createUser(email.value,name.value, password.value).subscribe(e => {
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
