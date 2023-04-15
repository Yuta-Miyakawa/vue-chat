<template>
  <q-page class="q-pa-sm bg-white" >
    <q-resize-observer @resize="onResize" />

    <div class="row" v-if="!$q.screen.lt.md">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card class="no-border no-border">
          <q-tab-panels v-model="tab" animated class="bg-white">
            <q-tab-panel
              name="all"
              class="q-pa-none full-height"             
            >
              <q-list class="">
              <q-item-label class="text-center q-pa-sm">
                <q-input dense @keydown.enter.prevent="onRequest()" v-model="filter" label="(例)田山">
                    <template v-slot:append>
                      <q-btn
                        flat
                        rounded  
                        icon="search"
                        class="search-button"
                        @click="fetchDogs()"
                      />
                    </template>
                  </q-input>
              </q-item-label>
              <q-item-label header>
                ルーム数:{{ contentTotal }}件
                <!-- <Talk-create :ContactList="selected_contact" :SelectCreateDialog="SelectCreateDialog='contactLists'"  @updateDANKA="showDankaUpdate(selected_contact)"></Talk-create> -->
              </q-item-label>

              <q-scroll-area
                  style="height: 1px; min-height: calc(100vh - 200px)"
                  :thumb-style="thumbStyle"
                >

              <span
                v-for="(contact, index) in rows"
                :key="index"
                @click="openRoom(contact);SelectElement = true;"
              >
                <contact-item
                  avatar="https://api2.teraiku.jp/svg/login-avatar.svg"
                  :name="contact.visitor_name || contact.name"
                ></contact-item>
              </span>

              </q-scroll-area>
            </q-list>
            </q-tab-panel>

            <!-- <q-tab-panel
              name="favorites"
              class="q-pa-none"
              style="min-height: calc(100vh - 150px)"
            >
              <q-list class="">
                <q-item-label class="text-center q-pa-sm">
                  <q-input dense rounded outlined v-model="filter" label="(例)田山">
                    <template v-slot:append>
                      <q-btn
                        flat
                        rounded  
                        icon="search"
                        class="search-button"
                        @click="fetchDogs()"
                      />
                    </template>
                  </q-input>
                </q-item-label>
                <q-item-label header class="text-center"
                  >{{ favorites_list.length }} Favorites</q-item-label
                >

                <span
                  v-for="(favorite, index) in favorites_list"
                  :key="index"
                  @click="selected_contact = favorite"
                >
                  <contact-item
                    :avatar="favorite.avatar"
                    :name="favorite.name"
                    :position="favorite.position"
                  ></contact-item>
                </span>
              </q-list>
            </q-tab-panel> -->
          </q-tab-panels>
          <!-- <div class="flex flex-center bg-grey-3" dense>
            <q-pagination
              v-model="pagenation"
              :min="minPages"
              :max="maxPages"
              input
              @update:model-value="onRequest"
            />
          </div> -->
        </q-card>
      </div>
      <div class="col-lg-8 q-pl-xs col-md-8 col-sm-12 col-xs-12" v-if="SelectElement">
        <q-card class="no-border no-border" style="min-height: calc(100vh - 90px)">
          <q-toolbar class="text-black">
            <q-btn round flat class="q-pa-sm">
              <q-avatar size="80px">
                <img src="https://api2.teraiku.jp/svg/login-avatar.svg" />
              </q-avatar>
            </q-btn>

            <q-item class="q-subtitle-1 q-pl-md">
              <q-item-section>
                <q-item-label lines="1">{{ selected_contact.visitor_name || selected_contact.name }}</q-item-label>
                <q-item-label caption lines="2">
                  <!-- <span class="text-weight-bold">ddddd{{ selected_contact.type }}</span> -->
                </q-item-label>
              </q-item-section>
            </q-item>

            <!-- <room-delete></room-delete> -->

            <q-space />

            <!-- <q-btn round flat icon="star_outline" color="yellow"> </q-btn>
            <q-btn round flat icon="keyboard_backspace" @click="selected_contact = {}" /> -->
          </q-toolbar>
          <q-separator></q-separator>

          <div  style="padding:5px;">
          <div class="row justify-center chatscreen" style=" height: 1px; min-height: calc(100vh - 250px)">
            <div style="width: 100%" >
              <transition-group>
                <q-scroll-area
                  ref="scrollRef"
                  @scroll="scrollCheck"
                  :thumb-style="thumbStyle"
                  style="
                    height: calc(100% - 0px);
                    border-right: 1px solid #ddd;
                  "
                >
                  <q-chat-message
                    v-for="item in chats"
                    :key="item.id"
                    :name="item.user.name"
                    :avatar="item.avatar"
                    :text="[item.text]"
                    :sent="item.user.id == UserID ? true : false"
                  />
                </q-scroll-area>
              </transition-group>
            </div>
          </div>
          <q-toolbar>
            <q-form @submit="sendMessage" class="full-width">
              <q-input
                v-model="newMessage"
                bg-color="white"
                outlined
                class=""
                dense
              >
                <template v-slot:after>
                  <q-btn round dense flat type="submit" @click="sendMessage()" icon="send" />
                </template>
              </q-input>
            </q-form>
          </q-toolbar>
          </div>
        </q-card>
      </div>
    </div>

