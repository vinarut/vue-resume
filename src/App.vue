<template>
  <div class="container">
    <app-alert :alert="alert" @close="alert = null"></app-alert>

    <div class="container column">
      <app-form @create="create"></app-form>

      <app-resume :blocks="blocks" :loading="isResumeLoading"></app-resume>
    </div>

    <p v-if="!comments.length && !isCommentsLoading">
      <app-button type="primary" @click="loadComments"
        >Загрузить комментарии</app-button
      >
    </p>

    <app-comments
      v-else-if="comments.length"
      :comments="comments"
    ></app-comments>

    <app-loader v-else-if="isCommentsLoading"></app-loader>
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
      resumeUrl: process.env.VUE_APP_FIREBASE_URL + '/resume.json',
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
        const { name: id } = await request(this.resumeUrl, 'POST', data)
        this.blocks.push({
          id,
          ...data
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
          this.blocks = convertFirebaseResponse(data)
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
          'https://jsonplaceholder.typicode.com/comments?_limit=42'
        )
      } catch (e) {
        this.alert = dangerAlert(e.message)
      } finally {
        this.isCommentsLoading = false
      }
    }
  }
}
</script>
