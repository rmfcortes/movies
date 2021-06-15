import { Injectable } from '@angular/core';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Injectable({
  providedIn: 'root'
})
export class LocalNotificationsService {

  constructor(
    private localNotifications: LocalNotifications
  ) { }

  presentNotification(title: string, text: string): void {
    this.localNotifications.schedule({
      id: 1,
      title,
      text
    })
  }

}
