<template>
  <button class="btn" :class="type" @click="$emit('click', $event)">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  emits: {
    click(event) {
      return event instanceof MouseEvent
    }
  },
  props: {
    type: {
      type: String,
      default: '',
      validator(value) {
        return ['', 'primary', 'danger', 'warning'].includes(value)
      }
    }
  }
}
</script>
