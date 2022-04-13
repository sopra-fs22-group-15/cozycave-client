/**
 * Gender model
 * binary true or false
 */
class Gender {
    constructor(data = {}) {
        this.binary = null;
        this.gender = null;
        Object.assign(this, data);
    }
}
export default Gender;