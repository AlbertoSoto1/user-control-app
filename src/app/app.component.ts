import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'user-control';
  userId = localStorage.getItem('userId');

  constructor(
    private router: Router,
  ) { }

  /* este metodo cierra la sesion del usuario quitando el stributo 'userId' de
  local storage, posteriomente es redireccionado a la pagina de ingreso (login). */
  logout() {
    localStorage.removeItem('userId');

    this.router.navigate(['/login']);
  }
}
