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

  suscriptionRefresh: Subscription = new Subscription;
  suscriptionGet: Subscription = new Subscription;
  refreshTimer: any;

  constructor(private messageService: MessagesService) { };

  ngOnInit(): void {
   this.upDateMessages();

    this.suscriptionRefresh = this.messageService.refresh.subscribe(() =>
      this.upDateMessages());

     this.refreshTimer = setInterval(() => this.upDateMessages(), 30*1000);
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
    this.suscriptionGet = this.messageService.getMessages().subscribe(messages =>
      this.messages = messages);
  }

  ngOnDestroy(): void {

    this.suscriptionGet.unsubscribe();

    this.suscriptionRefresh.unsubscribe();

    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
    }
  }
}