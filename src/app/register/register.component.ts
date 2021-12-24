import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from 'src/assets/models/User';
import UserHelper from '../../assets/helpers/user-helper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  user!: User;
  error: boolean = false;
  

  constructor(
    private service: UserHelper
  ) { 
    this.user = new User();
  }

  /* inicializa el formulario de registro */
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl(''),
      age: new FormControl('', Validators.required),
      mail: new FormControl(''),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      profile: new FormControl(1, Validators.required)
    });
  }

  /* esta funcion guarda los valores del formulario en el objeto user para 
  mandarlo como parametro a la funcion createUser de la clase service. Dicho 
  metodo crea y guarda al nuevo usuario en la base de datos. */
  onSubmit() {
    var user = this.user;

    user.name = this.form.get("name")?.value;
    user.surname = this.form.get("surname")?.value;
    user.age = this.form.get("age")?.value;
    user.mail = this.form.get("mail")?.value;
    user.username = this.form.get("username")?.value;
    user.password_digest = this.form.get("password")?.value;
    user.profile = parseInt(this.form.get("profile")?.value);

    this.service.createUser(user);

  }

}
