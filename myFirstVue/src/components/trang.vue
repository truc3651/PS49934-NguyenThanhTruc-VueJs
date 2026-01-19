<template>
    <div>
        <h1>Hiển thị nội dung ở đây</h1>
        <h2>{{message}}</h2>
        <h2 v-html="number+5"></h2>
        <h4>{{ sayhi() }}</h4>
        <button @click="changecontent()">Change</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                message: 'Xin chao Vuejs',
                number: 10
            }
        },
        methods: {
            sayhi(){
                return 'Day la phuong thuc'
            },
            changecontent() {
                this.message = 'day la noi dung'
            }
        }
    }
</script>