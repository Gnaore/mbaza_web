import { Component } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent {
  messages!: any[];
  selectedMessage!: any;

  ngOnInit() {
    this.messages = [
      {
        image: 'assets/img/agents/agent-01.jpg',
        name: 'Olivier Thomas',
        message: 'Un message simple',
        date: '12/01/2018'
      },
      {
        image: 'assets/img/agents/agent-01.jpg',
        name: 'Olivier Thomas',
        message: 'Un message simple',
        date: '12/01/2018'
      }
    ]
  }
}
