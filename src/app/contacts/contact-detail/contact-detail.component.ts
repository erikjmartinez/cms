import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { from } from 'rxjs';
@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  @Input() contact: Contact;
  // = new Contact(
  //     1, 'Bro. Jackson', 'jacksonk@byui.edu', '208-496-3771', 'https://web.byui.edu/Directory/Employee/jacksonk.jpg', null
  //   );

  constructor() { }

  ngOnInit() {
  }

}
