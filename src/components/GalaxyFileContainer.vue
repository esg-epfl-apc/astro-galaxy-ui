<template>
  <div class="custom-container">
    <header class="custom-header">
      <h2 class="header-title"></h2>
      <div class="button-container">
        <button class="header-button" @click="onActionClick('Contact')">Contact Us <i class="bi bi-envelope"></i></button>
        <button class="header-button" @click="onActionClick('Info')">Help <i class="bi bi-info-circle"></i></button>
      </div>
    </header>

    <div class="content">
      <GalaxyFileUpload class="left-component" />
      <GalaxyHistory class="right-component" />
    </div>
  </div>
</template>

<script>
import GalaxyFileUpload from "@/components/GalaxyFileUpload.vue";
import GalaxyHistory from "@/components/GalaxyHistory.vue";

export default {
  name: 'GalaxyFileContainer',
  components: {
    GalaxyFileUpload,
    GalaxyHistory
  },
  methods: {
    onActionClick(action) {
      console.log(`${action} button clicked`);
    }
  }
}
</script>

<style scoped>
.custom-container {
  border: 1px solid #dddddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 100%;
  margin: 10px auto;
}

.custom-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  border-color: #dddddd;
  color: #000000;
  padding: 20px;
  border-bottom: 1px solid #e7e7e7;
}

.header-title {
  margin: 0;
  font-size: 1.5rem;
}

.button-container {
  display: flex;
}

.header-button {
  background-color: #007d64;
  color: #FFFFFF;
  border: 1px solid #cccccc;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  white-space: nowrap;
}

.header-button:hover {
  background-color: #009778;
  color: white;
}

.header-button:active {
  background-color: #3e8e41;
}

.left-component {
  flex: 0 0 60%;
  background-color: #f9f9f9;
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 20px;
}

.right-component {
  flex: 0 0 40%;
  background-color: #f0f0f0;
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 20px;
}

.content {
  display: flex;
  width: 100%;
  padding: 20px;
  gap: 20px;
}
</style>
