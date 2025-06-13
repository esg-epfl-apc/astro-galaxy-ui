<template>
  <a v-if="!loggedIn" class="header-button" :href="githubLoginRequest + 'client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&state=' + state" target="_blank">Sign in with Github</a>
</template>

<script>

export default {
  name: "SignUpGithub",
  mounted() {
    console.log('Header mounted, checking url parameters');
    // TODO - Uncomment the following lines if you want to use the route query parameters, but I didn't manage to make it work
    // probably because of the way the routes are configured in the index.js file
    // const route = useRoute();
    // console.log(route.query);
    if (localStorage.getItem('state'))
      this.state = localStorage.getItem('state');
    else {
      this.state = Math.random().toString(36).slice(2);
      localStorage.setItem('state', this.state);
    }
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
        this.loggedIn = true;
      } else {
        console.error('State does not match, invalide authentication attempt');
      }
    }
  },
  data() {
    return {
      state: undefined,
      loggedIn: false,
      client_id: 'Iv23lijcxl7RZ7tbBBCy',
      redirect_uri: 'http://localhost:5173/mmodagalaxy/dist',
      githubLoginRequest: `https://github.com/login/oauth/authorize?`
    };
  },
  methods: { }
}

</script>

<style scoped>

</style>