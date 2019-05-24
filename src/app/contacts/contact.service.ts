import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS'
import { from, concat } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contacts: Contact[] = [];

  constructor() {
    this.contacts = MOCKCONTACTS;
  }
  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: number): Contact {
    for (let i = 0; i < Contact.length; i++) {
      if (this.contacts[i].contactId === id) {
        return this.contacts[i];
      }
    }
    return null;
  }
}
