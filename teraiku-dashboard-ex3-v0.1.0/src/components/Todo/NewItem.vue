<template>


  <div>
    <q-select clearable filled color="purple-12" v-model="model" :options="tag" label="Label" />
    <q-input
      v-model="text"
      label="タスクを追加"

    >
    <!-- @keyup.enter="submit" -->
    <template v-slot:append>
      
      <q-btn
      @click="submit"
      round
      dense
      flat
      icon="add" />
    </template>
  </q-input>
  
</div>
</template>

<script>
  import { ref } from 'vue'

export default {
  name: 'IndexPage',
  data () {
    return {
      text: '',
      // title: '',
      // description: '',
      // date: ref('2019/02/01')
      model: ref('Google'),
      tag: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ]
    }
  },
  methods: {
    submit () {
      if (this.text.trim().length > 0) {
        this.$store.commit('todoModule/addItem', { text: this.text })
        this.text = ''
      }
    }
  }
}
</script>
