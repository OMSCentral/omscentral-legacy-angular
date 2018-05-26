export class User {
  admin: boolean;
  reviews: any;
  email: string;
  emailVerified: boolean;
  uid: string;
  photoUrl: string;
  isAnonymous: string;
  constructor(basic: User) {
    this.admin = false;
    this.reviews = {};
    this.email = basic.email;
    this.emailVerified = basic.emailVerified;
    this.uid = basic.uid;
    this.photoUrl = basic.photoUrl;
    this.isAnonymous = basic.isAnonymous;
  }

  addDetails(details) {
    this.admin = details.admin === 1 ? true : false;
    this.reviews = details.reviews || {};
  }
}

export class UserDetails {
  admin: boolean;
  reviews: any;

  constructor(details) {
    this.admin = details.admin === 1 ? true : false;
    this.reviews = details.reviews || {};
  }
}

export interface Authenticate {
  username: string;
  password: string;
}