<template>
  <q-btn
    round
    size="xs"
    class="q-mx-xs"
    color="green"
    icon="add"
    @click="openEditDialog(null,SelectCreateDialog); "
  >
    <q-tooltip>新規追加</q-tooltip>
  </q-btn>

  <!-- <q-btn
    v-if="SelectCreateDialog == 'contactLists'"
    round
    size="xs"
    class="q-mx-xs"
    color="black"
    icon="mdi-swap-vertical-bold"
    @click="openFetchDialog"
  >
    <q-tooltip>インポート&エクスポート</q-tooltip>
  </q-btn> -->
  
  <q-dialog v-model="isDialogOpen" persistent>
    <q-card class="creation-card-simple q-pa-sm">
      <q-card-section>
        <!-- <div class="row justify-between" v-if="targetDialog == 'currentContacts'">
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
        </div> -->
        <div class="col-xs-8 col-sm-10 col-md-10">
          <div class="text-h6">{{ dialogTitle }}</div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <!-- 連絡先と現在帳表示 -->
          <div class="row justify-between">
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
            <div v-if="targetDialog != 'pastbooksContact'" class="row justify-between">
              <div class="col-xs-12 col-sm-12 col-md-12">
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
              </div>
              <div class="col-xs-12 col-sm-12 col-md-12">
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
              </div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
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
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <q-card-section class="q-pt-none">
                <q-input
                  filled
                  v-model="inputType"
                  disable
                  label="種別"
                  :rules="[
                    (val) =>
                      (val && val.toString().length > 0) || '種別を選択してください',
                  ]"
                />
              </q-card-section>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-12">
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
            </div>
            <div v-if="targetDialog != 'pastbooksContact'" class="row justify-between">
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
          </div>
          <!-- 現在帳から過去帳への移行情報 -->
          <div v-if="targetDialog == 'pastbooksContact'" class="row justify-between">
            <div class="col-xs-12 col-sm-12 col-md-12">
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
            <!-- <div class="col-xs-12 col-sm-12 col-md-12">
              <q-card-section class="q-pt-none">
                <q-input
                  v-model="inputmournerName"
                  type="text"
                  label="施主名"
                  class="q-mb-xs"
                  v-model.trim="inputmournerName"
                  :rules="[
                    (val) =>
                      (val && val.toString().length > 0) || '施主名を入力してください',
                  ]"
                />
              </q-card-section>
            </div> -->
            <div class="col-xs-12 col-sm-6 col-md-6">
              <q-card-section class="q-pt-none">
                <q-input  v-model="inputDeath" mask="date" :rules="['date']" label="命日">
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
            <div class="col-xs-12 col-sm-12 col-md-12">
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
          <div v-if="targetDialog == 'currentContacts'">
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
          <div v-else-if="targetDialog == 'pastbooksContact'">
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

  <q-dialog v-model="isExportDialogOpen" persistent>
    <div class="q-gutter-y-md" style="width: 520px;">
      <q-card>
      <q-card-section>
        <div class="text-h6 text-center">インポートエクスポート(Excel)</div>
        <!-- <div class="text-subtitle2 text-center">Excel</div> -->
      </q-card-section>

      <q-tabs v-model="tab" class="text-teal">
        <q-tab label="インポート" name="one" />
        <q-tab label="エクスポート" name="two" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="one">
          <q-card-section>
            <div class="text-h6 text-center">連絡先をインポート
              <!-- <a href="../../assets/連絡先名簿-インポート例.xlsx" download> -->
                <q-btn
                  round
                  size="sm"
                  class="q-mx-xs"
                  color="info"
                  icon="mdi-file-download-outline"
                  @click="FileDownload()"
                >
                  <q-tooltip class="bg-dark text-body2">Excelフォーマットファイル</q-tooltip>
                </q-btn>
              <!-- </a> -->
            </div>
          </q-card-section>
          <p class="text-center">
            右上のボタンからExcelファイルのフォーマットがダウンロードできます。<br>
            Excelファイルのシート名と1行目の値は変えないでください。<br>
            2行目の値を消してお使いください。
            
          </p>
          <q-form @submit="handleFile" class="text-center">
            
            <input class="fileinput" type="file" id="file" v-on:change="onChangeFile" />
            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="キャンセル" color="primary" v-close-popup />
              <q-btn type="submit">インポート</q-btn>
            </q-card-actions>
          </q-form>
        </q-tab-panel>

        <q-tab-panel name="two">
          <q-card-section>
            <div class="text-h6 text-center">{{(isFinishPage-isStartPage)*15}}件の連絡先をエクスポート</div>
          </q-card-section>
          <p class="text-center">
            Excelにエクスポートできます。20ページ以内でエクスポートしてください。<br>
            1ページ(15件)ごとにエクスポートする連絡数が決まります。
          </p>
            <q-form @submit="ExportExcel('xlsx')">
              <div class="row justify-between">
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <q-card-section class="q-pt-none">
                    <q-input
                      v-model.number="isStartPage"
                      type="number"
                      min="1"
                      max="isFinishPage"
                      filled
                      label="始まり"
                      :rules="[
                        (val) =>
                          (val && isFinishPage - val <= 50) ||
                          '20ページ以内でExportしてください。',
                      ]"
                    />
                    <p align="right">ページ</p>
                  </q-card-section>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <q-card-section class="q-pt-none">
                    <q-input
                      v-model.number="isFinishPage"
                      type="number"
                      min="2"
                      filled
                      label="終わり"
                      :rules="[
                        (val) =>
                          (val && val - isStartPage <= 20) ||
                          '20ページ以内でExportしてください。',
                      ]"
                    />
                    <p align="right">ページ</p>
                  </q-card-section>
                </div>
              </div>
              <q-card-actions align="right" class="text-primary">
                <q-btn flat label="キャンセル" color="primary" v-close-popup />
                <q-btn type="submit">エクスポート</q-btn>
              </q-card-actions>
            </q-form>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
    </q-dialog>


