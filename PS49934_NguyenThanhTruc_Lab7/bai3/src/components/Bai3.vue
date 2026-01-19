<template>
  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">Form Đăng Ký</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="register">
              <div class="mb-3">
                <label for="name" class="form-label">Họ tên:</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="form.name"
                  placeholder="Tèo"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email:</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="form.email"
                  placeholder="tien@gmail.com"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Mật khẩu:</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="form.password"
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
              <div class="mb-3">
                <label class="form-label">Giới tính:</label>
                <div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      id="male"
                      value="Nam"
                      v-model="form.sex"
                      required
                    />
                    <label class="form-check-label" for="male">Nam</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      id="female"
                      value="Nữ"
                      v-model="form.sex"
                    />
                    <label class="form-check-label" for="female">Nữ</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      id="other"
                      value="Khác"
                      v-model="form.sex"
                    />
                    <label class="form-check-label" for="other">Khác</label>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Ngôn ngữ:</label>
                <div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="vietnamese"
                      value="Tiếng Việt"
                      v-model="form.language"
                    />
                    <label class="form-check-label" for="vietnamese">
                      Tiếng Việt
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="english"
                      value="Tiếng Anh"
                      v-model="form.language"
                    />
                    <label class="form-check-label" for="english">
                      Tiếng Anh
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="japanese"
                      value="Tiếng Nhật"
                      v-model="form.language"
                    />
                    <label class="form-check-label" for="japanese">
                      Tiếng Nhật
                    </label>
                  </div>
                </div>
              </div>
              <button type="submit" class="btn btn-primary">Đăng ký</button>
            </form>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">Thông tin đã đăng ký:</h5>
          </div>
          <div class="card-body">
            <div v-if="submitted">
              <p><strong>Họ tên:</strong> {{ info.name }}</p>
              <p><strong>Email:</strong> {{ info.email }}</p>
              <p><strong>Ngày sinh:</strong> {{ info.birthday }}</p>
              <p><strong>Giới tính:</strong> {{ info.sex }}</p>
              <p><strong>Ngôn ngữ:</strong> {{ info.language }}</p>
            </div>
            <div v-else class="text-muted text-center">
              Chưa có thông tin đăng ký
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
  email: '',
  password: '',
  birthday: '',
  sex: 'Nam',
  language: [],
});
const info = ref({
  name: '',
  email: '',
  birthday: '',
  sex: '',
  language: '',
});
const submitted = ref(false);

function register() {
  info.value = {
    name: form.value.name,
    email: form.value.email,
    birthday: form.value.birthday,
    sex: form.value.sex,
    language: form.value.language.join(', '),
  };
  submitted.value = true;
  resetForm();
}
function resetForm() {
  form.value = {
    name: '',
    email: '',
    password: '',
    birthday: '',
    sex: 'Nam',
    language: [],
  };
}
</script>
