export default class MMODAToolService {

    static base_instruments = ["isgri", "jemx", "polar", "antares", "gw", "spi_acs", "legacysurvey", "cta", "grb_detections", "hess", "icecube", "karabo_dirty_image_sim", "sqwb"];

    static baseURL = 'https://www.astro.unige.ch/mmoda';
    static listEndPoint = '/dispatch-data'
    static descriptionEndPoint = "/api/meta-data";

    static instrument_param = "instrument="

    async fetchToolsList() {
        //const response = await fetch(MMODAToolService.baseURL+MMODAToolService.listEndPoint);
        const response = "";

        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }
        return await response.json();
    }

    async fetchToolDescription(instrument_name) {

        const url = MMODAToolService.getToolDescriptionUrl(instrument_name)
        //const url = "";

        const response = await fetch(url);
        console.log("URL description:", url);
        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }
        return await response.json();
    }

    static getToolDescriptionUrl(instrument_name) {

        if (instrument_name && MMODAToolService.base_instruments.includes(instrument_name)) {
            return MMODAToolService.baseURL+MMODAToolService.listEndPoint+MMODAToolService.descriptionEndPoint + "?" + MMODAToolService.instrument_param + instrument_name;
        } else {
            throw new Error('Instrument name empty or not found');
        }
    }
}