</template>

<script>
import { defineComponent,ref} from 'vue';
import { LocalStorage, useQuasar, date } from 'quasar';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { positiveMessage, negativeMessage } from "src/composable/light-notify";
import { saveAs } from 'file-saver';
import * as dayjs from "dayjs";
import * as XLSX from "xlsx";


export default defineComponent({
    name: "Dialog",
    props: ["id", "contacts", "SelectCreateDialog"],
    emits: ['updateROWS', 'updateDANKA'],
    setup(props, context){
      const $store = useStore();
      const $router = useRouter();

      const tag1 = ["男性", "女性", "どちらでもない"];
      const tag2 = ["すべての方", "檀家","入檀申請中", "一般", "協力会社", "門徒/信徒", "檀家総代", "檀家筆頭総代", "世話人"];
      const TenantID = ref('');

    
      let isDialogOpen = ref(false);
      let isDialogConfirmation = ref(false);
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
      let inputType = ref("家族");
      let inputBirth = ref(dayjs("1980/1/1").format('YYYY/MM/DD'));
      let inputPostal = ref("");
      let inputPref = ref("");
      let inputCity = ref("");
      let inputAddress = ref("");
      let inputStreet = ref("");

      let inputdharmaName = ref("");
      let inputmournerName = ref("");
      let inputDeath = ref(dayjs("1980/1/1").format('YYYY/MM/DD'));
      let inputPlaceofDeath = ref("");
      let inputClientName = ref("");
      let inputComment = ref("");

      let isExportDialogOpen = ref(false);
      let isStartPage = ref(1);
      let isFinishPage = ref(5);
      let items = ref([]);
      let InportFile = ref([]);

      const openEditDialog = async (data = null,target) => {
        console.log("openします")
        const stateTenant = LocalStorage.getItem("stateTenant")
        TenantID.value = stateTenant.id
        console.log(TenantID.value)
        console.log("userID取れるはずです")
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
          inputBirth.value = data.date_of_birth;
          inputPostal.value = data.postal;
          inputPref.value = data.pref;
          inputCity.value = data.city;
          inputAddress.value = data.address;
          inputStreet.value = data.street;
          inputComment.value = data.message;
          
          dialogTitle.value = data.last_name + data.first_name + " 様";
          editDialogStatus.value = "modify";
          resourceForUpdate.value = data;
          if (target === "rows") {
            console.log("rows");
            targetDialog.value = target;
          } else if(target === "currentContacts") {
            console.log("currentContacts");
            targetDialog.value = target;
          } else if(target === "pastbooksContact") {
            console.log("pastbooksContact");
            targetDialog.value = target;
          }else {
            console.log(target);
            targetDialog.value = target;
          }
          return;
        } else {
          editDialogStatus.value = "create";
          if (target === "rows") {
            console.log("rows");
            targetDialog.value = target;
            dialogTitle.value = "新規檀家追加"
          } else if(target === "currentContacts") {
            console.log("currentContacts");
            targetDialog.value = target;
            dialogTitle.value = "ご家族追加"
          } else if(target === "pastbooksContact") {
            console.log("pastbooksContact");
            targetDialog.value = target;
            dialogTitle.value = "ご先祖追加"
          }else {
            console.log(target);
            targetDialog.value = target;
            dialogTitle.value = "新規追加"
          }
        }
      };

      const onSubmit = async () => {
        console.log(targetDialog.value)
        console.log(editDialogStatus.value)
        console.log("contacts",props.id)
        switch(targetDialog.value){
          case 'rows':
            if (editDialogStatus.value === "create") {
              try {
                await $store.dispatch("booksModule/createBook", {
                  id: props.id[0].id,
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
                  postal: inputPostal.value,
                  pref: inputPref.value,
                  city: inputCity.value,
                  address: inputAddress.value,
                  street: inputStreet.value,
                });
                positiveMessage("Creacion", "新しい檀家を作成されました");
                context.emit('updateROWS');
                isDialogOpen.value = false;
                onReset();
              } catch (error) {
                negativeMessage("Error", "檀家の作成中にエラーが発生しました");
              }
            } else if (editDialogStatus.value === "modify") {
              try {
                await $store.dispatch("booksModule/updateBook", {
                  id: props.id[0].id,
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
                  postal: inputPostal.value,
                  pref: inputPref.value,
                  city: inputCity.value,
                  address: inputAddress.value,
                  street: inputStreet.value,
                });
                positiveMessage("更新", "連絡先が更新されました");
                context.emit('updateROWS');
                isDialogOpen.value = false;
                onReset();
                
              } catch (error) {
                console.log(error)
                negativeMessage("Error", "連絡先、更新中にエラーが発生しました");
              }
            }
            break;

          case 'currentContacts':
            if (editDialogStatus.value === "create") {
              try {
                await $store.dispatch("currentModule/createCurrent", {
                  id: props.id[0].id,
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
                  is_alive: true,
                  avatar: `https://api2.teraiku.jp/svg/login-avatar.svg`,
                });
                const profile = $store.state.currentModule.currentfamily;
                console.log(profile)
                await $store.dispatch("booksModule/attachProfile", {
                  tenant_id: TenantID.value,
                  profile_id: profile.id,
                });
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
                  pageID: props.id[0].id,
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
                  postal: inputPostal.value,
                  pref: inputPref.value,
                  city: inputCity.value,
                  address: inputAddress.value,
                  street: inputStreet.value,
                  message: inputComment.value,
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
            console.log("OK")
            if (editDialogStatus.value === "create") {
              try {
                await $store.dispatch("currentModule/createPast", {
                  id: props.id[0].id,
                  last_name: inputLastName.value,
                  last_name_kana: inputLastNameKana.value,
                  first_name: inputFirstName.value,
                  first_name_kana: inputFirstNameKana.value,
                  gender: inputGender.value,
                  dharma_name: inputdharmaName.value,
                  mourner_name: inputmournerName.value,
                  type: inputType.value,
                  date_of_birth: dayjs(inputBirth.value).format('YYYY-MM-DD'),
                  postcode: inputPostal.value,
                  comments: inputComment.value,
                  is_alive: false,
                  avatar: `https://api2.teraiku.jp/svg/login-avatar.svg`,

                  dharma_name: inputdharmaName.value,
                  mourner_name: inputmournerName.value,
                  date_of_death: dayjs(inputDeath.value).format('YYYY-MM-DD'),
                  place_of_death: inputPlaceofDeath.value,
                  mourner_name: inputClientName.value,
                });
                const profile = $store.state.currentModule.pastfamily;
                console.log(profile)
                await $store.dispatch("booksModule/attachProfile", {
                  tenant_id: TenantID.value,
                  profile_id: profile.id,
                });
                positiveMessage("Creacion", "新しい過去帳が作成されました");
                context.emit('updateDANKA');
                isDialogOpen.value = false;
                onReset();
              } catch (error) {
                negativeMessage("Error", "過去帳の作成中にエラーが発生しました");
              }
            } else if (editDialogStatus.value === "modify") {
              try {
                await $store.dispatch("pastModule/updateBook", {
                  id: props.id[0].id,
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
                  postal: inputPostal.value,
                  pref: inputPref.value,
                  city: inputCity.value,
                  address: inputAddress.value,
                  street: inputStreet.value,
                  message: inputComment.value,
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
                mourner_name: inputmournerName.value,
                date_of_death: dayjs(inputDeath.value).format('YYYY-MM-DD'),
                place_of_death: inputPlaceofDeath.value,
                mourner_name: inputClientName.value,
                message: inputComment.value,
              });
              // await $store.dispatch("currentModule/deleteBook", resourceForUpdate.value.id);
              positiveMessage("更新", "現在帳から過去帳へ移動されました");
              context.emit('updateDANKA');
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
                await $store.dispatch("booksModule/createBook", {
                  id: TenantID.value,
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
                  is_alive: true,
                  avatar: `https://api2.teraiku.jp/svg/login-avatar.svg`,
                });
                // const profile = $store.state.currentModule.currentfamily;
                // console.log(profile)
                // await $store.dispatch("booksModule/attachProfile", {
                //   tenant_id: TenantID.value,
                //   profile_id: profile.id,
                // });
                positiveMessage("Creacion", "新しいコンタクトリストが作成されました");
                context.emit('updateDANKA');
                isDialogOpen.value = false;
                onReset();
              } catch (error) {
                negativeMessage("Error", "コンタクトリストの作成中にエラーが発生しました");
              }
            } 
            break;

          case 'createDanka':
            if (editDialogStatus.value === "create") {
              try {
                await $store.dispatch("booksModule/createBook", {
                  id: TenantID.value,
                  representative: "代表者",
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
                  is_alive: true,
                  avatar: `https://api2.teraiku.jp/svg/login-avatar.svg`,
                });
                const profile = $store.state.currentModule.currentfamily;
                console.log(profile)
                await $store.dispatch("booksModule/attachProfile", {
                  tenant_id: TenantID.value,
                  profile_id: profile.id,
                });
                positiveMessage("Creacion", "新しい現在帳が作成されました");
                context.emit('updateROWS');
                isDialogOpen.value = false;
                onReset();
              } catch (error) {
                negativeMessage("Error", "現在帳の作成中にエラーが発生しました");
              }
            } 
            break;
          }
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
        inputmournerName.value = "";
        inputDeath.value = "";
        inputPlaceofDeath.value = "";
        inputClientName.value = "";
        InportFile.value = [];
        items.value = [];
      };

      const onCancel = () => {
        onReset();
        isDialogOpen.value = !isDialogOpen.value;
      };

      const openFetchDialog = () => {
        isExportDialogOpen.value = !isExportDialogOpen.value;
      };

      //ファイルダウンロードボタン
      const FileDownload = () => {
          // FileSaver.saveAs("../../assets/連絡先名簿-インポート例.xlsx", "連絡先名簿-インポート例.xlsx");
          // saveAs(url, filename)
          // const FileSaver = require('file-saver');
          // const path = "../../assets/連絡先名簿-インポート例.xlsx"
          // FileSaver.saveAs(path, "連絡先名簿-インポート例.xlsx");
          // const blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
          // FileSaver.saveAs(blob, "hello world.txt");
      }

      // エクスポート
      const ExportExcel = async (type, fn, dl) => {
        const tenant = $store.state.authModule.users.tenants[0]
        console.log(tenant)
        TenantID.value = tenant.id;
        const tenantName = tenant.corporation;
        console.log(TenantID.value)
        let ExcelData = [];
        let page = 0;
        
        const last_pages = isFinishPage.value;
        const start_page = isStartPage.value;

          for (let i = start_page; i <= last_pages; i++) {
            page = i;
            await $store.dispatch("booksModule/readBooks", {
              TenantID: TenantID.value,
              // ReadUserID: UserID.value,
              page: page,
            });
            const Data = $store.state.booksModule.books.data;
            const meta = $store.state.booksModule.books.meta;
            console.log(Data)
            for (let j = 1; j <= Data.length; j++) {
              // ExcelData.push(Data[j - 1]);
              const last_name = Data[j - 1].last_name || '';
              const first_name = Data[j - 1].first_name || '';
              const last_name_kana = Data[j - 1].last_name_kana || '';
              const first_name_kana = Data[j - 1].first_name_kana || '';
              const pref = Data[j - 1].pref || '';
              const city = Data[j - 1].city || '';
              const address = Data[j - 1].address || '';
              const street = Data[j - 1].street || '';
              const birth = dayjs(Data[j - 1].date_of_birth).format('YYYY/MM/DD');
              ExcelData.push({
                  種別: Data[j - 1].type,
                  名前: last_name + first_name,
                  ふりがな: last_name_kana + first_name_kana,
                  電話番号: Data[j - 1].phone,
                  メールアドレス: Data[j - 1].email,
                  立場: Data[j - 1].representative,
                  性別: Data[j - 1].gender,
                  郵便番号: Data[j - 1].postcode,
                  住所: pref + city + address + street,
                  誕生日: birth,
              });
            }
            console.log(meta.from)
            if(meta.from === meta.last_page) {
              break;
            }
          }
        console.log(ExcelData)
        const currentTime = Date.now();
        var elt = ExcelData;
        var ws = XLSX.utils.json_to_sheet(elt);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "WorksheetName");
        isExportDialogOpen.value = !isExportDialogOpen.value;
        return dl
          ? XLSX.write(wb, { bookType: type, bookSST: true, type: "base64" })
          : XLSX.writeFile(wb, fn || tenantName + "-連絡先名簿-" + dayjs(inputDeath.value).format('YYYYMMDD') + "." + (type || "xlsx"));
      };

      //インポート
      const onChangeFile = (e) => {
        onReset();
        console.log(e);
        InportFile.value = e;
      };

      const fixdata = (resultData) => {
        let o = "",
          l = 0,
          w = 10240;
        for (; l < resultData.byteLength / w; ++l)
          o += String.fromCharCode.apply(
            null,
            new Uint8Array(resultData.slice(l * w, l * w + w))
          );
        o += String.fromCharCode.apply(null, new Uint8Array(resultData.slice(l * w)));
        return o;
      };

      const to_json = (workbook, X) => {
        let result = {};
        workbook.SheetNames.forEach(function (sheetName) {
          const roa = X.utils.sheet_to_json(workbook.Sheets[sheetName], {
            raw: true,
          });
          console.log(roa)
          if (roa.length > 0) {
            result[sheetName] = roa;
          }
        });
        return result;
      };

      const handleFile = () => {
        console.log(InportFile.value)
        const X = XLSX;
        const files = InportFile.value.target.files;
        const f = files[0];
        const reader = new FileReader();
        const loadReader = (e) => {
          const resultData = e.target.result;
          const arr = fixdata(resultData);
          const wb = X.read(btoa(arr), {
            type: "base64",
            cellDates: true,
          });
          const output = to_json(wb, X);

          for (let i of output["連絡先名簿"]) {
            items.value.push(i);
          }
          InportSubmit(items.value);
  
          onReset(); 
        };
        reader.readAsArrayBuffer(f);
        reader.onload = loadReader;   
      };

      const InportSubmit = async (data) => {
        TenantID.value = $store.state.authModule.users.tenants[0].id;
        console.log(data);
        console.log(data.length);
        for (let i = 0; i <= data.length; i++) {
          let InportData = data[i];
          let last_name = data[i].姓;
          let last_name_kana = data[i].せい;
          let first_name = data[i].名;
          let first_name_kana = data[i].めい;
          let phone = data[i].電話番号;
          let email = data[i].メールアドレス;
          let gender = data[i].性別;
          let type = data[i].種別;
          let date_of_birth = dayjs(data[i].誕生日).format('YYYY-MM-DD');
          let postcode = data[i].郵便番号;
          let pref = data[i].都道府県;
          let city = data[i].市区町村;
          let address = data[i].町域と番地;
          let street = data[i].建物名など;
           try {   
            await $store.dispatch("booksModule/createBook", {
              id: TenantID.value,
              last_name: last_name,
              last_name_kana: last_name_kana,
              first_name: first_name,
              first_name_kana: first_name_kana,
              phone: phone,
              email: email,
              gender: gender,
              type: type,
              date_of_birth: date_of_birth,
              postcode: postcode,
              pref: pref,
              city: city,
              address: address,
              street: street,
              is_alive: true,
              avatar: `https://api2.teraiku.jp/svg/login-avatar.svg`,
            });
            // const profile = $store.state.currentModule.currentfamily;
            // console.log(profile)
            // await $store.dispatch("booksModule/attachProfile", {
            //   tenant_id: TenantID.value,
            //   profile_id: profile.id,
            // });
            context.emit('updateROWS');
            isExportDialogOpen.value = false;
            positiveMessage("Creacion", "新しい檀家を作成されました");
            onReset();
          } catch (error) {
            console.log(error)
            isExportDialogOpen.value = false;
            negativeMessage("Error", "檀家の作成中にエラーが発生しました");
            onReset();
          }
        }
      }
    

      return{
        onCancel,
        onReset,
        onSubmit,
        isDialogOpen,
        isDialogConfirmation,
        openEditDialog,
        dialogTitle,
        targetDialog,
        
        tag1,
        tag2,

        editDialogStatus,
        resourceForUpdate,

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
        inputmournerName,
        inputDeath,
        inputPlaceofDeath,
        inputClientName,
        inputComment,
        TenantID,

        tab: ref('one'),
        isExportDialogOpen,
        isStartPage,
        isFinishPage,
        openFetchDialog,
        ExportExcel,

        onChangeFile,
        handleFile,

        InportFile,
        InportSubmit,
        items,
        FileDownload,
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

a {
  text-decoration: none; /* 下線を無効化 */
}
</style>