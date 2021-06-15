import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';

import { LocalNotificationsService } from './local-notifications.service';
import { StorageService } from './storage.service';

import { User } from '../Model/user.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user = new BehaviorSubject<User>(null)

  constructor(
    private platform: Platform,
    private storageService: StorageService,
    private notificationService: LocalNotificationsService,
  ) { }

  async isAuth(): Promise<boolean> {
    if (this.user && this.user.value) return Promise.resolve(true)
    const user = await this.storageService.getUser()
    console.log('~ user', user)
    if ( user ) {
      this.setUser(user)
      return Promise.resolve(true)
    }
    Promise.resolve(false)
  }

  async login(username: string, password: string): Promise<boolean> {
    try {
      const users = await this.storageService.getUsers()
      if (users && users.length > 0) {
        const user = users.filter(u => u.username === username)[0]
        /* El usuario no coincide con algún usuario registrado */
        if (!user) return this.unAuthorized('Error', 'El usuario ingresado no corresponde a una cuenta existente')
        /* La contraseña no coincide con la contraseña registrada */
        if (user.password !== password) return this.unAuthorized('Error', 'El usuario ingresado no corresponde a una cuenta existente')
        /* Authorized */
        this.setUser(user)
        return this.authorized('Bienvenido', 'Inicio de sesión exitoso')
      } else {
          /* No hay usuarios en la base de datos */
        return this.unAuthorized('Error', 'El usuario ingresado no corresponde a una cuenta existente')
      }
    } catch (error) {
      /* Error al leer Storage */
      return this.unAuthorized('Error', 'Lo sentimos, no fue posible obtener su información en nuestra base de datos')
    }
  }

  // smallmeercat427, telephon

  async signup(new_user: User): Promise<boolean> {
    let users = await this.storageService.getUsers()
    if (users && users.length > 0) {
      const user = users.filter(u => u.username === new_user.username)[0]
      if (user) return this.unAuthorized('Usuario registrado', 'El usuario ingresado pertenece a una cuenta existente')
      users.push(new_user)
      this.storageService.setUsers(users)
    } else {
      users = [new_user]
      this.storageService.setUsers(users)
    }

    this.setUser(new_user)
    return this.authorized('Registro exitoso', 'Bienvenido')
  }

  setUser(user: User) {
    this.user.next(user)
    this.storageService.setUser(user)
  }

  authorized(title: string, text: string): Promise<boolean> {
    console.log('~ text', text)
    if (this.platform.is('cordova')) this.notificationService.presentNotification(title, text)
    return Promise.resolve(true)
  }

  unAuthorized(title: string, text: string): Promise<boolean> {
    console.log('~ text', text)
    if (this.platform.is('cordova')) this.notificationService.presentNotification(title, text)
    return Promise.resolve(false)
  }

}
