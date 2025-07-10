export default {
    async fetchGallery(object_name, formId) {
        const payload = `src_name=${object_name}&form_build_id=${formId}&form_id=mmoda_name_resolve&_triggering_element_name=explore_name&_triggering_element_value=Explore&ajax_html_ids%5B%5D=skip-link&ajax_html_ids%5B%5D=navbar`;

        console.log("payload");
        console.log(payload);

        const formData = new FormData();
        payload.split("&").forEach(pair => {
            const [key, value] = pair.split("=");
            formData.append(decodeURIComponent(key), decodeURIComponent(value || ""));
        });

        try {
            const response = await fetch("https://www.astro.unige.ch/mmoda/system/ajax", {
                method: "POST",
                body: formData,
            });

            console.log(response);

            if (!response.ok) {
                throw new Error(`${response.status}`);
            }

            const data = await response.json();
            console.log("Response:", data);
            return data;
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }
}