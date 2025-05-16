<template>
  <div class="auth-container">
    <div class="auth-header">
      <h2>Contact</h2>
      <div class="auth-divider"></div>
    </div>

    <form class="auth-form" @submit.prevent="onSubmit">
      <label>
        Name
        <input v-model="name" type="text" required />
      </label>

      <label>
        Email
        <input v-model="email" type="email" required />
      </label>

      <label>
        Subject
        <input v-model="subject" type="text" required />
      </label>

      <label>
        Message
        <textarea v-model="message" rows="4" required></textarea>
      </label>

      <label class="file-label">
        File
        <div class="file-input-wrapper">
          <input type="file" @change="onFileChange" />
          <span
              class="file-hint"
              title="Files must be less than 2 MB. Allowed file types: gif, jpg, jpeg, png."
          >
            You can attach a file like a screenshot, etc.
          </span>
          <span class="file-hint">Files must be less than 2 MB. Allowed file types: gif, jpg, jpeg, png.</span>
        </div>
      </label>

      <div class="auth-actions">
        <div class="right-button">
          <button type="submit" class="login-button">Send Message</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const subject = ref('')
const message = ref('')
const file = ref(null)

const onFileChange = (e) => {
  file.value = e.target.files[0]
}

const onSubmit = () => {
  console.log('Contact form submitted with:', {
    name: name.value,
    email: email.value,
    subject: subject.value,
    message: message.value,
    file: file.value
  })
}
</script>

<style scoped>
.auth-container {
  width: 100%;
  max-width: 500px;
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

.file-label .file-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.file-hint {
  font-size: 12px;
  color: #666;
  cursor: help;
  line-height: 1.3;
}

.auth-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.login-button {
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