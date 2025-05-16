const BASE_URL = 'https://www.astro.unige.ch/mmoda';
const DISPATCHER_ENDPOINT = "/dispatch-data";

const RESOLVE_ENDPOINT = "/get_astro_entity_info_by_source_name"

import resolve_data from "@/data/resolve_data.json"

export default {

    async resolveObject(object_name, formId) {
        const payload = `src_name=${object_name}&form_build_id=${formId}&form_id=mmoda_name_resolve&_triggering_element_name=resolve_name&_triggering_element_value=Resolve&ajax_html_ids%5B%5D=skip-link&ajax_html_ids%5B%5D=navbar`;

        const formData = new FormData();
        payload.split("&").forEach(pair => {
            const [key, value] = pair.split("=");
            formData.append(decodeURIComponent(key), decodeURIComponent(value || ""));
        });

        return resolve_data;

        /*
        try {
            const response = await fetch("https://www.astro.unige.ch/mmoda/system/ajax", {
                method: "POST",
                body: formData,
            });

            console.log(response);

            if (!response.ok) {
                throw new Error(`${response.status}`);
            }

            console.log(response.type);

            const data = await response.json();
            console.log("Response:", data);
            return data;
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
        */
    }
}