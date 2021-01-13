<template>
  <div class="avatar">
    <img :src="value" />
  </div>
</template>

<script>
export default {
  name: 'AppAvatar',
  props: {
    value: {
      required: true,
      type: String
    }
  }
}
</script>

<style scoped>
.avatar {
  display: flex;
  justify-content: center;
}

.avatar img {
  width: 150px;
  height: auto;
  border-radius: 50%;
}
</style>
