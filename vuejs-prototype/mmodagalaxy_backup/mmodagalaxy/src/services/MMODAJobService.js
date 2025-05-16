import MMODAAbstractService from "@/services/MMODAAbstractService.js";
import MMODAJob from "@/models/MMODAJob.js";
import store from '@/stores'

export default class MMODAJobService extends MMODAAbstractService {

    static endpoint_route = "/dispatch-data/run_analysis";

    static run_job_endpoint_url = MMODAAbstractService.baseURL + MMODAJobService.endpoint_route;

    static job_id = 0;
    static jobs = [];

    static STATUS = Object.freeze({
        STARTING: 'starting',
        INPROGRESS: 'in-progress',
        DONE: 'done',
        FAILED: 'failed'
    })

    static QUERY_STATUS = Object.freeze({
        NEW: 'new',
        INPROGRESS: 'in-progress',
        DONE: 'done',
        FAILED: 'failed'
    })

    static SESSION_STATUS = Object.freeze({
        NEW: 'new',
    })

    tool_name = null;
    query_parameters = null;
    job = null;

    constructor(tool_name, query_parameters) {
        super();

        this.tool_name = tool_name;
        this.query_parameters = query_parameters;

        this.job = new MMODAJob(++MMODAJobService.job_id, this.query_parameters);

        MMODAJobService.jobs.push(this.job);
        MMODAJobService.addJob(this.job.internal_id, this.query_parameters);
    }

    static addJob(internal_id, parameters) {
        store.dispatch('jobs/addJob', { internal_id, parameters })
    }

    static getJobById(id) {
        return store.getters['jobs/getJobById'](id)
    }

    static removeJob(id) {
        store.dispatch('jobs/removeJob', id)
    }

    static getAllJobs() {
        return store.getters['jobs/allJobs']
    }

    async runJob() {

        //const formData = new FormData();
        //formData.append("", "");

        console.log("JobService")

        const job_run_result = {};

        const form_data = this.createFormData();

        console.log("form data");
        console.log(form_data);

        try {

            console.log(MMODAJobService.run_job_endpoint_url);

            const response = await fetch(MMODAJobService.run_job_endpoint_url, {
                method: 'POST',
                body: form_data,
                headers: {
                    Accept: 'application/json'
                }
            });

            console.log("Fetch response:", response.status, response.statusText);

            console.log(response);

            const raw = await response.text();
            console.log("Body", raw);

            let result = null;
            let json = null;
            try {
                result = JSON.parse(raw);
                console.log("Raw parse", result);
                console.log(result.job_monitor);
            } catch (e) {
                console.warn("Parsing error", e);
            }

            if (result) {
                job_run_result.job_id = result.job_monitor?.job_id || null;
                job_run_result.session_id = result.job_monitor?.session_id || null;
                job_run_result.job_status = result.job_monitor?.status || null;

                job_run_result.raw_result = result;
            }

            return job_run_result;

        } catch (error) {
            console.error("Error running job:", error);
            throw error;
        }

    }

    async getJobStatus() {

    }

    runJobMockUp() {
        return this.job.internal_id;
    }

    createFormData() {

        console.log("CreateFormData");

        const formData = new FormData();

        try {
            for (const [key, value] of Object.entries(this.query_parameters || {})) {
                if (value !== "" && value !== null && value !== undefined) {
                    formData.append(key, String(value));
                }
            }

            formData.append("instrument", this.tool_name || "");
            formData.append("query_status", MMODAJobService.QUERY_STATUS.NEW);
            formData.append("session_id", MMODAJobService.SESSION_STATUS.NEW);
            formData.append("job_id", "");
            formData.append("src_name", "1E 1740.7-2942");
            formData.append("RA", "265.97845833");
            formData.append("DEC", "-29.74516667");
            formData.append("T1", "2017-03-06T13:26:48.000");
            formData.append("T2", "2017-03-06T15:32:27.000");
            formData.append("T_format", "isot");
            formData.append("query_type", "dummy");

            console.log("FormData values");
            for (const [key, val] of formData.entries()) {
                console.log(`${key}: '${val}'`);
            }

        } catch (e) {
            console.error("CreateFormData error", e);
            throw e;
        }

        return formData;
    }

    getRunStatus(status) {
        switch (status) {
            case "starting":
                return MMODAJobService.STATUS.INPROGRESS;
            case "in-progress":
                return MMODAJobService.STATUS.DONE;
            case "failed":
                return MMODAJobService.STATUS.FAILED;
            case "done":
                return MMODAJobService.STATUS.DONE;
            default:
                return "";
        }
    }

    getJob() {
        return store.getters['jobs/getJobById'](this.job.internal_id)
    }

    removeJob() {
        store.dispatch('jobs/removeJob', this.job.internal_id)
    }

}