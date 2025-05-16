<!-- CoordinateList.vue -->
<template>
  <div class="coordinate-list">
    <h2>MMODA History</h2>
    <ul>
      <li v-for="(coordinate, index) in coordinates" :key="index" class="coordinate-item">
        <strong>Name:</strong> {{ coordinate.name }}, <strong>RA:</strong> {{ coordinate.ra }}, <strong>Dec:</strong> {{ coordinate.dec }}
        <strong>Start time:</strong> {{ coordinate.start_time }}, <strong>End time:</strong> {{ coordinate.end_time }}, <strong>Time unit:</strong> {{ coordinate.time_unit }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "CoordinateList",
  setup() {
    const coordinates = ref([
      { name: "Object 0", ra: 10.684, dec: 41.269, start_time: "2020-08-30T13:18:59.435670", end_time: "2020-08-30T13:18:59.435670", time_unit: "ISO/ISOT" },
      { name: "Object 1", ra: 12.345, dec: -23.567, start_time: "2020-08-30T13:18:59.435670", end_time: "2020-08-30T13:18:59.435670", time_unit: "ISO/ISOT" },
      { name: "Object 2", ra: 42.0, dec: -8.33, start_time: "2020-08-30T13:18:59.435670", end_time: "2020-08-30T13:18:59.435670", time_unit: "ISO/ISOT" },
    ]);

    return {
      coordinates,
    };
  },
};
</script>

<style scoped>
.coordinate-list {
  list-style: none;
}

.coordinate-item {
  list-style: none;
  background: #f9f9f9;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ddd;
}

</style>
