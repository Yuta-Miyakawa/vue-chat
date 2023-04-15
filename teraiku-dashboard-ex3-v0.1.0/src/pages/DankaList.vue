<template>
 <q-page padding>
    <!-- Layout Page -->
    <div class="container">
      <div class="row">
        <div class="column">
          <h5 style="margin:10px">檀家一覧</h5>
          <p>
            {{ current_page ? current_page : 1 }} ページ目 /
            {{ last_page ? last_page : 121 }}ページ
          </p>
        </div>
      </div>
      <div class="row items-center">
        <div class="SortOrder">
          <q-btn
            :outline="isDarkModeActive"
            color="primary"
            class="create-button"
            icon="person_add"
            label="新規檀家"
            @click="openEditDialog()"
          />
        </div>
        <div class="SortOrder">
          <q-btn
            color="black"
            class="create-button"
            icon-right="mdi-file-export"
            label="エクスポート"
            @click="openFetchDialog"
            no-caps
          />
        </div>
        <div
          class="col-lg-2 col-md-3 col-sm-4 col-xs-6 margin-top-5"
          style="margin-top: 17px"
        >
          <label for="file" class="filelabel"
            >インポート<q-icon name="mdi-file-import" class="label-icon"></q-icon
          ></label>
          <input class="fileinput" type="file" id="file" v-on:change="onChangeFile" />
        </div>
      </div>
      <div class="row">
        <div class="column custom-column">
          <div class="q-py-md user-table">
            <q-table
              :rows="rows"
              :columns="columns"
              row-key="id"
              :filter="filter"
              :loading="isLoadingTable"
              color="primary"
              :rows-per-page-options="[]"
              v-model:pagination="pagination"
              @request="onRequest"
            >
              <template v-slot:top>
                <q-space />
                <q-item-label caption
                  >検索
                  <q-input
                    outlined
                    dense
                    label="search"
                    debounce="500"
                    color="primary"
                    v-model="filter"
                  />
                </q-item-label>
                <!-- <q-space  />
                <q-item-label caption>都道府県検索
                <q-input
                  outlined
                  dense
                  label="(例)東京都"
                  debounce="500"
                  color="primary"
                  v-model="preffilter"
                  style="width: 150px"
                />
                </q-item-label>
                <div class="city-street">
                <q-item-label caption>市町村検索
                <q-input
                  outlined
                  dense
                  label="(例)渋谷区"
                  debounce="500"
                  color="primary"
                  v-model="cityfilter"
                />
                </q-item-label>
                </div>
                <div class="city-street">
                <q-item-label caption>番地検索
                <q-input
                  outlined
                  dense
                  label="(例)代々木"
                  debounce="500"
                  color="primary"
                  v-model="streetfilter"
                  @request="onRequest"
                />
                </q-item-label>
                </div> -->
                <q-btn
                  :outline="isDarkModeActive"
                  dense
                  square
                  icon="search"
                  class="search-button"
                  @click="btnRequest(pagination)"
                />
              </template>

              <template v-slot:body-cell-action="props">
                <q-td auto-width>
                  <q-btn
                    :outline="isDarkModeActive"
                    size="sm"
                    class="q-mx-xs"
                    color="orange"
                    icon="mdi-account-details-outline"
                    round
                    @click="showMoreInformation(props.row)"
                  >
                    <q-tooltip>詳細情報</q-tooltip>
                  </q-btn>
                  <q-btn
                    :outline="isDarkModeActive"
                    size="sm"
                    class="q-mx-xs"
                    color="info"
                    icon="edit"
                    round
                    @click="openEditDialog(props.row)"
                  >
                    <q-tooltip>編集</q-tooltip>
                  </q-btn>
                  <q-btn
                    :outline="isDarkModeActive"
                    size="sm"
                    class="q-mx-xs"
                    color="accent"
                    icon="delete"
                    round
                    @click="openDeleteDialog(props.row)"
                  >
                    <q-tooltip>削除</q-tooltip>
                  </q-btn>
                  
                </q-td>
              </template>
            </q-table>
          </div>
        </div>
      </div>
    </div>

    <!-- Dialogs -->
    <q-dialog v-model="isDialogOpen" persistent>
      <q-card class="creation-card-simple q-pa-sm">
        <q-card-section>
          <div class="text-h6">{{ dialogTitle }}</div>
        </q-card-section>
        <!-- <q-card-section>
          <div class="text-h6">データを入力してください</div>
        </q-card-section> -->
        <q-card-section>
          <div>
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-mdt">
              <!-- <q-card-section class="q-pt-none">
              <q-input
                v-model="inputFamilyName"
                type="text"
                label="檀家名"
                class="q-mb-xs"
                v-model.trim="inputFamilyName"
                :rules="[
                  (val) =>
                    (val && val.toString().length > 0) || '檀家名を入力してください',
                ]"
              />
              </q-card-section> -->
              <q-card-section class="q-pt-none">
                <div>代表者名</div>
              </q-card-section>
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
                
              </div>
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
              <div class="row justify-between">
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <q-card-section class="q-pt-none">
                    <q-input
                      v-model="inputPref"
                      type="text"
                      label="都道府県"
                      v-model.trim="inputPref"
                      :rules="[
                        (val) =>
                          (val && val.toString().length > 0) ||
                          '都道府県を入力してください',
                      ]"
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
                      :rules="[
                        (val) =>
                          (val && val.toString().length > 0) ||
                          '市区町村を入力してください',
                      ]"
                    />
                  </q-card-section>
                </div>
              </div>
              <div class="row justify-between">
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <q-card-section class="q-pt-none">
                    <q-input
                      v-model="inputAddress"
                      type="text"
                      label="町域・番地"
                      v-model.trim="inputAddress"
                      :rules="[
                        (val) =>
                          (val && val.toString().length > 0) ||
                          '町域・番地を入力してください',
                      ]"
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
              <q-card-section class="q-pt-none">
                <q-input
                  v-model="inputLocation"
                  type="text"
                  label="墓地番号"
                  class="q-mb-xs"
                  v-model.trim="inputLocation"
                />
              </q-card-section>

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
                    <q-btn label="リセット" type="reset" color="primary" flat  v-if="editDialogStatus == 'create'"/>
                  </q-card-section>
                </div>
              </div>
            </q-form>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="isDeleteDialogOpen" persistent>
      <q-card>
        <q-card-section class="bg-accent text-white">
          <div class="text-h6">檀家名: {{ resourceForDelete.family_name }}家</div>
        </q-card-section>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="accent" text-color="white" />
          <span class="q-ml-sm">
            <span class="text-weight-bold">{{ resourceForDelete.family_name }}家</span>
            のデータを本当に削除しますか?
          </span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="キャンセル" color="primary" v-close-popup />
          <q-btn
            flat
            label="削除"
            color="accent"
            @click="onDeleteBook(resourceForDelete.id)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="isExportDialogOpen" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6 text-center">エクスポートする檀家数を入力</div>
        </q-card-section>
        <p class="text-center">Excelにエクスポートできます。20ページ以内でエクスポートしてください。</p>
        <q-form @submit="ExportExcel('xlsx')">
          <q-card-section class="row items-center justify-center">
            <q-card-section class="row items-center">
              <p>始</p>
              <div class="q-pa-md">
                <q-input
                  v-model.number="isStartPage"
                  type="number"
                  min="1"
                  filled
                  style="max-width: 200px"
                  :rules="[
                    (val) =>
                      (val && isFinishPage - val <= 20) ||
                      '20ページ以内でExportしてください。',
                  ]"
                />
              </div>
              <p>ページ</p>
            </q-card-section>
            <q-card-section class="row items-center">
              <p>終</p>
              <div class="q-pa-md">
                <q-input
                  v-model.number="isFinishPage"
                  type="number"
                  filled
                  style="max-width: 200px"
                  :rules="[
                    (val) =>
                      (val && val - isStartPage <= 20) ||
                      '20ページ以内でExportしてください。',
                  ]"
                />
              </div>
              <p>ページ</p>
            </q-card-section>
          </q-card-section>
          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="キャンセル" color="primary" v-close-popup />
            <q-btn type="submit">エクスポート</q-btn>
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { LocalStorage, useQuasar } from "quasar";
import { date } from "quasar";
import { useRoute, useRouter } from "vue-router";
import { positiveMessage, negativeMessage } from "src/composable/light-notify";
import { columsForDanka } from "../composable/column-tables";
import * as XLSX from "xlsx";
import { route } from "quasar/wrappers";
// import axios from 'axios'

