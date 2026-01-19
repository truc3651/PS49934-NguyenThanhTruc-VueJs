<template>
  <div class="container mt-5">
    <h1 class="text-center">Kiến thức sức khỏe cộng đồng</h1>
    <div class="row">
      <div class="col-sm-4" v-for="(p, i) in posts" :key="i">
        <div class="card">
          <img :src="p.image" alt="Hình ảnh" />
          <div class="card-body">
            <h3 class="card-title">{{ p.title }}</h3>
            <p class="card-text">{{ p.content }}</p>
            <button class="btn btn-info">Xem chi tiết</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import img1 from '../../images/video1.jpg';
import img2 from '../../images/video2.jpg';
import img3 from '../../images/video3.jpg';
import { ref } from 'vue';

const posts = ref([
  {
    title: '8 loại rau củ quả giàu canxi',
    content:
      'Canxi là khoáng chất cần thiết đối với cơ thể người. Có nhiều cách để bổ sung canxi, trong đó bổ sung qua đường ăn uống là cách tốt nhất',
    image: img1,
  },
  {
    title: 'Các loại gia vị tốt cho sức khỏe',
    content:
      'Một số loại gia vị cung cấp nhiều polyphenol, chống oxy hóa cao hơn các loại gia vị quen thuộc khác. Với một lượng nhỏ các món ăn đã thêm',
    image: img2,
  },
  {
    title: '9 loại đậu bổ dưỡng nên dùng nhiều',
    content:
      'Đậu lăng, đậu nành, đậu phộng, đậu Hà Lan giàu chất xơ, protein cùng nhiều vitamin và khoáng chất, giúp giảm lượng đường trong máu, tốt cho tim',
    image: img3,
  },
]);
</script>
