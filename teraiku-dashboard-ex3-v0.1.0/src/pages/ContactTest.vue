<template>
  <q-page class="q-pa-sm bg-white" >
    <q-resize-observer @resize="onResize"/>

    <div class="row" v-if="!$q.screen.lt.md"  >
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" v-if="DetailInformation">
        <q-card class="no-border no-border">
          <q-tab-panels v-model="tab" animated class="bg-white">
            <q-tab-panel name="all" class="q-pa-none full-height" style="min-height: calc(100vh - 150px)">
              <q-list class="">
                <h6 style="margin:5px">
                  {{ Tenant.corporation }}：ｺﾝﾀｸﾄﾘｽﾄ
                </h6>
                <q-separator/>
                <q-item-label class="text-left q-pa-sm">
                  <q-select
                  dense
                  filled
                  solo
                  v-model="category"
                  :options="options"
                  @update:model-value="onRequest()"
                  label="種別選択"
                  style="min-width: 150px"
                />
                 
                  <q-input dense @keydown.enter.prevent="onRequest()" v-model="filter" label="苗字検索(例)田山">
                    <template v-slot:append>
                      <q-btn
                        flat
                        dense  
                        icon="search"
                        class="search-button"
                        @click="fetchDogs()"
                      />
                    </template>
                  </q-input>
                </q-item-label>
                <q-item-label header class="text-left">
                  ｺﾝﾀｸﾄﾘｽﾄ:{{ contentTotal }} 件
                  <!-- <dialog-create :id="family" :contacts="selected_contact" :SelectCreateDialog="SelectCreateDialog='contactLists'"  @updateDANKA="showDankaUpdate(selected_contact)"></dialog-create> -->
                  <q-btn round size="xs" class="q-mx-xs" color="green" icon="add" @click="SelectElement = true; CreateElement = true; EditElement = false; SelectEditDialog='currentContacts'; profileCreate()"/>
                  <danka-import :id="family" :contacts="'ContactlistContact'" @updateDANKA="showDankaUpdate(selected_contact)"></danka-import>
                </q-item-label>
                <q-scroll-area
                  style="height: 1px; min-height: calc(100vh - 307px)"
                  :thumb-style="thumbStyle"     
                >
                <span v-for="(contact, index) in rows" :key="index" @click="selected_contact=contact; SelectElement = true; SelectEditDialog='rows'; AddressConnect();">
                  <contact-item
                    :avatar="contact.avatar" :name="contact.last_name + ' ' + contact.first_name" :position="contact.type" ></contact-item>
                </span>
                
                </q-scroll-area>
              </q-list>
            </q-tab-panel>
  
          </q-tab-panels>
          <div class="flex flex-center bg-grey-3" dense>
          <q-pagination
            v-show="showSimulatedReturnData"
            v-model="pagenation"
            :min="minPages"
            :max="maxPages"
            input
            @update:model-value="onRequest"
          />
        </div>
        <q-inner-loading
          :showing="isLoadingUser"
          color="primary"
        />
        <!-- <q-tabs
          v-model="tab"
          dense
          class="bg-grey-3"
          align="justify"
        >
          <q-tab name="all" class="text-capitalize" label="全ての方"></q-tab>
          <q-tab name="danka" class="text-capitalize" label="檀家"></q-tab>
          <q-tab name="entrance" class="text-capitalize" label="入檀申請中"></q-tab>
        </q-tabs> -->
          
        </q-card>
      </div>

      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12" v-else>
        <div v-if="CreateElement">
          <contact-create-list :selected_contact="SelectEditDialog" :user_id="UserID" :tenant_id="TenantID" :profile="profileData" checkFlag="Create" @CreateContact="fetchDogs()"></contact-create-list>
        </div>
        <div v-else-if="EditElement">
          <contact-create-list :selected_contact="SelectEditDialog" :tenant_id="TenantID" :profile_id="selected_contact.id" :profile="profileData" :is_contact="true" checkFlag="Edit" @EditContact="fetchDogs()"></contact-create-list>
        </div>
        <div v-else>
          <h6 style="margin:5px">
            {{ selected_contact.last_name + selected_contact.first_name }}：詳細情報
          </h6>
          <q-separator/>
          <q-card class="no-border no-border">
            <q-tab-panels v-model="tab" animated class="bg-white">
              <q-tab-panel name="all" class="q-pa-none full-height" style="min-height: calc(100vh - 120px)">
                <q-list class="">
                  <h6 style="margin:5px">
                    <q-btn
                      size="sm"
                      class="q-mx-xs"
                      color="primary"
                      icon="arrow_back"
                      round
                      @click="goBack()"
                      ><q-tooltip>戻る</q-tooltip>
                    </q-btn>
                    {{ familyName}}家の檀家情報
                  </h6>
                  <q-separator/>
                  <q-scroll-area
                    style="height: 1px; min-height: calc(100vh - 120px)"
                    :thumb-style="thumbStyle"
                    v-show="showSimulatedReturnData"
                  >
                  <q-item-label header class="text-left">
                    過去帳:{{ pastbooksTotal }}人
                    <dialog-create :id="family" :contacts="selected_contact" :SelectCreateDialog="SelectCreateDialog='pastbooksContact'"  @updateDANKA="showDankaUpdate(selected_contact)"></dialog-create>
                  </q-item-label>

                  <span v-for="(contact, index) in pastbooksContact" :key="index" @click="selected_contact=contact;SelectElement = true; SelectEditDialog='pastbooksContact'; DayFormat()">
                    <contact-item
                      :avatar="contact.avatar" :name="contact.last_name + contact.first_name" :position="contact.type"></contact-item>
                  </span>

                  <q-item-label header class="text-left">
                    現在帳:{{ currentTotal }}人
                    <dialog-create :id="family" :contacts="selected_contact" :SelectCreateDialog="SelectCreateDialog='currentContacts'"  @updateDANKA="showDankaUpdate(selected_contact)"></dialog-create>
                  </q-item-label>
                  
                  <span v-for="(contact, index) in currentContacts" :key="index" @click="selected_contact=contact;SelectElement = true; SelectEditDialog='currentContacts'; AddressConnect();">
                    <contact-item
                      :avatar="contact.avatar" :name="contact.last_name + contact.first_name" :position="contact.type"></contact-item>
                  </span>
                  
                  </q-scroll-area>
                </q-list>
              </q-tab-panel>
          
            </q-tab-panels>
          <q-inner-loading
            :showing="isLoadingUser"
            color="primary"
          />
            
          </q-card>
        </div>
      </div>

      <div class="col-lg-8 q-pl-xs col-md-8 col-sm-12 col-xs-12" v-if="SelectElement">
        <div v-if="CreateElement">
          <contact-create-list :selected_contact="SelectEditDialog" :user_id="UserID" :tenant_id="TenantID" :profile="profileData" checkFlag="CreateContact" @CreateContact="fetchDogs()"></contact-create-list>
        </div>
        <div v-else-if="EditElement">
          <contact-create-list :selected_contact="SelectEditDialog" :tenant_id="TenantID" :profile_id="selected_contact.id" :profile="profileData" :is_contact="true" checkFlag="Edit" @EditContact="fetchDogs()"></contact-create-list>
        </div>
        <div v-else>
          <h6 style="margin:5px">
            {{ selected_contact.last_name + selected_contact.first_name }}：詳細情報
          </h6>
          <q-separator/>
          <q-card class="no-border no-border" style="min-height: calc(100vh - 75px)">
            <q-toolbar class="text-black">
              <q-btn round flat class="q-pa-sm">
                <q-avatar size="80px">
                  <img :src="selected_contact.avatar">
                </q-avatar>
              </q-btn>

              <q-item class="q-subtitle-1 q-pl-md">
                <q-item-section>
                  <q-item-label lines="1">{{ selected_contact.last_name + ' ' + selected_contact.first_name }}</q-item-label>
                  <q-item-label caption lines="2">
                    <span class="text-weight-bold">{{ selected_contact.type }}</span>
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-space/>

              <!-- <q-btn round flat icon="star_outline" color="yellow">
              </q-btn> -->
              <let-application :tenant_id="TenantID" :tenant="Tenant" :selected_contact='selected_contact' :information='DetailInformation' @CreateContact="fetchDogs()"></let-application>

                <!-- <q-btn
                  v-if="selected_contact.kind=='入檀申請中'&&DetailInformation"
                  class="create-button"
                  color="red"
                  label="入檀承認"
                  @click="confirmationDialog = true"
                />
                <q-btn
                  v-if="selected_contact.kind=='入信申請中'&&DetailInformation"
                  class="create-button"
                  color="red"
                  label="入信承認"
                  @click="confirmationDialog = true"L
                /> -->
                <contact-delete :id="TenantID" :contacts="selected_contact" checkFlag="Contact" @DeleteContact="fetchDogs()"></contact-delete>
                <q-btn v-if="selected_contact.is_alive && !selected_contact.corporation"  round size="sm" class="q-mx-xs" color="info" icon="edit" @click="SelectElement = true; CreateElement = false; EditElement = true; SelectEditDialog='currentContacts'; profileEdit(selected_contact)"/>

                <!-- トークルームへ -->
                <!-- <q-btn
                  v-if="selected_contact.type=='檀家'&&DetailInformation"
                  round
                  size="sm"
                  class="q-mx-xs"
                  color="green"
                  icon="chat"
                  @click="moveShatwork(selected_contact)"
                >
                  <q-tooltip>トークルームへ</q-tooltip>
                </q-btn> -->

                <!-- <dialog-item :id="family" :contacts="selected_contact" :SelectEditDialog="SelectEditDialog='contactLists'" @updateROWS="tenantDankaUpdate(selected_contact)"  @updateDANKA="showDankaUpdate(selected_contact)"></dialog-item> -->

                <!-- <dialog-anniversary :contacts="selected_contact" :PastbooksInformation="PastbooksInformation"></dialog-anniversary> -->
          
                <!-- <dialog-item :id="family" :contacts="selected_contact" :SelectEditDialog="SelectEditDialog"  @updateDANKA="showDankaUpdate(selected_contact)"></dialog-item> -->

            </q-toolbar>
            <q-separator></q-separator>
            <div v-if="PastbooksInformation">
              <div  v-for="detail, key, detail_index in detail_list" :key="key" >

                <contact-detail-item :icon="detail.icon" :text_color="detail.text_color" 
                                    :value=" selected_contact[detail['field']]" :label="detail.label"
                                    :address="ConnectAddress" :birthday="birthdayInformation" ></contact-detail-item>

                <q-separator inset="item" v-if="detail_index!=detail_list.length-1"></q-separator>
              </div>
            </div>

            <div v-else>
              <div  v-for="detail, key, detail_index in pastbook_list" :key="key" >

                <contact-detail-item :icon="detail.icon" :text_color="detail.text_color"
                                    :value=" selected_contact[detail['field']]" :label="detail.label"
                                    :address="ConnectAddress" :birthday="birthdayInformation" 
                                    :deathday="deathdayInformation"></contact-detail-item>

                <q-separator inset="item" v-if="detail_index!=detail_list.length-1"></q-separator>
              </div>
            </div>

          </q-card>
        </div>
        
      </div>
      
    </div>

    <div v-else>
      <div v-if="!SelectElement">
        <div v-if="DetailInformation">
          <q-card class="no-border no-border">
          <q-tab-panels v-model="tab" animated class="bg-white">
            <q-tab-panel name="all" class="q-pa-none full-height" style="min-height: calc(100vh - 150px)">
              <q-list class="">
                <h6 style="margin:5px">
                  {{ Tenant.corporation }}：ｺﾝﾀｸﾄﾘｽﾄ
                </h6>
                <q-separator/>
                <q-item-label class="text-left q-pa-sm">
                  <q-select
                    dense
                    filled
                    solo
                    v-model="category"
                    :options="options"
                    @update:model-value="onRequest()"
                    label="種別選択"
                    style="min-width: 150px"
                  />
                  <q-input dense v-model="filter" label="苗字検索(例)田山">
                      <template v-slot:append>
                        <q-btn
                          flat
                          dense  
                          icon="search"
                          class="search-button"
                          @click="fetchDogs()"
                        />
                      </template>
                    </q-input>
                </q-item-label>
                <q-item-label header class="text-left">
                  ｺﾝﾀｸﾄﾘｽﾄ:{{ contentTotal }} 件
                  <!-- <dialog-create :id="family" :contacts="selected_contact" :SelectCreateDialog="SelectCreateDialog='contactLists'"  @updateDANKA="showDankaUpdate(selected_contact)"></dialog-create> -->
                  <q-btn round size="xs" class="q-mx-xs" color="green" icon="add" @click="SelectElement = true; CreateElement = true; EditElement = false; SelectEditDialog='currentContacts'; profileCreate()"/>
                  <danka-import :id="family" :contacts="'ContactlistContact'"  @updateDANKA="showDankaUpdate(selected_contact)"></danka-import>
                </q-item-label>

                <q-scroll-area
                    style="height: 1px; min-height: calc(100vh - 307px)"
                    :thumb-style="thumbStyle"
                  >


                  <span v-for="(contact, index) in rows" :key="index" @click="selected_contact=contact;SelectElement = true; SelectEditDialog='rows'; AddressConnect();">
                    <contact-item
                      :avatar="contact.avatar" :name="contact.last_name + ' ' + contact.first_name" :position="contact.type"></contact-item>
                  </span>
                </q-scroll-area>


              </q-list>
            </q-tab-panel>

            

          </q-tab-panels>
          <div class="flex flex-center bg-grey-3" dense>
            <q-pagination
              v-show="showSimulatedReturnData"
              v-model="pagenation"
              :min="minPages"
              :max="maxPages"
              input
              @update:model-value="onRequest"
            />
          </div>
          <q-inner-loading
            :showing="isLoadingUser"
            color="primary"
          />
          </q-card>
        </div>
        <div v-else>
        <q-card class="no-border no-border">
          <q-tab-panels v-model="tab" animated class="bg-white">
            <q-tab-panel name="all" class="q-pa-none full-height" style="min-height: calc(100vh - 120px)">
              <q-list class="">
                <h6 style="margin:5px">
                  <q-btn
                    size="sm"
                    class="q-mx-xs"
                    color="primary"
                    icon="arrow_back"
                    round
                    @click="goBack()"
                    ><q-tooltip>戻る</q-tooltip>
                  </q-btn>
                  {{ familyName}}家の檀家情報
                </h6>
                <q-separator/>
                <q-scroll-area
                  style="height: 1px; min-height: calc(100vh - 120px)"
                  :thumb-style="thumbStyle"
                  v-show="showSimulatedReturnData"
                >
                <q-item-label header class="text-left">
                  過去帳:{{ pastbooksTotal }}人
                  <dialog-create :id="family" :contacts="selected_contact" :SelectCreateDialog="SelectCreateDialog='pastbooksContact'"  @updateDANKA="showDankaUpdate(selected_contact)"></dialog-create>
                </q-item-label>

                <span v-for="(contact, index) in pastbooksContact" :key="index" @click="selected_contact=contact;SelectElement = true; SelectEditDialog='pastbooksContact'; DayFormat();">
                  <contact-item
                    :avatar="contact.avatar" :name="contact.last_name + contact.first_name" :position="contact.type"></contact-item>
                </span>

                <q-item-label header class="text-left">
                  現在帳:{{ currentTotal }}人
                  <dialog-create :id="family" :contacts="selected_contact" :SelectCreateDialog="SelectCreateDialog='currentContacts'"  @updateDANKA="showDankaUpdate(selected_contact)"></dialog-create>
                </q-item-label>
                
                <span v-for="(contact, index) in currentContacts" :key="index" @click="selected_contact=contact;SelectElement = true; SelectEditDialog='currentContacts'; AddressConnect();">
                  <contact-item
                    :avatar="contact.avatar" :name="contact.last_name + contact.first_name" :position="contact.type"></contact-item>
                </span>
                
                </q-scroll-area>
              </q-list>
            </q-tab-panel>
          
            </q-tab-panels>
          <q-inner-loading
            :showing="isLoadingUser"
            color="primary"
          />
            
          </q-card>
        </div>
        
      </div>
      
      <transition 
        v-else
        appear
        enter-active-class="animated bounceInRight"
      >
        <div v-if="CreateElement">
          <contact-create-list :selected_contact="SelectEditDialog" :user_id="UserID" :tenant_id="TenantID" :profile="profileData" checkFlag="CreateContact" :back="true" @CreateContact="fetchDogs()"></contact-create-list>
        </div>
        <div v-else-if="EditElement">
          <contact-create-list :selected_contact="SelectEditDialog" :tenant_id="TenantID" :profile_id="selected_contact.id" :profile="profileData" :is_contact="true" checkFlag="Edit" :back="true" @EditContact="fetchDogs()"></contact-create-list>
        </div>
        <div v-else>
          <h6 style="margin:5px">
            {{ selected_contact.last_name + selected_contact.first_name }}：詳細情報
          </h6>
          <q-separator/>
          <q-card class="no-border no-border"
                  style="min-height: calc(100vh - 75px)">
            <q-toolbar class="text-black ">
              <q-btn round flat class="q-pa-sm">
                <q-avatar size="80px">
                  <img :src="selected_contact.avatar">
                </q-avatar>
              </q-btn>

              <q-item class="q-subtitle-1 q-pl-md">
                <q-item-section>
                  <q-item-label lines="1">{{ selected_contact.last_name + selected_contact.first_name }}</q-item-label>
                  <q-item-label caption lines="2">
                    <span class="text-weight-bold">{{ selected_contact.type }}</span>
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-space/>

              <let-application :tenant_id="TenantID" :tenant="Tenant" :selected_contact='selected_contact' :information='DetailInformation' @CreateContact="fetchDogs()"></let-application>

              <!-- <q-btn
                v-if="selected_contact.kind=='入檀申請中'&&DetailInformation"
                class="create-button"
                color="red"
                label="入檀承認"
                @click="confirmationDialog = true"
              />
              <q-btn
                  v-if="selected_contact.kind=='入信申請中'&&DetailInformation"
                  class="create-button"
                  color="red"
                  label="入信承認"
                  @click="confirmationDialog = true"
                /> -->

              <!-- <q-btn
                v-if="selected_contact.type=='檀家'&& DetailInformation"
                round
                size="sm"
                class="q-mx-xs"
                color="orange"
                icon="mdi-account-details-outline"
                @click="showMoreInformation(selected_contact);selected_contact={};"
              >
                <q-tooltip>詳細情報</q-tooltip>
              </q-btn> -->
              <contact-delete :id="TenantID" :contacts="selected_contact" checkFlag="Contact" @DeleteContact="fetchDogs()"></contact-delete>
              <q-btn v-if="selected_contact.is_alive && (selected_contact.type != '住職' || !selected_contact.corporation)"  round size="sm" class="q-mx-xs" color="info" icon="edit" @click="SelectElement = true; CreateElement = false; EditElement = true; SelectEditDialog='currentContacts'; profileEdit(selected_contact)"/>
              <!-- <dialog-item :id="family" :contacts="selected_contact" :SelectEditDialog="SelectEditDialog='contactLists'"  @updateROWS="tenantDankaUpdate(selected_contact)"  @updateDANKA="showDankaUpdate(selected_contact)"></dialog-item> -->

              <!-- <dialog-anniversary :contacts="selected_contact" :PastbooksInformation="PastbooksInformation"></dialog-anniversary> -->

              <!-- <dialog-item :id="family" :contacts="selected_contact" :SelectEditDialog="SelectEditDialog"  @updateDANKA="showDankaUpdate(selected_contact)"></dialog-item> -->
              <q-btn
                size="sm"
                class="q-mx-xs"
                color="primary"
                icon="arrow_back"
                round
                @click="selected_contact={};SelectElement = false; AddressConnect();"
              />

            </q-toolbar>
            <q-separator></q-separator>

            <div v-if="PastbooksInformation">
              <div  v-for="detail, key, detail_index in detail_list" :key="key" >

                <contact-detail-item :icon="detail.icon" :text_color="detail.text_color"
                                    :value=" selected_contact[detail['field']]" :label="detail.label"
                                    :address="ConnectAddress" :birthday="birthdayInformation" ></contact-detail-item>

                <q-separator inset="item" v-if="detail_index!=detail_list.length-1"></q-separator>
              </div>
            </div>

            <div v-else>
              <div  v-for="detail, key, detail_index in pastbook_list" :key="key" >

                <contact-detail-item :icon="detail.icon" :text_color="detail.text_color"
                                    :value=" selected_contact[detail['field']]" :label="detail.label"
                                    :address="ConnectAddress" :birthday="birthdayInformation"
                                    :deathday="deathdayInformation" ></contact-detail-item>

                <q-separator inset="item" v-if="detail_index!=detail_list.length-1"></q-separator>
              </div>
            </div>

          </q-card>
        </div>
      </transition>
    </div>

  <!-- 入檀申請のダイアログ -->
    <q-dialog v-model="confirmationDialog">
       <q-card>
        <q-card-section class="bg-accent text-white">
          <div class="text-h6">{{ selected_contact.last_name + selected_contact.first_name}}様の入檀処理</div>
        </q-card-section>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">
            <span class="text-weight-bold">{{ selected_contact.last_name + selected_contact.first_name}}様</span>
            を檀家に入檀させますか?
          </span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="キャンセル" color="primary" v-close-popup />
          <q-btn
            flat
            label="入檀"
            color="accent"
            @click="DankaAddition(selected_contact)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>   
  </q-page>