const columns = columsForDanka;

export default {
  setup() {
    // General Variables
    const $store = useStore();
    const $q = useQuasar();
    const route = useRoute();
    const $router = useRouter();

    // Table variables
    const rows = ref([]);
    const filter = ref("");
    const preffilter = ref("");
    const cityfilter = ref("");
    const streetfilter = ref("");
    const isLoadingTable = ref(false);
    const pagination = ref({
      sortBy: "name",
      page: 1,
      rowsPerPage: 15,
      rowsNumber: 0,
    });
    const page = 1;
    let modelAdd = ref([]);
    let modelAddUnique = ref(null);
    let modelToggle = ref(null);
    // Dialogs
    let isDialogOpen = ref(false);
    let isDeleteDialogOpen = ref(false);
    let isExportDialogOpen = ref(false);
    let isStartPage = ref(1);
    let isFinishPage = ref(20);
    // let inputFamilyName = ref("");
    let inputLastName = ref("");
    let inputFirstName = ref("");
    let inputPhone = ref("");
    let inputPostal = ref("");
    let inputPref = ref("");
    let inputCity = ref("");
    let inputStreet = ref("");
    let inputAddress = ref("");
    let inputLocation = ref("");
    let inputUserID = ref("");
    let inputMemberID = ref("");
    let inputCorporationID = ref("");

    let authors = ref(null);
    let authorSelected = ref(null);

    let exprtable_table = ref();
    let dialogTitle = ref("");
    let editDialogStatus = ref("");
    let resourceForUpdate = ref({});
    let resourceForDelete = ref({});
    let items = ref([]);
    let current_page = ref(null);
    let last_page = ref(null);
    let count = 0;
    let UserID = ref('');
    let TenantID = ref('');

    const isDarkModeActive = computed(() => $q.dark.isActive);

    const ExportExcel = async (type, fn, dl) => {
      let ExcelData = [];
      let page = 0;
      const meta = $store.state.dankaModule.families.meta;
      const last_pages = isFinishPage.value;
      const start_page = isStartPage.value;


        for (let i = start_page; i <= last_pages; i++) {
          page = i;
          await $store.dispatch("booksModule/readBooks", {
            TenantID: TenantID.value,
            ReadUserID: UserID.value,
            page: page,
          });
          const Data = $store.state.booksModule.books.data;
          console.log(Data)
          for (let j = 1; j <= Data.length; j++) {
            // ExcelData.push(Data[j - 1]);
            // const last_name = Data[j - 1].last_name || '';
            const first_name = Data[j - 1].first_name || '';
            const pref = Data[j - 1].pref || '';
            const city = Data[j - 1].city || '';
            const address = Data[j - 1].address || '';
            const street = Data[j - 1].street || '';
            ExcelData.push({
                ID: Data[j - 1].id,
                檀家名: Data[j - 1].last_name,
                代表者名: Data[j - 1].last_name + first_name,
                電話番号: Data[j - 1].phone,
                メールアドレス: Data[j - 1].email,
                郵便番号: Data[j - 1].postcode,
                住所: pref + city + address + street,
                墓地番号: Data[j - 1].location,
          });
          }
        }
      console.log(ExcelData)
      const currentTime = Date.now();
      const formattedTime = date.formatDate(currentTime, "YYYYMMDD");
      var elt = ExcelData;
      var ws = XLSX.utils.json_to_sheet(elt);
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "WorksheetName");
      isExportDialogOpen.value = !isExportDialogOpen.value;
      return dl
        ? XLSX.write(wb, { bookType: type, bookSST: true, type: "base64" })
        : XLSX.writeFile(wb, fn || "XX寺-檀家名簿-" + formattedTime + "." + (type || "xlsx"));
    };

    //table pagenation

    const fetchDogs = async (page = 1) => {
      isLoadingTable.value = true;
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
        const stateTenant = LocalStorage.getItem("stateTenant")
        TenantID.value = stateTenant.id
        console.log('userid',UserID.value)
      }catch (e) {
        console.log(e.response)
        if(e.response.status === 401) {
          $router.replace("/login");
          await $store.dispatch("authModule/logoutError");
          negativeMessage("Error", "再度ログインしてください");
          isLoadingTable.value = false;
          return;
        }
      }

      console.log(pagination);
      console.log("page", page);
      try {
        
        if (filter.value != "") {
          var strs = filter.value.split(/\s+/);
          if (strs[strs.length - 1] == "") {
            strs.pop();
          }
          console.log("strs : ", strs);
          await $store.dispatch("dankaModule/searchBooksDanka", {
            ReadUserID: UserID.value,
            page: page,
            value: strs,
          });
          // rows.value = $store.state.dankaModule.searchfamily.data
          // const meta = $store.state.dankaModule.searchfamily.meta
          // console.log(rows.value)
        }
        // else if(preffilter.value != ""){
        //   console.log("preffilter.value",preffilter.value)
        //   console.log("cityfilter.value",cityfilter.value)
        //   console.log("streetfilter.value",streetfilter.value)
        //   await $store.dispatch("dankaModule/searchBooksAddress",{
        //     page: page,
        //     pref: preffilter.value,
        //     city: cityfilter.value,
        //     street: streetfilter.value
        //   });
        // }
        else {
          // console.log("page",page)
          // console.log("route.params.page",route.params.page)
          // if(route.params.page != 1 && page == 1 && count == 0){
          //   console.log("eise if")
          //   await $store.dispatch("dankaModule/readBooks",{
          //     page: route.params.page
          //   });
          //   count = route.params.page
          // }
          await $store.dispatch("dankaModule/readDanka", {
            TenantID: TenantID.value,
            ReadUserID: UserID.value,
            page: page,
          });
        }
        console.log("commited",$store.state.dankaModule.DankaData.data);
        rows.value = $store.state.dankaModule.DankaData.data;
        // console.log(familyData)
        // console.log(familyData.id)
        // await $store.dispatch("currentModule/readRepresentBooks", {
        //     id: familyData.id,
        //   });
        // rows.value = $store.state.currentModule.familyRepresent.data;
        const meta = $store.state.dankaModule.DankaData.meta;
        console.log("meta見ます", meta);
        current_page.value = $store.state.dankaModule.DankaData.meta.current_page;
        last_page.value = $store.state.dankaModule.DankaData.meta.last_page;
        pagination.value.page = meta.current_page;
        pagination.value.rowsPerPage = meta.per_page;
        pagination.value.rowsNumber = meta.total;
        console.log(pagination);
         console.log(rows.value)
        isLoadingTable.value = false;
      } catch (e) {
        negativeMessage("Error", "データの読み込み中にエラーが発生しました");
        isLoadingTable.value = false;
      }
    };fetchDogs();

    const btnRequest = (pagenation) => {
      console.log("page", pagination.value);
      fetchDogs(pagination.value.page);
    };
    

    const onRequest = (props) => {
      fetchDogs(props.pagination.page);
    };

    // Events in the page
    const openEditDialog = (data = null) => {
      isDialogOpen.value = !isDialogOpen.value;
      console.log(data);
      if (data) {
        dialogTitle.value = "檀家情報編集";
        // inputFamilyName.value = data.family_name;
        inputLastName.value = data.last_name;
        inputFirstName.value = data.first_name;
        inputPhone.value = data.phone;
        inputPostal.value = data.postcode;
        inputPref.value = data.pref;
        inputCity.value = data.city;
        inputStreet.value = data.street;
        inputAddress.value = data.address;
        inputLocation.value = data.location;
        inputUserID.value = data.user_id;
        inputMemberID.value = data.member_id;
        inputCorporationID.value = data.corporation_id;
        editDialogStatus.value = "modify";
        resourceForUpdate.value = data;
        return;
      }
      dialogTitle.value = "檀家情報追加";
      editDialogStatus.value = "create";
    };

    const showMoreInformation = (data) => {
      if (!data) {
        negativeMessage("Error", "データを取得できませんでした");
        console.log(err);
        return false;
      }
      const selected = data;
      console.log("id", selected["id"]);
      console.log(pagination.value.page);
      if (filter.value != "") {
        console.log(filter.value);
        $router.push({
          name: "search-user-detail",
          params: {
            id: selected["id"],
            page: pagination.value.page,
            filter: filter.value,
          },
        });
      } else {
        $router.push({
          name: "user-detail",
          params: {
            id: selected["id"],
            page: pagination.value.page,
          },
        });
      }
    };

    const openDeleteDialog = (data) => {
      isDeleteDialogOpen.value = !isDeleteDialogOpen.value;
      resourceForDelete.value = data;
    };

    const openFetchDialog = () => {
      isExportDialogOpen.value = !isExportDialogOpen.value;
    };
    const onDeleteBook = async (id) => {
      try {
        await $store.dispatch("dankaModule/deleteBook", { id });
        positiveMessage("データ編集", "リソースが変更されました");
        fetchDogs();
        isDeleteDialogOpen.value = false;
      } catch (error) {
        console.log(error);
        negativeMessage("Error", "リソースの削除に失敗しました");
      }
    };

    const onCancel = () => {
      onReset();
      isDialogOpen.value = !isDialogOpen.value;
    };

    const onSubmit = async () => {
      if (editDialogStatus.value === "create") {
        try {
          await $store.dispatch("dankaModule/createBook", {
            family_name: inputLastName.value,
            last_name: inputLastName.value,
            first_name: inputFirstName.value,
            phone: inputPhone.value,
            postcode: inputPostal.value,
            pref: inputPref.value,
            city: inputCity.value,
            street: inputStreet.value,
            address: inputAddress.value,
            location: inputLocation.value,
            user_id: 2,
            member_id: 2,
            corporation_id: 1,
          });
          positiveMessage("Creacion", "新しいリソースが作成されました");
          // await $store.dispatch("dankaModule/readBooks");
          // rows.value = $store.state.dankaModule.families.data;
          fetchDogs();
          isDialogOpen.value = false;

          // console.log(inputEmail.value);
          onReset();
        } catch (error) {
          console.log(error);
          negativeMessage("Error", "リソースの作成中にエラーが発生しました");
        }
      } else if (editDialogStatus.value === "modify") {
        try {
          await $store.dispatch("dankaModule/updateBook", {
            id: resourceForUpdate.value.id,
            family_name: inputLastName.value,
            last_name: inputLastName.value,
            first_name: inputFirstName.value,
            phone: inputPhone.value,
            postcode: inputPostal.value,
            pref: inputPref.value,
            city: inputCity.value,
            street: inputStreet.value,
            address: inputAddress.value,
            location: inputLocation.value,
            user_id: inputUserID.value,
            member_id: inputMemberID.value,
            corporation_id: inputCorporationID.value,
          });
          positiveMessage("生成", "新しいリソース作成されました");
          fetchDogs();
          isDialogOpen.value = false;
          onReset();
        } catch (error) {
          console.log(error);
          negativeMessage("Error", "リソースの変更中にエラーが発生しました");
        }
      } else {
        return;
      }
    };

    const onReset = () => {
      // inputFamilyName.value = "";
      inputLastName.value = "";
      inputFirstName.value = "";
      inputPhone.value = "";
      inputPostal.value = "";
      inputPref.value = "";
      inputCity.value = "";
      inputStreet.value = "";
      inputAddress.value = "";
      inputLocation.value = "";
      inputUserID.value = "";
      inputMemberID.value = "";
      inputCorporationID.value = "";
    };

    const filterFn = async (val, update, abort) => {
      if (authors.value !== null) {
        update();
        return;
      }

      await $store.dispatch("authorsModule/readAuthors");
      const allAuthors = [...$store.state.authorsModule.authors].map(
        (author) => `${author.id} ${author.name}`
      );

      update(() => {
        authors.value = allAuthors;
      });
    };

    const abortFilterFn = () => {
      console.log("Aborting filter...");
    };
    const onChangeFile = (e) => {
      console.log(e);
      handleFile(e);
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
        if (roa.length > 0) {
          result[sheetName] = roa;
        }
      });
      return result;
    };
    const handleFile = (e) => {
      const X = XLSX;
      const files = e.target.files;
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
        for (let i of output["WorksheetName"]) {
          items.value.push(i);
        }
      };
      reader.readAsArrayBuffer(f);
      reader.onload = loadReader;
      console.log(items.value);
    };
    // Return reactive variables
    return {
      authors,
      authorSelected,
      dialogTitle,
      editDialogStatus,
      filter,
      preffilter,
      cityfilter,
      streetfilter,
      // inputFamilyName,
      inputLastName,
      inputFirstName,
      inputPhone,
      inputPostal,
      inputPref,
      inputCity,
      inputStreet,
      inputAddress,
      inputLocation,
      inputUserID,
      inputMemberID,
      inputCorporationID,
      isDarkModeActive,
      isDeleteDialogOpen,
      isDialogOpen,
      resourceForUpdate,
      resourceForDelete,
      modelAdd,
      modelAddUnique,
      modelToggle,
      isLoadingTable,
      columns,
      rows,
      UserID,
      TenantID,
      btnRequest,
      onRequest,
      pagination,
      isExportDialogOpen,
      isStartPage,
      isFinishPage,
      openFetchDialog,
      exprtable_table,
      ExportExcel,
      abortFilterFn,
      filterFn,
      onCancel,
      onReset,
      onSubmit,
      openEditDialog,
      onDeleteBook,
      openDeleteDialog,
      showMoreInformation,
      handleFile,
      onChangeFile,

      current_page,
      last_page,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../css/table-pages.scss";

.label-icon {
  font-size: 22px;
  margin-left: 5px;
}
.filelabel {
  display: inline-block;
  position: relative;
  background-color: #1877f2;
  color: #fff;
  font-size: 14px;
  padding: 7px 15px;
  border-radius: 3px;
  transition: all 0.5s;
}
.filelabel:hover {
  background-color: #004db1;
}

.fileinput {
  display: none;
}

.q-card__section--vert {
  padding: 10px;
}

.SortOrder {
  display:inline-block;
  padding:5px
}

// .q-gutter-y-md > *, .q-gutter-md > * {
//     margin-top: 0px;
// }
</style>
