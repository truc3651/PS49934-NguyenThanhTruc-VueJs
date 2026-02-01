<template>
  <nav v-if="totalPages > 1" class="mt-4">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" href="#" @click.prevent="$emit('previous')">Previous</a>
      </li>
      <li
        v-for="page in pageNumbers"
        :key="page"
        class="page-item"
        :class="{ active: currentPage === page }"
        :disabled="currentPage !== page"
      >
        <a class="page-link" href="#" @click.prevent="$emit('goToPage', page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" href="#" @click.prevent="$emit('next')">Next</a>
      </li>
    </ul>
    <p class="text-center text-muted small">
      Page {{ currentPage }} of {{ totalPages }} ({{ totalCount }} {{ itemLabel }})
    </p>
  </nav>
</template>

<script setup>
defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  pageNumbers: {
    type: Array,
    required: true
  },
  totalCount: {
    type: Number,
    required: true
  },
  itemLabel: {
    type: String,
    default: 'items'
  }
})

defineEmits(['goToPage', 'previous', 'next'])
</script>