<!-- スマホ専用 -->
    <div v-else>
      <div v-if="Object.keys(selected_contact).length == 0">
        <q-tab-panels v-model="tab" animated class="bg-white">
          <q-tab-panel
            name="all"
            class="q-pa-none full-height"
            style="min-height: calc(100vh - 150px)"
          >
            <q-list class="">
              <q-item-label class="text-center q-pa-sm">
                <q-input dense @keydown.enter.prevent="onRequest()" v-model="filter" label="(例)田山">
                    <template v-slot:append>
                      <q-btn
                        flat
                        rounded  
                        icon="search"
                        class="search-button"
                        @click="fetchDogs()"
                      />
                    </template>
                  </q-input>
              </q-item-label>
              <q-item-label header>
                ルーム数:{{ contentTotal }}件
                <!-- <Talk-create :contacts="selected_contact" :SelectCreateDialog="SelectCreateDialog='contactLists'"  @updateDANKA="showDankaUpdate(selected_contact)"></Talk-create> -->
              </q-item-label>

              <q-scroll-area
                style="height: 1px; min-height: calc(100vh - 240px)"
                :thumb-style="thumbStyle"
              >

              <span
                v-for="(contact, index) in rows"
                :key="index"
                @click="openRoom(contact);SelectElement = true;"
              >
                <contact-item
                  avatar="https://api2.teraiku.jp/svg/login-avatar.svg"
                  :name="contact.visitor_name || contact.name"
                ></contact-item>
              </span>

              </q-scroll-area>
            </q-list>
          </q-tab-panel>

          <!-- <q-tab-panel
            name="favorites"
            class="q-pa-none"
            style="min-height: calc(100vh - 150px)"
          >
            <q-list class="">
              <q-item-label class="text-center q-pa-sm">
                <q-input dense rounded outlined v-model="filter" label="(例)田山">
                    <template v-slot:append>
                      <q-btn
                        flat
                        rounded  
                        icon="search"
                        class="search-button"
                        @click="fetchDogs()"
                      />
                    </template>
                  </q-input>
              </q-item-label>
              <q-item-label header class="text-center"
                >ccccc{{ favorites_list.length }} Favorites</q-item-label
              >

              <span
                v-for="(favorite, index) in favorites_list"
                :key="index"
                @click="selected_contact = favorite"
              >
                <contact-item
                  :avatar="favorite.avatar"
                  :name="favorite.name"
                  :position="favorite.position"
                ></contact-item>
              </span>
            </q-list>
          </q-tab-panel> -->
        </q-tab-panels>
        <!-- <div class="flex flex-center bg-grey-3" dense>
          <q-pagination
            v-model="pagenation"
            :min="minPages"
            :max="maxPages"
            input
            @update:model-value="onRequest"
          />
        </div> -->
        <!-- <q-tabs
          v-model="tab"
          dense
          class="bg-grey-3"
          align="justify"
        >
          <q-tab name="all" icon="person" class="text-capitalize" label="All"></q-tab>
          <q-tab name="favorites" icon="star" class="text-capitalize" label="Favorites"></q-tab>
        </q-tabs> -->
      </div>
      <transition v-else appear enter-active-class="animated bounceInRight">
        <q-card class="no-border no-border" style="min-height: calc(100vh - 90px)">
          <q-toolbar class="text-black">
            <q-btn round flat class="q-pa-sm">
              <q-avatar size="80px">
                <img src="https://api2.teraiku.jp/svg/login-avatar.svg" />
              </q-avatar>
            </q-btn>

            <q-item class="q-subtitle-1 q-pl-md">
              <q-item-section>
                <q-item-label lines="1">{{ selected_contact.visitor_name || selected_contact.name }}</q-item-label>
                <q-item-label caption lines="2">
                  <!-- <span class="text-weight-bold">ddddd{{ selected_contact.type }}</span> -->
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-space />

            <!-- <q-btn round flat icon="star_outline" color="yellow"> </q-btn> -->
            <q-btn round flat icon="keyboard_backspace" @click="selected_contact = {}" />
          </q-toolbar>
          <q-separator></q-separator>

          <div  style="padding:5px;">
          <div class="row justify-center chatscreen" style=" height: 1px; min-height: calc(100vh - 250px)">
            <div style="width: 100%">
              <transition-group>
                <q-scroll-area
                  ref="scrollRef"
                  @scroll="scrollCheck"
                  :thumb-style="thumbStyle"
                  style="
                    height: calc(100% - 0px);
                    border-right: 1px solid #ddd;
                  "
                >
                  <q-chat-message
                    v-for="item in chats"
                    :key="item.id"
                    :name="item.user.name"
                    :avatar="item.avatar"
                    :text="[item.text]"
                    :sent="item.user.id == UserID ? true : false"
                  />
                </q-scroll-area>
              </transition-group>
            </div>
          </div>
          <q-toolbar>
            <q-form @submit="sendMessage" class="full-width">
              <q-input
                v-model="newMessage"
                bg-color="white"
                outlined
                class=""
                dense
              >
                <template v-slot:after>
                  <q-btn round dense flat type="submit" @click="sendMessage()" icon="send" />
                </template>
              </q-input>
            </q-form>
          </q-toolbar>
          </div>
        </q-card>
      </transition>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, defineAsyncComponent } from "vue";
