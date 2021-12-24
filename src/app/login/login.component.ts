import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Sesion } from '../../assets/models/Sesion';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  session!: Sesion;
  error: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { 
    this.session = new Sesion();
  }

  ngOnInit(): void {
    /* trata de botener el id del usuarrio, si existe, esta lo queado y lo direcciona
    a su perfil mediante la funcion logUser */
    var userId = localStorage.getItem('userId');

    if (userId !== null) {
      this.logUSer(userId);
    }

    /* si no existe la sesion, inicializa el formulario de ingreso */
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  /* la funcion onSubit llama al metodo post del api para enviar la informacion 
  y que del lado del serevidor verifique que los datos son correctos, si lo son 
  regresa el id del usuario y la sesion se inicia con logUSer. De lo contrario 
  se muestra el mensaje de error en la pagina. */
  onSubmit() {
    var session = this.session;
    var url = "http://localhost:3000/" + "login";

    session.username = this.form?.get("username")?.value;
    session.password = this.form?.get("password")?.value;

    this.http.post<any>(url, session).subscribe(data => {

      if (data.id !== null) {
        this.logUSer(data.id);
      } else {
        this.error = true;
      }

    }, error => console.error(error));
  }

  /* metodo privado logUSer inserta el id del usuario 'userId' en localStorage 
  para mantener la sesion iniciada, y redirecciona el usuario a su perfil. */
  private logUSer(id: string) {
    localStorage.setItem('userId', id);

    this.router.navigate(['/profile', id]);
  }

}
