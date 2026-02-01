<script setup>
import { ref, onMounted, watch } from 'vue'
import { isEmpty, debounce } from 'lodash'
import { usePosts, useReactions, useAuth, useAlert, useLoading } from '../composables'
import { ROUTES_MAP, REACTION_TYPES, ITEMS_PER_PAGE } from '../utils/constant'
import { formatDate, truncateContent } from '../utils/helper'
import Pagination from '../components/Pagination.vue'
import { usePagination } from '../composables/usePagination'

const { loadPosts, countPosts } = usePosts()
const { getUserReactionForPost, toggleReaction } = useReactions()
const { currentUser, isLoggedIn } = useAuth()
const { showError } = useAlert()
const {
  currentPage,
  totalCount,
  totalPages,
  pageNumbers,
  goToPage,
  goToNextPage,
  goToPreviousPage,
  resetPagination,
  setTotalCount
} = usePagination(ITEMS_PER_PAGE)
const { isLoading, withLoading } = useLoading(true)

const posts = ref([])
const searchQuery = ref('')
const userReactions = ref({})

const loadPostsData = (page = 1, query) => withLoading(async () => {
  const [postsResult, countResult] = await Promise.all([
    loadPosts(page, ITEMS_PER_PAGE, query),
    countPosts(query)
  ])

  if (postsResult?.errorMessage) {
    showError(postsResult.errorMessage)
    return
  }
  if (countResult?.errorMessage) {
    showError(countResult.errorMessage)
    return
  }

  posts.value = postsResult.data
  setTotalCount(countResult.data)
})

const loadUserReactionsData = async () => {
  if (!isLoggedIn.value) return
  for (const post of posts.value) {
    loadUserReactionData(post.id)
  }
}

const loadUserReactionData = async (postId) => {
  if (!isLoggedIn.value) return
  const userReaction = await getUserReactionForPost(postId, currentUser.value.id)
  if (userReaction?.errorMessage) {
    showError(userReaction.errorMessage)
    return
  }
  userReactions.value[postId] = userReaction.data
}

const handleReaction = async (postId, type) => {
  if (!isLoggedIn.value) return
  const toggleResult = await toggleReaction(postId, currentUser.value.id, type)
  if (toggleResult?.errorMessage) {
    showError(toggleResult.errorMessage)
    return
  }
  loadPostsData()
  loadUserReactionData(postId)
}

const debouncedSearch = debounce((query) => {
  resetPagination()
  loadPostsData(1, query)
}, 500)

watch(searchQuery, (newQuery) => {
  debouncedSearch(newQuery)
})

onMounted(async () => {
  await loadPostsData()
  await loadUserReactionsData()
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
          />
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="isEmpty(posts)" class="row">
      <div class="col-12">
        <div class="alert alert-info" role="alert">
          <span v-if="!!searchQuery">No posts found matching "{{ searchQuery }}"</span>
          <span v-else>No posts yet. Be the first to create one!</span>
        </div>
      </div>
    </div>

    <div v-else class="row">
      <div
        v-for="post in posts"
        :key="post.id"
        class="col-md-6 col-lg-4 mb-4"
      >
        <div class="card h-100 shadow-sm">
          <img
            :src="post.image"
            class="card-img-top"
            :alt="post.title"
            style="height: 200px; object-fit: cover;"
          />

          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ post.title }}</h5>
            <div class="card-text text-muted flex-grow-1 post-content" v-html="truncateContent(post.content, 150)"></div>
            <div class="mt-auto">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <small class="text-muted">
                  By <router-link
                    :to="{ name: ROUTES_MAP.AUTHOR_PROFILE.name, params: { id: post.authorId } }"
                    class="text-decoration-none author-link"
                  >{{ post.author.name }}</router-link>
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
                  :class="{ 'btn-secondary': userReactions[post.id]?.type === reaction.type }"
                  :disabled="!isLoggedIn"
                  @click="handleReaction(post.id, reaction.type)"
                >
                  {{ reaction.icon }}
                  <span :class="{ 'text-white': userReactions[post.id]?.type === reaction.type }">
                    {{ post.reactions[reaction.type] }}
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

    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      :page-numbers="pageNumbers"
      :total-count="totalCount"
      item-label="posts"
      @go-to-page="(page) => goToPage(page, () => loadPostsData(page, searchQuery.value))"
      @previous="goToPreviousPage(() => loadPostsData(currentPage, searchQuery))"
      @next="goToNextPage(() => loadPostsData(currentPage, searchQuery))"
    />
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
