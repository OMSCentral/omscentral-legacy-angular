export class User {
  admin: boolean;
  reviews: any;
  constructor(user) {
    this.admin = user.admin || false;
    this.reviews = user.reviews || {};
  }
}
