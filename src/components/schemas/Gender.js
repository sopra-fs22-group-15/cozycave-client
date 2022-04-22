/**
 * Gender model
 *
 */
class Gender {
    
    constructor(data = {}) {
        this.gender = null;
        Object.assign(this, data);
    }
}
export default Gender;