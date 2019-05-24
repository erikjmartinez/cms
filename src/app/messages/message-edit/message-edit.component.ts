import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';
import { MessagesService } from '../messages.service';

//import { MessageListComponent } from '../message-list/message-list.component';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  currentSender: 2;
  @ViewChild('subject') subjectRef: ElementRef;
  @ViewChild('msgText') msgTextRef: ElementRef;
  //@ViewChild('msgSender') msgSender: ElementRef;
  //@Output() newMessage = new EventEmitter<Message>();

  constructor(private messageService: MessagesService) { }

  ngOnInit() {
  }

  onSendMessage() {
    const subjectContent = this.subjectRef.nativeElement.value;
    const textContent = this.msgTextRef.nativeElement.value;
    //const currentSender = this.msgSender.nativeElement.value;
    const addNewMessage = new Message(1, subjectContent, textContent, this.currentSender);
    this.messageService.addMessage(addNewMessage);

    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }

  onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }
}
