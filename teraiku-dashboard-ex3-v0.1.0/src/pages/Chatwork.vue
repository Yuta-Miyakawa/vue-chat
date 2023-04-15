<template>
  <q-page
  	ref="pageChat"
  	class="page-chat flex column q-pa-md">



        <h4>個別トークルーム</h4><h7>田中陽子さん</h7>



    <div class="row justify-center chatscreen">
    <div style="width: 100%;">
      <q-chat-message
        label="2022/07/10"
      />

       <q-chat-message
        name="田中陽子"
        avatar="https://cdn.quasar.dev/img/avatar2.jpg"
        :text="['お世話になっております。ああああああ今年も暑いですね。']"
        stamp="21:00"
      />

       <q-chat-message
        name="田中陽子"
        avatar="https://cdn.quasar.dev/img/avatar2.jpg"
        :text="['ご住職は、いかがお過ごしですか？']"
        stamp="21:00"
      />
      <q-chat-message
        name=""
        avatar="../assets/img/monk.svg"
        :text="[
            'お世話になっております。次の法要の予定は 9月7日(水)です。',
        ]"
        sent
        stamp="20:45"
        />


      <q-chat-message
        name=""
        avatar="../assets/img/monk.svg"
        :text="[
            'ご尊父 一郎さまの７回忌となります。',
        ]"
        sent
        stamp="20:45"
      />


      <q-chat-message
        name=""
        avatar="https://cdn.quasar.dev/img/avatar2.jpg"
        :text="['大丈夫です。では9/7そちらの寺院に伺います。']"
        stamp="20:45"
      />
      <q-chat-message
        name=""
        avatar="../assets/img/monk.svg"
        :text="[
            'ありがとうございます。',
            '当日はよろしくお願いします。'
        ]"
        sent
        stamp="20:45"
      />

    </div>
  </div>

  <div>
 <transition-group name="chat-list">
  <q-chat-message v-for="item in chats"
    :key="item.key"
    :name="item.user.name"
    :avatar="item.user.avatar"
    :text="[item.text]"
    :sent="item.user.uid === currentUser.uid"
  />
 </transition-group>
</div>
  	  <q-toolbar>
  	  	<q-form
  	  		@submit="sendMessage"
  	  		class="full-width">
	  	    <q-input
	  	    	v-model="newMessage"
	  	    	@blur="scrollToBottom"
	  	    	ref="newMessage"
	  	    	bg-color="white"
	  	    	outlined
                class=""
	  	    	dense>

	  	      <template v-slot:after>
	  	        <q-btn
	  	        	round
	  	        	dense
	  	        	flat
	  	        	type="submit"
	  	        	icon="send" />
	  	      </template>
	  	    </q-input>
  	  	</q-form>
  	  </q-toolbar>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue';


export default defineComponent({
  name: 'Chatwork',
  data() {

  },
  methods: {
    sendMessage() {
	  		this.firebaseSendMessage({
	  			message: {
		  			text: this.newMessage,
		  			from: 'me'
	  			},
	  			otherUserId: this.$route.params.otherUserId
	  		})
	  		this.clearMessage()
	  	},

  }

})
</script>

<style lang="sass" scoped>
h6
    margin-top:20px
    margin-bottom:6px

.q-message-label
    font-size: 10px

.chatscreen
    border: solid 1px rgb(194,194,194)
    border-radius: 6px
    padding-left: 12px

.q-toolbar
     padding:0px

</style>
