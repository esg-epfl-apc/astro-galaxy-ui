<template>
  <div class="button-container">
    <button
        class="toggle-button"
        :class="{ active: activeButton === 'MMODA' }"
        @click="setActiveButton('MMODA')"
    >
      MMODA
    </button>

    <button
        class="toggle-button"
        :class="{ active: activeButton === 'Galaxy' }"
        @click="setActiveButton('Galaxy')"
    >
      Galaxy
    </button>
  </div>
</template>

<script>
export default {
  name: 'MMODAGalaxySwitcher',
  data() {
    return {
      activeButton: 'MMODA'
    }
  },
  methods: {
    setActiveButton(button) {
      this.activeButton = button;
      this.$emit('update-active', button);
    }
  }
}
</script>

<style scoped>

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  padding: 45px 0 0 0;
  gap: 20px;
}

.toggle-button {
  background-color: #ffffff;
  color: #007d64;
  border: 2px solid #007d64;
  border-radius: 8px;
  padding: 15px 30px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.toggle-button:hover {
  background-color: #007d64;
  color: white;
}

.toggle-button:active {
  background-color: #3e8e41;
  color: white;
}

.toggle-button.active {
  background-color: #007d64;
  color: white;
  border-color: #007d64;
}
</style>
