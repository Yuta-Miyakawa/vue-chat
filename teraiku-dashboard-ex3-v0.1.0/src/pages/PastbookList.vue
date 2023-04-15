<template>
 <q-page padding>
    <!-- Layout Page -->
    <div class="container">
      <div class="row">
        <div class="column">
          <h5 style="margin: 10px">過去帳一覧</h5>
          <p>
            {{ current_page ? current_page : 1 }} ページ目 /
            {{ last_page ? last_page : 121 }}ページ
          </p>
        </div>
      </div>
      <div class="row items-center">
        <!-- <div class="SortOrder">
          <q-btn
            :outline="isDarkModeActive"
            color="primary"
            class="create-button"
            icon="person_add"
            label="新規過去帳"
            @click="openEditDialog()"
          />
        </div> -->
        <!-- <div class="SortOrder">
          <q-btn
            color="black"
            class="create-button"
            icon-right="mdi-file-export"
            label="エクスポート"
            @click="openFetchDialog"
            no-caps
          />
        </div> -->
        <!-- <div
          class="col-lg-2 col-md-3 col-sm-4 col-xs-6 margin-top-5"
          style="margin-top: 17px"
        >
          <label for="file" class="filelabel"
            >インポート<q-icon name="mdi-file-import" class="label-icon"></q-icon
          ></label>
          <input class="fileinput" type="file" id="file" v-on:change="onChangeFile" />
        </div> -->
      </div>
      <div class="row">
        <div class="column custom-column">
          <div class="q-py-md user-table">
            <q-table
              :rows="rows"
              :columns="columns"
              row-key="id"
              :filter="filter"
              color="primary"
              :loading="isLoadingTable"
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

        <q-card-section>
          <div>
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-mdt">
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
              </div>
              <q-card-section class="q-pt-none">
                <q-input
                  v-model="inputdharmaName"
                  type="text"
                  label="俗名/法名"
                  class="q-mb-xs"
                  v-model.trim="inputdharmaName"
                  :rules="[
                    (val) =>
                      (val && val.toString().length > 0) || '俗名/法名を入力してください',
                  ]"
                />
              </q-card-section>

              <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <q-card-section class="q-pt-none">
                    <q-item-label
                      >誕生日
                      <q-input filled v-model="inputBirth" mask="date" :rules="['date']">
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
                    </q-item-label>
                  </q-card-section>
                </div>

                <div class="col-xs-12 col-sm-6 col-md-6">
                  <q-card-section class="q-pt-none">
                    <q-item-label
                      >命日
                      <q-input filled v-model="inputDeath" mask="date" :rules="['date']">
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
                    </q-item-label>
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
              <q-card-section class="q-pt-none">
                <q-input
                  v-model="inputComment"
                  type="textarea"
                  label="故人メモ(寺院様のみご覧いただけます)"
                  class="q-mb-xs"
                  v-model.trim="inputComment"
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
                    <q-btn label="リセット" type="reset" color="primary" flat />
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
          <div class="text-h6">
            名前: {{ resourceForDelete.last_name + resourceForDelete.first_name }}
          </div>
        </q-card-section>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="accent" text-color="white" />
          <span class="q-ml-sm">
            <span class="text-weight-bold">{{
              resourceForDelete.last_name + resourceForDelete.first_name
            }}</span>
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
        <p class="text-center">
          Excelにエクスポートできます。20ページ以内でエクスポートしてください。
        </p>
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
import { useQuasar } from "quasar";
import { date } from "quasar";
import { useRoute, useRouter } from "vue-router";
import { positiveMessage, negativeMessage } from "src/composable/light-notify";
import { columsForPastbook } from "../composable/column-tables";
import * as XLSX from "xlsx";
import { route } from "quasar/wrappers";
// import axios from 'axios'

