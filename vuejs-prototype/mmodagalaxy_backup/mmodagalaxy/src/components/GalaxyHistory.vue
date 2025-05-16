<template>
  <div class="history-container">
    <h2>Galaxy History</h2>
    <label for="history-select" class="history-label"></label>
    <select id="history-select" v-model="selectedHistoryId" @change="filterContent">
      <option v-for="history in histories" :key="history.id" :value="history.id">
        {{ history.name }}
      </option>
    </select>

    <div v-if="filteredContent.length" class="content-details">
      <ul id="history-list">
        <li v-for="content in filteredContent" :key="content.id" class="content-item">
          <strong>Name:</strong> {{ content.name }}<br />
          <strong>Type:</strong> {{ content.type }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import historiesData from '@/data/histories.json';
import contentsData from '@/data/history_content_full.json';

import { mapActions, mapState } from "vuex";
import {toRaw} from "vue";
import store from "@/stores/index.js";

export default {
  name: 'GalaxyHistory',
  data() {
    return {
      histories: historiesData,
      contents: contentsData,
      selectedHistoryId: null,
      filteredContent: [],
    };
  },
  computed: {
    ...mapState("histories", ["histories"]),
  },
  methods: {
    ...mapActions("histories", ["fetchHistories", "selectHistory"]),
    filterContent() {
      const selectedHistory = toRaw(this.histories.find(
          (history) => history.id === this.selectedHistoryId
      ));

      if (selectedHistory) {
        console.log("SelectedHistory content");
        console.log(selectedHistory.datasets);
        this.filteredContent = selectedHistory.datasets || [];
      } else {
        this.filteredContent = [];
      }

      store.dispatch("histories/selectHistory", selectedHistory);
    },
  },
  async mounted() {
    try {
      const historiesRemote = await this.$store.dispatch("histories/fetchHistories");
      console.log("Fetched histories");
      console.log(historiesRemote);
      this.histories = historiesRemote;
    } catch (error) {
      console.error("Error fetching histories:", error);
    }
  },
};
</script>

<style scoped>
.history-container {
  max-width: 400px;
  font-family: Arial, sans-serif;
}

.history-label {
  font-weight: bold;
  display: block;
  margin-bottom: 8px;
}

#history-select {
  width: 100%;
  padding: 8px;
  margin-bottom: 20px;
  font-size: 1rem;
}

.content-details {
  padding: 15px;
  border-radius: 5px;
}

#history-list {
  list-style: none;
}

.content-item {
  list-style: none;
  background: #f9f9f9;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ddd;
}

.content-item:last-child {

}
</style>
