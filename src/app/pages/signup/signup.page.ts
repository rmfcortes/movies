import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

import { User } from 'src/app/Model/user.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  user: User
  form: FormGroup

  validation_message: any

  constructor(
    private location: Location,
    private navCtrl: NavController,
    private userService: UserService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.getUser()
  }

  async getUser() {
    this.user = await this.userService.getUser()
    this.setForm()
    console.log('~ this.user', this.user)
  }

  setForm() {
    this.form = new FormGroup({
      name: new FormControl(this.user.name, Validators.required),
      username: new FormControl(this.user.username, Validators.required),
      password: new FormControl(this.user.password, Validators.required),
    }, {updateOn : 'change'})
    this.validation_message = {
      name: [
        { type: 'required', message: 'Este campo es requerido' },
      ],
      username: [
        { type: 'required', message: 'Este campo es requerido' },
      ],
      password: [
        { type: 'required', message: 'Este campo es requerido' },
      ]
    }
  }

  signup() {
    const name = this.form.controls.name.value.trim()
    const username = this.form.controls.username.value.trim()
    const password = this.form.controls.password.value.trim()
    const user: User = {
      name,
      username,
      password,
      register_at: this.user.register_at
    }
    this.authService.signup(user)
    .then(resp => resp ?  this.navCtrl.navigateRoot(['/home']) : null)
  }

  goBack() {
    this.location.back()
  }

}
