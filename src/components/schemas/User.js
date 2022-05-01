import UUID from "./UUID";
import Date from "./Date";
import Role from "./Role";
import Gender from './Gender';
import Address from './Address';
import Group from './Group';
import Token from "./Token";
/**
 * User model
 */

 class User {
  constructor(data = {}) {
    this.UUID = new UUID();
    this.creation_date = new Date();
    this.firstname = null;
    this.lastname = null;
    this.email = null;
    this.password_hashed = null; 
    this.role = new Role();
    this.token = new Token();
    this.address = new Address();
    this.gender = null;
    this.details = null;
    this.group = new Group();
    Object.assign(this, data);
  }
}
export default User;