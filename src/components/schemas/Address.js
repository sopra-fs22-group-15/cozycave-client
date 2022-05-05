/**
 * Address model
 */
 class Address {
    constructor(data = {}) {
      this.houseNr = null;
      this.streetName = null;
      this.city = null;
      this.zip_code = null;
      this.country = null;
      Object.assign(this, data);
    }
  }
  export default Address;