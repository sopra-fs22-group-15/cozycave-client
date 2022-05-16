/**
 * Address model
 */
 class Address {
    constructor(data = {}) {
      this.house_number = null;
      this.street = null;
      this.city = null;
      this.zip_code = null;
      this.country = null;
      this.name = null;
      this.apartment_number = null;
      this.state = null;
      Object.assign(this, data);
    }
  }
  export default Address;