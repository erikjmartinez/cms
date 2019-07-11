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
  contact: Contact;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    console.log(this.message);
    this.contact = this.contactService.getContact(this.message.sender);

    if (this.contact) {
      this.messageSender = this.contact.name;
    } else {
      this.messageSender = 'Contact Name Not Available';
    }
  }
}
