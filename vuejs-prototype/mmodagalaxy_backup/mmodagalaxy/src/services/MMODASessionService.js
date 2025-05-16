import MMODAAbstractService from "@/services/MMODAAbstractService.js";
import store from '@/stores'

export default class MMODAJobService extends MMODAAbstractService {



    constructor() {
        super();


    }

    static getToken() {
        let url = "https://www.astro.unige.ch/mmoda/get_token"
    }

}