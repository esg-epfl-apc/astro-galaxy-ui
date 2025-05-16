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
import 'bootstrap-icons/font/bootstrap-icons.css'
import MMODAResultLoader from "@/components/MMODAResultLoader.vue";

const modalComponentMap = {
  SignIn,
  SignUp,
  Contact,
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
  mounted() {
    this.$store.dispatch("tools/fetchTools");
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
