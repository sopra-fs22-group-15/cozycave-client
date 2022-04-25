import UUID from "./UUID";
import Date from "./Date";
import Address from "./Address";
import ListingType from "./ListingType";
import Gender from "./Gender";

/**
 * Listing model
 */
 class Listing {
    constructor(data = {}) {
        this.uuid = new UUID();
        this.creation_date = new Date();
        this.name = null;
        this.description = null;
        this.address = new Address();
        this.published = null; //boolean
        this.pictures = new Array();
        this.sqm = null;
        this.type = new ListingType();
        this.furnished = null;
        this.availableTo = new Array();
        this.available = null; //boolean
        this.rent = null;
        this.deposit = null;
        this.rooms = null;
      Object.assign(this, data);
    }
  }
  export default Listing;