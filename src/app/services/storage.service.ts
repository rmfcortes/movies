import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { User } from '../Model/user.interface';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  setUsers(users: User[]): void {
    this.storage.set('users', users)
  }

  getUsers(): Promise<User[]> {
    return this.storage.get('users')
  }

  setUser(user: User): void {
    this.storage.set('user', user)
  }

  getUser(): Promise<User> {
    return this.storage.get('user')
  }

}
