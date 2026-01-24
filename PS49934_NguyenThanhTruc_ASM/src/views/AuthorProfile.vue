<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePosts, useReactions } from '../composables'
import { ROUTES_MAP } from '../utils/constant'
import { formatDate, truncateContent, getAuthorById } from '../utils/helper'
import { isEmpty } from 'lodash'

const route = useRoute()
const router = useRouter()

const { loadPostsByAuthorId } = usePosts()
const { getTotalReactionCountsByPostId } = useReactions()

const author = ref(null)
const authorPosts = ref([])

const totalPosts = computed(() => authorPosts.value.length)
const totalReactions = computed(() => {
  return authorPosts.value.reduce((sum, post) => {
    return sum + getTotalReactionCountsByPostId(post.id)
  }, 0)
})

const loadAuthorData = () => {
  const authorId = parseInt(route.params?.id)
  author.value = getAuthorById(authorId)

  if (isEmpty(author.value)) {
    router.push({ name: ROUTES_MAP.HOME.name })
    return
  }
  authorPosts.value = loadPostsByAuthorId(authorId)
}

onMounted(() => {
  loadAuthorData()
})
</script>

<template>
  <div class="container mt-4">
    <div class="mb-3">
      <router-link :to="{ name: ROUTES_MAP.HOME.name }" class="btn btn-outline-secondary btn-sm">
        &larr; Back to Home
      </router-link>
    </div>

    <div v-if="author" class="row">
      <div class="col-lg-4 mb-4">
        <div class="card shadow">
          <div class="card-body text-center">
            <img
              :src="author.avatar"
              :alt="author.name"
              class="rounded-circle mb-3"
              style="width: 150px; height: 150px; object-fit: cover;"
            />
            <h3 class="card-title mb-1">{{ author.name }}</h3>
            <p class="text-muted mb-3">{{ author.email }}</p>

            <hr />

            <div class="row text-center">
              <div class="col-6">
                <h4 class="mb-0">{{ totalPosts }}</h4>
                <small class="text-muted">Posts</small>
              </div>
              <div class="col-6">
                <h4 class="mb-0">{{ totalReactions }}</h4>
                <small class="text-muted">Reactions</small>
              </div>
            </div>

            <hr />

            <p class="text-muted mb-0">
              <small>Member since {{ formatDate(author.createdAt) }}</small>
            </p>
          </div>
        </div>
      </div>

      <div class="col-lg-8">
        <h4 class="mb-3">Posts by {{ author.name }}</h4>

        <div v-if="!authorPosts.length" class="alert alert-info">
          This author hasn't published any posts yet.
        </div>

        <div v-else class="row">
          <div
            v-for="post in authorPosts"
            :key="post.id"
            class="col-md-6 mb-4"
          >
            <div class="card h-100 shadow-sm">
              <img
                :src="post.image"
                class="card-img-top"
                :alt="post.title"
                style="height: 150px; object-fit: cover;"
              />

              <div class="card-body d-flex flex-column">
                <h6 class="card-title">{{ post.title }}</h6>
                <p class="card-text text-muted small flex-grow-1">
                  {{ truncateContent(post.content, 100) }}
                </p>
                <div class="mt-auto">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <small class="text-muted">
                      {{ formatDate(post.createdAt) }}
                    </small>
                    <span class="badge bg-light text-dark">
                      {{ getTotalReactionCountsByPostId(post.id) }} reactions
                    </span>
                  </div>
                  <router-link
                    :to="{ name: ROUTES_MAP.POST_DETAIL.name, params: { id: post.id } }"
                    class="btn btn-outline-primary btn-sm w-100"
                  >
                    Read More
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
