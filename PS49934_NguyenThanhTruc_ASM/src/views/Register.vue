<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth, useAlert, useLoading } from '../composables'
import { ROUTES_MAP } from '../utils/constant'
import { isEmpty } from 'lodash'

const router = useRouter()
const { register } = useAuth()
const { showError, showSuccess } = useAlert()
const { isLoading, withLoading } = useLoading()

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  avatar: ''
})

const handleSubmit = async () => {
  const { name, email, password, confirmPassword, avatar } = form.value

  if (isEmpty(name)) {
    showError('Name is required')
    return
  }
  if (isEmpty(email)) {
    showError('Email is required')
    return
  }
  if (isEmpty(password)) {
    showError('Password is required')
    return
  }
  if (password !== confirmPassword) {
    showError('Passwords do not match')
    return
  }
  if (password !== confirmPassword) {
    showError('Passwords do not match')
    return
  }

  await withLoading(async () => {
    const result = await register(name, email, password, avatar)

    if (result?.errorMessage) {
      showError(result.errorMessage)
      return
    }
    showSuccess('Registration successful! Redirecting to login...')
    setTimeout(() => {
      router.push({ name: ROUTES_MAP.LOGIN.name })
    }, 2000)
  })
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6 col-lg-5">
        <div class="card shadow">
          <div class="card-body p-4">
            <h2 class="card-title text-center mb-4">Register</h2>

            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="name" class="form-label">Full Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="form.name"
                  :disabled="isLoading"
                />
              </div>

              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="form.email"
                  :disabled="isLoading"
                />
              </div>

              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="form.password"
                  :disabled="isLoading"
                />
              </div>

              <div class="mb-3">
                <label for="confirmPassword" class="form-label">Confirm Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  :disabled="isLoading"
                />
              </div>

              <div class="mb-3">
                <label for="avatar" class="form-label">Avatar URL (optional)</label>
                <input
                  type="url"
                  class="form-control"
                  id="avatar"
                  v-model="form.avatar"
                  :disabled="isLoading"
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
                <button type="submit" class="btn btn-primary" :disabled="isLoading">
                  <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                  {{ isLoading ? 'Registering...' : 'Register' }}
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
