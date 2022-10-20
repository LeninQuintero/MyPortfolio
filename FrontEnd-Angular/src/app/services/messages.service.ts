import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../components/messages/message';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  messages: Message[] = [];  

  private apiUrl = 'http://localhost:3000/messages'

  constructor(private http: HttpClient) {}

getMessages(): Observable<Message[]> { 
 return this.http.get<Message[]>(this.apiUrl);
}

deleteMessage(message: Message): Observable<Message> { 
  const url = `${this.apiUrl}/${message.id}`;
  return this.http.delete<Message>(url)
 }

 addMessage(message: Message): Observable<Message> { 
  
  return this.http.post<Message>(this.apiUrl, message, httpOptions);
 }

}