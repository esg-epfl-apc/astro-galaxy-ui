<template>

  <Header @show-modal="({ component, props }) => openModal(component, props)" />
  <div class="row-switcher">
    <PlatformSwitcher @update-active="updateActiveComponent" />
  </div>
  <div class="row">
    <component :is="currentComponent" @show-modal="({ component, props }) => openModal(component, props)" />
  </div>
  <div class="row">
    <ToolList @update-active-tool="updateActiveToolComponent" />
  </div>
  <div class="row">
    <MMODAToolContainer
        v-if="currentToolComponent === 'MMODAToolContainer'"
        @show-modal="({ component, props }) => openModal(component, props)"
    />
    <GalaxyToolContainer v-if="currentToolComponent === 'GalaxyToolContainer'" />
  </div>
  <Footer />
  <Modal
      v-if="showModal"
      :component-name="modalComponent"
      :component-props="modalProps"
      @close="closeModal"
      @switch="handleModalSwitch"
  />
  <!--div class="row">
    <MMODAFileSearch class="mmoda-search" />
    <MMODASearchHistory class="mmoda-search-history" />
  </div>
  <div class="row">
    <GalaxyFileUpload />
    <GalaxyHistory />
  </div-->

</template>

<script>
import { useStore } from "vuex";
import { computed, watch } from 'vue';
import { jwtDecode } from "jwt-decode";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import PlatformSwitcher from "@/components/PlatformSwitcher.vue";
import ToolList from "@/components/ToolList.vue";
import ToolContent from "@/components/ToolContent.vue";
import GalaxyHistory from "@/components/GalaxyHistory.vue";
import MMODAFileContainer from "@/components/MMODAFileContainer.vue";
import MMODASearchHistory from "@/components/MMODASearchHistory.vue";
import MMODAToolHolder from "@/components/MMODAToolHolder.vue";
import MMODAToolContainer from "@/components/MMODAToolContainer.vue";
import GalaxyFileContainer from "@/components/GalaxyFileContainer.vue";
import GalaxyFileUpload from "@/components/GalaxyFileUpload.vue";
import GalaxyToolContainer from "@/components/GalaxyToolContainer.vue";
import Modal from "@/components/Modal.vue";
import SignIn from "@/components/SignIn.vue";
import SignUp from "@/components/SignUp.vue";
import Contact from "@/components/Contact.vue";
import MyAccount from "@/components/MyAccount.vue";
import 'bootstrap-icons/font/bootstrap-icons.css'
import MMODAResultLoader from "@/components/MMODAResultLoader.vue";

const modalComponentMap = {
  SignIn,
  SignUp,
  Contact,
  MyAccount,
  MMODAResultLoader,
};

export default {
  name: "Dashboard",
  components: {
    Header,
    Footer,
    PlatformSwitcher,
    ToolList,
    ToolContent,
    GalaxyHistory,
    MMODAFileContainer,
    MMODASearchHistory,
    MMODAToolHolder,
    MMODAToolContainer,
    GalaxyFileContainer,
    GalaxyFileUpload,
    GalaxyToolContainer,
    Modal,
  },
  setup() {
    const store = useStore();
    const userData = computed(() => store.getters['users/getUser']);
    if (localStorage.getItem('user_data') !== null) {
      const local_user_data = JSON.parse(localStorage.getItem('user_data'));
      // check if the token is still valid
      if (local_user_data.exp_time != null && new Date(local_user_data.exp_time * 1000) < new Date()) {
        console.log("Token expired, clearing user data");
        localStorage.removeItem('user_data');
        userData.value.access_token = null;
        userData.value.exp_time = null;
        userData.value.id_token = null;
        userData.value.session_id = null;
        userData.value.user_nickname = null;
        userData.value.user_email = null;
        userData.value.user_name = null;
        console.log("User data cleared");
      } else {
        userData.value.access_token = local_user_data.access_token;
        userData.value.exp_time = local_user_data.exp_time;
        userData.value.id_token = local_user_data.id_token;
        userData.value.session_id = local_user_data.session_id;

        const decoded_id_token = jwtDecode(userData.value.id_token);
        userData.value.user_nickname = decoded_id_token.nickname;
        userData.value.user_email = decoded_id_token.email;
        userData.value.user_name = decoded_id_token.name;

        console.log("User data loaded from localStorage:", userData.value);
      }
    }

    watch(userData, () => {
      console.log("userData changed:", userData.value);
      },
      { deep: true }
    );

    return {
      userData
    }
  },
  mounted() {
    // this.$store.dispatch("tools/fetchTools");
  },
  data() {
    return {
      currentComponent: 'MMODAFileContainer',
      currentToolComponent: '',
      showModal: false,
      modalComponent: null,
      modalProps: {},
    }
  },
  methods: {
    updateActiveComponent(activeButton) {
      console.log(activeButton);
      this.currentComponent = activeButton === 'MMODA' ? 'MMODAFileContainer' : 'GalaxyFileContainer';
    },
    updateActiveToolComponent(activeToolPlatform) {
      if (activeToolPlatform === "MMODA") {
        this.currentToolComponent = "MMODAToolContainer";
      } else if (activeToolPlatform === "Galaxy") {
        this.currentToolComponent = "GalaxyToolContainer";
      } else {
        this.currentToolComponent = "";
      }
    },
    openModal(component, props = {}) {

      if (typeof component === "string") {
        this.modalComponent = modalComponentMap[component] || null;
      } else {
        this.modalComponent = component;
      }

      this.modalProps = props;
      this.showModal = true;
    },
    handleModalSwitch({ component, props = {} }) {
      this.openModal(component, props);
    },
    closeModal() {
      this.showModal = false;
      this.modalComponent = null;
      this.modalProps = {};
    },
  }
};
</script>

<style scoped>
app > div {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

footer {
  position: static;
  margin-top: 20px;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 110px;
}

.row-switcher {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 110px;
  margin-top: 50px;
}

.row-mmoda-file {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 110px;
  margin-top: 50px;
  width: 100%;
}

.row > * {
  flex: 1;
}

</style>
