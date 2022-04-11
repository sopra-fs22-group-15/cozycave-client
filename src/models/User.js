/**
 * User model
 */
 class User {
    constructor(data = {}) {
      this.id = null;
      this.firstname = null;
      this.lastname = null;
      this.creation_date = null;
      this.logged_in = null;
      this.address = null;
      this.gender = null;
      Object.assign(this, data);
    }
  }
  export default User;