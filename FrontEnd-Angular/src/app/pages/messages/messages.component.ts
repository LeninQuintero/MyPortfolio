import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message, MessagesService } from '../../services/messages.service';
import { UserProfile, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})

export class MessagesComponent implements OnInit, OnDestroy {
  
  private refreshTimer: number = 30000;
  private user: UserProfile = {
    id: 0,
    name: '',
    title: '',
    urlProfilePic: '',
    urlBannerSm: '',
    urlBannerLg: '',
    aboutMe: '',
    urlGithub: '',
    urlTwitter: '',
    urlLinkedin: '',
    urlProfile: ''
  }

  private refreshInterval;
  public messages: Message[] = [];

  constructor(private userService: UserService,
    private messageService: MessagesService) {
  
      this.refreshInterval =  setInterval(() => {
        this.messageService.getMessages(this.user.id).subscribe( messages => 
          this.messages = messages.sort((a, b) => { return new Date(b.date).getTime() - new Date(a.date).getTime() } ));
      }, this.refreshTimer);
  }

  ngOnInit(): void {
    this.userService.getUser.subscribe(user => {
      this.user = user;
      this.refreshMessages(this.user.id);
      this.refreshInterval;
    });

    this.messageService.getNewMessage$.subscribe(() => {
      this.refreshMessages(this.user.id);
    });
  }

  onDeleteMessage(id: number | undefined) {
    this.messageService.deleteMessage(id).subscribe(() => {
      let list = this.messages;
      list.filter(message => {
        this.messageService.getNewMessage$.next(message);
        return message.id !== id
      });
      list = this.messages;
    });
  }

  refreshMessages(userId: number) {
    this.messageService.getMessages(userId).subscribe(messages =>
      this.messages = messages.sort((a, b) => { return new Date(b.date).getTime() - new Date(a.date).getTime() } ));
  }

  messageDate(dateString: string): string {
    let messageDate = new Date(dateString);
    let date = messageDate.getDate() + ' de ' + messageDate.toLocaleString("es-ES", { month: "long" }) + ' de ' + messageDate.getFullYear();
    return date;
  }

  messageTime(dateString: string): string {
    let messageDate = new Date(dateString);
    let time = messageDate.getHours().toString().padStart(2, '0') + ':' + messageDate.getMinutes().toString().padStart(2, '0');
    return time;
  }

  onReadMessage(message: Message) {
    message.read = true;
    this.messageService.editMessage(message).subscribe(() => {
      this.messageService.getNewMessage$.next(message);
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.refreshInterval);
  }
}