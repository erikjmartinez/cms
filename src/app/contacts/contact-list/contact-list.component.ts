import { Component, OnInit } from '@angular/core';
import { Contacts } from '../contacts.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contacts[] = [
    new Contacts(1, 'test contact', 'test@gamil.com', 18880001111, 'https://images.idgesg.net/images/article/2017/09/ios-contacts-icon-100735815-large.jpg', 'test group')
  ];
  constructor() { }

  ngOnInit() {
  }

}
