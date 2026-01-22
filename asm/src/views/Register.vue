<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables'
import { ROUTES_MAP } from '../utils/constant'

const router = useRouter()
const { register } = useAuth()

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  avatar: ''
})
const errorMessage = ref('')
const successMessage = ref('')

const handleSubmit = () => {
  errorMessage.value = ''
  successMessage.value = ''
  const { name, email, password, confirmPassword, avatar } = form.value

  if (password !== confirmPassword) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  const result = register(name, email, password, avatar)
  if (result.error) {
    errorMessage.value = result.error
    return
  }
  successMessage.value = 'Registration successful! Redirecting to login...'
  setTimeout(() => {
    router.push({ name: ROUTES_MAP.LOGIN.name })
  }, 2000)
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6 col-lg-5">
        <div class="card shadow">
          <div class="card-body p-4">
            <h2 class="card-title text-center mb-4">Register</h2>

            <div v-if="errorMessage" class="alert alert-danger" role="alert">
              {{ errorMessage }}
            </div>

            <div v-if="successMessage" class="alert alert-success" role="alert">
              {{ successMessage }}
            </div>

            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="name" class="form-label">Full Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="form.name"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="form.email"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="form.password"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="avatar" class="form-label">Avatar URL (optional)</label>
                <input
                  type="url"
                  class="form-control"
                  id="avatar"
                  v-model="form.avatar"
                />
              </div>

              <div v-if="form.avatar" class="mb-3 text-center">
                <img
                  :src="form.avatar"
                  class="rounded-circle"
                  style="width: 80px; height: 80px; object-fit: cover;"
                  alt="Avatar preview"
                />
              </div>

              <div class="d-grid">
                <button type="submit" class="btn btn-primary">
                  Register
                </button>
              </div>
            </form>

            <div class="text-center mt-3">
              <p class="mb-0">
                Already have an account?
                <router-link :to="{ name: ROUTES_MAP.LOGIN.name }" class="text-decoration-none">
                  Login here
                </router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
