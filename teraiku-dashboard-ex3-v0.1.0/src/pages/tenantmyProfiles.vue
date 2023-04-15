<template>
  <q-page class="q-pa-lg">
    <div class="container">
      <div class="row justify-center">
        <div class="column">
          <h4 style="margin: 1rem; 0;">会員情報</h4>
        </div>
      </div>
    <div class="row justify-center">
      <div class="col-lg-6 col-md-8 col-xs-12 col-sm-12">
        <q-card class="card-bg">
          <q-form @submit="onSubmit()" class="q-gutter-mdt">
            <q-card-section class="text-h6 ">
              <div class="text-h6">プロフィール編集</div>
            </q-card-section>
            <q-card-section style="margin: 0px;">
              <q-list class="row">
                <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-item-section side>
                    <q-avatar size="100px">
                      <img :src="UserAvatar">
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <croppa @uploadfile="updateFiles"></croppa>
                    <!-- <q-file
                      v-model="filesImages"
                      class="text-capitalize"
                      bg-color="blue-4"
                      rounded
                      clearable 
                      outlined
                      dense
                      style="max-width: 120px; margin-bottom: 10px"
                      label="写真を変更"
                      accept=".jpg, image/*"
                      @update:model-value="updateFiles"
                      @rejected="onRejectedfile"  
                    /> -->
                    <!-- <q-btn label="会員番号を見る" class="text-capitalize" rounded color="orange"
                          style="max-width: 130px"></q-btn> -->
                  </q-item-section>
                  <!-- <div>
                    <input type="file" ref="preview" @change="uploadfile"/>
                  </div> -->
                  <div v-if="url">
                    <img :src="url">
                  </div>
                </q-item>


                <!-- <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                  <q-item-section>
                    <q-input   dense v-model="inputMemberShip" label="会員番号" value=""/>
                  </q-item-section>
                </q-item> -->
                <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                  <q-item-section>
                    <q-input dense v-model="inputNickName" label="表示名"
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
                    ]"
                    />
                  </q-item-section>
                </q-item>
                <!-- <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                  <q-item-section>
                    <q-input  v-model="inputGender" type="text" dense label="性別"
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
                    ]"
                    />
                  </q-item-section>
                </q-item> -->
                <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                  <q-item-section>
                    <q-select
                      dense
                      v-model="inputGender"
                      :options="tag1"
                      label="性別"
                      :rules="[
                        (val) =>
                          (val && val.toString().length > 0) || 'このフィールドは空欄であってはなりません',
                      ]"
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                  <q-item-section>
                    <q-input   dense v-model="inputLastName" label="姓"
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
                    ]"
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                  <q-item-section>
                    <q-input   dense v-model="inputFirstName" label="名"
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
                    ]"
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                  <q-item-section>
                    <q-input  dense v-model="inputLastNameKana" label="せい"
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
                    ]"
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                  <q-item-section>
                    <q-input   dense v-model="inputFirstNameKana" label="めい"
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
                    ]"
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <q-item-section>
                    <q-input  dense v-model="inputEmail" disable label="メールアドレス"
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
                    ]"
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <q-item-section>
                    <q-input  
                      dense 
                      v-model="inputPhone" 
                      label="電話番号(例)08012345678"
                      mask="###########"
                      pattern="^[0-9]{10,11}$"
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
                    ]"
                    />
                  </q-item-section>
                </q-item>

                <!-- <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <label for="exampleInputEmail1" required="required">生年月日</label>
                </q-item> -->

                <!-- <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-4" v-if="checkBirth">
                  <q-item-section>
                    <q-input
                      v-model="inputBirthdayYear"
                      type="text"
                      label="年[半角英数字]"
                      disable
                      dense
                      mask="####"
                      pattern="^[0-9]{4}$"      
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
                      ]"
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-4" v-else>
                  <q-item-section>
                    <q-input
                      v-model="inputBirthdayYear"
                      type="text"
                      label="年[半角英数字]"
                      dense
                      mask="####"
                      pattern="^[0-9]{4}$"        
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
                      ]"
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-4" v-if="checkBirth">
                  <q-item-section>
                    <q-input
                      v-model="inputBirthdayMoon"
                      type="text"
                      dense
                      label="月[半角英数字]"
                      disable
                      mask="##"
                      pattern="^[0-9]{2}$"
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
                      ]"
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-4" v-else>
                  <q-item-section>
                    <q-input
                      v-model="inputBirthdayMoon"
                      type="text"
                      dense
                      label="月[半角英数字]"
                      mask="##"
                      pattern="^[0-9]{2}$"
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
                      ]"
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-4" v-if="checkBirth">
                  <q-item-section>
                    <q-input
                      v-model="inputBirthdayDay"
                      type="text"
                      dense
                      label="日[半角英数字]"
                      disable
                      mask="##"
                      pattern="^[0-9]{2}$"
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
                      ]"
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-4" v-else>
                  <q-item-section>
                    <q-input
                      v-model="inputBirthdayDay"
                      type="text"
                      dense
                      label="日[半角英数字]"
                      mask="##"
                      pattern="^[0-9]{2}$"
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
                      ]"
                    />
                  </q-item-section>
                </q-item> -->
                <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <q-item-section>
                    <q-input 
                      dense
                      v-model="checkBirth" 
                      mask="date" 
                      :rules="['date']" 
                      label="誕生日"
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="checkBirth">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </q-item-section>
                </q-item>

                <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <q-item-section>
                    <q-input  
                      autogrow 
                      dense  
                      v-model="inputPostal" 
                      mask="#######" 
                      label="郵便番号(例)1234567" 
                      pattern="^[0-9]{7}$"
                      style="margin-right: 0px;"
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
                      ]"
                    />
                  </q-item-section>
                  <!-- <q-btn
                    dense
                    size="md"
                    padding="xs"
                    color="info"
                    label="検索"
                    style="margin-top: 5px; height: 35px"
                    @click="searchPostcode(inputPostal)"
                  >
                    <q-tooltip>郵便番号から住所を検索します</q-tooltip>
                  </q-btn> -->
                  <search-postcode :postcode="inputPostal" @inputPostal="inputPostcode($event)"></search-postcode>
                </q-item>
                <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <q-item-section>
                    <q-input  dense v-model="inputPref" label="都道府県"
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
                    ]"
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <q-item-section>
                    <q-input  dense v-model="inputMunicipality" label="市町村"
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
                      ]"
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <q-item-section>
                    <q-input dense autogrow v-model="inputStreet" label="番地以降"
                    :rules="[
                        (val) =>
                          (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
                      ]"
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <q-item-section>
                    <q-input autogrow dense v-model="inputAddress" label="建物名"
                    :rules="[(val)]"
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input  type="textarea" dense v-model="inputComment" label="自己紹介文"/>
                  </q-item-section>
                </q-item>

              </q-list>
            </q-card-section>
            <q-card-actions v-if="profile[0]" align="right"> 
              <!-- href="https://members.teraiku.jp/system" -->
              <!-- to="/system" -->
              <q-btn class="text-capitalize bg-info" type="submit" color="info">会員情報を更新</q-btn>
            </q-card-actions>
            <q-card-actions v-else align="right">
              <q-btn class="text-capitalize bg-info" type="submit" color="info">会員情報を作成</q-btn>
            </q-card-actions>
          </q-form>
        </q-card>
      </div>

      <!-- <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
        <q-card class="card-bg " style="background-color: grey">
          <q-card-section class="text-h6 q-pa-sm">
            <div class="text-h6">パスワード変更</div>
          </q-card-section>
          <q-card-section class="q-pa-sm row">
            <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <q-item-section>
                今までのパスワード
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
              <q-item-section> -->
                <!-- v-model="InputCurrentPassword" -->
                <!-- <q-input type="password" disable dense outlined round
                         placeholder="Current Password"/>
              </q-item-section>
            </q-item>
            <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <q-item-section>
                新しいパスワード
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
              <q-item-section>
                <q-input type="password" dense disable outlined round v-model="InputNewPassword"
                         placeholder="New Password"/>
              </q-item-section>
            </q-item>
            <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <q-item-section>
                新しいパスワードを確認
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
              <q-item-section>
                <q-input type="password" disable dense outlined round
                         v-model="InputConfirmNewPassword"
                         placeholder="Confirm New Password"/>
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn class="text-capitalize bg-info" disable color="info">パスワード変更</q-btn>
          </q-card-actions>

        </q-card>
      </div>

      <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
        <q-card class="card-bg " style="background-color: grey">
          <q-card-section class="text-h6 q-pa-sm">
            <div class="text-h6">家族を招待</div>
          </q-card-section>
          <q-card-section class="q-pa-sm row">
            <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <q-item-section>
                メールアドレス
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
              <q-item-section>
                <q-input type="email" disable dense outlined round
                         v-model="inputFamilyEmail"
                         placeholder="家族のメールアドレスを入力"/>
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn class="text-capitalize bg-info" disable color="info">家族を招待</q-btn>
          </q-card-actions>

        </q-card>
      </div>

      <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
        <q-card class="card-bg " style="background-color: grey">
          <q-card-section class="text-h6 q-pa-sm">
            <div class="text-h6">アカウント処理</div>
          </q-card-section>
          <q-card-section class="q-pa-sm row">
             -->
           
            <!-- <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <q-item-section>
                ログアウトする
              </q-item-section>
            </q-item> -->
            <!-- <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <q-item-section>
                 <q-btn class="text-capitalize bg-info" disable color="black" to="/login">ログアウト</q-btn>
              </q-item-section>
            </q-item> -->
            <!-- <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <q-item-section>
                退会する
              </q-item-section>
            </q-item> -->
            <!-- <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <q-item-section>
                 <q-btn class="text-capitalize bg-info" disable color="red" to="/login">退会</q-btn>
              </q-item-section>
            </q-item>
          </q-card-section> -->

        <!-- </q-card>
      </div> -->
    </div>
    </div>
  </q-page>

