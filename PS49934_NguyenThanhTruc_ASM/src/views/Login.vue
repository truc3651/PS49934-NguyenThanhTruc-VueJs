<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth, useAlert, useLoading } from '../composables'
import { ROUTES_MAP } from '../utils/constant'

const router = useRouter()
const { login } = useAuth()
const { showError } = useAlert()
const { isLoading, withLoading } = useLoading()

const form = ref({
  email: '',
  password: ''
})

const handleSubmit = () => withLoading(async () => {
  const result = await login(form.value.email, form.value.password)

  if (result?.errorMessage) {
    showError(result.errorMessage)
    return
  }
  router.push({ name: ROUTES_MAP.HOME.name })
})
</script>

<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6 col-lg-5">
        <div class="card shadow">
          <div class="card-body p-4">
            <h2 class="card-title text-center mb-4">Login</h2>

            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="form.email"
                  required
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
                  required
                  :disabled="isLoading"
                />
              </div>

              <div class="d-grid">
                <button type="submit" class="btn btn-primary" :disabled="isLoading">
                  <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status"></span>
                  {{ isLoading ? 'Logging in...' : 'Login' }}
                </button>
              </div>
            </form>

            <div class="text-center mt-3">
              <p class="mb-0">
                Don't have an account?
                <router-link :to="{ name: ROUTES_MAP.REGISTER.name }" class="text-decoration-none">
                  Register here
                </router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
