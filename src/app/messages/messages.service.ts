import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: Message[] = [];
  maxMessageId: number;
  messageListChangedEvent = new Subject<Message[]>();
  messageChangeEvent = new EventEmitter<Message[]>();


  constructor(private http: HttpClient) {
    //this.messages = MOCKMESSAGES;
    this.messages = this.initMessages();
  }

  storeMessages() {
    let json = JSON.stringify(this.messages);
    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    //header.set('Content-Type', 'application/json');
    this.http.put('https://cmsapp-b29f9.firebaseio.com/messages.json', json, { headers: header })
      .subscribe((response: Response) => {
        this.messageChangeEvent.next(this.messages.slice());
      });
  }

  initMessages(): Message[] {
    this.http.get<Message[]>('https://cmsapp-b29f9.firebaseio.com/messages.json')
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          //this.messages.sort((a, b) => (a.sender > b.sender) ? 1 : ((b.sender > a.sender) ? -1 : 0));
          this.messageChangeEvent.next(this.messages.slice()
          )
        },
        (error: any) => {
          console.log(error);
        }
      );
    return this.messages.slice();
  }

  getMaxId(): number {
    let maxId = 0;
    for (let i = 0; i < this.messages.length; i++) {
      let currentId = +this.messages[i].messageId;
      if (currentId < maxId) {
        maxId = currentId
      }
    }
    return maxId
  }

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: number): Message {
    for (let message of this.messages) {
      if (message.messageId === id) {
        return message;
      }
    }
    return null;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangeEvent.emit(this.messages.slice());
    this.storeMessages();
  }
}
