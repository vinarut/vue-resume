<template>
  <app-loader v-if="loading"></app-loader>

  <div class="card card-w70" v-else>
    <template v-if="blocks.length">
      <component
        v-for="block in blocks"
        :is="componentName(block.type)"
        :key="block.id"
        :value="block.value"
      ></component>
    </template>

    <h3 v-else>Добавьте первый блок, чтобы увидеть результат</h3>
  </div>
</template>

<script>
import AppTitle from '@/components/AppTitle'
import AppAvatar from '@/components/AppAvatar'
import AppSubtitle from '@/components/AppSubtitle'
import AppText from '@/components/AppText'
import AppLoader from '@/components/AppLoader'

export default {
  name: 'AppResume',
  components: {
    AppTitle,
    AppAvatar,
    AppSubtitle,
    AppText,
    AppLoader
  },
  props: {
    blocks: {
      type: Array,
      default: () => []
    },
    loading: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  methods: {
    componentName(type) {
      return 'app-' + type
    }
  }
}
</script>
