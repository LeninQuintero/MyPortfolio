import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { API_URL } from 'src/environments/api-urls-config';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}
@Injectable({ providedIn: 'root' })

export class MessagesService {
  
  private apiUrl = API_URL;
  private urlGetMessages =`${this.apiUrl}/message-list/`;
  private urlAddMessages = `${this.apiUrl}/new-message/`;
  private urlDeleteMessage = `${this.apiUrl}/delete-message/`;
  private urlEditMessage = `${this.apiUrl}/edit-message/`;

  private _newMessage$ = new Subject<Message>();

  constructor(private http: HttpClient) {}

  getMessages(userId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.urlGetMessages}${userId}`, httpOptions);
  }

  deleteMessage(id: number | undefined): Observable<Message> {
    const url = `${this.urlDeleteMessage}${id}`;
    return this.http.delete<Message>(url, httpOptions);
  }

  addMessage(message: Message, userId: number): Observable<Message> {
    return this.http.post<Message>(`${this.urlAddMessages}${userId}`, message, httpOptions);
  }

  editMessage(message: Message): Observable<Message> {
    return this.http.put<Message>(this.urlEditMessage, message, httpOptions);
  }

  get getNewMessage$() {
    return this._newMessage$;
  }

}

export interface Message {
  id?: number;
  name: string;
  subject: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
}