<template>
    <div class="mt-3">
        <h3>Danh sách bài viết</h3>
        <div v-for="(p, i) in posts" :key="i" class="card mb-3" :class="{'highlighted': p.title.length>20}">
            <div class="card-body">
                <h3 class="card-title text-success"> {{ p.title }}</h3>
                <h4 class="card-subtitle text-body-secondary">{{ p.author }}</h4>
                <p class="card-text">{{ p.content }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PostList',
        props: {
            posts: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style>
    .highlighted {
        border: 2px solid red !important;
    }
</style>