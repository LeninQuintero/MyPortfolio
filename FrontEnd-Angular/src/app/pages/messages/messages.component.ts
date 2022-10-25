import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessagesService } from '../../services/messages.service';
import { Message } from './message';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})

export class MessagesComponent implements OnInit, OnDestroy {

  messages: Message[] = [];
  suscription: Subscription = new Subscription;

  constructor(private messageService: MessagesService) { };

  ngOnInit(): void {
   this.upDateMessages();

    this.suscription = this.messageService.refresh.subscribe(() =>
      this.upDateMessages());

    setInterval(() => this.upDateMessages(), 2000);
  }

  onDeleteMessage(message: Message) {
    this.messageService.deleteMessage(message).subscribe(() => (
      this.messageService.messages = this.messageService.messages.filter((m) => {
        return m.id !== message.id
      })
    ));

    this.upDateMessages();
  }

  upDateMessages() {
    this.messageService.getMessages().subscribe(messages =>
      this.messages = messages);
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }
}