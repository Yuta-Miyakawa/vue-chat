<template>
  <div class="q-pa-md" style="max-width: 600px">
    <q-bar class="notification">
      通知
      <q-space />
      <!-- <q-btn dense flat round icon="close" @click="onClose" /> -->
    </q-bar>

    <q-list style="width: 400px" separator>
      <message v-for="message in messagesList" v-bind:key="message.id" :message="message"></message>
    </q-list>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

import Message from './message.vue';
export default defineComponent({
  name: "Messages",
  components: { Message },
  setup() {
    return {
      messagesList: [
        // {
        //   id: '1',
        //   from: 'Slack',
        //   subject: 'Current Job result: SUCCESS',
        //   text: 'service-pipeline-branches/master:65e1b0d6-21f0-498d-9510-5a2acc49b06b',
        //   icon: 'mdi-slack',
        //   date: '4/23/20'
        {
          id: '1',
          from: '田中陽子',
          subject: '法要について',
          text: '法要のことについてお話があります。近く伺います。',
          avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
          date: '4/23/20'
        },
        { id: '2',
          from: '中野太郎',
          subject: 'お彼岸の予約の件',
          text: 'お彼岸の予約をします。今年もよろしくお願いします。',
          avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
          date: '4/23/20' }
      ]
    }
  },
  methods: {
    onClose() {
      this.$emit('close');
    }
  }
})
</script>

<style lang="scss" scoped>
.notification {
  background-color: transparent;
  font-size: 1.2em;
}


</style>