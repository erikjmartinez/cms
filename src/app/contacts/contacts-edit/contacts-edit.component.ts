import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cms-contacts-edit',
  templateUrl: './contacts-edit.component.html',
  styleUrls: ['./contacts-edit.component.css']
})
export class ContactsEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact = null;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  hasGroup: boolean = false;
  invalidGroupContact: boolean = false;
  contactId: number;

  constructor(private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.contactId = +params['id'];

        if (!this.contactId) {
          this.editMode = false;
          return;
        }

        this.originalContact = this.contactService.getContact(this.contactId);

        // let contact = this.contactService.getContact(id);
        if (!this.originalContact) {
          return;
        }

        //this.originalContact = contact;
        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));

        if (this.originalContact.group) {
          this.groupContacts = this.originalContact.group.slice();
        }
      });
  }

  onSubmit(form: NgForm) {
    let contact = new Contact(
      0,
      form.value.name,
      form.value.email,
      form.value.phoneNumber,
      form.value.imageURL,
      this.groupContacts
    );
    if (this.editMode === true) {
      this.contactService.updateContact(this.originalContact, contact);
    } else {
      this.contactService.addContact(contact);
    }

    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }








  
  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      return true;
    }

    if (newContact.contactId === this.contact.contactId) {
      return true;
    }

    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.contactId === this.groupContacts[i].contactId) {
        return true;
      }
    }

    return false;
  }

  addToGroup($event: any) {
    let selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if (this.invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
  }

  onRemoveItem(idx: number) {
    if (idx < 0 || idx > this.groupContacts.length) {
      return;
    }

    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }
}
