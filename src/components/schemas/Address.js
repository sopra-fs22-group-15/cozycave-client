/**
 * Address model
 */
 class Address {
    constructor(data = {}) {
      this.houseNr = null;
      this.streetName = null;
      this.city = null;
      this.postcode = null;
      Object.assign(this, data);
    }
  }
  export default Address;