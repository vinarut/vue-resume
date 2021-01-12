<template>
  <form
    class="card card-w30"
    @submit.prevent="create"
    @keyup.shift.enter="create"
  >
    <div class="form-control">
      <label for="type">Тип блока</label>
      <select id="type" v-model="type">
        <option v-for="{ type, text } in types" :value="type" :key="type">{{
          text
        }}</option>
      </select>
    </div>

    <div class="form-control">
      <label for="value">Значение</label>
      <textarea id="value" rows="3" v-model.trim="value"></textarea>
    </div>

    <app-button type="primary" :disabled="!canAdd">Добавить</app-button>
  </form>
</template>

<script>
import AppButton from '@/components/AppButton'

export default {
  name: 'AppForm',
  components: { AppButton },
  emits: {
    create(data) {
      if (data && data.type && data.value) {
        return true
      }

      console.warn('Empty data in create emit')
      return false
    }
  },
  data() {
    return {
      types: [
        { type: 'title', text: 'Заголовок' },
        { type: 'subtitle', text: 'Подзаголовок' },
        { type: 'avatar', text: 'Аватар' },
        { type: 'text', text: 'Текст' }
      ],
      type: 'title',
      value: ''
    }
  },
  methods: {
    create() {
      if (this.canAdd) {
        this.$emit('create', {
          type: this.type,
          value: this.value
        })
        this.type = 'title'
        this.value = ''
      }
    }
  },
  computed: {
    canAdd() {
      return this.value.length > 3
    }
  }
}
</script>
