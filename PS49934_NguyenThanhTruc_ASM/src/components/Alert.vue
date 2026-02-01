<script setup>
import { useAlert } from '../composables/useAlert'

const { alerts, removeAlert } = useAlert()
</script>

<template>
  <div class="position-fixed top-1 end-0 p-3">
    <TransitionGroup name="alert">
      <div
        v-for="alert in alerts"
        :key="alert.id"
        class="alert alert-dismissible fade show shadow"
        :class="`alert-${alert.type}`"
        role="alert"
      >
        {{ alert.message }}
        <button
          type="button"
          class="btn-close"
          @click="removeAlert(alert.id)"
        ></button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
</style>
