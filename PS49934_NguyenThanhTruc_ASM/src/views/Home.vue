<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePosts, useReactions, useAuth } from '../composables'
import { ROUTES_MAP, REACTION_TYPES } from '../utils/constant'
import { formatDate, truncateContent, getAuthorName } from '../utils/helper'
import { isEmpty, range } from 'lodash'

const { posts, loadPosts } = usePosts()
const { getReactionCount, getUserReactionForPost, toggleReaction } = useReactions()
const { currentUser, isLoggedIn } = useAuth()

const searchQuery = ref('')
const currentPage = ref(1)
const postsPerPage = 6

const filteredPosts = computed(() => {
  if (isEmpty(searchQuery.value)) return posts.value
  const query = searchQuery.value.toLowerCase()
  return posts.value.filter(
    (post) =>
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query)
  )
})

const totalPages = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage))

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  return filteredPosts.value.slice(start, start + postsPerPage)
})

const pageNumbers = computed(() => range(1, totalPages.value + 1))

const getUserReaction = (postId) => {
  if (isLoggedIn.value)
    return getUserReactionForPost(postId, currentUser.value.id)
}

const handleReaction = (postId, type) => {
  if (isLoggedIn.value) {
    toggleReaction(postId, currentUser.value.id, type)
    loadPosts()
  }
}

const resetPagination = () => {
  currentPage.value = 1
}

onMounted(() => {
  loadPosts()
})
</script>

<template>
  <div class="container mt-4">
    <div class="row mb-4">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h1 class="mb-0">Blog Posts</h1>
          <router-link :to="{ name: ROUTES_MAP.CREATE_POST.name }" class="btn btn-primary">
            Create New Post
          </router-link>
        </div>

        <div class="input-group">
          <span class="input-group-text">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Search posts..."
            v-model="searchQuery"
            @input="resetPagination"
          />
        </div>
      </div>
    </div>

    <div v-if="isEmpty(filteredPosts)" class="row">
      <div class="col-12">
        <div class="alert alert-info" role="alert">
          <span v-if="!!searchQuery">No posts found matching "{{ searchQuery }}"</span>
          <span v-else>No posts yet. Be the first to create one!</span>
        </div>
      </div>
    </div>

    <div class="row">
      <div
        v-for="post in paginatedPosts"
        :key="post.id"
        class="col-md-6 col-lg-4 mb-4"
      >
        <div class="card h-100 shadow-sm">
          <img
            v-if="post.image"
            :src="post.image"
            class="card-img-top"
            :alt="post.title"
            style="height: 200px; object-fit: cover;"
          />
          <div
            v-else
            class="card-img-top bg-secondary d-flex align-items-center justify-content-center"
            style="height: 200px;"
          >
            <span class="text-white">No Image</span>
          </div>

          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text text-muted flex-grow-1">
              {{ truncateContent(post.content) }}
            </p>
            <div class="mt-auto">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <small class="text-muted">
                  By <router-link
                    :to="{ name: ROUTES_MAP.AUTHOR_PROFILE.name, params: { id: post.authorId } }"
                    class="text-decoration-none author-link"
                  >{{ getAuthorName(post.authorId) }}</router-link>
                </small>
                <small class="text-muted">
                  {{ formatDate(post.createdAt) }}
                </small>
              </div>

              <div class="d-flex align-items-center gap-1 mb-2">
                <button
                  v-for="(reaction, key) in REACTION_TYPES"
                  :key="key"
                  class="btn btn-sm btn-outline-secondary reaction-btn"
                  :class="{ 'btn-outline-info': getUserReaction(post.id)?.type === reaction.type }"
                  :disabled="!isLoggedIn"
                  @click="handleReaction(post.id, reaction.type)"
                >
                  {{ reaction.icon }}
                  <span>
                    {{ getReactionCount(post.id, reaction.type) || '' }}
                  </span>
                </button>
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

    <nav v-if="totalPages > 1" class="mt-4">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="currentPage--">Previous</a>
        </li>
        <li
          v-for="page in pageNumbers"
          :key="page"
          class="page-item"
          :class="{ active: currentPage === page }"
        >
          <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="currentPage++">Next</a>
        </li>
      </ul>
      <p class="text-center text-muted small">
        Page {{ currentPage }} of {{ totalPages }} ({{ filteredPosts.length }} posts)
      </p>
    </nav>
  </div>
</template>

<style scoped>
.reaction-btn {
  padding: 2px 6px;
  font-size: 12px;
}

.author-link {
  color: #0d6efd;
  font-weight: 500;
}

.author-link:hover {
  text-decoration: underline !important;
}
</style>
