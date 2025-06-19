<template>
  <a v-if="userData.token == null" class="header-button" :href="githubLoginRequest + 'client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&state=' + state" target="_blank">Sign in with Github</a>
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
    // TODO - Uncomment the following lines if you want to use the route query parameters, but I didn't manage to make it work
    // probably because of the way the routes are configured in the index.js file
    // const route = useRoute();
    // console.log(route.query);
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
    if (returnedState != null && typeof returnedCode != null) {
      console.log(`State: ${returnedState}, Code: ${returnedCode}`);
      if (returnedState === this.state) {
        console.log('State matches, proceeding with authentication');
        localStorage.removeItem('state');
        const body_token_request = new FormData();
        body_token_request.append('client_id', this.client_id);
        body_token_request.append('client_secret', this.client_secret);
        body_token_request.append('code', returnedCode);
        body_token_request.append('redirect_uri', this.redirect_uri);
        // send github post requewst for the token
        fetch(this.githubTokenRequest, {
            method: "POST",
            headers: {
                "Accept": "application/json",
            },
            body: body_token_request
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
            })
            .catch((error) => {
                console.error("Error:", error);
            });

      } else {
        console.error(`State does not match (this.state=${this.state}, returnedState=${returnedState}), invalide authentication attempt`);
      }
    }
  },
  data() {
    return {
      state: undefined,
      client_id: import.meta.env.VITE_GITHUB_CLIENT_ID,
      client_secret: import.meta.env.VITE_GITHUB_CLIENT_SECRET,
      redirect_uri: import.meta.env.VITE_GITHUB_REDIRECT_URI,
      githubLoginRequest: import.meta.env.VITE_GITHUB_LOGIN_REQUEST_URI,
      githubTokenRequest: import.meta.env.VITE_GITHUB_ACCESS_TOKEN_URI
    };
  },
  methods: { }
}

</script>

<style scoped>

</style>