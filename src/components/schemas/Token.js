/**
 * Token model
 */
 class Token {
    constructor(data = {}) {
      this.token = null;
      Object.assign(this, data);
    }
  }
  export default Token;