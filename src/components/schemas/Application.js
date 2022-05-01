import UUID from "./UUID";
import Date from "./Date";
import User from "./User";
import Listing from "./Listing";
import ApplicationStatus from "./ApplicationStatus";
//linked groupApp
/**
 * Application model for when users apply to a listing
 */
class Application {
    constructor(data = {}) {
      this.uuid = new UUID();
      this.creation_date = new Date(); 
      this.user = new User();
      this.listing = new Listing();
      this.applicationStatus = new ApplicationStatus();
      //linked groupApplication
      Object.assign(this, data);
    }
  }
  export default Application;