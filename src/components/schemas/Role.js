/**
 * Role model
 */
 class Role {
    static Student = new Role("student")
    static Landlord = new Role("landlord")
    static Team = new Role("team")
    static Admin = new Role("admin")

    constructor(data = {}) {
      this.role = null;
      Object.assign(this, data);
    }
  }
  export default Role;