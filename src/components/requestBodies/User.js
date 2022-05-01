import UUID from "../schemas/UUID";
import Date from "../schemas/Date";
import Role from "../schemas/Role";
import Token from "../schemas/Token";
import Address from "../schemas/Address";
import Gender from "../schemas/Gender";
import Group from '../schemas/Group';

/**
 * User model
 */

 class User {
    constructor(data = {firstname, lastname, email, address, gender, details}) {
      this.UUID = new UUID();
      this.creation_date = new Date();
      this.firstname = firstname;
      this.lastname = lastname;
      this.email = email;
      this.password_hashed = null; 
      this.role = new Role();
      this.token = new Token();
      this.address = new Address();
      this.gender = gender;
      this.details = details;
      this.group = new Group();
      Object.assign(this, data);
    }
  }
  export default User;