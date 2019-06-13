import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  //contactChangedEvent = new EventEmitter<Contact[]>();

  contacts: Contact[] = [];
  maxContactId: number;
  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();


  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getMaxId(): number {
    let maxId = 0;
    for (let i = 0; i < this.contacts.length; i++) {
      let currentId = +this.contacts[i].contactId;
      if (currentId < maxId) {
        maxId = currentId
      }
    }
    return maxId;
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

  addContact(newContact: Contact) {
    if (newContact === null) {
      return;
    }
    this.maxContactId++;
    newContact.contactId = this.maxContactId;

    this.contacts.push(newContact);
    let contactListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (originalContact === null || originalContact === undefined
      || newContact === null || newContact === undefined) {
      return;
    }

    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.contactId = originalContact.contactId;
    this.contacts[pos] = newContact;
    let contactListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);
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
    //this.contactListChangedEvent.next(this.contacts.slice());

    let contactListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactListClone);
  }
}
