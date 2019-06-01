import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS'

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();

  constructor() {
    this.contacts = MOCKCONTACTS;
  }
  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: number): Contact {
    for (let contact of this.contacts) {
      if (contact.contactId === id) {
        return contact;
      }
    }
    return null;
  }

  deleteContact(contact: Contact) {
    if (contact === null) {
      return;
    }
    const dc = this.contacts.indexOf(contact);
    if (dc < 0) {
      return;
    }
    this.contacts.splice(dc, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }
}
