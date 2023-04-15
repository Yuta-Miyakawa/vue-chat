<template>
<!-- &&contacts.is_user!==true -->
  <q-btn
    v-if="SelectEditDialog != 'rows'"
    round
    size="sm"
    class="q-mx-xs"
    color="red"
    icon="delete"
    @click="isDelete = true "
  >
    <q-tooltip class="bg-dark text-body2">削除</q-tooltip>
  </q-btn>
  <q-btn
    round
    size="sm"
    class="q-mx-xs"
    color="info"
    icon="edit"
    @click="openEditDialog(contacts,SelectEditDialog); "
  >
    <q-tooltip class="bg-dark text-body2">編集</q-tooltip>
  </q-btn>
   <!-- <div 
    v-else-if="SelectEditDialog=='NewDanka'"
    style="padding-top:8px"
  >
    <q-btn
      class="full-width"
      color="primary"
      icon="person_add"
      label="新規檀家"
      @click="openEditDialog()"
    />
  </div> -->
  

  

<q-dialog v-model="isDialogOpen" persistent>
  <q-card class="creation-card-simple q-pa-sm">
    <q-card-section>
      <div class="row justify-between" v-if="targetDialog == 'currentContacts'">
        <div class="col-xs-7 col-sm-9 col-md-9">
          <div class="text-h6">{{ dialogTitle }}</div>
        </div>
        <div class="col-xs-5 col-sm-3 col-md-3">
          <q-btn
            color="red"
            label="過去帳移行"
            @click="openMoveDialog(resourceForUpdate)"
          />
        </div>
      </div>
      <div v-else class="col-xs-8 col-sm-10 col-md-10">
        <div class="text-h6">{{ dialogTitle }}</div>
      </div>
    </q-card-section>
    <q-card-section>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <!-- 連絡先と現在帳表示 -->
        <div v-if="targetDialog !== 'movePastbooks'" class="row justify-between">
          <div class="col-xs-12 col-sm-6 col-md-6">
            <q-card-section class="q-pt-none">
              <q-input
                v-model="inputLastName"
                type="text"
                label="姓"
                class="q-mb-xs"
                v-model.trim="inputLastName"
                :rules="[
                  (val) =>
                    (val && val.toString().length > 0) || '姓を入力してください',
                ]"
              />
            </q-card-section>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6">
            <q-card-section class="q-pt-none">
              <q-input
                v-model="inputFirstName"
                type="text"
                label="名"
                class="q-mb-xs"
                v-model.trim="inputFirstName"
                :rules="[
                  (val) =>
                    (val && val.toString().length > 0) || '名を入力してください',
                ]"
              />
            </q-card-section>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6">
            <q-card-section class="q-pt-none">
              <q-input
                v-model="inputLastNameKana"
                type="text"
                label="せい"
                class="q-mb-xs"
                v-model.trim="inputLastNameKana"
                :rules="[
                  (val) =>
                    (val && val.toString().length > 0) || 'せいを入力してください',
                ]"
              />
            </q-card-section>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6">
            <q-card-section class="q-pt-none">
              <q-input
                v-model="inputFirstNameKana"
                type="text"
                label="めい"
                class="q-mb-xs"
                v-model.trim="inputFirstNameKana"
                :rules="[
                  (val) =>
                    (val && val.toString().length > 0) || 'めいを入力してください',
                ]"
              />
            </q-card-section>
          </div>
        </div>
        <div v-if="targetDialog !== 'pastbooksContact' && targetDialog !== 'movePastbooks'" class="row justify-between">
          <!-- 電話番号 -->
          <!-- <div class="col-xs-12 col-sm-12 col-md-12">
            <q-card-section class="q-pt-none">
              <q-input
                v-model="inputPhone"
                type="text"
                label="電話番号"
                class="q-mb-xs"
                pattern="^[0-9-]+$"
                v-model.trim="inputPhone"
                :rules="[
                  (val) =>
                    (val && val.toString().length > 0) || '電話番号を入力してください',
                ]"
              >
              <template v-slot:before>
                  <q-icon name="phone" />
                </template>
              </q-input>
            </q-card-section>
          </div>　-->
          <!-- メールアドレス -->
          <!-- <div class="col-xs-12 col-sm-12 col-md-12">
            <q-card-section class="q-pt-none">
              <q-input
                v-model="inputEmail"
                v-model.trim="inputEmail"
                type="email"
                label="メール"
                class="q-mb-xs"
                :rules="[
                  (val) =>
                    (val && val.toString().length > 0) || 'メールアドレスを入力してください',
                ]"
              >
                <template v-slot:before>
                  <q-icon name="mail" />
                </template>
              </q-input>
            </q-card-section>
          </div> -->
          <!-- 性別 -->
          <!-- <div class="col-xs-12 col-sm-6 col-md-6">
            <q-card-section class="q-pt-none">
              <q-select
                filled
                v-model="inputGender"
                :options="tag1"
                label="性別"
                :rules="[
                  (val) =>
                    (val && val.toString().length > 0) || '性別を選択してください',
                ]"
              />
            </q-card-section>
          </div> -->
          <!-- <div class="col-xs-12 col-sm-6 col-md-6">
            <q-card-section class="q-pt-none">
              <q-select
                filled
                v-model="inputType"
                :options="tag2"
                label="種別"
                :rules="[
                  (val) =>
                    (val && val.toString().length > 0) || '種別を選択してください',
                ]"
              />
            </q-card-section>
          </div> -->
          <!-- <div class="col-xs-12 col-sm-12 col-md-12">
              <q-card-section class="q-pt-none">
                <q-input 
                  dense
                  v-model="inputBirth" 
                  mask="date" 
                  :rules="['date']" 
                  label="誕生日"
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
                </q-input>
              </q-card-section>
            </div> -->
          <div class="col-xs-12 col-sm-12 col-md-12">
            <q-card-section class="q-pt-none">
              <q-input
                v-model="inputPostal"
                type="text"
                mask="###-####"
                label="郵便番号"
                pattern="^[0-9]{3}-[0-9]{4}$"
                class="q-mb-xs"
                v-model.trim="inputPostal"
              >
              <template v-slot:before>
                  <div >〒</div>
                </template>
              </q-input>
            </q-card-section>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6">
            <q-card-section class="q-pt-none">
              <q-input
                v-model="inputPref"
                type="text"
                label="都道府県"
                v-model.trim="inputPref"
              />
            </q-card-section>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6">
            <q-card-section class="q-pt-none">
              <q-input
                v-model="inputCity"
                type="text"
                label="市区町村"
                v-model.trim="inputCity"
              />
            </q-card-section>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6">
            <q-card-section class="q-pt-none">
              <q-input
                v-model="inputAddress"
                type="text"
                label="町域・番地"
                v-model.trim="inputAddress"
              />
            </q-card-section>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6">
            <q-card-section class="q-pt-none">
              <q-input
                v-model="inputStreet"
                type="text"
                label="建物名など"
                v-model.trim="inputStreet"
              />
            </q-card-section>
          </div>              
        </div>
        <!-- 現在帳から過去帳への移行と過去帳変更情報 -->
        <div v-if="targetDialog == 'pastbooksContact' || targetDialog == 'movePastbooks'" class="row justify-between">
          <div class="col-xs-12 col-sm-6 col-md-6">
            <q-card-section class="q-pt-none">
              <q-input
                v-model="inputdharmaName"
                type="text"
                label="戒名/法名"
                class="q-mb-xs"
                v-model.trim="inputdharmaName"
                :rules="[
                  (val) =>
                    (val && val.toString().length > 0) || '戒名/法名を入力してください',
                ]"
              />
            </q-card-section>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6">
            <q-card-section class="q-pt-none">
              <q-input v-model="inputDeath" mask="date" :rules="['date']" label="命日">
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
              </q-input>
            </q-card-section>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6">
            <q-card-section class="q-pt-none">
              <q-input
                v-model="inputPlaceofDeath"
                type="text"
                label="墓地番号"
                class="q-mb-xs"
                v-model.trim="inputPlaceofDeath"
                :rules="[
                  (val) =>
                    (val && val.toString().length > 0) || '墓地番号を入力してください',
                ]"
              />
            </q-card-section>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6">
            <q-card-section class="q-pt-none">
              <q-input
                v-model="inputClientName"
                type="text"
                label="施主名"
                class="q-mb-xs"
                v-model.trim="inputClientName"
                :rules="[
                  (val) =>
                    (val && val.toString().length > 0) || '施主名を入力してください',
                ]"
              />
            </q-card-section>
          </div>
        </div>
        <!-- 現在帳表示 -->
        <div v-if="targetDialog == 'currentContacts' || targetDialog == 'rows'">
          <q-card-section class="q-pt-none">
            <q-input
              v-model="inputComment"
              type="textarea"
              label="家族メモ(寺院様のみご覧いただけます)"
              class="q-mb-xs"
              v-model.trim="inputComment"
            />
          </q-card-section>
        </div>
        <!-- 過去帳表示 -->
        <div v-else-if="targetDialog == 'pastbooksContact' || targetDialog == 'movePastbooks'">
          <q-card-section class="q-pt-none">
            <q-input
              v-model="inputComment"
              type="textarea"
              label="故人メモ(寺院様のみご覧いただけます)"
              class="q-mb-xs"
              v-model.trim="inputComment"
            />
          </q-card-section>
        </div>

        <div class="flex column">
          <div class="q-mb-md">
            <q-card-section class="q-pt-none">
              <q-btn
                label="保存"
                type="submit"
                color="primary"
                style="margin-right: 10px"
              />
              <q-btn color="primary" label="キャンセル" @click="onCancel" />
            </q-card-section>
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</q-dialog>


