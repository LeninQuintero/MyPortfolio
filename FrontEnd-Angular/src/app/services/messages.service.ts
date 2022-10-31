import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}
@Injectable({ providedIn: 'root' })

export class MessagesService {

  messages: Message[];

  _messages$: Subject<Message[]>;

  private apiUrl = 'http://localhost:3000/messages';

  constructor(private http: HttpClient) {
    this.messages = [];
    this._messages$ = new Subject();
  }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiUrl);
  }

  deleteMessage(message: Message): Observable<Message> {
    const url = `${this.apiUrl}/${message.id}`;
    return this.http.delete<Message>(url);
  }

  addMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.apiUrl, message, httpOptions);
  }

  get getNewMessages(): Observable<Message[]> {
    return this._messages$;
  }

}

export interface Message {
  id?: number;
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}