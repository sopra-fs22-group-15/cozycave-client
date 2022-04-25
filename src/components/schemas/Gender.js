/**
 * Gender model
 *
 */
class Gender {
    static Male = new Gender("Male")
    static Female = new Gender("Female")
    static Other = new Gender("Other")
    constructor(data = {}) {
        this.gender = null;
        Object.assign(this, data);
    }
}
export default Gender;