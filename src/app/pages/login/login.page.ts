import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup
  passwordTypeInput = 'password'

  validation_message: any

  errorEmail: string
  errorPassword: string

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.setForm()
  }

  setForm() {
    this.form = new FormGroup({
      user: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    }, {updateOn : 'change'})
    this.validation_message = {
      user: [
        { type: 'required', message: 'Este campo es requerido' },
      ],
      password: [
        { type: 'required', message: 'Este campo es requerido' },
      ]
    }
  }

  togglePasswordMode() {
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text'
  }

  login() {
    const nickname = this.form.controls.user.value.trim()
    const password = this.form.controls.password.value.trim()
    if (!nickname || !password) return
    this.authService.login(nickname, password)
    .then(resp => resp ? this.navCtrl.navigateRoot(['/home']) : null) 
  }


}
