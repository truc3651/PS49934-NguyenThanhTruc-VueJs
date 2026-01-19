<template>
  <div class="card">
    <div class="card-header">
      <h3>Tạo bài viết mới</h3>
    </div>
    <div class="card-body">
      <form>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="Tiêu đề bài viết"
            v-model="title"
          />
          <label for="floatingInput">Tiêu đề bài viết</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="Tên tác giả"
            v-model="author"
          />
          <label for="floatingInput">Tên tác giả</label>
        </div>
        <div class="form-floating mb-3">
          <textarea
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="Nội dung bài viết"
            v-model="content"
          ></textarea>
          <label for="floatingInput">Nội dung bài viết</label>
        </div>

        <button type="button" @click="submitPost" class="btn btn-primary">Đang bài</button>
      </form>
    </div>
  </div>
</template>

<script setup>
    import {ref} from 'vue'

    const addPostEventName = 'add-post'
    const emit = defineEmits([addPostEventName])
    const title = ref('')
    const author = ref('')
    const content = ref('')

    function submitPost() {
        if (title.value && content.value && author.value) {
            const newPost = {
                title: title.value,
                content: content.value,
                author: author.value
            }
            emit(addPostEventName, newPost)
            title.value = ''
            content.value = ''
            author.value = ''
        }
    }
</script>
