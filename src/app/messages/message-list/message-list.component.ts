import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(1, "Homework", "About the Angular assignment...", "student"),
    new Message(2, "Test", "About that test...", "another student"),
    new Message(3, "Exam", "About the CIT exam...", "student"),
    new Message(4, "Internship", "About the internship...", "another student")
  ];
  constructor() { }

  ngOnInit() {
  }
  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
