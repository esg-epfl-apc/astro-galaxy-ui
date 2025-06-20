<template>
  <div class="progress-bar-wrapper">
    <div
        class="progress-bar"
        :class="[statusColor, { animated: isRunning }]"
    >
      <span class="status-label">{{ statusLabel }}</span>
    </div>
  </div>
  <div class="info-wrapper">
    <span id="span-running-tool"><strong>Running tool:</strong> {{ toolDescription.name || '{}' }}</span>
    <span id="span-session-id"><strong>Session Id:</strong> {{ this.session_id || '' }}</span>
    <span id="span-job-id"><strong>Job Id:</strong> {{ this.job_id || '' }}</span><br>
    <span id="span-parameters"><strong>Query parameters:</strong> {{ queryParameters || '{}' }}</span>
  </div>
</template>

<script>

import MMODAJobService from '@/services/MMODAJobService.js'

export default {
  name: "ProgressStatusBar",
  data() {
    return {
      status: "starting",
      interval: null,
      jobService: null,
      job_id: null,
      session_id: null,
      job_status: null,
    };
  },
  props: {
    queryParameters: {
      type: Object,
      required: false,
      default: () => ({})
    },
    toolDescription: {
      type: Object,
      required: false,
      default: () => ({})
    },
    sessionId : {
      type: String,
      required: false
    }
  },
  computed: {
    statusColor() {
      switch (this.status) {
        case "starting":
          return "status-starting";
        case "in-progress":
          return "status-progress";
        case "failed":
          return "status-failed";
        case "done":
          return "status-done";
        default:
          return "";
      }
    },
    statusLabel() {
      return this.status.replace("-", " ");
    },
    isRunning() {
      return this.status === "starting" || this.status === "in-progress";
    },
  },
  methods: {
    async pollStatus() {
      const result = "starting"

      if (result !== this.status) {
        this.status = result;
        if (result === "done" || result === "failed") {
          clearInterval(this.interval);
        }
      }
    },
    async initJob() {

      console.log("initJob");

      try {
        const init_job_object = await this.jobService.runJob();

        this.job_id = init_job_object.job_id;
        this.session_id = init_job_object.session_id;
        this.job_status = init_job_object.job_status;

        console.log("Init job");
        console.log(this.job_id);
        console.log(this.session_id);
        console.log(this.job_status);

        this.status = this.job_status;

      } catch (error) {
        console.error("Error initializing job", error);
      }
    }
  },
  created() {

    console.log(this.queryParameters);

    this.jobService = new MMODAJobService(this.toolDescription.name, this.queryParameters);
    this.status = 'starting';
    //this.job_id = this.jobService.runJob();
    this.initJob();
  },
  mounted() {
    this.pollStatus();
    //this.interval = setInterval(this.pollStatus, 2000);
  },
  beforeUnmount() {
    //clearInterval(this.interval);
  },
};
</script>

<style scoped>
.progress-bar-wrapper {
  width: 100%;
  max-width: 500px;
  margin: auto;
  height: fit-content;
  background: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
}

.progress-bar {
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: background-color 0.5s ease;
}

.status-starting {
  background-color: #007bff;
}

.status-progress {
  background-color: #ffc107;
}

.status-failed {
  background-color: #dc3545;
}

.status-done {
  background-color: #28a745;
}

.animated {
  background-size: 200% 100%;
  background-image: linear-gradient(
      270deg,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.1)
  );
  animation: shimmer 1.2s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.status-label {
  z-index: 2;
  position: relative;
}

#span-running-tool {
  display: block;
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  color: #333;
}

#span-session-id {
  display: inline-block;
  margin-right: 20px;
  font-size: 14px;
  color: #444;
}

#span-job-id {
  display: inline-block;
  font-size: 14px;
  color: #444;
}

#span-parameters {
  display: block;
  margin-top: 8px;
  font-size: 14px;
  color: #555;
  white-space: pre-wrap;
  word-break: break-word;
}

</style>
