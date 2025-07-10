export default {
    async fetchTools() {

        let url = "/api/tools?key=92e15f94da0d7b119590f056a77b563e";

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    },
    async fetchToolHydrated(tool_id, history_id) {

        let url = "/api/tools/"+tool_id+"/build?history_id="+history_id+"&version=latest&key=92e15f94da0d7b119590f056a77b563e&tool_version=latest";

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    },
    async runTool(tool_id, tool_version, history_id, inputs) {

        let payload = {};

        //payload.key = "92e15f94da0d7b119590f056a77b563e"
        payload.tool_id = tool_id;
        payload.tool_version = tool_version;
        payload.history_id = history_id;
        payload.inputs = inputs;

        fetch("/api/tools?key=92e15f94da0d7b119590f056a77b563e", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("API Response:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });

    },
    async uploadFile() {
        const payload = {
            history_id: "f597429621d6eb2b",
            targets: [
                {
                    destination: { type: "hdas" },
                    elements: [
                        {
                            src: "url",
                            url: "https://www.aaaaa.com",
                            dbkey: "?",
                            ext: "auto",
                            name: null,
                            space_to_tab: false,
                            to_posix_lines: true,
                            deferred: false,
                        },
                    ],
                },
            ],
            auto_decompress: true,
            files: [],
        };

        const formData = new FormData();

        formData.append("history_id", payload.history_id);
        formData.append("auto_decompress", payload.auto_decompress);
        formData.append("targets", JSON.stringify(payload.targets));

        payload.files.forEach((file, index) => {
            formData.append(`files[${index}]`, file);
        });

        fetch("/api/tools/fetch?key=92e15f94da0d7b119590f056a77b563e", {
            method: "POST",
            body: formData,
            headers: {
                Authorization: "Bearer 92e15f94da0d7b119590f056a77b563e",
            },
        })
            .then((response) => response.json())
            .then((data) => console.log("Success:", data))
            .catch((error) => console.error("Error:", error));
    }
};