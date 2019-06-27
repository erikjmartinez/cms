import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS'
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [];
  private maxContactId: number;
  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();

  constructor(private http: HttpClient) {
    //this.contacts = MOCKCONTACTS;
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

  storeContacts(contacts: Contact[]) {
    let json = JSON.stringify(contacts);
    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    //header.set('Content-Type', 'application/json');
    this.http.put('https://cmsapp-b29f9.firebaseio.com/contacts.json', json, { headers: header })
      .subscribe((response: Response) => {
        this.contactListChangedEvent.next(contacts.slice());
      });
  }

  getContacts() {
    this.http.get<Contact[]>('https://cmsapp-b29f9.firebaseio.com/contacts.json')
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
    //return this.contacts.slice();
  }

  getContact(id: number): Contact {
    console.log(this.contacts);

    if (this.contacts.length > 0) {
      for (let contact of this.contacts) {
        if (contact.contactId === id) {
          return contact;
        }
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
    this.storeContacts(contactListClone);
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    let pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    newContact.contactId = originalContact.contactId;
    this.contacts[pos] = newContact;
    
    let contactListClone = this.contacts.slice();
    this.storeContacts(contactListClone);
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

    let contactListClone = this.contacts.slice();
    this.storeContacts(contactListClone);
  }
}
