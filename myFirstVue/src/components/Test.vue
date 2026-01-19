<template>
  <div class="greetings">
    <h1 class="green">This is test view component</h1>
    <div>
      <h4>Count: {{ count }}</h4>
      <h4>Message: {{ msg }}</h4>
      <h4>Name: {{ user.name }}</h4>
      <h4>Age: {{ user.age }}</h4>
    </div>
    <button type="button" @click="reset">Reset</button>
    <button type="button" @click="increase">Increase</button>
    <button type="button" @click="decrease">Decrease</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      msg: 'Message content',
      user: {
        name: 'truc',
        age: 18,
      },
    };
  },
  methods: {
    increase () {this.count++;},
    decrease () {this.count--;},
    reset () {this.count=0}
  },
};
</script>
