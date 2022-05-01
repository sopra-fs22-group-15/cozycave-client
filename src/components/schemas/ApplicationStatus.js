
/**
 * ApplicationStatus model for Application
 */
class ApplicationStatus {
    static Pending = new ApplicationStatus("pending")
    static Approved = new ApplicationStatus("approved")
    static Denied = new ApplicationStatus("denied")
    constructor(status) {
      Object.assign(this, status);
    }
  }
  export default ApplicationStatus;