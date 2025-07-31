<template>
  <div class="account-container">
    <div class="account-header">
      <h2>My Account</h2>
      <div class="account-divider"></div>
    </div>
    
    <div class="account-info">
      <div class="field-group">
        <label class="field-label">Username</label>
        <div class="field-value" v-text="username"></div>
      </div>
      
      <div class="field-group">
        <label class="field-label">Email Address</label>
        <div class="field-value" v-text="email"></div>
      </div>
      
      <div class="field-group">
        <label class="field-label">Full Name</label>
        <div class="field-value" v-text="fullName"></div>
      </div>
    </div>
  </div>
</template>

<script setup>

console.log("MyAccount component loaded");

  import { useStore } from "vuex";
  import { computed, ref } from 'vue';

  const username = ref('');
  const email = ref('');
  const fullName = ref('');

  const store = useStore();
  const user_data = computed(() => store.getters['users/getUser']);
  username.value = user_data.value.user_nickname;
  email.value = user_data.value.user_email;
  fullName.value = user_data.value.user_name;

</script>

<style scoped>
.auth-container {
  width: 100%;
  max-width: 500px;
  margin: auto;
  padding: 20px;
}

.account-header {
  text-align: left;
  margin-bottom: 15px;
}

.account-header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: bold;
  font-family: 'ubuntu';
}

.account-divider {
  height: 2px;
  background-color: #007d64;
  width: 100%;
  margin-top: 6px;
}

.account-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-family: 'ubuntu';
}

.field-label {
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.field-value {
  font-size: 16px;
}

</style>