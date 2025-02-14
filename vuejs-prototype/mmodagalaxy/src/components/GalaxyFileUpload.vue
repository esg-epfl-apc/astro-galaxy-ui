<template>
  <div class="file-uploader">
    <h2>Galaxy File Upload</h2>
    <label for="fileUrl">File URL</label>
    <input type="text" id="fileUrl" v-model="fileUrl" placeholder="Enter file URL" />
    <button @click="sendToGalaxy">Send to Galaxy</button>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "FileUploader",
  setup() {
    const fileUrl = ref("");

    const sendToGalaxy = () => {
      console.log("Sending to Galaxy:", fileUrl.value);

    };

    return {
      fileUrl,
      sendToGalaxy,
    };
  },
};
</script>

<style scoped>
.file-uploader {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
}

input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 8px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
