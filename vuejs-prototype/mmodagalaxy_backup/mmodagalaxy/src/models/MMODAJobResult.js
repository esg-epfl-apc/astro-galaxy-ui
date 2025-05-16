export default class MMODAJobResult {
    constructor(data = {}) {
        this.exit_status = data.exit_status || {
            comment: "",
            debug_message: "",
            error_message: "",
            job_status: "",
            message: "",
            status: null,
            warning: ""
        };

        this.job_monitor = data.job_monitor || {
            full_report_dict_list: [],
            job_id: "",
            session_id: "",
            status: ""
        };

        this.job_status = data.job_status || "";
        this.query_status = data.query_status || "";
        this.session_id = data.session_id || "";
        this.time_request = data.time_request || null;

        this.products = data.products || {
            analysis_parameters: {},
            api_code: "",
            catalog: {},
            download_file_name: "",
            file_name: [],
            image: {},
            input_prod_list: [],
            job_id: "",
            prod_process_message: "",
            session_id: ""
        };
    }

    getJobId() {
        return this.job_monitor?.job_id || this.products?.job_id || null;
    }

    getSessionId() {
        return this.session_id || this.job_monitor?.session_id || null;
    }

    getStatus() {
        return this.job_status;
    }

    isDone() {
        return this.job_status === 'done';
    }

    isFailed() {
        return this.exit_status?.status !== 0;
    }
}
