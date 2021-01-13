<template>
  <div class="container">
    <app-alert :alert="alert" @close="alert = null"></app-alert>

    <div class="container column">
      <app-form @create="create"></app-form>

      <app-resume
        :blocks="blocks"
        :loading="isResumeLoading"
        @remove="remove"
        @moved="moved"
      ></app-resume>
    </div>

    <app-loader v-if="isCommentsLoading"></app-loader>

    <p v-else-if="!comments.length">
      <app-button type="primary" @click="loadComments"
        >Загрузить комментарии</app-button
      >
    </p>

    <app-comments v-else :comments="comments"></app-comments>
  </div>
</template>

<script>
import AppForm from '@/components/AppForm'
import AppResume from '@/components/AppResume'
import AppLoader from '@/components/AppLoader'
import AppAlert from '@/components/AppAlert'
import AppComments from '@/components/AppComments'
import AppButton from '@/components/AppButton'
import { convertFirebaseResponse, dangerAlert, request } from '@/utils'

export default {
  components: {
    AppForm,
    AppResume,
    AppLoader,
    AppAlert,
    AppComments,
    AppButton
  },
  data() {
    return {
      resumeUrl: process.env.VUE_APP_FIREBASE_URL + '/resume',
      blocks: [],
      comments: [],
      isCommentsLoading: false,
      alert: null,
      isResumeLoading: false
    }
  },
  mounted() {
    this.loadResume()
  },
  methods: {
    async create(data) {
      try {
        if (!data) {
          throw new Error('Форма не заполнена')
        }
        const block = {
          ...data,
          position: this.blocks.length + 1
        }
        const { name: id } = await request(this.resumeUrl, 'POST', block)
        this.blocks.push({
          id,
          ...block
        })
      } catch (e) {
        this.alert = dangerAlert(e.message)
      }
    },
    async loadResume() {
      this.isResumeLoading = true
      try {
        const data = await request(this.resumeUrl)

        if (data) {
          this.blocks = convertFirebaseResponse(data).sort(
            (a, b) => a.position - b.position
          )
        }
      } catch (e) {
        this.alert = dangerAlert(e.message)
      } finally {
        this.isResumeLoading = false
      }
    },
    async loadComments() {
      this.isCommentsLoading = true
      try {
        this.comments = await request(
          process.env.VUE_APP_COMMENTS_URL + '?_limit=42'
        )
      } catch (e) {
        this.alert = dangerAlert(e.message)
      } finally {
        this.isCommentsLoading = false
      }
    },
    async remove(id) {
      try {
        await request(this.resumeUrl + '/' + id, 'DELETE')
        this.blocks = this.blocks.filter(block => block.id !== id)
      } catch (e) {}
    },
    async moved({ newIndex, oldIndex }) {
      const minIndex = Math.min(newIndex, oldIndex)
      const maxIndex = Math.max(newIndex, oldIndex)
      const needsUpdate = this.blocks
        .slice(minIndex, maxIndex + 1)
        .map((block, idx) => ({
          ...block,
          position: idx + minIndex
        }))

      try {
        await Promise.all(
          needsUpdate.map(block =>
            request(this.resumeUrl + '/' + block.id, 'PATCH', {
              position: block.position
            })
          )
        )
      } catch (e) {
        this.alert = dangerAlert('Не удалось изменить позиции блоков')
      }
    }
  }
}
</script>
