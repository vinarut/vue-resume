<template>
  <app-loader v-if="loading"></app-loader>

  <div class="card card-w70" v-else>
    <template v-if="blocks.length">
      <draggable
        :list="blocks"
        group="blocks"
        @start="drag = true"
        @end="drag = false"
        @change="moved"
        item-key="id"
      >
        <template #item="{element: {type, value, id}}">
          <div class="list-item">
            <component :is="componentName(type)" :value="value"></component>
            <span class="material-icons" @click="$emit('remove', id)">
              delete_outline
            </span>
          </div>
        </template>
      </draggable>
    </template>

    <h3 v-else>Добавьте первый блок, чтобы увидеть результат</h3>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import AppResumeTitle from '@/components/AppResumeTitle'
import AppResumeAvatar from '@/components/AppResumeAvatar'
import AppResumeSubtitle from '@/components/AppResumeSubtitle'
import AppResumeText from '@/components/AppResumeText'
import AppLoader from '@/components/AppLoader'

export default {
  name: 'AppResume',
  components: {
    draggable,
    AppResumeTitle,
    AppResumeAvatar,
    AppResumeSubtitle,
    AppResumeText,
    AppLoader
  },
  emits: {
    remove(id) {
      return typeof id === 'string'
    },
    moved(data) {
      return (
        data &&
        typeof data.newIndex === 'number' &&
        typeof data.oldIndex === 'number'
      )
    }
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
      return 'app-resume-' + type
    },
    moved({ moved }) {
      if (moved) {
        this.$emit('moved', moved)
      }
    }
  }
}
</script>

<style scoped>
.material-icons:hover {
  cursor: pointer;
}

.list-item {
  position: relative;
}

.list-item > :first-child {
  flex-grow: 1;
}

.list-item > :last-child {
  position: absolute;
  right: 10px;
}
</style>