</template>

<script>
import {defineComponent, defineAsyncComponent, onMounted } from 'vue';
import { LocalStorage, useQuasar, date } from 'quasar';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref } from 'vue';
import { positiveMessage, negativeMessage } from "src/composable/light-notify";
import { ContactDetail, PastbookDetail } from "../composable/contact-detail-list";
// import DialogItem from "../components/Contact/DialogItem.vue";
import DankaImport from "../components/Contact/DankaImport.vue";
// import DialogCreate from "../components/Contact/DialogCreate.vue";
import ContactCreateList from "../components/Contact/ContactCreateList.vue";
import ContactDelete from "../components/Contact/ContactDelete.vue";
import LetApplication from "../components/Contact/LetApplication.vue";
// import DialogAnniversary from "../components/Contact/DialogAnniversary.vue";
import * as dayjs from "dayjs";

const detail_list = ContactDetail;
const pastbook_list = PastbookDetail;

export default defineComponent({
  name: "Contact",
  components: {
    ContactDetailItem: defineAsyncComponent(() => import('components/Contact/ContactDetailItem')),
    ContactItem: defineAsyncComponent(() => import('components/Contact/ContactItem')),
    // DialogItem,
    // DialogCreate,
    DankaImport,
    ContactCreateList,
    ContactDelete,
    LetApplication,
  },
  setup(props, context) {
    const profileData = ref({
      avatar: "",
      last_name: "",
      first_name: "",
      type: "",
      phone: "",
      mobile: "",
      email: "",
      representative: "",
      gender: "",
      postcode: "",
      pref: "",
      city: "",
      street: "",
      address: "",
      date_of_birth: "1980/01/01",
      date_of_death: "1980/01/01",
      dharma_name: "",
      cemetery_number: "",
    });
    const CreateElement = ref(false);
    const EditElement = ref(false);
    const $q = useQuasar();
    const $store = useStore();
    const $router = useRouter();
    
    const size = ref({ width: '200px', height: '200px' });
    const options = ["すべての方", "檀家", "一般", "協力会社", "門徒/信徒", "檀家総代", "檀家筆頭総代", "世話人"];
    const category = ref("");

    const filter = ref("");
    const rows = ref([]);
    const contentTotal = ref();
    const pagenation = ref(1);
    const minPages = ref(1);
    const maxPages = ref(1);
    const UserID = ref('');
    const UserUUID = ref('');
    const TenantID = ref('');
    const Tenant = ref('');

    const selected_contact = ref({});
    const ConnectAddress = ref();
    const birthdayInformation = ref();
    const deathdayInformation = ref();
    const SelectElement = ref(false);
    const isLoadingUser = ref(false);
    const confirmationDialog = ref(false);

    const showSimulatedReturnData = ref(false);
    const DetailInformation = ref(true);
    const PastbooksInformation = ref(true);
    const SelectEditDialog = ref();
    const SelectCreateDialog = ref();
    const familyName = ref();
    const family = ref([]);
    const pastbooksContact = ref([]);
    const pastbooksTotal = ref();
    const currentContacts = ref([]);
    const currentTotal = ref()

    const fetchDogs = async (page = 1) => {
      isLoadingUser.value = true;
      showSimulatedReturnData.value = false;
      SelectElement.value = false;
      CreateElement.value = false;
      EditElement.value = false;
      DetailInformation.value = true;
      try{
        await $store.dispatch("authModule/userAccessToken");
        const isTenant = $store.state.authModule.users.is_tenant;
        if (isTenant == false) {
          $router.replace("/login");
          await $store.dispatch("authModule/logoutError");
          negativeMessage("Error", "あなたはログインできないユーザーです");
          return;
        }
        const user = $store.state.authModule.users
        UserID.value = user.id;
        UserUUID.value = user.uuid;
        const statetenant = LocalStorage.getItem("stateTenant")
        TenantID.value = statetenant.id;
        Tenant.value = LocalStorage.getItem("stateTenant")
        console.log('aaa',Tenant.value)
      }catch (e) {
        console.log(e.response)
        if(e.response.status === 401) {
          $router.replace("/login");
          await $store.dispatch("authModule/logoutError");
          negativeMessage("Error", "再度ログインしてください");
          isLoadingUser.value = false;
          showSimulatedReturnData.value = false;
          return;
        }
      }
      console.log("page", page);
      try {
        if (filter.value != "") {
          console.log("filter.valueあります");
          var strs = filter.value.split(/\s+/);
          console.log("strs : ", strs);
          if (category.value != "" && category.value != "すべての方") {
            console.log("どっちもあります");
            await $store.dispatch("booksModule/searchBooks", {
              TenantID: TenantID.value,
              ReadUserID: UserID.value,
              page: page,
              last_name: strs[0],
              type: category.value,
            });
          } else {
            await $store.dispatch("booksModule/searchBooks", {
              TenantID: TenantID.value,
              ReadUserID: UserID.value,
              page: page,
              last_name: strs[0],
            });
          }
        } else if (category.value != "" && category.value != "すべての方") {
          console.log(category.value);
          console.log(selected_contact.value)
          await $store.dispatch("booksModule/searchBooks", {
            TenantID: TenantID.value,
            ReadUserID: UserID.value,
            page: page,
            type: category.value,
          });
        } else {
          console.log("どっちも空またはcategori.valueがすべての方です");
          await $store.dispatch("booksModule/readBooks", {
            TenantID: TenantID.value,
            page: page,
            uuid: UserUUID.value,
          });
          // await $store.dispatch("booksModule/readContactList", {
          //   tenantmaster_id: Tenant.value.tenantmaster_id,
          // });
        }
        console.log($store.state.booksModule.books.data);
        rows.value = $store.state.booksModule.books.data;
        const meta = $store.state.booksModule.books.meta;
        console.log("meta見ます", meta);
        contentTotal.value = rows.value.length;
        pagenation.value = page;
        maxPages.value = meta.last_page;

        isLoadingUser.value = false;
        showSimulatedReturnData.value = true;
      } catch (e) {
        negativeMessage("Error", "データの読み込み中にエラーが発生しました");
        isLoadingUser.value = false;
        showSimulatedReturnData.value = true;
      }
    };
    fetchDogs();
    const onRequest = (props) => {
      fetchDogs(props);
    };

    const AddressConnect = () => {
      console.log(SelectEditDialog.value)
      PastbooksInformation.value = true
      console.log(selected_contact.value)
      if(SelectElement.value === true){
        const date =  selected_contact.value
        const pref = date.pref || '';
        const city = date.city || '';
        const address = date.address || '';
        const street = date.street || '';
        ConnectAddress.value = pref + city + address + street;
        // console.log(ConnectAddress.value)
        // console.log(date.birth)
        if(date.date_of_birth !== null){
          birthdayInformation.value = dayjs(date.date_of_birth).format("YYYY年MM月DD日");
        } else {
          birthdayInformation.value = ''
        }
      } else {
        SelectElement.value = false;
      }
      CreateElement.value = false;
      EditElement.value = false;
      // console.log(SelectElement.value)
    }

    const showMoreInformation = async (data) => {
      isLoadingUser.value = true;
      showSimulatedReturnData.value = false;
      DetailInformation.value = false;
      SelectElement.value = false;
      try{
        console.log(data)
        familyName.value = data.last_name;

        await $store.dispatch("dankaModule/readBooks", {
          TenantID: TenantID.value,
          ReadID: data.id,
        });
        console.log("userID取れるはずです")
        family.value = $store.state.dankaModule.families.data;
        console.log(family.value[0])
        //現在帳
        await $store.dispatch("currentModule/readBooks", {
          TenantID: TenantID.value,
          ReadID: family.value[0].id,
          // ReadID: 37
        });
        console.log("現在帳", $store.state.currentModule.currentfamily);
        currentContacts.value = $store.state.currentModule.currentfamily;
        console.log(currentContacts.value.length)
        // meta = $store.state.currentModule.currentfamily.meta;
        // currentTotal.value = meta.total;
        currentTotal.value = currentContacts.value.length;
        // 過去帳
        console.log("過去帳", $store.state.currentModule.pastfamily);
        pastbooksContact.value = $store.state.currentModule.pastfamily;
        // let meta = $store.state.currentModule.pastfamily.meta;
        // pastbooksTotal.value = meta.total;
        pastbooksTotal.value = pastbooksContact.value.length;

        isLoadingUser.value = false;
        showSimulatedReturnData.value = true;
              console.log(SelectEditDialog.value)
      } catch (e) {
        console.log(e)
        negativeMessage("Error", "詳細情報の読み込み中にエラーが発生しました");
        DetailInformation.value = true;
        SelectElement.value = false;
        isLoadingUser.value = false;
        showSimulatedReturnData.value = true;
      }
    };

    const DankaAddition = async(data) => {
      try{
        console.log(data)
        // await $store.dispatch("booksModule/joiningDanka", {
        //   TenantID: TenantID.value,
        //   resources: data.id,
        //   // ReadID: 37
        // });
        await $store.dispatch("booksModule/updateBook", {
          id1: data.id,
          id2: TenantID.value,
          // TenantID: TenantID.value,
          // id:data.id,
          type:"檀家",
          representative: "代表者",
        });
        await $store.dispatch("dankaModule/readBooks", {
          TenantID: TenantID.value,
          ReadID: data.id,
        });
        console.log("userID取れるはずです")
        family.value = $store.state.dankaModule.families.data;
        console.log(family.value[0])
        console.log(Tenant.value.corporation)

        await $store.dispatch("contactsModule/createPost", {
          id: family.value[0].id,
          tenant_id: TenantID.value,
          to_name: data.last_name+data.first_name,
          title: "["+Tenant.value.corporation+"]の檀家になりました",
          body: Tenant.value.corporation + "へのトークはトークルームからお願いします。これから檀家としてよろしくお願いします。",
          meta: "{data: 'JSON\u30c7\u30fc\u30bf'}",
        });
        await $store.dispatch("roomModule/createRoom", {
          name: data.last_name+data.first_name,
          owner_id:TenantID.value,
          owner_name:Tenant.value.corporation,
          visitor_name: data.last_name+data.first_name,
          avatar: "https://api2.teraiku.jp/svg/login-avatar.svg",
        });
        await $store.dispatch("authModule/userAccessToken");
        const Rooms = $store.state.authModule.users.rooms;
        console.log(Rooms)
        const room = Rooms[Rooms.length - 1]
        console.log(room)
        
        await $store.dispatch("roomModule/createRoomUser", {
          room_id: room.id,
          user_id: family.value[0].id,
        });
        confirmationDialog.value = false;
        fetchDogs(); 
        positiveMessage("OK", "入檀処理に成功しました");
       } catch (e) {
        console.log(e)
        
        negativeMessage("Error", "入檀処理のエラーが発生しました");
      }
    }

    const tenantDankaUpdate = async(data) => {
      isLoadingUser.value = true;
      try{
        console.log(data)
        // 過去帳
        // await $store.dispatch("currentModule/readBooks", {
        //   ReadID: family.value[0].id,
        // });
        // console.log("過去帳", $store.state.currentModule.pastfamily);
        // pastbooksContact.value = $store.state.currentModule.pastfamily;
        // pastbooksTotal.value = pastbooksContact.value.length;
        
        // console.log("現在帳", $store.state.currentModule.currentfamily);
        selected_contact.value = data;
        await $store.dispatch("booksModule/readBooks", {
            TenantID: TenantID.value,
            ReadUserID: UserID.value,
          });
        console.log($store.state.booksModule.books.data);
        rows.value = $store.state.booksModule.books.data;

        isLoadingUser.value = false;
        SelectElement.value = false;
      } catch (e) {
        console.log(e)
        negativeMessage("Error", "詳細情報の読み込み中にエラーが発生しました");
        DetailInformation.value = true;
        SelectElement.value = false;
        isLoadingUser.value = false;
        showSimulatedReturnData.value = true;
      }
    }

    const showDankaUpdate = async(data) => {
      isLoadingUser.value = true;
      try{
        console.log(data)
        // 過去帳
        // await $store.dispatch("currentModule/readBooks", {
        //   ReadID: family.value[0].id,
        // });
        // console.log("過去帳", $store.state.currentModule.pastfamily);
        // pastbooksContact.value = $store.state.currentModule.pastfamily;
        // pastbooksTotal.value = pastbooksContact.value.length;
        
        // console.log("現在帳", $store.state.currentModule.currentfamily);
        selected_contact.value = data;
        await $store.dispatch("booksModule/readBooks", {
            TenantID: TenantID.value,
            ReadUserID: UserID.value,
          });
        console.log($store.state.booksModule.books.data);
        rows.value = $store.state.booksModule.books.data;

        isLoadingUser.value = false;
        SelectElement.value = false;
      } catch (e) {
        console.log(e)
        negativeMessage("Error", "詳細情報の読み込み中にエラーが発生しました");
        DetailInformation.value = true;
        SelectElement.value = false;
        isLoadingUser.value = false;
        showSimulatedReturnData.value = true;
      }
    }

    const showDankaDelete = async(data) => {
      SelectElement.value = false;
      showDankaUpdate(data)
    }

    const DayFormat = () => {
      console.log(SelectEditDialog.value)
      PastbooksInformation.value = false;
      if(SelectElement.value === true){
        const date = selected_contact.value
        // console.log(date.birth)
        if(date.date_of_birth !== null){
          birthdayInformation.value = dayjs(date.date_of_birth).format("YYYY年MM月DD日");
        } else {
          birthdayInformation.value = ''
        }
        console.log(date.date_of_death)
        if(date.date_of_death !== null){
          deathdayInformation.value = dayjs(date.date_of_death).format("YYYY年MM月DD日");
        } else {
          deathdayInformation.value = ''
        }
        console.log(deathdayInformation.value)
      } else {
        SelectElement.value = false;
      }
      CreateElement.value = false;
      EditElement.value = false;
      console.log(SelectElement.value)
      
    }

    const moveShatwork = async(data) => {
      console.log(data)
      await $store.dispatch("dankaModule/readBooks", {
          TenantID: TenantID.value,
          ReadID: data.id,
        });
        console.log("userID取れるはずです")
        family.value = $store.state.dankaModule.families.data;
      await $store.dispatch("chatModule/chatMigration",family.value)
      $router.replace("/system/chattest");
      
    }

    const profileEdit = (data) => {
      console.log(data)
      console.log(profileData.value)

      profileData.value.avatar = data.avatar
      profileData.value.last_name = data.last_name
      profileData.value.first_name = data.first_name
      profileData.value.type = data.type
      profileData.value.phone = data.phone
      profileData.value.mobile = data.mobile
      profileData.value.email = data.email
      profileData.value.representative = data.representative
      profileData.value.gender = data.gender
      profileData.value.postcode = data.postcode
      profileData.value.pref = data.pref
      profileData.value.city = data.city
      profileData.value.street = data.street
      profileData.value.address = data.address
      profileData.value.date_of_birth = data.date_of_birth
      profileData.value.date_of_death = data.date_of_death
      profileData.value.dharma_name = data.dharma_name
      profileData.value.cemetery_number = data.cemetery_number

      console.log(profileData.value)
    }

    const profileCreate = () => {
      profileData.value.avatar = 'https://api2.teraiku.jp/svg/login-avatar.svg';
      profileData.value.last_name = "";
      profileData.value.first_name = "";
      profileData.value.type = "";
      profileData.value.phone = "";
      profileData.value.mobile = "";
      profileData.value.email = "";
      profileData.value.representative = "";
      profileData.value.gender = "";
      profileData.value.postcode = "";
      profileData.value.pref = "";
      profileData.value.city = "";
      profileData.value.street = "";
      profileData.value.address = "";
      profileData.value.date_of_birth = "1980/01/01";
      profileData.value.date_of_death = "1980/01/01";
      profileData.value.dharma_name = "";
      profileData.value.cemetery_number = "";

      console.log(profileData.value)
    }

    const goBack = () => {
      DetailInformation.value = true;
      SelectElement.value = false;
    };
    
    return {
      profileData,
      profileEdit,
      profileCreate,
      EditElement,
      CreateElement,
      confirmationDialog,
      isLoadingUser,
      showSimulatedReturnData,
      DetailInformation,
      PastbooksInformation,
      showMoreInformation,
      DankaAddition,
      tenantDankaUpdate,
      showDankaUpdate,
      showDankaDelete,
      SelectEditDialog,
      SelectCreateDialog,
      familyName,
      family,
      pastbooksContact,
      pastbooksTotal,
      currentContacts,
      currentTotal,
      goBack,
      
      UserID,
      UserUUID,
      TenantID,
      Tenant,
      fetchDogs,
      filter,
      onRequest,
      contentTotal,
      pagenation,
      minPages,
      maxPages,
      rows,
      ConnectAddress,
      birthdayInformation,
      deathdayInformation,
      category,
      options,

      tab: ref('all'),
      search: ref(''),
      size,
      selected_contact,
      AddressConnect,
      DayFormat,
      SelectElement,
      detail_list,
      pastbook_list,
      moveShatwork,

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
      
      

    }
  }


})
</script>

<style scoped>

</style>