export default class User {

    session_id = null;
    access_token = null;
    exp_time = null;
    id_token = null;


    constructor() { }

    get session_id() {
        return this.session_id;
    }
    set session_id(value) {
        this.session_id = value;
    }

    get access_token() {
        return this.access_token;
    }
    set access_token(value) {
        this.access_token = value;
    }

    get exp_time() {
        return this.exp_time;
    }
    set exp_time(value) {
        this.exp_time = value;
    }

    get id_token() {
        return this.id_token;
    }
    set id_token(value) {
        this.id_token = value;
    }

    get access_token() {
        return this.access_token;
    }
    set access_token(value) {
        this.access_token = value;
    }
}