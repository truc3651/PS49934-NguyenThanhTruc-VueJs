<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { isEmpty } from 'lodash'
import { useAuth, usePosts, useAlert, useLoading, useReactions } from '../composables'
import { ITEMS_PER_PAGE, ROUTES_MAP } from '../utils/constant'
import { formatDate, truncateContent } from '../utils/helper'
import { usePagination } from '../composables/usePagination'
import Pagination from '../components/Pagination.vue'

const route = useRoute()
const router = useRouter()

const { getAuthorById } = useAuth()
const { loadPostsByAuthorId, countPostsByAuthorId } = usePosts()
const { countReactionsByAuthorId } = useReactions()
const { showError } = useAlert()
const {
  currentPage,
  totalCount,
  totalPages,
  pageNumbers,
  goToPage,
  goToNextPage,
  goToPreviousPage,
  setTotalCount
} = usePagination(ITEMS_PER_PAGE)
const { isLoading, withLoading } = useLoading(true)

const author = ref(null)
const authorPosts = ref([])
const totalPosts = ref(0)
const totalReactions = ref(0)

const loadAuthorData = () => withLoading(async () => {
  const authorId = route.params?.id
  const authorResult = await getAuthorById(authorId)

  if (authorResult.errorMessage) {
    showError(authorResult.errorMessage)
    router.push({ name: ROUTES_MAP.HOME.name })
    return
  }
  author.value = authorResult.data

  if (isEmpty(author.value)) {
    showError('Author not found')
    router.push({ name: ROUTES_MAP.HOME.name })
    return
  }

  await loadPostsCount()
  await loadPostsData(currentPage.value)
  await loadReactionsCount()  
})

const loadPostsCount = async () => {
  const postsCountResult = await countPostsByAuthorId(author.value.id)
  if (postsCountResult.errorMessage) showError(postsCountResult.errorMessage)
  totalPosts.value = postsCountResult.data
  setTotalCount(postsCountResult.data)
}

const loadPostsData = async (page) => {
  const result = await loadPostsByAuthorId(author.value.id, page, ITEMS_PER_PAGE)
  if (result.errorMessage) showError(result.errorMessage)
  authorPosts.value = result.data
}

const loadReactionsCount = async () => {
  const reactionsCountResult = await countReactionsByAuthorId(author.value.id)
  if (reactionsCountResult.errorMessage) showError(reactionsCountResult.errorMessage)
  totalReactions.value = reactionsCountResult.data
}

onMounted(async () => {
  await loadAuthorData()
})
</script>

<template>
  <div class="container mt-4">
    <div class="mb-3">
      <router-link :to="{ name: ROUTES_MAP.HOME.name }" class="btn btn-outline-secondary btn-sm">
        &larr; Back to Home
      </router-link>
    </div>

    <div v-if="isLoading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="author" class="row">
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
                <p class="card-text text-muted small flex-grow-1" v-html="truncateContent(post.content, 100)">
                </p>
                <div class="mt-auto">
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <small class="text-muted">
                      {{ formatDate(post.createdAt) }}
                    </small>
                    <span class="badge bg-light text-dark">
                      {{ Object.values(post.reactions).filter(value => value !== 0).length }} reactions
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
          <Pagination
            :current-page="currentPage"
            :total-pages="totalPages"
            :page-numbers="pageNumbers"
            :total-count="totalCount"
            item-label="posts"
            @go-to-page="(page) => goToPage(page, () => loadPostsData(page))"
            @previous="goToPreviousPage(() => loadPostsData(currentPage))"
            @next="goToNextPage(() => loadPostsData(currentPage))"
          />
        </div>
      </div>
    </div>
  </div>
</template>
