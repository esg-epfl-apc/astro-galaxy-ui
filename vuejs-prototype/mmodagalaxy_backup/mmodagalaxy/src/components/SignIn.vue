<template>
  <div class="auth-container">
    <div class="auth-header">
      <h2>Log in</h2>
      <div class="auth-divider"></div>
    </div>

    <form class="auth-form" @submit.prevent="onSubmit">
      <label>
        Username or email address
        <input v-model="username" type="text" required />
      </label>
      <label>
        Password
        <input v-model="password" type="password" required />
      </label>

      <div class="auth-actions">
        <div class="left-buttons">
          <button type="button" class="text-button" @click="onCreateAccount">Create account</button>
          <button type="button" class="text-button" @click="onForgotPassword">Forgot password</button>
        </div>
        <div class="right-button">
          <button type="submit" class="login-button">Log in</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import {ref} from 'vue'

const emit = defineEmits(['switch'])

const username = ref('')
const password = ref('')

const onSubmit = () => {
  console.log('logging in', username.value, password.value)
}

const onCreateAccount = () => {
  console.log('create account')

  emit('switch', { component: 'SignUp' })
}

const onForgotPassword = () => {
  console.log('forgot password')
}
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
}

.auth-divider {
  height: 2px;
  background-color: #007d64;
  width: 100%;
  margin-top: 6px;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.auth-form label {
  display: flex;
  flex-direction: column;
  font-weight: 600;
}

.auth-form input {
  margin-top: 5px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.auth-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.left-buttons {
  display: flex;
  gap: 10px;
}

.text-button {
  background: none;
  border: none;
  color: #007d64;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
}

.text-button:hover {
  text-decoration: underline;
}

.right-button .login-button {
  background-color: #007d64;
  color: white;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #005d4a;
}
</style>