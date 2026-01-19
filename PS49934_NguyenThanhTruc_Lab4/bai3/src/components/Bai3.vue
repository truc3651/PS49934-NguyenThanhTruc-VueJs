<template>
    <h1>{{ greeting }}</h1>
    <button @click="changeGreeting">{{ buttonTitle }}</button>
</template>

<script>
    export default {
        data() {
            return {
                greeting: 'Xin chào bạn!',
                buttonTitle: 'Click để thay đổi'
            }
        },
        methods: {
            changeGreeting() {
                this.greeting = 'Hello, World!'
                this.buttonTitle = 'Lời chào mới đã được cập nhật'
            }
        }
    }
</script>
