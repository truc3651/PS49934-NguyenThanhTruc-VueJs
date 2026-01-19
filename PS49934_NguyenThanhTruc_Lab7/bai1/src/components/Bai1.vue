<template>
  <div class="col-sm-4 p-5">
    <form @submit.prevent="add">
      <div class="mb-3">
        <label class="form-label">Tên công việc</label>
        <input
          type="text"
          class="form-control"
          v-model="newJob"
          placeholder="Nhập tên công việc"
        />
      </div>
      <button type="submit" class="btn btn-primary">Thêm</button>
    </form>

    <ul class="list-group mt-4">
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
        v-for="(j, i) in jobs"
        :key="i"
      >
        {{ j }}
        <button class="btn btn-danger btn-sm" @click="remove(i)">Xóa</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const newJob = ref('');
const jobs = ref(['Ăn sáng', 'Đi học', 'Chơi bóng rổ']);
const add = () => {
  const value = newJob.value.trim();
  if (value) {
    jobs.value.push(value);
    newJob.value = '';
  }
};
const remove = (index) => {
  jobs.value.splice(index, 1);
};
</script>
