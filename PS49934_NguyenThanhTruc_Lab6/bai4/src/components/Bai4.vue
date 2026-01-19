<template>
  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col-md-4">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">Thêm học sinh</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="addStudent">
              <div class="mb-3">
                <label for="name" class="form-label">Họ tên:</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="form.name"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="grade" class="form-label">Điểm:</label>
                <input
                  type="number"
                  class="form-control"
                  id="grade"
                  v-model.number="form.grade"
                  min="0"
                  max="10"
                  step="0.1"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="birthday" class="form-label">Ngày sinh:</label>
                <input
                  type="date"
                  class="form-control"
                  id="birthday"
                  v-model="form.birthday"
                  required
                />
              </div>

              <button type="submit" class="btn btn-success">
                {{ isEditing ? 'Update' : 'Insert' }}
              </button>
              <button
                v-if="isEditing"
                type="button"
                class="btn btn-secondary ms-2"
                @click="Cancel"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>

      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">Danh sách học sinh</h5>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Họ và tên</th>
                    <th>Điểm</th>
                    <th>Ngày sinh</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(s, i) in studentList" :key="i">
                    <td>{{ s.name }}</td>
                    <td>{{ s.grade }}</td>
                    <td>{{ s.birthday }}</td>
                    <td>
                      <button
                        class="btn btn-warning btn-sm me-2"
                        @click="editStudent(i)"
                      >
                        Update
                      </button>
                      <button
                        class="btn btn-danger btn-sm"
                        @click="deleteStudent(i)"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                  <tr v-if="studentList.length === 0">
                    <td colspan="4" class="text-center text-muted">No data</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({
  name: '',
  grade: null,
  birthday: '',
});
const studentList = ref([
  {
    name: 'Nguyễn Chí Hùng',
    grade: 8,
    birthday: '2006-01-01',
  },
  {
    name: 'Phạm Thị Lan',
    grade: 9,
    birthday: '2006-05-15',
  },
]);
const isEditing = ref(false);
const editIndex = ref(null);

function addStudent () {
  if (isEditing.value) {
    studentList.value[editIndex.value] = { ...form.value };
    isEditing.value = false;
    editIndex.value = null;
  } else {
    studentList.value.push({ ...form.value });
  }
  resetForm();
};
function editStudent (index) {
  form.value = { ...studentList.value[index] };
  isEditing.value = true;
  editIndex.value = index;
};
function deleteStudent (index) {
  if (confirm('Are you sure?')) {
    studentList.value.splice(index, 1);
    if (isEditing.value && editIndex.value === index) {
      cancel();
    }
  }
};
function cancel () {
  isEditing.value = false;
  editIndex.value = null;
  resetForm();
};
function resetForm () {
  form.value = {
    name: '',
    grade: null,
    birthday: '',
  };
};
</script>
