import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../models/User";

@Injectable()
export default class UserHelper {
  private api_url = "http://localhost:3000";

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  /* setUser guarda en localStorage el id del usuario para mantener 
  la session abierta. */
  public setUser(id: string) {
    localStorage.setItem('userId', id);
  }

  /* manda el parametro de la clase User al api para crear un nuevo usuario, 
  si es validado correctamente, regresa su identificador, de lo contrario 
  regresa un error y redirecciona al usuario nuevamente a la pagina. */
  public createUser(user: User) {
    var url = this.api_url + "/users";

    this.http.post<any>(url, user).subscribe(data => {
      let id = data.id;

      if (id !== null) {
        this.setUser(id);
        this.router.navigate(['/profile', id]);
      }
    }, error => console.log(error));

    this.router.navigate(['/register']);
  }
}