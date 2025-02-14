<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>

    <Header />
    <div class="row-switcher">
      <PlatformSwitcher @update-active="updateActiveComponent" />
    </div>
    <div class="row">
      <component :is="currentComponent" />
    </div>
    <div class="row">
      <ToolList @update-active-tool="updateActiveToolComponent" />
    </div>
    <div class="row">
      <MMODAToolContainer v-if="currentToolComponent === 'MMODAToolContainer'" />
      <GalaxyToolContainer v-if="currentToolComponent === 'GalaxyToolContainer'" />
    </div>
    <Footer />
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
import MMODAFileSearch from "@/components/MMODAFileSearch.vue";
import MMODASearchHistory from "@/components/MMODASearchHistory.vue";
import MMODAGallery from "@/components/MMODAGallery.vue"
import MMODAToolHolder from "@/components/MMODAToolHolder.vue";
import MMODAToolContainer from "@/components/MMODAToolContainer.vue";
import GalaxyFileContainer from "@/components/GalaxyFileContainer.vue";
import GalaxyFileUpload from "@/components/GalaxyFileUpload.vue";
import GalaxyToolContainer from "@/components/GalaxyToolContainer.vue";
import 'bootstrap-icons/font/bootstrap-icons.css'

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
    MMODAFileSearch,
    MMODASearchHistory,
    MMODAGallery,
    MMODAToolHolder,
    MMODAToolContainer,
    GalaxyFileContainer,
    GalaxyFileUpload,
    GalaxyToolContainer,
  },
  mounted() {
    this.$store.dispatch("tools/fetchTools");
  },
  data() {
    return {
      currentComponent: 'MMODAFileContainer',
      currentToolComponent: '',
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
    }
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
