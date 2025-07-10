<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <component :is="componentName" v-bind="componentProps" @switch="switchComponent" />
      <button class="modal-close" @click="close">Close</button>
    </div>
  </div>
</template>

<script setup>
import {watch} from "vue";

const props = defineProps({
  componentName: {
    type: [Object, String],
    required: true,
  },
  componentProps: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['close'])

const close = () => emit('close')

const switchComponent = (component) => emit('switch', component)

watch(() => props.componentName, (val) => {
  console.log('Modal rendering component:', typeof val === 'object' ? val?.name : val)
}, { immediate: true })
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  min-width: 400px;
  max-width: 400px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.3);
  position: relative;
}

.modal-close {
  margin-top: 20px;
}
</style>