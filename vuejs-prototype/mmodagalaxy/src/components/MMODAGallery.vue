<template>
  <section>
    <div class="container">
      <header class="custom-header">
        <h4 class="header-title">MMODA Gallery - Object: {{ selected_object }}</h4>
        <button class="toggle-gallery-button" @click="toggleGallery">
          {{ galleryButtonTitle }}
        </button>
      </header>

      <div class="content" :class="contentDisplay">
        <div class="content gallery-content-display" v-html="raw_gallery_object"></div>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, ref, watch, computed } from "vue";
import { useStore } from "vuex";
import mmodaGalleryService from "@/services/MMODAGalleryService.js";

export default {
  name: "MMODAGallery",

  data() {
    return {
      isContentVisible: false,
      galleryButtonTitleDisplay: "Show Gallery",
      galleryButtonTitleHide: "Hide Gallery",
    };
  },

  computed: {
    galleryButtonTitle() {
      return this.isContentVisible ? this.galleryButtonTitleHide : this.galleryButtonTitleDisplay;
    },
    contentDisplay() {
      return this.isContentVisible ? "gallery-content-display" : "gallery-content-hide";
    },
  },

  methods: {
    toggleGallery() {
      this.isContentVisible = !this.isContentVisible;
    },

    reloadComponent() {
      this.fetchGalleryData();
    },

    async fetchGalleryData() {
      const selected_object = this.$store.getters["celestial_objects/currentObject"];
      const form_id = this.$store.getters["celestial_objects/formId"];

      if (selected_object) {
        try {
          const object_data = await mmodaGalleryService.fetchGallery(selected_object, form_id);
          this.raw_gallery_object = object_data[1].args.htmlResponse;
        } catch (error) {
          console.error('Error while fetching gallery:', error);
        }
      }
    },
  },

  setup() {
    const raw_gallery_object = ref(null);
    const store = useStore();

    const selected_object = computed(() => store.getters["celestial_objects/currentObject"]);
    const form_id = computed(() => store.getters["celestial_objects/formId"]);

    const fetchGalleryData = async () => {
      if (selected_object.value) {
        try {
          const object_data = await mmodaGalleryService.fetchGallery(selected_object.value, form_id.value);
          raw_gallery_object.value = object_data[1].args.htmlResponse;
        } catch (error) {
          console.error('Error while fetching gallery:', error);
        }
      }
    };

    onMounted(() => {
      window.addEventListener("reload-gallery", fetchGalleryData);
      fetchGalleryData();
    });

    watch(selected_object, () => {
      fetchGalleryData();
    });

    return {
      raw_gallery_object,
      fetchGalleryData,
      selected_object,
    };
  },

  beforeUnmount() {
    window.removeEventListener("reload-gallery", this.fetchGalleryData);
  },
};
</script>

<style scoped>
.container {
  border: 1px solid #007d64;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 100%;
  margin: 10px auto;
}

.custom-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #007d64;
  border-color: #dddddd;
  color: #000000;
  padding: 0px 5px 0px 10px;
}

.header-title {
  color: #FFFFFF;
}

.toggle-gallery-button {
  padding: 8px 16px;
  background-color: #FFFFFF;
  color: #000000;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 20px;
  font-weight: bold;
  width: 10%;
}

.toggle-gallery-button.expanded {
  background-color: #F9F9F9;
}

.toggle-gallery-button:hover {
  opacity: 0.9;
}

.gallery-content-display {
  display: block;
  padding: 20px;
  height: 800px;
  overflow: scroll;
}

.gallery-content-display :deep(iframe) {
  width: 100%;
  height: 800px;
}

iframe {
  width: 100%;
  height: 800px;
}

.gallery-content-hide {
  display: none;
}
</style>
