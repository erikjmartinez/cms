import { Component, OnInit, EventEmitter, Output, Inject, Injectable } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { from, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {
  //@Output() contactWasSelected = new EventEmitter<Contact>();
  contacts: Contact[];
  subscription: Subscription;
  term: string;
  constructor(private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
        }
      )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onKeyPress(value: string) {
    this.term = value;
  }
}
