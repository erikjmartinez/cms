import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

//import { MessageListComponent } from '../message-list/message-list.component';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender: 'Erik';
  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;
  @Output() newMessage = new EventEmitter<Message>();
  constructor() { }

  ngOnInit() {
  }

  onSendMessage() {
    const subjectContent = this.subjectRef.nativeElement.value;
    const textContent = this.msgTextRef.nativeElement.value;
    const addNewMessage = new Message(1, subjectContent, textContent, this.currentSender);
    this.newMessage.emit(addNewMessage);
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }
  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }
}
