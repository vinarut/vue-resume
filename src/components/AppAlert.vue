<template>
  <div class="alert" v-if="alert" :class="alert.type">
    <h3>{{ alert.title }}</h3>
    <p>{{ alert.text }}</p>
    <app-button :type="alert.type" @click="$emit('close')">Закрыть</app-button>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton'

export default {
  name: 'AppAlert',
  components: { AppButton },
  props: {
    alert: [Object, null]
  },
  emits: ['close']
}
</script>