import { LocalStorage, useQuasar, date } from 'quasar';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref,onMounted  } from "vue";

import { echo } from 'boot/laravel-echo'

import { positiveMessage, negativeMessage } from "src/composable/light-notify";
import TalkCreate from "src/components/ChatWork/TalkCreate.vue"
import RoomDelete from "src/components/ChatWork/RoomDelete.vue"


export default defineComponent({
  name: "Contact",
  components: {
    // ContactDetailItem: defineAsyncComponent(() => import("components/Contact/ContactDetailItem")),
    ContactItem: defineAsyncComponent(() => import("components/Contact/ContactItem")),
    // TalkCreate,
    // RoomDelete,
  },
  
  setup() {
    onMounted(() => {
      console.log(echo)
      echo.channel('my-channel')
      .listen('my-event', (data) => {
        console.log('データ取得',data)
      });
    })

    const $store = useStore();
    const $router = useRouter();
    const router = useRouter();
    const $q = useQuasar();
    const size = ref({ width: "200px", height: "200px" });

    const filter = ref("");
    const rows = ref([]);
    const contentTotal = ref();
    const pagenation = ref();
    const minPages = ref(1);
    const maxPages = ref();
    const UserID = ref('');
    const UserAvatar = ref('');
    const chats = ref({});
    const selected_contact = ref({});
    const SelectElement = ref(false);

    const newMessage = ref();

    const scrollRef = ref()
    const scrollSize = ref()

    const RealTimeProcess = setInterval(() => {
      // console.log(router.currentRoute.value.path)
      if(router.currentRoute.value.path !== '/system/chattest') return
        if(SelectElement.value == true) {
          openRoom(selected_contact.value);
          console.log('10秒でルームをリロード')
        }
      }, 10000)
    // const RealTimeDestroy = beforeDestroy(() => {
    //   clearInterval(this.updateTimer);
    // });
    const fetchDogs = async (page = 1) => {
      try{
        await $store.dispatch("authModule/userAccessToken");
        const user = $store.state.authModule.users;
        console.log("user見ます",user);
        const isTenant = user.is_tenant;
        UserID.value = user.id;
        console.log(UserID.value);
        rows.value = user.rooms;
        await $store.dispatch("booksModule/readMyProfile", {
          id: UserID.value,
          uuid: user.uuid,
        });
        const profile = $store.state.booksModule.representative;
        if(profile[0]){
          UserAvatar.value = profile[0].avatar;
          console.log(UserAvatar.value)
        }
        contentTotal.value = user.rooms.length;
        console.log("room見ます",rows.value)
        console.log("Totalのルームの数見ます",contentTotal.value)
        
        if (isTenant == false) {
          $router.replace("/login");
          await $store.dispatch("authModule/logoutError");
          negativeMessage("Error", "あなたはログインできないユーザーです");
          return;
        }
      }catch (e) {
        console.log(e.response)
        if(e.response.status === 401) {
          $router.replace("/login");
          await $store.dispatch("authModule/logoutError");
          negativeMessage("Error", "再度ログインしてください");
          return;
        }
      }
      console.log(pagenation);
      console.log("page", page);
      
    };



    const openRoom = async (contact) => {
      selected_contact.value = contact;
      try{
        await $store.dispatch("chatModule/readMessage", selected_contact.value.id );
        chats.value = $store.state.chatModule.books;
        console.log(chats.value)

        // window.Echo.channel('my-channel').listen('my-event',function(data){
        //   console.log('received a message');
        //   console.log(data);
        // });

      //    this.$echo.channel('my-channel').listen('my-event', payload => {
      //     console.log('THIS IS THE PAYLOAD: ' + payload)
      //  })
        
      }catch (e) {
        console.log(e)
        if(e.response.status === 401) {
          negativeMessage("Error", "データの読み込み中にエラーが発生しました");
          return;
        }
      }
    }

    const scrollCheck = () => {
      const scroll =  scrollRef.value.getScroll()
      if(scrollRef.value.getScrollPosition().top == 0){
        const scrollToBottom = scroll.verticalSize - scroll.verticalContainerSize
        scrollRef.value.setScrollPosition( 'vertical', scrollToBottom )
        console.log( scrollRef.value.getScrollPosition())
      }
      // console.log( scrollRef.value.getScroll())
      if(scroll.verticalSize !== scrollSize.value){
        const scrollToBottom = scroll.verticalSize - scroll.verticalContainerSize
        scrollRef.value.setScrollPosition( 'vertical', scrollToBottom )
      }
      scrollSize.value = scroll.verticalSize
    }

    const onRequest = (props) => {
      console.log(props);
      fetchDogs(props);
    };
    fetchDogs();

    const sendMessage = async() => {
      console.log(newMessage.value)
      console.log(UserAvatar.value)
      // this.messages.push(newMessage.value);
      try{
        await $store.dispatch("chatModule/createMessage", {
          id: selected_contact.value.id,
          user_id: UserID.value,
          body: newMessage.value,
          text: newMessage.value,
          avatar: UserAvatar.value,
      
        } );
        onReset();
        chats.value = $store.state.chatModule.books;

        console.log(chats.value)
        positiveMessage("Creacion", "新しいコメントが作成されました");
      }catch (e) {
        console.log(e.response)
        if(e.response.status === 401) {
          negativeMessage("Error", "データの読み込み中にエラーが発生しました");
          return;
        }
      }
    }

    const onReset = () => {
      newMessage.value = "";
    };

    return {

      UserID,
      UserAvatar,
      fetchDogs,
      filter,
      onRequest,
      openRoom,
      contentTotal,
      pagenation,
      minPages,
      maxPages,
      rows,
      chats,
      sendMessage,
      newMessage,
      onReset,

      tab: ref("all"),
      // search: ref(""),
      size,
      // contacts_list,
      // favorites_list,
      selected_contact,
      SelectElement,
      // detail_list,
      scrollRef,
      scrollCheck,
      scrollSize,

      onResize(size_dynamic) {
        size.value = size_dynamic;
      },
      thumbStyle: {
        right: '1px',
        borderRadius: '10px',
        backgroundColor: '#d4aa70',
        width: '3px',
        opacity: '0.5'
      },
      RealTimeProcess,
      // RealTimeDestroy,
    };
  },
  // mounted() {
  //   if (!this.$q.screen.lt.md) {
  //     this.selected_contact = this.rows[0];
  //   }
  // },
});
</script>

<style scoped></style>
