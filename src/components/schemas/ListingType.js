/**
 * ListingType model
 */
 class ListingType {
    static Flat = new ListingType("FLAT")
    static Room = new ListingType("ROOM")

    constructor(type) {
      Object.assign(this, type);
    }
  }
  export default ListingType;