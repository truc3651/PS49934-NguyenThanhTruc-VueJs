<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth, usePosts } from '../composables'
import { ROUTES_MAP } from '../utils/constant'
import PostForm from '../components/PostForm.vue'
import { isEmpty } from 'lodash'

const router = useRouter()
const { currentUser } = useAuth()
const { createPost } = usePosts()

const errorMessage = ref('')

const handleSubmit = (formData) => {
  errorMessage.value = ''
  const {
    title,
    content,
    image
  } = formData

  if (isEmpty(title)) {
    errorMessage.value = 'Title is required'
    return
  }
  if (isEmpty(content)) {
    errorMessage.value = 'Content is required'
    return
  }
  if (isEmpty(image)) {
    errorMessage.value = 'Image is required'
    return
  }

  const newPost = createPost({
    title: title.trim(),
    content: content.trim(),
    image: image,
    authorId: currentUser.value.id
  })

  router.push({ name: ROUTES_MAP.POST_DETAIL.name, params: { id: newPost.id } })
}
</script>

<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-lg-8 mx-auto">
        <div class="mb-3">
          <router-link :to="{ name: ROUTES_MAP.HOME.name }" class="btn btn-outline-secondary btn-sm">
            &larr; Back to Home
          </router-link>
        </div>

        <div class="card shadow">
          <div class="card-body p-4">
            <h2 class="card-title mb-4">Create New Post</h2>

            <PostForm
              :error-message="errorMessage"
              submit-label="Create Post"
              @submit="handleSubmit"
            >
              <template #actions>
                <div class="d-flex gap-2">
                  <button type="submit" class="btn btn-primary">
                    Create Post
                  </button>
                  <router-link :to="{ name: ROUTES_MAP.HOME.name }" class="btn btn-outline-secondary">
                    Cancel
                  </router-link>
                </div>
              </template>
            </PostForm>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
