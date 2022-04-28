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
      this.gender = new Gender();
      this.details = null;
      this.group = new Group();
      Object.assign(this, data);
    }
  }
  export default User;