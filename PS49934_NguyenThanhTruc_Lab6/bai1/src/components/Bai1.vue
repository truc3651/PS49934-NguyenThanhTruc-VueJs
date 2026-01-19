<template>
  <h3>Nhập điểm của bạn:</h3>
  <input
    type="number"
    v-model.number="grade"
    placeholder="Nhập điểm (0-10)"
    step="0.1"
    min="0"
    max="10"
  />
  <p>{{ classification }}</p>
</template>

<script setup>
import {ref, computed} from 'vue'

const grade = ref(null)
const classification = computed(() => {
  if (grade.value === null || grade.value === '') {
    return 'Xếp loại';
  }

  if (grade.value < 5.0) {
    return 'Yếu';
  } else if (grade.value >= 5.0 && grade.value < 6.5) {
    return 'Trung bình';
  } else if (grade.value >= 6.5 && grade.value < 8.0) {
    return 'Khá';
  } else if (grade.value >= 8.0 && grade.value < 9.0) {
    return 'Giỏi';
  } else if (grade.value >= 9.0 && grade.value <= 10) {
    return 'Xuất sắc';
  }
  
  return 'Xếp loại';
})
</script>
