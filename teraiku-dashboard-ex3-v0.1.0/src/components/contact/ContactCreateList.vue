<template>

  <q-form @submit="onSubmit" @reset="onCancel" class="no-border no-border" style="min-height: calc(100vh - 75px)">
              
    <q-toolbar class="text-black ">
      <q-btn round flat class="q-pa-sm">
        <q-avatar size="80px">
          <img :src="UserAvatar">
        </q-avatar>
      </q-btn>

      <div class="row justify-between">
        <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding: 0px 16px;">
          <q-item-section>
            <q-input 
              v-model="inputLastName" 
              label="姓" 
              placeholder="例) 山田"
              dense 
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
              ]"
            >
              <template v-slot:label>
                姓<b style="color: red; font-size: 20px;">*</b>
              </template>
            </q-input>
          </q-item-section>
        </q-item>
        <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding: 0px 16px;">
          <q-item-section>
            <q-input 
              v-model="inputFirstName" 
              label="姓" 
              placeholder="例) 太郎"
              dense 
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
              ]"
            >
              <template v-slot:label>
                名<b style="color: red; font-size: 20px;">*</b>
              </template>
            </q-input>
          </q-item-section>
        </q-item>
        <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding: 0px 16px;">
          <q-item-section>
            <croppa @uploadfile="updateFiles"></croppa>
          </q-item-section>
        </q-item>
        <q-item v-if="checkFlag==='Edit' || checkFlag==='Create'" class="col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding: 0px 16px;">
          <q-item-section>
            <q-input 
              v-model="inputType" 
              label="種別"
              dense
              disable
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.toString().length > 0) || '種別を選択してください',
              ]"
            >
              <template v-slot:label>
                <div>種別<b style="color: red; font-size: 20px;">*</b></div>
              </template>
            </q-input>
          </q-item-section>
        </q-item>

        <q-item v-else class="col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding: 0px 16px;">
          <q-item-section>
            <q-select 
              v-model="inputType" 
              label="種別"
              :options="tag2"
              dense
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.toString().length > 0) || '種別を選択してください',
              ]"
            >
              <template v-slot:label>
                <div>種別<b style="color: red; font-size: 20px;">*</b></div>
              </template>
            </q-select>
          </q-item-section>
        </q-item>

      </div>

      <q-btn
        round
        size="sm"
        type="submit"
        class="q-mx-xs"
        color="green"
        icon="done"
      >
        <q-tooltip class="bg-dark text-body2">確定する</q-tooltip>
      </q-btn>
      <q-btn
        round
        size="sm"
        type="reset"
        class="q-mx-xs"
        color="red"
        icon="close"
      >
        <q-tooltip class="bg-dark text-body2">キャンセル</q-tooltip>
      </q-btn>

      <!-- <q-btn
        v-if="back == true"
        size="sm"
        class="q-mx-xs"
        color="primary"
        icon="arrow_back"
        round
      />

      <q-space/> -->

    </q-toolbar>
    <q-separator style="margin-bottom: 10px"></q-separator>

    <div v-if="selected_contact == 'currentContacts'">
      <div  v-for="detail, key in detail_list" :key="key" >

        <q-item v-if="detail.label==='電話番号'" style="padding: 0px 5px;">
          <q-item-section avatar top>
            <q-avatar :icon="detail.icon" color="grey-2" />
          </q-item-section>
          <q-item-section>
            <!-- <div>電話番号(ハイフン無し)<a style="color: red; font-size: 20px;">*</a></div> -->
            <q-input
              v-model="inputPhone"
              dense
              placeholder="6〜11桁の数字を入力してください。"
              label="phone"
              mask="###########"
              pattern="^[0-9]{10,11}$"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 5) || '電話番号は先頭が0から始まり、6〜11桁の数字を入力してください',
              ]"
            >
              <template v-slot:label>
                <div>{{ detail.label }}<b style="color: red; font-size: 20px;">*</b></div>
              </template>
            </q-input>
          </q-item-section>
        </q-item>

        <q-item v-if="detail.label==='メールアドレス' && checkFlag==='Edit'" style="padding: 0px 5px;">
          <q-item-section avatar top>
            <q-avatar :icon="detail.icon" color="grey-2" />
          </q-item-section>
          <q-item-section> 
            <q-input
              v-model="inputEmail"
              dense
              disable
              type="email"
              label="email" 
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
              ]"
            >
              <template v-slot:label>
                <div>{{ detail.label }}<b style="color: red; font-size: 20px;">*</b></div>
              </template>
            </q-input>
          </q-item-section>
        </q-item>

        <q-item v-else-if="detail.label==='メールアドレス'" style="padding: 0px 5px;">
          <q-item-section avatar top>
            <q-avatar :icon="detail.icon" color="grey-2" />
          </q-item-section>
          <q-item-section> 
            <q-input
              v-model="inputEmail"
              dense
              type="email"
              label="email" 
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
              ]"
            >
              <template v-slot:label>
                <div>{{ detail.label }}<b style="color: red; font-size: 20px;">*</b></div>
              </template>
            </q-input>
          </q-item-section>
        </q-item>

        <q-item v-if="detail.label==='誕生日'" style="padding: 0px 5px;">
          <q-item-section avatar top>
            <q-avatar :icon="detail.icon" color="grey-2" />
          </q-item-section>
          <q-item-section>
            <q-input 
              dense
              v-model="inputBirth" 
              mask="date"
              label="生年月日"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
              ]" 
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="inputBirth">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
              <template v-slot:label>
                <div>{{ detail.label }}<b style="color: red; font-size: 20px;">*</b></div>
              </template>
            </q-input>
          </q-item-section>
        </q-item>

        <q-item v-if="detail.label==='郵便番号'" style="padding: 0px 5px;">
          <q-item-section avatar top>
            <q-avatar :icon="detail.icon" color="grey-2" />
          </q-item-section>
          <q-item-section>
            <q-input
              v-model="inputPostal"
              dense
              type="text"
              mask="#######" 
              label="郵便番号" 
              pattern="^[0-9]{7}$"
              placeholder="例) 1234567"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
              ]"
            >
              <template v-slot:label>
                <div>{{ detail.label }}<b style="color: red; font-size: 20px;">*</b></div>
              </template>
            </q-input>
          </q-item-section>
          <search-postcode :postcode="inputPostal" @inputPostal="inputPostcode($event)"></search-postcode>
        </q-item>

        <q-item v-if="detail.label==='都道府県'" style="padding: 0px 5px;">
          <q-item-section avatar top>
            <q-avatar :icon="detail.icon" color="grey-2" />
          </q-item-section>
          <q-item-section> 
            <q-input
              v-model="inputPref"
              type="text"
              label="都道府県"
              v-model.trim="inputPref"
              dense                  
              placeholder="例) 見本県"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
              ]"
            >
              <template v-slot:label>
                <div>{{ detail.label }}<b style="color: red; font-size: 20px;">*</b></div>
              </template>
            </q-input>
          </q-item-section>
        </q-item>

        <q-item v-if="detail.label==='市町村'" style="padding: 0px 5px;">
          <q-item-section avatar top>
            <q-avatar :icon="detail.icon" color="grey-2" />
          </q-item-section>
          <q-item-section> 
            <q-input
              v-model="inputMunicipality"
              type="text"
              label="市区町村"
              v-model.trim="inputMunicipality"
              dense
              placeholder="例) 見本市"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
              ]"
            >
              <template v-slot:label>
                <div>{{ detail.label }}<b style="color: red; font-size: 20px;">*</b></div>
              </template>
            </q-input>
          </q-item-section>
        </q-item>

        <q-item v-if="detail.label==='町名 番地'" style="padding: 0px 5px;">
          <q-item-section avatar top>
            <q-avatar :icon="detail.icon" color="grey-2" />
          </q-item-section>
          <q-item-section> 
            <q-input
              v-model="inputStreet"
              type="text"
              label="町域・番地"
              v-model.trim="inputStreet"
              dense
              placeholder="例) 見本町1-1"
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
              ]"
            >
              <template v-slot:label>
                <div>{{ detail.label }}<b style="color: red; font-size: 20px;">*</b></div>
              </template>
            </q-input>
          </q-item-section>
        </q-item>

        <q-item v-if="detail.label==='建物名'" style="padding: 0px 5px;">
          <q-item-section avatar top>
            <q-avatar :icon="detail.icon" color="grey-2" />
          </q-item-section>
          <q-item-section> 
            <q-input
              v-model="inputAddress"
              type="text"
              label="建物名など"
              v-model.trim="inputAddress"
              dense
              placeholder="例) 見本ビル 101"
              lazy-rules
              :rules="[(val)]"
            >
              <template v-slot:label>
                <div>{{ detail.label }}</div>
              </template>
            </q-input>
          </q-item-section>
        </q-item>

        <q-item v-if="detail.label==='性別'" style="padding: 0px 5px;">
          <q-item-section avatar top>
            <q-avatar :icon="detail.icon" color="grey-2" />
          </q-item-section>
          <q-item-section> 
            <q-select 
              v-model="inputGender" 
              label="性別" 
              :options="tag1"
              dense 
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
              ]"
            >
              <template v-slot:label>
                <div>{{ detail.label }}<b style="color: red; font-size: 20px;">*</b></div>
              </template>
            </q-select>
          </q-item-section>
        </q-item>

        <q-item v-if="detail.label==='Mobile'" style="padding: 0px 5px;">
          <q-item-section avatar top>
            <q-avatar :icon="detail.icon" color="grey-2" />
          </q-item-section>
          <q-item-section> 
            <q-input
              v-model="inputMobile"
              dense
              placeholder="6〜11桁の数字を入力してください。"
              label="phone"
              mask="###########"
              pattern="^[0-9]{10,11}$"
              lazy-rules
              :rules="[(val)]"
            >
              <template v-slot:label>
                <div>{{ detail.label }}</div>
              </template>
            </q-input>
          </q-item-section>
        </q-item>

        <q-item v-if="detail.label==='立場'" style="padding: 0px 5px;">
          <q-item-section avatar top>
            <q-avatar :icon="detail.icon" color="grey-2" />
          </q-item-section>
          <q-item-section> 
            <q-input
              v-model="inputRepresentative"
              dense
              label="立場"
              placeholder="例) 代表者"
              lazy-rules
              :rules="[(val)]"
            >
              <template v-slot:label>
                <div>{{ detail.label }}</div>
              </template>
            </q-input>
          </q-item-section>
        </q-item>

        <!-- <q-separator inset="item" v-if="detail_index!=detail_list.length-1"></q-separator> -->
      </div>
    </div>

    <div v-else-if="selected_contact == 'pastbooksContact'">
      <div  v-for="detail, key in pastbook_list" :key="key" >

        <q-item v-if="detail.label==='誕生日'" style="padding: 0px 5px;">
          <q-item-section avatar top>
            <q-avatar :icon="detail.icon" color="grey-2" />
          </q-item-section>
          <q-item-section>
            <q-input 
              dense
              v-model="inputBirth" 
              mask="date"
              label="生年月日"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
              ]" 
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="inputBirth">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
              <template v-slot:label>
                <div>{{ detail.label }}<b style="color: red; font-size: 20px;">*</b></div>
              </template>
            </q-input>
          </q-item-section>
        </q-item>

        <q-item v-if="detail.label==='行年'" style="padding: 0px 5px;">
          <q-item-section avatar top>
            <q-avatar :icon="detail.icon" color="grey-2" />
          </q-item-section>
          <q-item-section>
            <q-input 
              dense
              v-model="inputDeath"
              label="命日"
              mask="date"
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
              ]" 
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="inputDeath">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
              <template v-slot:label>
                <div>{{ detail.label }}<b style="color: red; font-size: 20px;">*</b></div>
              </template>
            </q-input>
          </q-item-section>
        </q-item>

        <q-item v-if="detail.label==='性別'" style="padding: 0px 5px;">
          <q-item-section avatar top>
            <q-avatar :icon="detail.icon" color="grey-2" />
          </q-item-section>
          <q-item-section> 
            <q-select 
              v-model="inputGender" 
              label="性別" 
              :options="tag1"
              dense 
              lazy-rules
              :rules="[
                (val) =>
                  (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
              ]"
            >
              <template v-slot:label>
                <div>{{ detail.label }}<b style="color: red; font-size: 20px;">*</b></div>
              </template>
            </q-select>
          </q-item-section>
        </q-item>

        <q-item v-if="detail.label==='戒名'" style="padding: 0px 5px;">
          <q-item-section avatar top>
            <q-avatar :icon="detail.icon" color="grey-2" />
          </q-item-section>
          <q-item-section> 
            <q-input
              v-model="inputdharmaName"
              type="text"
              label="戒名/法名"
              v-model.trim="inputdharmaName"
              dense
              placeholder="例) 〇〇〇〇"
              lazy-rules

            >
              <template v-slot:label>
                <div>{{ detail.label }}</div>
              </template>
            </q-input>
          </q-item-section>
        </q-item>

        <q-item v-if="detail.label==='墓地番号'" style="padding: 0px 5px;">
          <q-item-section avatar top>
            <q-avatar :icon="detail.icon" color="grey-2" />
          </q-item-section>
          <q-item-section> 
            <q-input
              v-model="inputcemeteryNumber"
              type="text"
              label="墓地番号"
              v-model.trim="inputcemeteryNumber"
              dense
              placeholder="例) 〇〇〇〇"
              lazy-rules

            >
              <template v-slot:label>
                <div>{{ detail.label }}</div>
              </template>
            </q-input>
          </q-item-section>
        </q-item>

        <!-- <q-separator inset="item" v-if="detail_index!=detail_list.length-1"></q-separator> -->
      </div>
    </div>
  
  </q-form>

