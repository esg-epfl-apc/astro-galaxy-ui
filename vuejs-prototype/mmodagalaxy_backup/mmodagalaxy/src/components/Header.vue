<template>
  <header class="sticky-header">
    <div class="logo-container">
      <img src="@/assets/logo.png" class="logo" />
      <img src="@/assets/logo-fac-sciences.png" class="logo" />
      <img src="@/assets/logo-epfl.png" class="logo" />
      <img src="@/assets/logo-apc.png" class="logo" />
      <img src="@/assets/logo-isdc.png" class="logo" />
      <img src="@/assets/logo-kau.png" class="logo" />
    </div>
    <div class="button-container">
      <SignUpGithub />
      <button v-if="userData.token == null" class="header-button" @click="onButtonClick('SignIn')">Sign in <i class="bi bi-box-arrow-in-right"></i></button>
      <button v-if="userData.token == null" class="header-button" @click="onButtonClick('SignUp')">Sign up <i class="bi bi-person"></i></button>
      <button v-if="userData.token != null" class="header-button">My account <i class="bi bi-person-fill"></i></button>
    </div>
  </header>
</template>

<script>

import SignUpGithub from "@/components/SignUpGithub.vue";
import { useStore, mapGetters } from "vuex";
import { computed, ref, watch } from 'vue'

export default {
  name: 'StickyHeader',
  emits: ['show-modal'],
  components: {
    SignUpGithub
  },
  setup() {
    const store = useStore();
    const userData = computed(() => store.getters['users/getUser']);
    watch(userData, () => {
      console.log("userData changed:", userData.value);
      },
      { deep: true }
    );

    return {
      userData
    }
  },
  data() { },
  methods: {
    onButtonClick(buttonActionComponent) {
      console.log(`Button component clicked: ${buttonActionComponent}`);

      if(buttonActionComponent === 'SignIn' || buttonActionComponent === 'SignUp') {
        this.$emit('show-modal', buttonActionComponent);
      }
    }
  }
}
</script>

<style scoped>
.sticky-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 98%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f8f8;
  border-color: #e7e7e7;
  color: #000000;
  padding: 0 20px;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.logo-container {
  display: flex;
  align-items: center;
  max-width: 40%;
  flex: 1 1 auto;
  overflow: hidden;
}

.logo {
  height: 40px;
  width: auto;
  margin-right: 10px;
  transition: transform 0.3s;
}

.logo:hover {
  transform: scale(1.1);
}

.button-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 0 0 auto;
}

.header-button {
  background-color: #ffffff;
  color: #333333;
  border: 1px solid #cccccc;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  white-space: nowrap;
}

a.header-button {
  text-decoration: none;
  color: inherit;
}

.header-button:hover {
  background-color: #ebebeb;
}

.header-button:active {
  background-color: #3e8e41;
}
</style>
