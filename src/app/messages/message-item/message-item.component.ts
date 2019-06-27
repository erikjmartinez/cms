import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Contact } from 'src/app/contacts/contact.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})


export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string = '';
  canEdit: boolean = false;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    // this.contactService.getContact(this.message.sender)
    console.log(this.message);
    let contact: Contact = this.contactService.getContact(this.message.sender);
    if (contact) {
      this.messageSender = contact.name;
    } else
    {
      this.messageSender = 'Contact Name Not Available';
    }
  }
}
