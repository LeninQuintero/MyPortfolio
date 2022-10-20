import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../../../app/services/messages.service';
import { Message } from './message';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})

export class MessagesComponent implements OnInit {

  constructor(public messageService: MessagesService) { }

  ngOnInit(): void {

    this.messageService.getMessages().subscribe(messages =>
      this.messageService.messages = messages);
  }

  onDeleteMessage(message: Message) {
    this.messageService.deleteMessage(message).subscribe(() => (
      this.messageService.messages = this.messageService.messages.filter((m) => {
        return m.id !== message.id;
      })
    ));
  }
}