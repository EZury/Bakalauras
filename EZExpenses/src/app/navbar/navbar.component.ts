import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../shared/messaging.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  message;

  constructor(
    private messagingService: MessagingService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  sendPushNotification() {
    const userId = '1';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }
}