</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { useRouter } from 'vue-router'
import { positiveMessage, negativeMessage } from "src/composable/light-notify";
import { dankalistDetail } from "../composable/column-tables";
import searchPostcode from "../components/searchPostcode";
import Croppa from "../components/Croppa.vue";
import dayjs from 'dayjs';

const columns = dankalistDetail;

export default {
  components: {
    searchPostcode,
    Croppa,
  },
  setup() {
    // General Variables
    const $store = useStore();
    const $q = useQuasar();
    const $router = useRouter();

    // Table variables
    const UserID = ref('');
    const UserUUID = ref('');
    const UserAvatar = ref('');
    const rows = ref([]);
    const currentfamily = ref([]);
    const profile = ref([]);
    const filter = ref("");
    const file = ref([]);
    const isLoadingTable = ref(false);
    const hideBottom = ref("");
    const filesImages = ref('');
    const checkBirth = ref("");
    const tag1 = ["男性", "女性"];

    // Dialogs
    let isDialogOpen = ref(false);
    let isDeleteDialogOpen = ref(false);
    let isChangedPhoto = ref(false);
    let openPostcodeDialog = ref(false);

    let inputMemberShip = ref("");
    let inputNickName = ref("");
    let inputLastName = ref("");
    let inputFirstName = ref("");
    let inputLastNameKana = ref("");
    let inputFirstNameKana = ref("");
    let inputEmail = ref("");
    let inputPhone = ref("");
    let inputPostal = ref("");
    let inputPref = ref("");
    let inputMunicipality = ref("");
    let inputAddress = ref("");
    let inputStreet = ref("");
    let inputComment = ref("");
    let inputGender = ref("");
    let inputBirthdayYear = ref("");
    let inputBirthdayMoon = ref("");
    let inputBirthdayDay = ref("");
    let inputCode = ref([]);
    let url  =ref("");

    let InputCurrentPassword = ref("");
    let InputNewPassword = ref("");
    let InputConfirmNewPassword = ref("");
    let inputFamilyEmail = ref("");


    let authors = ref(null);
    let authorSelected = ref(null);

    let dialogTitle = ref("");
    let editDialogStatus = ref("");
    let resourceForUpdate = ref({});
    let resourceForDelete = ref({});

    const isDarkModeActive = computed(() => $q.dark.isActive);

    // GEt all data for the first render
    (async function setupBooks() {
      try{
        await $store.dispatch("authModule/userAccessToken");
        const user = $store.state.authModule.users
        UserID.value = user.id; 
        UserUUID.value = user.uuid;
        inputNickName.value = user.name;
        inputEmail.value = user.email;
        await $store.dispatch("booksModule/readMyProfile", {
          id: UserID.value,
          uuid: UserUUID.value,
        });
        profile.value = $store.state.booksModule.representative;
        if(profile.value[0]){
          UserAvatar.value = profile.value[0].avatar;
          console.log(UserAvatar.value)
        }
        if(profile.value[0]){
          inputLastName.value = profile.value[0].last_name;
          inputFirstName.value = profile.value[0].first_name;
          inputLastNameKana.value = profile.value[0].last_name_kana;
          inputFirstNameKana.value = profile.value[0].first_name_kana;
          inputPhone.value = profile.value[0].phone;
          inputPostal.value = profile.value[0].postcode;
          inputPref.value = profile.value[0].pref;
          inputMunicipality.value = profile.value[0].city;
          inputAddress.value = profile.value[0].address;
          inputStreet.value = profile.value[0].street;
          inputComment.value = profile.value[0].comments;
          inputGender.value = profile.value[0].gender;
          checkBirth.value = dayjs(profile.value[0].date_of_birth).format("YYYY/MM/DD")
          inputBirthdayYear.value = dayjs(profile.value[0].date_of_birth).format("YYYY");
          inputBirthdayMoon.value = dayjs(profile.value[0].date_of_birth).format("MM");
          inputBirthdayDay.value = dayjs(profile.value[0].date_of_birth).format("DD");
          console.log(dayjs(checkBirth.value).format("YYYY-MM-DD"));
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
      isLoadingTable.value = true;
      try {
        // await $store.dispatch("dankaModule/readBooks");
        // isLoadingTable.value = false;
        // console.log($store.state.dankaModule.families.data);
        // rows.value = $store.state.dankaModule.families.data;
        
        
      } catch (e) {
        negativeMessage("Error", "データの読み込み中にエラーが発生しました");
        console.log(err)
      }
    })();

    // Events in the page
    const openEditDialog = (data = null) => {
      isDialogOpen.value = !isDialogOpen.value;
      if (data) {
        dialogTitle.value = "編集するには";
        inputLastName.value = data.last_name;
        inputFirstName.value = data.first_name;
        inputLastNameKana.value = data.last_name_kana;
        inputFirstNameKana.value = data.first_name_kana;
        inputEmail.value = data.email;
        inputPhone.value = data.phone;
        inputPostal.value = data.postal;
        inputPref.value = data.pref;
        inputMunicipality.value = data.city;
        inputAddress.value = data.address;
        inputStreet.value = data.street;
        inputComment.value = data.comment;
        editDialogStatus.value = "modify";
        resourceForUpdate.value = data;
        return;
      }
      dialogTitle.value = "新規檀家情報";
      editDialogStatus.value = "create";
    };

    const openDeleteDialog = (data) => {
      isDeleteDialogOpen.value = !isDeleteDialogOpen.value;
      resourceForDelete.value = data;
    };

    const onDeleteBook = async (id) => {
      try {
        await $store.dispatch("booksModule/deleteBook", { id });
        positiveMessage("データ編集", "リソースが変更されました");
        rows.value = $store.state.booksModule.books.data;
        isDeleteDialogOpen.value = false;
      } catch (error) {
        negativeMessage("Error", "リソースの削除に失敗しました");
      }
    };

    const onCancel = () => {
      onReset();
      isDialogOpen.value = !isDialogOpen.value;
    };

    const onSubmit = async () => {
      if(isChangedPhoto.value){
        const blob = window.atob(UserAvatar.value.replace(/^.*,/, ''));
        let buffer = new Uint8Array(blob.length);
        for (let i = 0; i < blob.length; i++) {
            buffer[i] = blob.charCodeAt(i);
        }
        const imgFile = new File([buffer.buffer], file.value.name, {type: file.value.type});
        // console.log(imgFile)
        try{
          const formdata = new FormData();
          formdata.append('avatar', imgFile)
          // console.log(formdata)
          await $store.dispatch("imageModule/createImage", formdata );
          UserAvatar.value = $store.state.imageModule.images;
          console.log(UserAvatar.value)
        }catch (e) {
          negativeMessage("Error", `ファイルの読み込みに失敗しました`);
        }
      }    
      if(profile.value[0].type){
        console.log("AAAAA")
        try {
          await $store.dispatch("booksModule/updateProfile", {
            id1: UserID.value,
            id2: profile.value[0].id,
            // type: "てらいく個人会員",
            last_name : inputLastName.value,
            first_name : inputFirstName.value,
            last_name_kana : inputLastNameKana.value,
            first_name_kana : inputFirstNameKana.value,
            phone : inputPhone.value,
            postcode : inputPostal.value,
            pref : inputPref.value,
            city : inputMunicipality.value,
            address : inputAddress.value,
            street : inputStreet.value,
            comments : inputComment.value,
            gender: inputGender.value,
            date_of_birth: dayjs(checkBirth.value).format("YYYY-MM-DD"),
            avatar: UserAvatar.value,
          });
          await $store.dispatch("contactsModule/createPost", {
            id: UserID.value,
            to_name: inputLastName.value+inputFirstName.value,
            title: "プロフィール情報の更新をしました。",
            body: "無事会員情報の更新が完了しました。今後もぜひてらいくをご利用ください。",
            meta: "{data: 'JSON\u30c7\u30fc\u30bf'}",
            created_by: inputLastName.value+inputFirstName.value,
            request_id: UserID.value,
            from_name: inputLastName.value+inputFirstName.value,
            description: "プロファイル作成",
            meta: "{data: 'JSON\u30c7\u30fc\u30bf'}",
          });

          positiveMessage("Creacion", "新しいリソースが作成されました");
          isDialogOpen.value = false;
          $router.go({name: "SystemMain", force: true});
        } catch (error) {
          negativeMessage("Error", "リソースの作成中にエラーが発生しました");
        }
      }else{
        try {
          await $store.dispatch("booksModule/updateProfile", {
            id1: UserID.value,
            id2: profile.value[0].id,
            representative: "",
            email: inputEmail.value,
            type: "てらいく会員",
            name: inputNickName.value,
            last_name : inputLastName.value,
            first_name : inputFirstName.value,
            last_name_kana : inputLastNameKana.value,
            first_name_kana : inputFirstNameKana.value,
            phone : inputPhone.value,
            postcode : inputPostal.value,
            pref : inputPref.value,
            city : inputMunicipality.value,
            address : inputAddress.value,
            street : inputStreet.value,
            comments : inputComment.value,
            gender: inputGender.value,
            date_of_birth: dayjs(checkBirth.value).format("YYYY-MM-DD"),
            avatar: UserAvatar.value,
          });
          console.log("Create Anniverasry")
          await $store.dispatch("contactsModule/createPost", {
            id: UserID.value,
            to_name: inputLastName.value+inputFirstName.value,
            title: "てらいくにようこそ！",
            body: "無事会員情報の入力が完成しました。家族情報、トークルーム、各種申請が利用可能になります。",
            meta: "{data: 'JSON\u30c7\u30fc\u30bf'}",
            created_by: inputLastName.value+inputFirstName.value,
            request_id: UserID.value,
            from_name: inputLastName.value+inputFirstName.value,
            description: "プロファイル作成",
            meta: "{data: 'JSON\u30c7\u30fc\u30bf'}",
          });
          // console.log(profile.value[0].id)
          // console.log(inputNickName.value)
          // console.log(inputGender.value)
          // console.log(dayjs(inputBirthdayYear.value + "-" + inputBirthdayMoon.value + "-" + inputBirthdayDay.value).format("YYYY-MM-DD"))
          // console.log(inputPref.value)
          await $store.dispatch("booksModule/readMyProfile", {
            id: UserID.value,
            uuid: UserUUID.value,
          });
          profile.value = $store.state.booksModule.representative;
          console.log(profile.value[0])
          await $store.dispatch("currentModule/createAnniversary", {
            id: profile.value[0].id,
            name: inputLastName.value+inputFirstName.value,
            gender: inputGender.value,
            date_of_birth: dayjs(checkBirth.value).format("YYYY-MM-DD"),
            place_of_birth: inputPref.value,
          });
          await $store.dispatch("currentModule/createPhoto", {
            id: profile.value[0].id,
            name: inputLastName.value+inputFirstName.value,
            date: dayjs().format("YYYY-MM-DD"),
            url: "https://api2.teraiku.jp/svg/login-avatar.svg",
          });
          // await $store.dispatch("authModule/updateUserProfileData", {
          //   id: UserID.value,
          //   is_member: true,
          // } );
          positiveMessage("Creacion", "新しいリソースが作成されました");
          isDialogOpen.value = false;
          console.log("OKです");
          // $router.push('/system')
          $router.go({name: "SystemMain", force: true});
        } catch (error) {
          negativeMessage("Error", "リソースの作成中にエラーが発生しました");
        }
      }
    };

    const updateFiles = (...args) => {
      try{
        console.log(args)
        const [base64, file] = args
        UserAvatar.value = base64;
        file.value = file;
        isChangedPhoto.value = !isChangedPhoto.value
      }catch (e) {
        negativeMessage("Error", `ファイルの読み込みに失敗しました`);
      }    
    };

    const searchPostcode = async (postcode) => {
      try{
        console.log(postcode);
        await $store.dispatch("contactsModule/searchPostcode", postcode);
        inputCode.value = $store.state.contactsModule.Postcodes;
        console.log(inputCode.value)
        if(inputCode.value.length > 10){
          negativeMessage("Error", `検索結果の候補が多すぎます。検索し直してください。`);  
        }
        else if(inputCode.value.length == 0){
          negativeMessage("Error", `検索結果の候補が見つかりませんでした。検索し直してください。`);  
        }
        else if(inputCode.value.length == 1){
          inputPref.value = inputCode.value[0].pref;
          inputMunicipality.value = inputCode.value[0].city;
          if(inputCode.value[0].street != '以下に掲載がない場合'){
            inputStreet.value = inputCode.value[0].street;
          }
        }
        else{
          openPostcodeDialog.value = !openPostcodeDialog.value;
        }
      }catch (e) {
        negativeMessage("Error", `読み込みに失敗しました`);
      }    
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
    }

    const onRejectedfile = () => {
      negativeMessage("Error", `画像ファイルを読み込んでください`);
    }

    const onReset = () => {
      inputLastName.value = "";
      inputFirstName.value = "";
      inputLastNameKana.value = "";
      inputFirstNameKana.value = "";
      inputEmail.value = "";
      inputPhone.value = "";
      inputPostal.value = "";
      inputPref.value = "";
      inputMunicipality.value = "";
      inputAddress.value = "";
      inputStreet.value = "";
      inputComment.value = "";
      inputGender = "";
      inputBirthdayYear = "";
      inputBirthdayMoon = "";
      inputBirthdayDay = "";

    };



    // Return reactive variables
    return {
      authors,
      authorSelected,
      columns,
      dialogTitle,
      editDialogStatus,
      filter,
      file,
      hideBottom,
      filesImages,
      profile,
      checkBirth,

      inputMemberShip,
      inputNickName,
      tag1,

      UserAvatar,
      UserUUID,
      inputLastName,
      inputFirstName,
      inputLastNameKana,
      inputFirstNameKana,
      inputEmail,
      inputPhone,
      inputPostal,
      inputPref,
      inputMunicipality,
      inputAddress,
      inputStreet,
      inputComment,
      inputGender,
      inputBirthdayYear,
      inputBirthdayMoon,
      inputBirthdayDay,
      inputCode,

      InputCurrentPassword,
      InputNewPassword,
      InputConfirmNewPassword,
      inputFamilyEmail,

      isDarkModeActive,
      isDeleteDialogOpen,
      isChangedPhoto,
      isDialogOpen,
      isLoadingTable,
      openPostcodeDialog,
      resourceForUpdate,
      resourceForDelete,
      rows,
      currentfamily,
      url,
      onCancel,
      onReset,
      onSubmit,
      openEditDialog,
      onDeleteBook,
      openDeleteDialog,
      updateFiles,
      searchPostcode,
      onRejectedfile,
      inputPostcode,
    };
  }
};
</script>

<style scoped>
/* .card-bg {
  background-color: #162b4d;
} */
</style>
