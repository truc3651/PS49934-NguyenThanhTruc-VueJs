<script setup>
import { ref, watch } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({
      title: '',
      content: '',
      image: ''
    })
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit'])

const form = ref({
  title: props.initialData.title ?? '',
  content: props.initialData.content ?? '',
  image: props.initialData.image ?? ''
})

const quillEditor = ref(null)

const editorOptions = {
  modules: {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  },
  placeholder: 'Write your content here...'
}

function imageHandler() {
  const url = prompt('Enter image URL:')
  
  if (url) {
    const quill = quillEditor.value.getQuill()
    const range = quill.getSelection(true)
    quill.insertEmbed(range.index, 'image', url, 'user')
    quill.setSelection(range.index + 1)
  }
}

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
    <div class="mb-3">
      <label for="title" class="form-label">Title</label>
      <input
        type="text"
        class="form-control"
        id="title"
        v-model="form.title"
        required
        :disabled="isLoading"
      />
    </div>

    <div class="mb-3">
      <label class="form-label">Content</label>
      <div style="min-height: 500px;">
        <QuillEditor
          ref="quillEditor"
          v-model:content="form.content"
          content-type="html"
          theme="snow"
          :options="editorOptions"
          :disabled="isLoading"
          style="height: 450px;"
        />
      </div>
    </div>

    <div class="mb-3">
      <label for="image" class="form-label">Featured Image URL</label>
      <input
        type="url"
        class="form-control"
        id="image"
        v-model="form.image"
        required
        :disabled="isLoading"
      />
    </div>

    <div v-if="form.image" class="mb-3">
      <label class="form-label">Featured Image Preview</label>
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
    </slot>
  </form>
</template>