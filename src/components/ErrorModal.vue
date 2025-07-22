<template>
  <div class="error-modal">
    <div class="error-content">
      <h3 class="error-title" v-text="title || 'Error'"></h3>
      <div class="divider"></div>
      <p class="error-message" v-text="message || 'An unexpected error occurred.'"></p>
    </div>
  </div>
</template>

<script setup>
  console.log("Error modal component loaded");

  const props = defineProps({
    title: {
      type: String,
      required: false,
      default: "Error"
    },
    message: {
      type: String,
      required: false,
      default: "An unexpected error occurred."
    }
  });

</script>

<style scoped>
.error-modal {
  border-radius: 12px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 400px;
  margin: 0 auto;
  font-family: 'ubuntu';
}

.divider {
  height: 2px;
  background-color: #007d64;
  width: 100%;
  margin-top: 6px;
}

.error-content {
  text-align: left;
}

.error-title {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 12px 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.error-message {
  font-size: 14px;
  line-height: 1.5;
  opacity: 0.95;
  font-weight: 400;
}
</style>