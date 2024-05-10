import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alertSource = new Subject();

  alert$ = this.alertSource.asObservable();

  constructor() { }

  showAlert(message: string) {
    // Guardar el mensaje en el almacenamiento local
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    notifications.push(message);
    localStorage.setItem('notifications', JSON.stringify(notifications));
  
    return notifications;
  }

}
