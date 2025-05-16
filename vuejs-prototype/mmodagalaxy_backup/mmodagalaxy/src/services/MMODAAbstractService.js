export default class MMODAAbstractService {

    static baseURL = 'https://www.astro.unige.ch/mmoda';

    constructor() {
        if (new.target === MMODAAbstractService) {
            throw new TypeError("MMODAAbstractService is abstract");
        }
    }

}