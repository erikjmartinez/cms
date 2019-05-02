export class Contacts {
    public contactId: number;
    public name: string;
    public email: string;
    public phoneNumber: string;
    public imageURL: string;
    public group: string;

    constructor(contactId: number,
        name: string,
        email: string,
        phoneNumber: string,
        imageURL: string,
        group: string) {
        this.contactId = contactId;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.imageURL = imageURL;
        this.group = group;
    }
}