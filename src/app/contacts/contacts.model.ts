export class Contacts {
    public contactId: number;
    public name: string;
    public email: string;
    public phoneNumber: number;
    public imageURL: string;
    public group: string;

    constructor(contactId: number,
        name: string,
        email: string,
        phoneNumber: number,
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