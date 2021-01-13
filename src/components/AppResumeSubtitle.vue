<template>
  <h2>{{ value }}</h2>
</template>

<script>
export default {
  name: 'AppSubtitle',
  props: {
    value: {
      required: true,
      type: String
    }
  }
}
</script>
