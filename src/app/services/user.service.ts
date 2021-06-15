import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { User } from '../Model/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private ngZone: NgZone,
    private http: HttpClient,
  ) { }

  getUser(): Promise<User> {
    return new Promise((resolve, reject) => {
      const endpoint = `https://randomuser.me/api/`
      const sub = this.http.get(`${endpoint}`, {})
      .subscribe((resp: any) => {
        sub.unsubscribe()
        const user_result = resp.results[0]
        const user: User = {
          name: user_result.name.first + ' ' + user_result.name.last,
          username: user_result.login.username,
          password: user_result.login.password,
          register_at: new Date().toISOString()
        }
        this.ngZone.run(() => resolve(user))
      }, err => {
        sub.unsubscribe()
        console.log(err)
      })
    })
  }

}
