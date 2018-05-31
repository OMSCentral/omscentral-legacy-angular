export class User {
  name: string;
  email: string;
  emailVerified: boolean;
  uid: string;
  photoUrl: string;
  isAnonymous: string;
  authProvider: string;
  constructor(basic: any) {
    this.name = basic.name;
    this.email = basic.email;
    this.emailVerified = basic.emailVerified;
    this.uid = basic.uid;
    this.photoUrl = basic.photoUrl;
    this.isAnonymous = basic.isAnonymous;
    this.authProvider = basic.authProvider;
  }
}

export class WriteableUser {
  email: string;
  name: string;
  created: Date;
  updated: Date;
  reviews: any;
  anonymous: boolean;
  authProvider: string;
  profileImageUrl: string;
  specialization: number;

  constructor(details: any) {
    this.created = details.created || new Date();
    this.updated = details.updated || new Date();
    this.authProvider = details.authProvider || 'password';
    this.email = details.email || '';
    this.name = details.name || '';
    this.profileImageUrl = (details.profileImageUrl || '').replace(
      /http:/i,
      'https:'
    );
    this.anonymous = details.anonymous || 0;
    this.specialization = details.specialization || 0;
    this.reviews = details.reviews || {};
  }
}

export class UserDetails extends WriteableUser {
  admin: boolean = false;

  constructor(details: any) {
    super(details);
    if (details.admin === 1) {
      this.admin = true;
    }
  }
}

export interface Authenticate {
  name?: string;
  email: string;
  password: string;
}