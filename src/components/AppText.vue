<template>
  <p>{{ value }}</p>
</template>

<script>
export default {
  name: 'AppText',
  props: {
    value: {
      required: false,
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped></style>
