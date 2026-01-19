<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6 col-lg-5">
        <div class="card mb-3">
          <img src="../../images/video1.jpg" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title">8 loại rau củ quả giàu canxi</h5>
            <p class="card-text">
              Canxi là khoáng chất cần thiết đối với cơ thể người. Có nhiều cách
              để bổ sung canxi, trong đó bổ sung qua đường ăn uống là cách tốt
              nhất. Có 8 loại rau củ quả giàu canxi...
            </p>
          </div>
        </div>

        <form @submit.prevent="submitComment">
          <div class="mb-3">
            <textarea
              id="commentText"
              rows="3"
              class="form-control"
              v-model="commentText"
              placeholder="Nhập bình luận của bạn"
            ></textarea>
          </div>
          <button type="submit" class="btn btn-success">Gửi bình luận</button>
        </form>

        <div v-if="comments.length" class="mt-4">
          <h5>Danh sách các bình luận:</h5>
          <ul class="list-group">
            <li
              v-for="(comment, index) in comments"
              :key="index"
              class="list-group-item"
            >
              <strong>{{ comment.name }}:</strong> {{ comment.text }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['username']);
const commentText = ref('');
const comments = ref([
  {
    name: 'Bình An',
    text: 'Bài viết rất hữu ích',
  },
]);
function submitComment() {
  if (commentText.value.trim()) {
    comments.value.push({
      name: props.username,
      text: commentText.value,
    });
    commentText.value = '';
  }
}
</script>