</template>

<script>
import {defineComponent, defineAsyncComponent, ref} from 'vue';
import dayjs from 'dayjs';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ContactCreate, PastbookDetail } from "src/composable/contact-detail-list";
import { positiveMessage, negativeMessage } from "src/composable/light-notify";
import searchPostcode from "../searchPostcode";
import Croppa from "../Croppa.vue";

const detail_list = ContactCreate;
const pastbook_list = PastbookDetail;

export default defineComponent({
  name: "ContactCreateList",
  props: ['selected_contact', 'user_id', 'tenant_id', 'profile_id', 'profile', 'checkFlag', 'back'],
  emits: ['CreateContact', 'EditContact'],
  components: {
    searchPostcode,
    Croppa,
    // ContactCreateItem: defineAsyncComponent(() => import('components/Contact/ContactCreateItem')),
  },
  setup(props, context){
    const $store = useStore();
    const $router = useRouter();

    const tag1 = ["男性", "女性"];
    const tag2 = ["友人", "仕事仲間"];
    const UserAvatar = ref(props.profile.avatar);
    const file = ref([]);
    const imgFile = ref('');
    let openPostcodeDialog = ref(false);
    let isChangedPhoto = ref(false);

    let inputPhone = ref(props.profile.phone);
    let inputBirth = ref(props.profile.date_of_birth);
    let inputMobile = ref(props.profile.mobile);
    let inputEmail = ref(props.profile.email);
    let inputGender = ref(props.profile.gender);
    let inputPostal = ref(props.profile.postcode);
    let inputPref = ref(props.profile.pref);
    let inputMunicipality = ref(props.profile.city);
    let inputAddress = ref(props.profile.address);
    let inputStreet = ref(props.profile.street);
    let inputdharmaName = ref(props.profile.dharama_name);
    let inputmournerName = ref("");
    let inputDeath = ref(props.profile.date_of_death);
    let inputcemeteryNumber = ref(props.profile.cemetery_number);
    let inputRepresentative = ref(props.profile.representative);
    let inputLastName = ref(props.profile.last_name);
    let inputFirstName = ref(props.profile.first_name);
    let inputType = ref(props.profile.type);

    const onSubmit = async () => {
      if(isChangedPhoto.value){
        try{
          const formdata = new FormData();
          formdata.append('avatar', imgFile.value)
          // console.log(formdata)
          await $store.dispatch("imageModule/createImage", formdata );
          UserAvatar.value = $store.state.imageModule.images;
          console.log(UserAvatar.value)
        }catch (e) {
          negativeMessage("Error", `ファイルの読み込みに失敗しました`);
        }
      }
      console.log(props.selected_contact)
      console.log(props)
      switch(props.selected_contact){
        case 'currentContacts':
          if(props.checkFlag == "Create" || props.checkFlag == "CreateContact"){
            try {
              console.log(props.checkFlag)
              await $store.dispatch("booksModule/createBook", {
                id: props.tenant_id,
                last_name: inputLastName.value,          
                first_name: inputFirstName.value,
                phone: inputPhone.value,
                mobile: inputMobile.value,
                email: inputEmail.value,
                gender: inputGender.value,
                type: inputType.value,
                postcode: inputPostal.value,
                date_of_birth: inputBirth.value,
                pref: inputPref.value,
                city: inputMunicipality.value,
                street: inputStreet.value,
                address: inputAddress.value,
                representative: inputRepresentative.value,
                is_alive: true,
                avatar: UserAvatar.value,
              });
              positiveMessage("Creacion", "新しい"+inputType.value+"が作成されました");
              context.emit('CreateContact');
              onReset();
            } catch (error) {
              negativeMessage("Error", inputType.value+"の作成中にエラーが発生しました");
            }
          }else if(props.checkFlag == "Edit"){
            try {
              console.log(props.checkFlag)
              if(!props.user_id){
                await $store.dispatch("booksModule/updateBook", {
                  TenantID: props.tenant_id,
                  id: props.profile_id,
                  last_name: inputLastName.value,          
                  first_name: inputFirstName.value,
                  phone: inputPhone.value,
                  mobile: inputMobile.value,
                  email: inputEmail.value,
                  gender: inputGender.value,
                  type: inputType.value,
                  postcode: inputPostal.value,
                  date_of_birth: inputBirth.value,
                  pref: inputPref.value,
                  city: inputMunicipality.value,
                  street: inputStreet.value,
                  address: inputAddress.value,
                  representative: inputRepresentative.value,
                  is_alive: true,
                  avatar: UserAvatar.value,
                });
                positiveMessage("Creacion", inputType.value+"が更新されました");
                context.emit('EditContact');
              }else{
                await $store.dispatch("currentModule/updateBook", {
                  pageID: props.user_id,
                  id: props.profile_id,
                  last_name: inputLastName.value,          
                  first_name: inputFirstName.value,
                  phone: inputPhone.value,
                  mobile: inputMobile.value,
                  email: inputEmail.value,
                  gender: inputGender.value,
                  type: inputType.value,
                  postcode: inputPostal.value,
                  date_of_birth: inputBirth.value,
                  pref: inputPref.value,
                  city: inputMunicipality.value,
                  street: inputStreet.value,
                  address: inputAddress.value,
                  representative: inputRepresentative.value,
                  is_alive: true,
                  avatar: UserAvatar.value,
                });
                positiveMessage("Creacion", inputType.value+"が更新されました");
                context.emit('CreateContact');
              }
              onReset();
            } catch (error) {
              negativeMessage("Error", inputType.value+"の更新中にエラーが発生しました");
            }
          }
          break;
        case 'pastbooksContact':
          if(props.checkFlag == "Create" || props.checkFlag == "CreateContact"){
            try {
              console.log(props.checkFlag)
              await $store.dispatch("currentModule/createPast", {
                id: props.user_id,
                last_name: inputLastName.value,
                first_name: inputFirstName.value,
                gender: inputGender.value,
                type: inputType.value,
                date_of_birth: inputBirth.value,
                date_of_death: inputDeath.value,
                dharma_name: inputdharmaName.value,
                cemetery_number: inputcemeteryNumber.value,
                is_alive: false,
                avatar: UserAvatar.value,
              });            
              const profile = $store.state.currentModule.pastfamily;
              console.log(profile)
              await $store.dispatch("booksModule/attachProfile", {
                  tenant_id: props.tenant_id,
                  profile_id: profile.id,
                });
              await $store.dispatch("dateofdeathModule/createBook", {
                id: profile.id,
                name: inputLastName.value + inputFirstName.value,
                gender: inputGender.value,
                date_of_death: inputDeath.value,
                day7: dayjs(inputDeath.value).add(7, "d").format("YYYY-MM-DD"),
                day27: dayjs(inputDeath.value).add(27, "d").format("YYYY-MM-DD"),
                day37: dayjs(inputDeath.value).add(37, "d").format("YYYY-MM-DD"),
                day57: dayjs(inputDeath.value).add(57, "d").format("YYYY-MM-DD"),
                day67: dayjs(inputDeath.value).add(67, "d").format("YYYY-MM-DD"),
                day77: dayjs(inputDeath.value).add(77, "d").format("YYYY-MM-DD"),
                day100: dayjs(inputDeath.value).add(100, "d").format("YYYY-MM-DD"),
                year1: dayjs(inputDeath.value).add(1, "y").format("YYYY-MM-DD"),
                year3: dayjs(inputDeath.value).add(3, "y").format("YYYY-MM-DD"),
                year7: dayjs(inputDeath.value).add(7, "y").format("YYYY-MM-DD"),
                year13: dayjs(inputDeath.value).add(13, "y").format("YYYY-MM-DD"),
                year17: dayjs(inputDeath.value).add(17, "y").format("YYYY-MM-DD"),
                year23: dayjs(inputDeath.value).add(23, "y").format("YYYY-MM-DD"),
                year25: dayjs(inputDeath.value).add(25, "y").format("YYYY-MM-DD"),
                year27: dayjs(inputDeath.value).add(27, "y").format("YYYY-MM-DD"),
                year33: dayjs(inputDeath.value).add(33, "y").format("YYYY-MM-DD"),
                year50: dayjs(inputDeath.value).add(50, "y").format("YYYY-MM-DD"),
              });
              onReset();
              positiveMessage("Creacion", "新しいご先祖が作成されました");
              context.emit('CreateContact');
            } catch (error) {
              negativeMessage("Error", "ご先祖の作成中にエラーが発生しました");
            }
          }else if(props.checkFlag == "Edit"){
            try {
              console.log(props.checkFlag)
              console.log(props)
              if(!props.user_id){
                await $store.dispatch("booksModule/updateBook", {
                  TenantID: props.tenant_id,
                  id: props.profile_id,
                  last_name: inputLastName.value,
                  first_name: inputFirstName.value,
                  gender: inputGender.value,
                  type: inputType.value,
                  date_of_birth: inputBirth.value,
                  date_of_death: inputDeath.value,
                  dharma_name: inputdharmaName.value,
                  cemetery_number: inputcemeteryNumber.value,
                  is_alive: false,
                  avatar: UserAvatar.value,
                });
                positiveMessage("Creacion", "ご先祖が更新されました");
                context.emit('CreateContact');
              }else{
                await $store.dispatch("currentModule/updateBook", {
                  pageID: props.user_id,
                  id: props.profile_id,
                  last_name: inputLastName.value,
                  first_name: inputFirstName.value,
                  gender: inputGender.value,
                  type: inputType.value,
                  date_of_birth: inputBirth.value,
                  date_of_death: inputDeath.value,
                  dharma_name: inputdharmaName.value,
                  cemetery_number: inputcemeteryNumber.value,
                  is_alive: false,
                  avatar: UserAvatar.value,
                });
                positiveMessage("Creacion", "ご先祖が更新されました");
                context.emit('CreateContact');
              }
              onReset();
            } catch (error) {
              negativeMessage("Error", "ご先祖の更新中にエラーが発生しました");
            }
          }
          break;
      }
    }

    const onCancel = () => {
      onReset();
      console.log(props)
      if(!props.user_id){
        context.emit('EditContact');
      }else{
        context.emit('CreateContact');
      }

    }

    const onReset = () => {
      inputLastName.value = "";
      inputFirstName.value = "";
      inputType.value = "";
      inputPhone.value = "";
      inputMobile.value = "";
      inputEmail.value = "";
      inputGender.value = "";
      inputPostal.value = "";
      inputPref.value = "";
      inputMunicipality.value = "";
      inputBirth.value = "";
      inputAddress.value = "";
      inputStreet.value = "";
      inputdharmaName.value = "";
      inputmournerName.value = "";
      inputDeath.value = "";
      inputcemeteryNumber.value = "";
      inputRepresentative.value = "";
      UserAvatar.value = "https://api2.teraiku.jp/svg/login-avatar.svg";
      file.value = [];
      imgFile.value = "";
      isChangedPhoto.value = false;
      openPostcodeDialog.value = false;
    };

    const inputPostcode = (postcode) => {
      console.log(postcode)
      inputPostal.value = postcode.code
      inputPref.value = postcode.pref;
      inputMunicipality.value = postcode.city;
      if(postcode.street != '以下に掲載がない場合'){
        inputStreet.value = postcode.street;
      }
      openPostcodeDialog.value = !openPostcodeDialog.value;
    };

    const updateFiles = (...args) => {
      try{
        // console.log(args)
        // const [base64, file] = args
        // UserAvatar.value = base64;
        // file.value = file;
        // console.log(file.value.name)
        // console.log(file.value.size)
        // const blob = window.atob(UserAvatar.value.replace(/^.*,/, ''));
        // let buffer = new Uint8Array(blob.length);
        // for (let i = 0; i < blob.length; i++) {
        //     buffer[i] = blob.charCodeAt(i);
        // }
        // imgFile.value = new File([buffer.buffer], file.value.name , {type: file.value.type});
        // console.log(imgFile.value)
        // isChangedPhoto.value = true;

        console.log(args)
        const [base64, file] = args
        UserAvatar.value = base64;
        file.value = file;
        console.log(file.value)
        const blob = window.atob(UserAvatar.value.replace(/^.*,/, ''));
        let buffer = new Uint8Array(blob.length);
        for (let i = 0; i < blob.length; i++) {
            buffer[i] = blob.charCodeAt(i);
        }
        imgFile.value = new File([buffer.buffer], file.value.name , {type: file.value.type});
        console.log(imgFile.value)
        isChangedPhoto.value = true;
      }catch (e) {
        negativeMessage("Error", `ファイルの読み込みに失敗しました`);
      }    
    };
    
    return{
      tag2,
      tag1,
      UserAvatar,
      file,
      imgFile,
      isChangedPhoto,
      openPostcodeDialog,
      inputPhone,
      inputMobile,
      inputEmail,
      inputGender,
      inputPostal,
      inputBirth,
      inputPref,
      inputMunicipality,
      inputAddress,
      inputStreet,
      inputdharmaName,
      inputmournerName,
      inputDeath,
      inputcemeteryNumber,
      inputRepresentative,
      detail_list,
      pastbook_list,
      inputLastName,
      inputFirstName,
      inputType,
      onSubmit,
      onCancel,
      onReset,
      inputPostcode,
      updateFiles,
    }
  }
 
})
</script>
<style scoped>

a {
  text-decoration: none; /* 下線を無効化 */
  color : inherit;
}

.PhoneClass:hover {
  background-color:#84ffff
}

.EmailClass:hover {
  background-color: #dbffb7
}

</style>
