import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { User } from 'src/assets/models/User';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  idUser: number = NaN;
  public isEditing: boolean = false;
  form!: FormGroup;
  user!: User;
  error:boolean = false;
  success:boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { 
    this.user = new User();
  }

  /* se obtiene el id del usuairo de la url, posteriomente se inicializa el 
  formulario con los datos de la instancia de usuario.
  Se llama a la funcion getUser para obtener la información del usuario y mostrarla. */
  ngOnInit(): void {
    this.idUser = Number(this.route.snapshot.paramMap.get('id'));
    this.form = new FormGroup({
      name: new FormControl({value: this.user.name, disabled: true}),
      surname: new FormControl({value: this.user.surname, disabled: true}),
      age: new FormControl({value: this.user.age, disabled: true}),
      mail: new FormControl({value: this.user.mail, disabled: true}),
      username: new FormControl({value: this.user.username, disabled: true}),
      password: new FormControl({value: '', disabled: true}),
      profile: new FormControl({value: this.user.profile, disabled: true})
    });
    this.getUser(this.idUser);
    this.success = false;
  }

  /* habilida/deshabilita el boton para editar mediante la variable 'isEditing'.
  despues llama a la funcion 'enableForm' para habilitar los campos del 
  formulario. */
  imprimir() {
    this.isEditing = !this.isEditing;
    this.enableForm();
  }

  /* esta función manda los datos del formulario  para guardarlos y actualizar 
  al usuario mediante su username.
  si la operacion es realizada con exito, muestra un alert que lo indica, en caso 
  contrario, muestra un alert de error.*/
  onSubmit() {
    var user = this.user;

    user.name = this.form.get("name")?.value;
    user.surname = this.form.get("surname")?.value;
    user.age = this.form.get("age")?.value;
    user.mail = this.form.get("mail")?.value;
    user.username = this.form.get("username")?.value;
    user.password_digest = this.form.get("password")?.value;
    user.profile = parseInt(this.form.get("profile")?.value);

    var url = "http://localhost:3000/" + "users/" + user.username;
    console.log(user.username);

    this.http.patch<any>(url, user).subscribe(data => {

      if (data.status == 200) {
        this.user = data.user
        this.success = true;
        this.error = false;
      } else {
        this.error = true;
      }

    }, error => console.error(error));
  }

  /* getUser obtiene los datos del usuario de base de datos,
  si la operacion se realiza con exito, pone los valores en el formulairo para 
  mostrarlos. en caso contrario, muestra un error. */
  private getUser(id: number) {
    var url = "http://localhost:3000/" + "users/" + this.idUser;

    this.http.get<any>(url).subscribe(data => {

      if (data.status == 200) {
        this.user = data.user;

        this.form.get("name")?.setValue(this.user.name);
        this.form.get("surname")?.setValue(this.user.surname);
        this.form.get("age")?.setValue(this.user.age);
        this.form.get("mail")?.setValue(this.user.mail);
        this.form.get("username")?.setValue(this.user.username);
        this.form.get("password")?.setValue(this.user.password_digest);
        this.form.get("profile")?.setValue(this.user.profile);
      } else {
        this.error = true;
      }

    }, error => console.error(error));
  }

  /* deleteUser envia un delete a la base de datos con el id del usuario,
  cuando la operacion es realizada con exito, cierra la sesion del usuario 
  actual y muestra un mensaje de ventana para indicarlo, posteriormente el 
  usuario es redireccionado a la pagina de ingreso (login) */
  deleteUser() {
    var url = "http://localhost:3000/" + "users/" + this.idUser;

    this.http.delete<any>(url).subscribe(data => {

      if (data.users !== null) {
        localStorage.removeItem('userId');
        alert("your user was deleted, now you're redirect to login");
        this.router.navigate(['/login']);
      } else {
        this.error = true;
      }

    }, error => console.error(error));
  }

  /* enableForm habilita o deshabilita los campos del formulario, segun el valor 
  de la variable 'isEditing' */
  enableForm() {
    if (this.isEditing) {

      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].enable();
      });

    } else {
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].disable();
      });
    }
  }

}
