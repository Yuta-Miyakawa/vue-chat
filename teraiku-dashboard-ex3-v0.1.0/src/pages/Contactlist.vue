<template>
 <q-page padding>
    <!-- Layout Page -->
    <div class="container">
      <div class="row">
        <div class="column">
          <h5 style="margin:20px 0px">コンタクトリスト</h5>
          <h7>檀家さまだけではなく、お寺にご縁のある方を登録いただけます。</h7>
          <h7>問い合わせフォームからコンタクトのあった方も自動登録されます。</h7>
        </div>
      </div>
      <!-- コンタクトリスト 追加削除ボタン配置 -->
      <div class="row">
        <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">
          <q-btn
            :outline="isDarkModeActive"
            color="primary"
            class="create-button"
            icon="person_add"
            label="新規追加"
            @click="openEditDialog()"
          />
        </div>
      </div>
      <!-- コンタクトリスト リスト表示部 -->
      <div class="row">
        <div class="column custom-column">
          <div class="q-py-md user-table">
            <q-table
              title="Profile"
              :rows="rows"
              :columns="columns"
              row-key="id"
              :filter="category"
              :loading="isLoadingTable"
              :rows-per-page-options="[]"
              v-model:pagination="pagination"
              @request="onRequest"
            >
              <!-- 検索用テキスト入力 -->
              <template v-slot:top>
                <q-select
                  dense
                  filled
                  solo
                  v-model="category"
                  :options="options"
                  label="種別選択"
                  style="min-width: 150px"
                />
                <q-space />
                <q-item-label caption
                  >名字検索
                  <q-input
                    outlined
                    dense
                    label="(例)田山"
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

              <!-- リスト カラム表示 -->
              <!-- <template v-slot:body-cell-stage="props">
                  <q-td v-for="col in props.cols" :key="col.name" :props="props">
                    {{ col.value }}
                  </q-td>

              </template> -->
              <!-- リスト右端 詳細情報ボタン配置 -->
              <!-- <template v-slot:body-cell-action="props">
                <q-td auto-width>
                    <q-btn
                        :outline="isDarkModeActive"
                        class="q-mx-xs"
                        color="orange"
                        @click="openDeleteDialog(props.row)"
                    >
                      個別 ﾄｰｸ
                    </q-btn>
                  </q-td>               
              </template> -->
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
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
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

              <div class="row justify-between">
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
                </div>
              </div>

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
              </div>
              <div class="row justify-between">
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
  </q-page>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { positiveMessage, negativeMessage } from "src/composable/light-notify";
import { contactAddress } from "../composable/column-tables";

const columns = contactAddress;

