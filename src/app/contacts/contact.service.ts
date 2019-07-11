import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
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

  sortAndSend() {
    this.contacts.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  // storeContacts(contacts: Contact[]) {
  //   let json = JSON.stringify(contacts);
  //   let header = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   this.http.put('http://localhost:3000/contacts', json, { headers: header })
  //     .subscribe((response: Response) => {
  //       this.contactListChangedEvent.next(contacts.slice());
  //     });
  // }

  getContacts(): Contact[] {
    this.http.get<{ message: string, contacts: Contact[] }>('http://localhost:3000/contacts')
      .subscribe(
        (contactData) => {
          this.contacts = contactData.contacts;
          this.maxContactId = this.getMaxId();
          this.contacts.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
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
    if (!newContact) {
      return;
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    newContact.contactId = 0;
    const strContact = JSON.stringify(newContact);

    this.http.post<{ message: String, contact: Contact }>('http://localhost:3000/contacts'
      , strContact
      , { headers: headers })
      .subscribe(
        (responseData) => {
          this.contacts.push(responseData.contact);
          this.sortAndSend();
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      );
  }

  // WORKS
  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    newContact.contactId = originalContact.contactId;
    //const strContact = JSON.stringify(newContact);

    this.http.put('http://localhost:3000/contacts/' + originalContact.contactId
      , newContact
      , { headers: headers })
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          this.contactListChangedEvent.next(this.contacts.slice());
        });
  }


  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex(c => c.contactId === contact.contactId);

    if (pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/contacts/' + contact.contactId)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }
}
