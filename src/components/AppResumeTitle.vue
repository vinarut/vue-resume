<template>
  <h1>{{ value }}</h1>
</template>

<script>
export default {
  name: 'AppTitle',
  props: {
    value: {
      required: true,
      type: String
    }
  }
}
</script>
