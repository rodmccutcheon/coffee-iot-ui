import { Component } from '@angular/core';
import { WebSocketService } from "./services/web-socket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public coffeesMade = 0;

  constructor(private webSocketService: WebSocketService) {

    let stompClient = this.webSocketService.connect();
    stompClient.connect({}, frame => {

      stompClient.subscribe('/topic/notification', notifications => {

        this.coffeesMade = JSON.parse(notifications.body).count;
      })
    });
  }
}
