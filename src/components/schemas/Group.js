import UUID from "./UUID";
import Date from "./Date";
import User from "./User";
import GroupApplication from './GroupApplication'
/**
 * Group model
 *
 */
 class Group {
    constructor(data = {}) {
        this.uuid = new UUID();
        this.creation_date = new Date();
        this.members = new Array();
        this.applications = new Array();
        Object.assign(this, data);
    }
}
export default Group;