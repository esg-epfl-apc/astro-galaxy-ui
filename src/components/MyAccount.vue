<template>
  <div class="auth-container">
    <div class="auth-header">
      <h2>My account</h2>
      <div class="auth-divider"></div>
    </div>
  </div>
</template>

<script setup>

console.log("MyAccount component loaded");

</script>

<style scoped>
.auth-container {
  width: 100%;
  max-width: 400px;
  margin: auto;
}

.auth-header {
  text-align: left;
  margin-bottom: 20px;
}

.auth-header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  font-family: ubuntu;
}

.auth-divider {
  height: 2px;
  background-color: #007d64;
  width: 100%;
  margin-top: 6px;
}

</style>