export default {
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