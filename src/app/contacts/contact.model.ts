export class Contact {

    constructor(
        public contactId: number,
        public name: string,
        public email: string,
        public phoneNumber: string,
        public imageURL: string,
        public group: Contact[]) {

    }
}