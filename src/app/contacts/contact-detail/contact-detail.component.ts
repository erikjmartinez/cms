import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { from } from 'rxjs';
@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;
  constructor() { }

  ngOnInit() {
  }

}