export default {
  setup() {
    // General Variables
    const $store = useStore();
    const $router = useRouter();
    const $q = useQuasar();

    // Table variables
    const rows = ref([]);
    const filter = ref("");
    const category = ref("");
    const options = ["すべての方", "檀家", "一般", "協力会社"];
    const tag1 = ["男性", "女性", "どちらでもない"];
    const tag2 = ["檀家", "一般", "協力会社"];

    const isLoadingTable = ref(false);
    const pagination = ref({
      page: 1,
      rowsPerPage: 15,
      rowsNumber: 0,
    });
    // const selected = ref([]);

    // Dialogs
    let isDialogOpen = ref(false);

    let inputLastName = ref("");
    let inputFirstName = ref("");
    let inputLastNameKana = ref("");
    let inputFirstNameKana = ref("");
    let inputPhone = ref("");
    let inputEmail = ref("");
    let inputGender = ref("");
    let inputType = ref("");
    let inputPostal = ref("");
    let inputPref = ref("");
    let inputCity = ref("");
    let inputAddress = ref("");
    let inputStreet = ref("");

    let authors = ref(null);
    let authorSelected = ref(null);

    let dialogTitle = ref("");
    let editDialogStatus = ref("");
    let resourceForUpdate = ref({});
    let resourceForDelete = ref({});

    const isDarkModeActive = computed(() => $q.dark.isActive);

    // GEt all data for the first render
    (async function setupBooks() {
      // isLoadingTable.value = true;
      try {
      } catch (e) {
        // negativeMessage("Error", "データの読み込み中にエラーが発生しました");
      }
    })();

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
          return;
        }
      }
      try {
        if (filter.value != "") {
          console.log("filter.valueあります");
          var strs = filter.value.split(/\s+/);
          console.log("strs : ", strs);
          if (category.value != "" && category.value != "すべての方") {
            console.log("どっちもあります");
            await $store.dispatch("booksModule/searchBooks", {
              page: page,
              last_name: strs[0],
              type: category.value,
            });
          } else {
            await $store.dispatch("booksModule/searchBooks", {
              page: page,
              last_name: strs[0],
            });
          }
        } else if (category.value != "" && category.value != "すべての方") {
          console.log(category.value);
          await $store.dispatch("booksModule/searchBooks", {
            page: page,
            type: category.value,
          });
        } else {
          console.log("どっちも空またはcategori.valueがすべての方です");
          await $store.dispatch("booksModule/readBooks", {
            page: page,
          });
        }
        console.log($store.state.booksModule.books);
        rows.value = $store.state.booksModule.books.data;
        const meta = $store.state.booksModule.books.meta;
        console.log('meta',meta)
        pagination.value.page = meta.current_page;
        pagination.value.rowsPerPage = meta.per_page;
        pagination.value.rowsNumber = meta.total;
        console.log(rows.value);
        isLoadingTable.value = false;
        // console.log("load",isLoadingTable.value)
      } catch (e) {
        negativeMessage("Error", "データの読み込み中にエラーが発生しました");
      }
    };

    const onRequest = (props) => {
      fetchDogs(props.pagination.page);
    };
    fetchDogs();

    const btnRequest = (date) => {
      console.log("page", pagination.value);
      fetchDogs(pagination.value.page);
    };
    fetchDogs();

    // Events in the page
    const openEditDialog = (data = null) => {
      isDialogOpen.value = !isDialogOpen.value;
      if (data) {
        dialogTitle.value = "編集するには";

        inputLastName.value = data.last_name;
        inputFirstName.value = data.first_name;
        inputLastNameKana.value = data.last_name_kana;
        inputFirstNameKana.value = data.first_name_kana;
        inputPhone.value = data.phone;
        inputEmail.value = data.email;
        inputGender.value = data.gender;
        inputType.value = data.type;
        inputPostal.value = data.postal;
        inputPref.value = data.pref;
        inputCity.value = data.city;
        inputAddress.value = data.address;
        inputStreet.value = data.street;

        editDialogStatus.value = "modify";
        resourceForUpdate.value = data;
        return;
      }
      dialogTitle.value = "新規コンタクト先";
      editDialogStatus.value = "create";
    };

    const onDeleteBook = async (id) => {
      try {
        await $store.dispatch("booksModule/deleteBook", { id });
        positiveMessage("データ編集", "リソースが変更されました");
        rows.value = $store.state.booksModule.books.data;
      } catch (error) {
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
          await $store.dispatch("booksModule/createBook", {
            last_name: inputLastName.value,
            last_name_kana: inputLastNameKana.value,
            first_name: inputFirstName.value,
            first_name_kana: inputFirstNameKana.value,
            phone: inputPhone.value,
            email: inputEmail.value,
            gender: inputGender.value,
            type: inputType.value,
            postal: inputPostal.value,
            pref: inputPref.value,
            city: inputCity.value,
            address: inputAddress.value,
            street: inputStreet.value,
          });
          positiveMessage("Creacion", "新しいリソースが作成されました");
          rows.value = $store.state.booksModule.books.data;
          isDialogOpen.value = false;
          onReset();
        } catch (error) {
          negativeMessage("Error", "リソースの作成中にエラーが発生しました");
        }
      } else if (editDialogStatus.value === "modify") {
        try {
          await $store.dispatch("booksModule/updateBook", {
            id: resourceForUpdate.value.id,
            last_name: inputLastName.value,
            last_name_kana: inputLastNameKana.value,
            first_name: inputFirstName.value,
            first_name_kana: inputFirstNameKana.value,
            phone: inputPhone.value,
            email: inputEmail.value,
            gender: inputGender.value,
            type: inputType.value,
            postal: inputPostal.value,
            pref: inputPref.value,
            city: inputCity.value,
            address: inputAddress.value,
            street: inputStreet.value,
          });
          positiveMessage("生成", "新しいリソース作成されました");
          rows.value = $store.state.booksModule.books.data;
          isDialogOpen.value = false;
          onReset();
        } catch (error) {
          negativeMessage("Error", "リソースの変更中にエラーが発生しました");
        }
      } else {
        return;
      }
    };

    const onReset = () => {
      inputLastName.value = "";
      inputLastNameKana.value = "";
      inputFirstName.value = "";
      inputFirstNameKana.value = "";
      inputPhone.value = "";
      inputEmail.value = "";
      inputGender.value = "";
      inputType.value = "";
      inputPostal.value = "";
      inputPref.value = "";
      inputCity.value = "";
      inputAddress.value = "";
      inputStreet.value = "";
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

    // Return reactive variables
    return {
      authors,
      authorSelected,
      columns,
      dialogTitle,
      editDialogStatus,
      filter,
      category,
      options,
      tag1,
      tag2,

      inputLastName,
      inputLastNameKana,
      inputFirstName,
      inputFirstNameKana,
      inputPhone,
      inputEmail,
      inputGender,
      inputType,
      inputPostal,
      inputPref,
      inputCity,
      inputAddress,
      inputStreet,

      pagination,
      onRequest,
      btnRequest,

      isDarkModeActive,

      isDialogOpen,
      isLoadingTable,
      resourceForUpdate,
      resourceForDelete,
      rows,
      abortFilterFn,
      filterFn,
      onCancel,
      onReset,
      onSubmit,
      openEditDialog,
      onDeleteBook,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../css/table-pages.scss";

.btn-tel {
  position: relative;
  display: block;
  border-radius: 50px;
  color: white;
  font-weight: bold;
  text-align: center;
  background: #f75065;
  padding: 5px 0;
  margin: auto;
  max-width: 250px;
  text-decoration: none;
}

.btn-tel::after {
  content: "";
  width: 24px;
  height: 24px;
  position: absolute;
  top: calc(50% - 12px);
  left: 15px;
}

.search-button {
  height: 40px;
  top: 6px;
  width: 40px;
}

.q-card__section--vert {
  padding: 10px;
}

.q-gutter-y-md > *,
.q-gutter-md > * {
  margin-top: 0px;
}
</style>
