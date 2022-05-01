/**
 * Gender model
 *
 */
class Gender {
    static Male = new Gender("Male")
    static Female = new Gender("Female")
    static Other = new Gender("Other")
    constructor(gender) {
        Object.assign(this, gender);
    }
}
export default Gender;