import { Contact } from './contact.model';

export const MOCKCONTACTS: Contact[] = [
  // individual contacts
  // index 0
  {
    contactId: 1,
    name: 'Rex Barzee',
    email: 'barzeer@byui.edu',
    phoneNumber: '208-496-3768',
    imageURL: '../../assets/images/barzeer.jpg',
    group: null
  },
  // index 1
  {
    contactId: 2,
    name: 'Bradley Armstrong',
    email: 'armstrongb@byui.edu',
    phoneNumber: '208-496-3766',
    imageURL: '../../assets/images/armstrongb.jpg',
    group: null
  },
  // index 2
  {
    contactId: 3,
    name: 'Lee Barney',
    email: 'barneyl@byui.edu',
    phoneNumber: '208-496-3767',
    imageURL: '../../assets/images/barneyl.jpg',
    group: null
  },
  // index 3
  {
    contactId: 5,
    name: 'Kory Godfrey',
    email: 'godfreyko@byui.edu',
    phoneNumber: '208-496-3770',
    imageURL: '../../assets/images/godfreyko.jpg',
    group: null
  },
  // index 4
  {
    contactId: 7,
    name: 'R. Kent Jackson',
    email: 'jacksonk@byui.edu',
    phoneNumber: '208-496-3771',
    imageURL: '../../assets/images/jacksonk.jpg',
    group: null
  },
  // index 5
  {
    contactId: 8,
    name: 'Craig Lindstrom',
    email: 'lindstromc@byui.edu',
    phoneNumber: '208-496-3769',
    imageURL: '../../assets/images/lindstromc.jpg',
    group: null
  },
  // index 6
  {
    contactId: 9,
    name: 'Michael McLaughlin',
    email: 'mclaughlinm@byui.edu',
    phoneNumber: '208-496-3772',
    imageURL: '../../assets/images/mclaughlinm.jpg',
    group: null
  },
  // index 7
  {
    contactId: 11,
    name: 'Brent Morring',
    email: 'morringb@byui.edu',
    phoneNumber: '208-496-3778',
    imageURL: '../../assets/images/morringb.jpg',
    group: null
  },
  // index 8
  {
    contactId: 12,
    name: 'Mark Olaveson',
    email: 'olavesonm@byui.edu',
    phoneNumber: '208-496-3773',
    imageURL: '../../assets/images/olavesonm.jpg',
    group: null
  },
  // index 9
  {
    contactId: 13,
    name: 'Steven Rigby',
    email: 'rigbys@byui.edu',
    phoneNumber: '208-496-3774',
    imageURL: '../../assets/images/rigbys.jpg',
    group: null
  },
  // index 10
  {
    contactId: 15,
    name: 'Blaine Robertson',
    email: 'robertsonb@byui.edu',
    phoneNumber: '208-496-3775',
    imageURL: '../../assets/images/robertsonb.jpg',
    group: null
  },
  // index 11
  {
    contactId: 16,
    name: 'Randy Somsen',
    email: 'somsenr@byui.edu',
    phoneNumber: '208-496-3776',
    imageURL: '../../assets/images/somsenr.jpg',
    group: null
  },
  // index 12
  {
    contactId: 17,
    name: 'Shane Thompson',
    email: 'thompsonda@byui.edu',
    phoneNumber: '208-496-3776',
    imageURL: '../../assets/images/thompsonda.jpg',
    group: null
  },

  // teams
  // index 13
  {
    contactId: 4, name: 'Network/OS team', email: ' ', phoneNumber: ' ', imageURL: ' ', group: [
      {
        contactId: 2,
        name: 'Bradley Armstrong',
        email: 'armstrongb@byui.edu',
        phoneNumber: '208-496-3766',
        imageURL: '../../assets/images/armstrongb.jpg',
        group: null
      },
      {
        contactId: 12,
        name: 'Mark Olaveson',
        email: 'olavesonm@byui.edu',
        phoneNumber: '208-496-3773',
        imageURL: '../../assets/images/olavesonm.jpg',
        group: null
      },
      {
        contactId: 13,
        name: 'Steven Rigby',
        email: 'rigbys@byui.edu',
        phoneNumber: '208-496-3774',
        imageURL: '../../assets/images/rigbys.jpg',
        group: null
      }
    ]
  },

  // index 14
  {
    contactId: 6, name: 'Software Development team', email: ' ', phoneNumber: ' ', imageURL: ' ', group: [
      {
        contactId: 1,
        name: 'Rex Barzee',
        email: 'barzeer@byui.edu',
        phoneNumber: '208-496-3768',
        imageURL: '../../assets/images/barzeer.jpg',
        group: null
      },
      {
        contactId: 3,
        name: 'Lee Barney',
        email: 'barneyl@byui.edu',
        phoneNumber: '208-496-3767',
        imageURL: '../../assets/images/barneyl.jpg',
        group: null
      },
      {
        contactId: 7,
        name: 'R. Kent Jackson',
        email: 'jacksonk@byui.edu',
        phoneNumber: '208-496-3771',
        imageURL: '../../assets/images/jacksonk.jpg',
        group: null
      },
      {
        contactId: 12,
        name: 'Mark Olaveson',
        email: 'olavesonm@byui.edu',
        phoneNumber: '208-496-3773',
        imageURL: '../../assets/images/olavesonm.jpg',
        group: null
      }
    ]
  },

  // index 15
  {
    contactId: 10, name: 'Web Development team', email: ' ', phoneNumber: ' ', imageURL: ' ', group: [
      {
        contactId: 15,
        name: 'Blaine Robertson',
        email: 'robertsonb@byui.edu',
        phoneNumber: '208-496-3775',
        imageURL: '../../assets/images/robertsonb.jpg',
        group: null
      },
      {
        contactId: 16,
        name: 'Randy Somsen',
        email: 'somsenr@byui.edu',
        phoneNumber: '208-496-3776',
        imageURL: '../../assets/images/somsenr.jpg',
        group: null
      },
      {
        contactId: 17,
        name: 'Shane Thompson',
        email: 'thompsonda@byui.edu',
        phoneNumber: '208-496-3776',
        imageURL: '../../assets/images/thompsonda.jpg',
        group: null
      }
    ]
  },

  // index 16
  {
    contactId: 14, name: 'Database team', email: ' ', phoneNumber: ' ', imageURL: ' ', group: [
      {
        contactId: 7,
        name: 'R. Kent Jackson',
        email: 'jacksonk@byui.edu',
        phoneNumber: '208-496-3771',
        imageURL: '../../assets/images/jacksonk.jpg',
        group: null
      },
      {
        contactId: 9,
        name: 'Michael McLaughlin',
        email: 'mclaughlinm@byui.edu',
        phoneNumber: '208-496-3772',
        imageURL: '../../assets/images/mclaughlinm.jpg',
        group: null
      },
      {
        contactId: 11,
        name: 'Brent Morring',
        email: 'morringb@byui.edu',
        phoneNumber: '208-496-3778',
        imageURL: '../../assets/images/morringb.jpg',
        group: null
      }
    ]
  },

  // index 17
  {
    contactId: 18, name: 'Computer Security team', email: ' ', phoneNumber: ' ', imageURL: ' ', group: [
      {
        contactId: 5,
        name: 'Kory Godfrey',
        email: 'godfreyko@byui.edu',
        phoneNumber: '208-496-3770',
        imageURL: '../../assets/images/godfreyko.jpg',
        group: null
      },
      {
        contactId: 8,
        name: 'Craig Lindstrom',
        email: 'lindstromc@byui.edu',
        phoneNumber: '208-496-3769',
        imageURL: '../../assets/images/lindstromc.jpg',
        group: null
      },
      {
        contactId: 13,
        name: 'Steven Rigby',
        email: 'rigbys@byui.edu',
        phoneNumber: '208-496-3774',
        imageURL: '../../assets/images/rigbys.jpg',
        group: null
      }
    ]
  }
];
