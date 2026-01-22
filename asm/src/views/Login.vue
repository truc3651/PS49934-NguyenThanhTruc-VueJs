<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables'
import { ROUTES_MAP } from '../utils/constant'

const router = useRouter()
const { login } = useAuth()

const form = ref({
  email: '',
  password: ''
})
const errorMessage = ref('')

const handleSubmit = () => {
  errorMessage.value = ''
  const result = login(form.value.email, form.value.password)

  if (result.error) {
    errorMessage.value = result.error
    return
  }
  router.push({ name: ROUTES_MAP.HOME.name })
}
</script>

<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6 col-lg-5">
        <div class="card shadow">
          <div class="card-body p-4">
            <h2 class="card-title text-center mb-4">Login</h2>

            <div v-if="errorMessage" class="alert alert-danger" role="alert">
              {{ errorMessage }}
            </div>

            <form @submit.prevent="handleSubmit">
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

              <div class="d-grid">
                <button type="submit" class="btn btn-primary">
                  Login
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
