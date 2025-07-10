export default class User {

    session_id = null;
    token = null;

    constructor() {

    }


    get session_id() {
        return this.session_id;
    }

    set session_id(value) {
        this.session_id = value;
    }

    get token() {
        return this.token;
    }

    set token(value) {
        this.token = value;
    }
}