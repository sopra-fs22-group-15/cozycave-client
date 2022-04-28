/**
 * ListingType model
 */
 class ListingType {
    static Flat = new ListingType("FLAT")
    static Room = new ListingType("ROOM")

    constructor(data = {}) {
      this.type = null;
      Object.assign(this, data);
    }
  }
  export default ListingType;