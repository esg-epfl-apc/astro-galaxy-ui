<template>
  <a v-if="userData.token == null" class="header-button" :href="loginRequest + 'client_id=' + client_id + '&response_type=code&redirect_uri=' + redirect_uri + '&state=' + state + '&scope=openid+api+email'">Sign in with Gitlab</a>
</template>

<script>

import { useStore } from "vuex";
import { computed } from 'vue'

export default {
  name: "SignUpGithub",
  setup() {
    const store = useStore();
    const userData = computed(() => store.getters['users/getUser']);
    return {
      userData
    }
  },
  mounted() {
    if (this.userData.token != null) {
      console.log("User is already authenticated, token found in userData store");
      return;
    } else {
      if (localStorage.getItem('state') === null) {
        console.log(`State value not found in localStorage, generating a new one`);
        this.state = Math.random().toString(36).slice(2);
        localStorage.setItem('state', this.state);
      }
      else 
        this.state = localStorage.getItem('state');
    
      const url = new URL(window.location.href);
      const queryParams = new URLSearchParams(url.search);
      console.log('Query parameters:', queryParams.toString());
      let returnedState = queryParams.get('state');
      let returnedCode = queryParams.get('code');
      if (returnedState != null && returnedCode != null) {
        this.$router.push({ name: 'home', 'query': null, replace: true});
        console.log(`State: ${returnedState}, Code: ${returnedCode}`);
        if (returnedState === this.state) {
          console.log('State matches, proceeding with authentication');
          // TODO to decide if this needed
          // localStorage.removeItem('state');
          const access_token_mmoda_request = this.localAccessTokenRequest + 'client_id=' + this.client_id + '&redirect_uri=' + this.redirect_uri + '&code=' + returnedCode;
          // send github post requewst for the token
          fetch(access_token_mmoda_request, {
              method: "GET",
          })
              .then((response) => {
                  if (!response.ok) {
                      throw new Error(`HTTP error status: ${response.status}`);
                  }
                  let json_response = response.json();
                  return json_response;
              })
              .then((data) => {
                  console.log("Response:", data);
                  // store the token in the userData store
                  this.userData.token = data.access_token;
                  localStorage.setItem('userToken', this.userData.token);
              })
              .catch((error) => {
                  console.error("Error:", error);
              });

        } else {
          console.error(`State does not match (this.state=${this.state}, returnedState=${returnedState}), invalide authentication attempt`);
        }
      }
    }
  },
  data() {
    return {
      state: undefined,
      client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
      redirect_uri: import.meta.env.VITE_REDIRECT_URI,
      loginRequest: import.meta.env.VITE_LOGIN_REQUEST_URI,
      localAccessTokenRequest: import.meta.env.VITE_LOCAL_ACCESS_TOKEN_REQUEST_URI,
    };
  },
  methods: { }
}

</script>

<style scoped>
a.header-button {
  font-family: 'ubuntu';
  color: #333333 !important;
}
</style>