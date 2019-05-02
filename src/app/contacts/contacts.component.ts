import { Component, OnInit } from '@angular/core';
import { Contacts } from './contacts.model';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  // contacts: Contacts[] = [
  //   new Contacts(1, 'test contact', 'test@gamil.com', 18880001111, 'http://testiamge.com', 'test group')
  // ];

  constructor() { }

  ngOnInit() {
  }

}
