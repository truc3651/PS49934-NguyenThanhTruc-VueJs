<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      title: '',
      content: '',
      image: ''
    })
  },
  submitLabel: {
    type: String,
    default: 'Submit'
  },
  errorMessage: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['submit'])

const form = ref({
  title: props.initialData.title ?? '',
  content: props.initialData.content ?? '',
  image: props.initialData.image ?? ''
})

watch(
  () => props.initialData,
  (newData) => {
    form.value = {
      title: newData.title ?? '',
      content: newData.content ?? '',
      image: newData.image ?? ''
    }
  },
  { deep: true }
)

const handleSubmit = () => {
  emit('submit', { ...form.value })
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>

    <div class="mb-3">
      <label for="title" class="form-label">Title</label>
      <input
        type="text"
        class="form-control"
        id="title"
        v-model="form.title"
        required
      />
    </div>

    <div class="mb-3">
      <label for="content" class="form-label">Content</label>
      <textarea
        class="form-control"
        id="content"
        rows="10"
        v-model="form.content"
        required
      ></textarea>
    </div>

    <div class="mb-3">
      <label for="image" class="form-label">Image URL (optional)</label>
      <input
        type="url"
        class="form-control"
        id="image"
        v-model="form.image"
      />
    </div>

    <div v-if="form.image" class="mb-3">
      <label class="form-label">Image Preview</label>
      <div>
        <img
          :src="form.image"
          class="img-fluid rounded"
          style="max-height: 200px;"
          alt="Preview"
        />
      </div>
    </div>

    <slot name="actions">
      <button type="submit" class="btn btn-primary">
        {{ submitLabel }}
      </button>
    </slot>
  </form>
</template>
