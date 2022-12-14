import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message, MessagesService } from '../../services/messages.service';

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

  constructor(private messageService: MessagesService) {};

  ngOnInit(): void {
    this.refreshMessages();

    this.messageService.getNewMessages.subscribe(() =>
    this.refreshMessages());

      // Optional timer to refresh inbox automatically
    this.refreshTimer = setInterval(() => this.refreshMessages(), 15 * 1000);
  }

  onDeleteMessage(message: Message) {
    
    this.messageService.deleteMessage(message).subscribe(() => {
      let list = this.messageService.messages;

      list.filter(m => { return m.id !== message.id });
      this.messageService._messages$.next(list);
    });
  }

  refreshMessages() {
    this.messageService.getMessages().subscribe(messages =>
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