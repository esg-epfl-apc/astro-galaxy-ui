<template>
  <div class="auth-container">
    <div class="auth-header">
      <h2>Sign up</h2>
      <div class="auth-divider"></div>
    </div>

    <form class="auth-form" @submit.prevent="onSubmit">
      <label>
        Username
        <input v-model="username" type="text" required />
      </label>

      <label>
        Email address
        <input v-model="email" type="email" required />
        <small class="form-hint">
          Please use an institutional email address to subscribe to the service. A valid e-mail address. All e-mails from the system will be sent to this address. The e-mail address is not made public and will only be used if you wish to receive a new password or wish to receive certain news or notifications by e-mail.
        </small>
      </label>

      <label>
        Description of your case
        <textarea v-model="useCase" rows="4" required></textarea>
        <small class="form-hint">
          A text between 50 and 255 characters, remaining: 255
          Note that the computing resources are provided by the University of Geneva. For their fair use, we need to know: We would like you to provide us with a small overview of your activities, in particular:

          The purpose of your work(s) in broad terms
          Possible collaborators in or outside of the University of Geneva
          An estimation of the amount of resources needed for your project(s)

          We will contact you back in case we need additional information.
        </small>
      </label>

      <div class="auth-actions">
        <div class="left-buttons">
          <button type="button" class="text-button" @click="onGoToLogin">Already have an account?</button>
        </div>
        <div class="right-button">
          <button type="submit" class="login-button">Create Account</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['switch'])

const username = ref('')
const email = ref('')
const useCase = ref('')

const onSubmit = () => {
  console.log('Sign up submitted with:', {
    username: username.value,
    email: email.value,
    useCase: useCase.value
  })
}

const onGoToLogin = () => {
  emit('switch', { component: 'SignIn' })
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

.auth-form input,
.auth-form textarea {
  margin-top: 5px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-hint {
  font-weight: normal;
  font-size: 12px;
  color: #666;
  margin-top: 5px;
  line-height: 1.4;
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