import { Component, OnInit, EventEmitter, Output, Inject, Injectable } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { from } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {
  //@Output() contactWasSelected = new EventEmitter<Contact>();
  contacts: Contact[];

  constructor(private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.contactService.contactChangedEvent
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
        }
      )
  }

  // onContactSelected(contact: Contact) {
  //   this.contactService.contactSelectedEvent.emit(contact);
  // }

}