const columns = columsForPastbook;

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
    let inputLastName = ref("");
    let inputFirstName = ref("");
    let inputLastNameKana = ref("");
    let inputFirstNameKana = ref("");
    let inputdharmaName = ref("");
    let inputBirth = ref("");
    let inputDeath = ref("");
    let inputLocation = ref("");
    let inputComment = ref("");


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

    const isDarkModeActive = computed(() => $q.dark.isActive);

    // GEt all data for the first render

    const ExportExcel = async (type, fn, dl) => {
      let ExcelData = [];
      let page = 0;
      const meta = $store.state.pastModule.pastfamily.meta;
      const last_pages = isFinishPage.value;
      const start_page = isStartPage.value;

      for (let i = start_page; i <= last_pages; i++) {
        page = i;
        await $store.dispatch("pastModule/readBooks", {
          page: 4,
        });
        const Data = $store.state.pastModule.pastfamily.data;
        for (let j = 1; j <= Data.length; j++) {
          // ExcelData.push(Data[j - 1]);
          const last_name = Data[j - 1].last_name || "";
          const first_name = Data[j - 1].first_name || "";
          const pref = Data[j - 1].pref || "";
          const city = Data[j - 1].city || "";
          const address = Data[j - 1].address || "";
          const street = Data[j - 1].street || "";
          ExcelData.push({
            ID: Data[j - 1].id,
            種別: Data[j - 1].type,
            代表者名: last_name + first_name,
            戒名: Data[j - 1].dharma_name,
            誕生日: Data[j - 1].birth,
            享年: Data[j - 1].death,
            墓地番号: Data[j - 1].location,
          });
        }
      }
      await $store.dispatch("pastModule/readBooks", {
        params: { page: 1 },
      });
      var elt = ExcelData;
      const currentTime = Date.now();
      const formattedTime = date.formatDate(currentTime, "YYYYMMDD");
      var ws = XLSX.utils.json_to_sheet(elt);
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "WorksheetName");
      isExportDialogOpen.value = !isExportDialogOpen.value;
      return dl
        ? XLSX.write(wb, { bookType: type, bookSST: true, type: "base64" })
        : XLSX.writeFile(
            wb,
            fn || "XX寺-過去帳名簿-" + formattedTime + "." + (type || "xlsx")
          );
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
          await $store.dispatch("pastModule/searchBooks", {
            page: page,
            value: strs,
          });
        } else {
          await $store.dispatch("pastModule/readBooks", {
            page: 4,
          });
          // console.log(rows.value);
        }
        console.log("commited");
        rows.value = $store.state.pastModule.pastfamily;
        rows.value = $store.state.pastModule.pastfamily.data;
        const meta = $store.state.pastModule.pastfamily.meta;
        console.log("meta見ます", meta);
        current_page.value = $store.state.pastModule.pastfamily.meta.current_page;
        last_page.value = $store.state.pastModule.pastfamily.meta.last_page;
        pagination.value.page = meta.current_page;
        pagination.value.rowsPerPage = meta.per_page;
        pagination.value.rowsNumber = meta.total;
        console.log(pagination);
         for( var i = 0; i < rows.value.length; i++ ){

            if(rows.value[i].address === null){
              console.log(rows.value[i])
            }

         }
        console.log(rows.value);
        isLoadingTable.value = false;
      } catch (e) {
        negativeMessage("Error", "データの読み込み中にエラーが発生しました");
        isLoadingTable.value = false;
      }
    };
    fetchDogs();

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
        inputLastName.value = data.last_name;
        inputFirstName.value = data.first_name;
        inputLastNameKana.value = data.last_name_kana;
        inputFirstNameKana.value = data.first_name_kana;
        inputdharmaName.value = data.dharma_name;
        inputBirth.value = date.formatDate(data.birth, "YYYY/MM/DD");
        inputDeath.value = date.formatDate(data.death, "YYYY/MM/DD");
        inputLocation.value = data.location;
        inputComment.value = data.message;

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
        await $store.dispatch("pastModule/deleteBook", { id });
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
          await $store.dispatch("pastModule/createBook", {
            type: '家族会員',
            last_name: inputLastName.value,
            first_name: inputFirstName.value,
            last_name_kana: inputLastNameKana.value,
            first_name_kana: inputFirstNameKana.value,
            dharma_name: inputdharmaName.value,
            birth: inputBirth.value,
            death: inputDeath.value,
            location: inputLocation.value,
            message: inputComment.value,
            family_id: 2,
          });
          positiveMessage("Creacion", "新しいリソースが作成されました");
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
          await $store.dispatch("pastModule/updateBook", {
            id: resourceForUpdate.value.id,
            last_name: inputLastName.value,
            first_name: inputFirstName.value,
            last_name_kana: inputLastNameKana.value,
            first_name_kana: inputFirstNameKana.value,
            dharma_name: inputdharmaName.value,
            birth: inputBirth.value,
            death: inputDeath.value,
            location: inputLocation.value,
            message: inputComment.value,

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
      inputLastName.value = "";
      inputFirstName.value = "";
      inputLastNameKana.value = "";
      inputFirstNameKana.value = "";
      inputdharmaName.value = "";
      inputBirth.value = "";
      inputDeath.value = "";
      inputLocation.value = "";
      inputComment.value = "";

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

      inputLastName,
      inputFirstName,
      inputLastNameKana,
      inputFirstNameKana,
      inputdharmaName,
      inputBirth,
      inputDeath,
      inputLocation,
      inputComment,

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
