export default {
    async fetchHistories(apiKey) {
        const api_key = "92e15f94da0d7b119590f056a77b563e"
        let url = "/api/histories?key=" + api_key;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            }
            const data = await response.json();

            console.log("Histories");
            console.log(data);

            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    },
    async fetchHistoryContent(history_id) {
        const api_key = "92e15f94da0d7b119590f056a77b563e"
        let url = "/api/histories/"+history_id+"/contents?key=" + api_key;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            }
            const data = await response.json();

            console.log("History Content");
            console.log(data);

            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    },
};
