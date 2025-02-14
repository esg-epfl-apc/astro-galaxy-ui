<template>
  <footer class="footer">
    <div class="footer-container">
      <span class="footer-text">MMODA - Galaxy | version 7.x-1.0</span>
      <button class="back-to-top" @click="scrollToTop">↑</button>
    </div>
  </footer>
</template>

<script>
export default {
  methods: {
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style scoped>
.footer {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  background-color: #007d64;
  color: white;
  margin: 0;
  position: absolute;
  left: 0;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.footer div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;
}

.footer-text {
  font-size: 16px;
  font-weight: bold;
}

.back-to-top {
  background-color: transparent;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.back-to-top:hover {
  color: #f1c40f;
}
</style>
