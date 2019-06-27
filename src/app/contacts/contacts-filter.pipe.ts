import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): Contact[] {
    if (!contacts || !term) {
      return contacts;
    }

    term = term.trim().toLowerCase();

    let filteredArray = contacts.filter((contact: Contact) => {
      return contact.name.toLowerCase().includes(term);
    });

    if (!filteredArray.length) {
      return null;
    }

    return filteredArray;
  }

}