<q-dialog v-model="isDelete">
    <q-card>
    <q-card-section class="bg-accent text-white">
      <div class="text-h6">{{ contacts.last_name + contacts.first_name }}様の削除処理</div>
    </q-card-section>
    <q-card-section class="row items-center">
      <span class="q-ml-sm">
        <span class="text-weight-bold">{{ contacts.last_name + contacts.first_name }}様</span>
        の情報を本当に削除しますか?
      </span>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat label="キャンセル" color="primary" v-close-popup />
      <q-btn
        flat
        label="削除"
        color="accent"
        @click="DankaDelete(contacts,SelectEditDialog)"
      />
    </q-card-actions>
  </q-card>
</q-dialog>

</template>

<script>
import { defineComponent,ref} from 'vue';
import { LocalStorage, useQuasar, date } from 'quasar';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { positiveMessage, negativeMessage } from "src/composable/light-notify";
import * as dayjs from "dayjs";

export default defineComponent({
    name: "Dialog",
    props: ["id", "contacts", "SelectEditDialog"],
    emits: ['updateROWS', 'updateDANKA', 'deleteDANKA'],
    setup(props, context){
      const $store = useStore();
      const $router = useRouter();

      const tag1 = ["男性", "女性", "どちらでもない"];
      const tag2 = ["すべての方", "檀家","入檀申請中", "一般", "協力会社", "門徒/信徒", "檀家総代", "檀家筆頭総代", "世話人"];
 
      const TenantID = ref('');
      const family = ref([]);
      let isTenant = ref(false);
      let isDialogOpen = ref(false);
      let isDialogConfirmation = ref(false);
      let isDelete = ref(false);
      let dialogTitle = ref("");
      let targetDialog = ref("");
      let editDialogStatus = ref("");
      let resourceForUpdate = ref({});

      let inputLastName = ref("");
      let inputFirstName = ref("");
      let inputLastNameKana = ref("");
      let inputFirstNameKana = ref("");
      let inputPhone = ref("");
      let inputFax = ref("");
      let inputEmail = ref("");
      let inputGender = ref("");
      let inputType = ref("");
      let inputBirth = ref("");
      let inputPostal = ref("");
      let inputPref = ref("");
      let inputCity = ref("");
      let inputAddress = ref("");
      let inputStreet = ref("");

      let inputdharmaName = ref("");
      let inputDeath = ref("");
      let inputPlaceofDeath = ref("");
      let inputClientName = ref("");

      let inputComment = ref("");

      const openEditDialog = async (data = null,target) => {
        console.log("openします")
        const stateTenant = LocalStorage.getItem("stateTenant")
        TenantID.value = stateTenant.id
        console.log(TenantID.value)
        await $store.dispatch("dankaModule/readBooks", {
          TenantID: TenantID.value,
          ReadID: props.contacts.id,
        });
        console.log("userID取れるはずです")
        family.value = $store.state.dankaModule.families.data;
        console.log(family.value[0])
        if(!family.value[0]){
          console.log("user-profile間に関係性ないです")
          isTenant.value = true;

        }
        console.log(props)
        isDialogOpen.value = !isDialogOpen.value;
        console.log(target)
        if (data) {
          inputLastName.value = data.last_name;
          inputFirstName.value = data.first_name;
          inputLastNameKana.value = data.last_name_kana;
          inputFirstNameKana.value = data.first_name_kana;
          inputPhone.value = data.phone;
          inputFax.value = data.fax;
          inputEmail.value = data.email;
          inputGender.value = data.gender;
          inputType.value = data.type;
          inputBirth.value = dayjs(data.date_of_birth).format('YYYY/MM/DD');
          inputPostal.value = data.postcode;
          inputPref.value = data.pref;
          inputCity.value = data.city;
          inputAddress.value = data.address;
          inputStreet.value = data.street;
          inputComment.value = data.comments;

          inputdharmaName.value = data.dharma_name;
          inputDeath.value = dayjs(data.date_of_death).format('YYYY/MM/DD');
          inputPlaceofDeath.value = data.place_of_death;
          inputClientName.value = data.mourner_name;
          inputComment.value = data.comments;
          
          dialogTitle.value = data.last_name + data.first_name + " 様";
          if(isTenant.value){
            console.log("modifyTenant")
            editDialogStatus.value = "modifyTenant";
          }else{
            console.log("modify")
            editDialogStatus.value = "modify";
          }
          resourceForUpdate.value = data;
          if (target === "rows") {
            console.log("rows");
            targetDialog.value = target;
          } else if(target === "currentContacts") {
            console.log("currentContacts");
            targetDialog.value = target;
          } else {
            console.log(target);
            targetDialog.value = target;
          }
          return;
        } else {
          editDialogStatus.value = "create";
          dialogTitle.value = "新規檀家追加"
        }
      };

      const DankaDelete = async (data,target) => {
        console.log(data)
        console.log(target)
        console.log(props)
        const stateTenant = LocalStorage.getItem("stateTenant")
        TenantID.value = stateTenant.id
        console.log(TenantID.value)
        await $store.dispatch("dankaModule/readBooks", {
          TenantID: TenantID.value,
          ReadID: props.contacts.id,
        });
        
        family.value = $store.state.dankaModule.families.data;
        console.log(family.value,"userID取れるはずです")
        switch(target) {
          case 'contactLists':
            try{
              await $store.dispatch("booksModule/deleteBook", {
                id: data.id,
                TenantID: TenantID.value,
              });
              isDelete.value = false;
              positiveMessage("Creacion", "コンタクトリストが削除されました");
              context.emit('deleteDANKA');
            } catch (e) {
              console.log(e)
              negativeMessage("Error", "コンタクトリスト削除中にエラーが発生しました");
              isDelete.value = false;
            }
          break;
          case 'currentContacts':
          case 'pastbooksContact':
            try{
              await $store.dispatch("currentModule/deleteBook", {
                ReadID: data.id,
                pageID: family.value[0].id,
              });
              isDelete.value = false;
              positiveMessage("Creacion", "詳細情報が削除されました");
              context.emit('deleteDANKA');
            } catch (e) {
              console.log(e)
              negativeMessage("Error", "詳細情報の削除中にエラーが発生しました");
              isDelete.value = false;
            }
          break;
        }
      };

      const onSubmit = async () => {
        console.log(targetDialog.value)
        console.log(editDialogStatus.value)
        // console.log("contacts",props.contacts)
        switch(targetDialog.value){
          case 'rows':
            if (editDialogStatus.value === "create") {
              try {
                await $store.dispatch("booksModule/createBook", {
                  TenantID: TenantID.value,
                  id: resourceForUpdate.value.id,
                  last_name: inputLastName.value,
                  last_name_kana: inputLastNameKana.value,
                  first_name: inputFirstName.value,
                  first_name_kana: inputFirstNameKana.value,
                  phone: inputPhone.value,
                  fax: inputFax.value,
                  email: inputEmail.value,
                  gender: inputGender.value,
                  type: inputType.value,
                  date_of_birth: dayjs(inputBirth.value).format('YYYY-MM-DD'),
                  postcode: inputPostal.value,
                  pref: inputPref.value,
                  city: inputCity.value,
                  address: inputAddress.value,
                  street: inputStreet.value,
                });
                positiveMessage("Creacion", "新しい檀家を作成されました");
                isDialogOpen.value = false;
                context.emit('updateROWS');
                onReset();
              } catch (error) {
                negativeMessage("Error", "檀家の作成中にエラーが発生しました");
              }
            } else if (editDialogStatus.value === "modify") {
              try {
                await $store.dispatch("booksModule/updateBook", {
                  TenantID: TenantID.value,
                  id: resourceForUpdate.value.id,
                  last_name: inputLastName.value,
                  last_name_kana: inputLastNameKana.value,
                  first_name: inputFirstName.value,
                  first_name_kana: inputFirstNameKana.value,
                  phone: inputPhone.value,
                  fax: inputFax.value,
                  email: inputEmail.value,
                  gender: inputGender.value,
                  type: inputType.value,
                  date_of_birth: dayjs(inputBirth.value).format('YYYY-MM-DD'),
                  postcode: inputPostal.value,
                  pref: inputPref.value,
                  city: inputCity.value,
                  address: inputAddress.value,
                  street: inputStreet.value,
                });
                //現在帳が更新されたお知らせ送信
                console.log('連絡先更新')
                await $store.dispatch("contactsModule/createPost", {
                  id: family.value[0].id,
                  tenant_id: TenantID.value,
                  to_name: inputLastName.value + inputFirstName.value,
                  title: "["+inputLastName.value + inputFirstName.value+"]の家族情報が更新されました",
                  body: "寺院側から家族情報の更新がされました。つきましてはあなたの情報の確認をお願いします。よろしくお願いします。",
                  meta: "{data: 'JSON\u30c7\u30fc\u30bf'}",
                });
                positiveMessage("更新", "連絡先が更新されました");
                context.emit('updateROWS');
                isDialogOpen.value = false;
                onReset();
                
              } catch (error) {
                console.log(error)
                negativeMessage("Error", "連絡先、更新中にエラーが発生しました");
              }
            } else if (editDialogStatus.value === "modifyTenant") {
              try {
                await $store.dispatch("booksModule/updateBook", {
                  TenantID: TenantID.value,
                  id: resourceForUpdate.value.id,
                  last_name: inputLastName.value,
                  last_name_kana: inputLastNameKana.value,
                  first_name: inputFirstName.value,
                  first_name_kana: inputFirstNameKana.value,
                  phone: inputPhone.value,
                  fax: inputFax.value,
                  email: inputEmail.value,
                  gender: inputGender.value,
                  type: inputType.value,
                  date_of_birth: dayjs(inputBirth.value).format('YYYY-MM-DD'),
                  postcode: inputPostal.value,
                  pref: inputPref.value,
                  city: inputCity.value,
                  address: inputAddress.value,
                  street: inputStreet.value,
                  comments: inputComment.value,
                });
                // //現在帳が更新されたお知らせ送信
                // console.log('お知らせ更新')
                // await $store.dispatch("contactsModule/createPost", {
                //   id: family.value[0].id,
                //   tenant_id: TenantID.value,
                //   to_name: inputLastName.value + inputFirstName.value,
                //   title: "["+inputLastName.value + inputFirstName.value+"]の家族情報が更新されました",
                //   body: "寺院側から家族情報の更新がされました。つきましてはあなたの情報の確認をお願いします。よろしくお願いします。",
                //   meta: "{data: 'JSON\u30c7\u30fc\u30bf'}",
                // });

                positiveMessage("更新", "現在帳が更新されました");
                context.emit('updateDANKA');
                isDialogOpen.value = false;
                onReset();
              } catch (error) {
                console.log(error)
                negativeMessage("Error", "現在帳、更新中にエラーが発生しました");
              }
            }
            break;

          case 'currentContacts':
            if (editDialogStatus.value === "create") {
              try {
                positiveMessage("Creacion", "新しい現在帳が作成されました");
                context.emit('updateDANKA');
                isDialogOpen.value = false;
                onReset();
              } catch (error) {
                negativeMessage("Error", "現在帳の作成中にエラーが発生しました");
              }
            } else if (editDialogStatus.value === "modify") {
              try {
                await $store.dispatch("currentModule/updateBook", {
                  pageID: family.value[0].id,
                  id: resourceForUpdate.value.id,
                  last_name: inputLastName.value,
                  last_name_kana: inputLastNameKana.value,
                  first_name: inputFirstName.value,
                  first_name_kana: inputFirstNameKana.value,
                  phone: inputPhone.value,
                  fax: inputFax.value,
                  email: inputEmail.value,
                  gender: inputGender.value,
                  type: inputType.value,
                  date_of_birth: dayjs(inputBirth.value).format('YYYY-MM-DD'),
                  postcode: inputPostal.value,
                  pref: inputPref.value,
                  city: inputCity.value,
                  address: inputAddress.value,
                  street: inputStreet.value,
                  comments: inputComment.value,
                });
                //現在帳が更新されたお知らせ送信
                console.log('お知らせ更新')
                await $store.dispatch("contactsModule/createPost", {
                  id: family.value[0].id,
                  tenant_id: TenantID.value,
                  to_name: inputLastName.value + inputFirstName.value,
                  title: "["+inputLastName.value + inputFirstName.value+"]の家族情報が更新されました",
                  body: "寺院側から家族情報の更新がされました。つきましてはあなたの情報の確認をお願いします。よろしくお願いします。",
                  meta: "{data: 'JSON\u30c7\u30fc\u30bf'}",
                });
                
                positiveMessage("更新", "現在帳が更新されました");
                context.emit('updateDANKA');
                isDialogOpen.value = false;
                onReset();
              } catch (error) {
                console.log(error)
                negativeMessage("Error", "現在帳、更新中にエラーが発生しました");
              }
            } 
            break;

          case 'pastbooksContact':
            if (editDialogStatus.value === "create") {
              try {
                
                positiveMessage("Creacion", "新しい過去帳が作成されました");
                context.emit('updateDANKA');
                isDialogOpen.value = false;
                onReset();
              } catch (error) {
                negativeMessage("Error", "過去帳の作成中にエラーが発生しました");
              }
            } else if (editDialogStatus.value === "modify") {
              try {
                await $store.dispatch("currentModule/updateBook", {
                  pageID: family.value[0].id,
                  id: resourceForUpdate.value.id,
                  last_name: inputLastName.value,
                  last_name_kana: inputLastNameKana.value,
                  first_name: inputFirstName.value,
                  first_name_kana: inputFirstNameKana.value,
                  phone: inputPhone.value,
                  fax: inputFax.value,
                  email: inputEmail.value,
                  gender: inputGender.value,
                  type: inputType.value,
                  date_of_birth: dayjs(inputBirth.value).format('YYYY-MM-DD'),
                  postcode: inputPostal.value,
                  pref: inputPref.value,
                  city: inputCity.value,
                  address: inputAddress.value,
                  street: inputStreet.value,
                  comments: inputComment.value,

                  dharma_name: inputdharmaName.value,
                  date_of_death: dayjs(inputDeath.value).format('YYYY-MM-DD'),
                  place_of_death: inputPlaceofDeath.value,
                  mourner_name: inputClientName.value,
                  comments: inputComment.value,
                });
                positiveMessage("更新", "過去帳が更新されました");
                context.emit('updateDANKA');
                isDialogOpen.value = false;
                onReset();
                
              } catch (error) {
                console.log(error)
                negativeMessage("Error", "過去帳、更新中にエラーが発生しました");
              }
            }
            break;
          
          case 'movePastbooks':
            try {
              await $store.dispatch("currentModule/updateBook", {
                pageID: resourceForUpdate.value.pivot.profileable_id,
                id: resourceForUpdate.value.id,
                last_name: inputLastName.value,
                last_name_kana: inputLastNameKana.value,
                first_name: inputFirstName.value,
                first_name_kana: inputFirstNameKana.value,
                gender: inputGender.value,
                type: inputType.value,
                date_of_birth: dayjs(inputBirth.value).format('YYYY-MM-DD'),           
                is_alive: false,
                dharma_name: inputdharmaName.value,
                date_of_death: dayjs(inputDeath.value).format('YYYY-MM-DD'),
                place_of_death: inputPlaceofDeath.value,
                mourner_name: inputClientName.value,
                comments: inputComment.value,
              });
              // await $store.dispatch("currentModule/deleteBook", resourceForUpdate.value.id);
              positiveMessage("更新", "現在帳から過去帳へ移動されました");
              context.emit('deleteDANKA');
              isDialogOpen.value = false;
              onReset();
              
            } catch (error) {
              console.log(error)
              isDialogOpen.value = false;
              negativeMessage("Error", "過去帳、更新中にエラーが発生しました");
            }
            break;

          case 'contactLists':
            if (editDialogStatus.value === "create") {
              try {
                await $store.dispatch("currentModule/updateBook", {
                  pageID: family.value[0].id,
                  id: resourceForUpdate.value.id,
                  last_name: inputLastName.value,
                  last_name_kana: inputLastNameKana.value,
                  first_name: inputFirstName.value,
                  first_name_kana: inputFirstNameKana.value,
                  phone: inputPhone.value,
                  fax: inputFax.value,
                  email: inputEmail.value,
                  gender: inputGender.value,
                  type: inputType.value,
                  date_of_birth: dayjs(inputBirth.value).format('YYYY-MM-DD'),
                  postcode: inputPostal.value,
                  pref: inputPref.value,
                  city: inputCity.value,
                  address: inputAddress.value,
                  street: inputStreet.value,
                  comments: inputComment.value,
                });
                positiveMessage("更新", "現在帳が更新されました");
                context.emit('updateDANKA');
                isDialogOpen.value = false;
                onReset();
              } catch (error) {
                console.log(error)
                negativeMessage("Error", "現在帳、更新中にエラーが発生しました");
              }
            } else if (editDialogStatus.value === "modify") {
              try {
                await $store.dispatch("currentModule/updateBook", {
                  pageID: family.value[0].id,
                  id: resourceForUpdate.value.id,
                  last_name: inputLastName.value,
                  last_name_kana: inputLastNameKana.value,
                  first_name: inputFirstName.value,
                  first_name_kana: inputFirstNameKana.value,
                  phone: inputPhone.value,
                  fax: inputFax.value,
                  email: inputEmail.value,
                  gender: inputGender.value,
                  type: inputType.value,
                  date_of_birth: dayjs(inputBirth.value).format('YYYY-MM-DD'),
                  postcode: inputPostal.value,
                  pref: inputPref.value,
                  city: inputCity.value,
                  address: inputAddress.value,
                  street: inputStreet.value,
                  comments: inputComment.value,
                });
                positiveMessage("更新", "現在帳が更新されました");
                context.emit('updateDANKA');
                isDialogOpen.value = false;
                onReset();
              } catch (error) {
                console.log(error)
                negativeMessage("Error", "現在帳、更新中にエラーが発生しました");
              }
            } else if (editDialogStatus.value === "modifyTenant") {
              try {
                await $store.dispatch("booksModule/updateBook", {
                  TenantID: TenantID.value,
                  id: resourceForUpdate.value.id,
                  last_name: inputLastName.value,
                  last_name_kana: inputLastNameKana.value,
                  first_name: inputFirstName.value,
                  first_name_kana: inputFirstNameKana.value,
                  phone: inputPhone.value,
                  fax: inputFax.value,
                  email: inputEmail.value,
                  gender: inputGender.value,
                  type: inputType.value,
                  date_of_birth: dayjs(inputBirth.value).format('YYYY-MM-DD'),
                  postcode: inputPostal.value,
                  pref: inputPref.value,
                  city: inputCity.value,
                  address: inputAddress.value,
                  street: inputStreet.value,
                  comments: inputComment.value,
                });
                positiveMessage("更新", "現在帳が更新されました");
                context.emit('updateROWS');
                isDialogOpen.value = false;
                onReset();
              } catch (error) {
                console.log(error)
                negativeMessage("Error", "現在帳、更新中にエラーが発生しました");
              }
            } 
            break;

        }
      };



      const openMoveDialog = (data) => {
        
        inputLastName.value = data.last_name;
        inputFirstName.value = data.first_name;
        inputLastNameKana.value = data.last_name_kana;
        inputFirstNameKana.value = data.first_name_kana;
        inputPhone.value = data.phone;
        inputFax.value = data.fax;
        inputEmail.value = data.email;
        inputGender.value = data.gender;
        inputType.value = data.type;
        inputBirth.value = data.date_of_birth;
        inputPostal.value = data.postcode;
        inputPref.value = data.pref;
        inputCity.value = data.city;
        inputAddress.value = data.address;
        inputStreet.value = data.street;
        inputComment.value = data.comments;

        // const now = dayjs();

        inputDeath.value = dayjs().format('YYYY/MM/DD');

        dialogTitle.value = data.last_name + data.first_name + " 様を現在帳から過去帳へ移動する";
        resourceForUpdate.value = data;
        targetDialog.value = "movePastbooks";
      };

      


      const onCancel = () => {
        onReset();
        isDialogOpen.value = !isDialogOpen.value;
      };

      const onReset = () => {
        inputLastName.value = "";
        inputLastNameKana.value = "";
        inputFirstName.value = "";
        inputFirstNameKana.value = "";
        inputPhone.value = "";
        inputFax.value = "";
        inputEmail.value = "";
        inputGender.value = "";
        inputType.value = "";
        inputBirth.value = "";
        inputPostal.value = "";
        inputPref.value = "";
        inputCity.value = "";
        inputAddress.value = "";
        inputStreet.value = "";
        inputComment.value = "";
        inputdharmaName.value = "";
        inputDeath.value = "";
        inputPlaceofDeath.value = "";
        inputClientName.value = "";
      };

      return{
        onCancel,
        onReset,
        onSubmit,
        DankaDelete,
        openMoveDialog,
        isDialogOpen,
        isDialogConfirmation,
        isDelete,
        openEditDialog,
        dialogTitle,
        targetDialog,
        
        tag1,
        tag2,

        editDialogStatus,
        resourceForUpdate,
        TenantID,
        family,

        inputLastName,
        inputLastNameKana,
        inputFirstName,
        inputFirstNameKana,
        inputPhone,
        inputFax,
        inputEmail,
        inputGender,
        inputType,
        inputBirth,
        inputPostal,
        inputPref,
        inputCity,
        inputAddress,
        inputStreet,
        inputdharmaName,
        inputDeath,
        inputPlaceofDeath,
        inputClientName,
        inputComment,
      }
    
    }    
    
    
  });
</script>

<style lang="scss" scoped>

.creation-card-simple {
  min-width: 350px;
  width: 100%;
}

.q-card__section--vert {
  padding: 10px;
}

.q-gutter-y-md > *,
.q-gutter-md > * {
  margin-top: 0px;
}
</style>