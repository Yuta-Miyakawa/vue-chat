<template>
 <q-page class="q-pa-lg">
    <div class="container">
      <div class="row">
        <div class="column">
          <h5 style="margin:10px">テンプレート一覧</h5>
          <!-- <p>
            {{ current_page ? current_page : 1 }} ページ目 /
            {{ last_page ? last_page : 121 }}ページ
          </p> -->
        </div>
      </div>
      <div class="row items-center">
        <div class="SortOrder">
          <q-btn
            outline
            dense
            no-wrap
            icon="add"
            no-caps
            color="green taskBtn"
            label="テンプレートを追加"
            class="create-button"
            @click="openEditDialog()"
          />
        </div>
      </div>
      <div class="row">
        <div class="column custom-column">
          <div class="q-py-md user-table">
            <q-table
              :rows="rows"
              :columns="columns"
              row-key="id"
              :filter="category"
              :loading="isLoadingTable"
              :rows-per-page-options="[]"
              v-model:pagination="pagination"
              @request="onRequest"
              :visible-columns="visibleColumns"
            >
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
                <div v-if="$q.screen.gt.xs" class="col">
                  <q-toggle v-model="visibleColumns" val="type" label="種別" />
                  <q-toggle v-model="visibleColumns" val="template" label="文書名" />
                  <q-toggle v-model="visibleColumns" val="title" label="タイトル" />
                  <q-toggle v-model="visibleColumns" val="createHuman" label="制作者" />
                  <q-toggle v-model="visibleColumns" val="create" label="制作日" />
                  <q-toggle v-model="visibleColumns" val="updateHuman" label="更新者" />
                  <q-toggle v-model="visibleColumns" val="update" label="更新日" />
                </div>
                <q-select
                  v-else
                  v-model="visibleColumns"
                  multiple
                  borderless
                  dense
                  options-dense
                  display-value="リスト表示選択"
                  emit-value
                  map-options
                  :options="columns"
                  option-value="name"
                  style="min-width: 150px"
                />
                <q-space />
                <q-item-label caption
                  >文書名検索
                  <q-input
                    outlined
                    dense
                    label="(例)テスト投稿"
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
 </q-page>

 <!-- ダイアログ -->
  <q-dialog v-model="isDialogOpen" persistent>
    <q-card class="creation-card-simple q-pa-sm">
      <q-card-section>
        <div class="col-xs-8 col-sm-10 col-md-10">
          <div class="text-h6">{{ dialogTitle }}</div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="onEditBook(rows)" @reset="onCancel()" class="q-gutter-md">
          <!-- 連絡先と現在帳表示 -->
          <div class="row justify-between">
            <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding: 0px 16px;">
              <q-item-section>
                <q-select
                  dense
                  v-model="inputType"
                  :options="options"
                  label="以下から種別をお選びください"
                  lazy-rules
                  behavior="menu"
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
            <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding: 0px 16px;">
              <q-item-section>
                <q-input
                  dense
                  v-model="inputTemplateTitle"
                  label="例)　テンプレート１"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.toString().length > 0) ||
                      '文書名を入力してください',
                  ]"
                >
                  <template v-slot:label>
                    <div>文書名<b style="color: red; font-size: 20px;">*</b></div>
                  </template>
                </q-input>
              </q-item-section>
            </q-item>

            <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding: 0px 16px;">
              <q-item-section>
                <q-item-label>
                  <div>タイトル<b style="color: red; font-size: 20px;">*</b></div>
                  <q-input
                    dense
                    v-model="inputTitle"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.toString().length > 0) ||
                        'タイトルを入力してください',
                    ]"
                  >
                  <!-- <template v-slot:label>
                    <div>タイトル<b style="color: red; font-size: 20px;">*</b></div>
                  </template> -->
                  </q-input>
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding: 0px 16px;">
              <q-item-section>
                <q-item-label>
                  <div>本文<b style="color: red; font-size: 20px;">*</b></div>
                  <q-editor
                    v-model="inputBody"
                    :dense="$q.screen.lt.md"
                    :toolbar="[
                      [
                        {
                          label: $q.lang.editor.align,
                          icon: $q.iconSet.editor.align,
                          fixedLabel: true,
                          list: 'only-icons',
                          options: ['left', 'center', 'right', 'justify'],
                        },
                        {
                          label: $q.lang.editor.align,
                          icon: $q.iconSet.editor.align,
                          fixedLabel: true,
                          options: ['left', 'center', 'right', 'justify'],
                        },
                      ],
                      [
                        'bold',
                        'italic',
                        'strike',
                        'underline',
                        'subscript',
                        'superscript',
                      ],
                      ['token', 'hr', 'link', 'custom_btn'],

                      [
                        {
                          label: $q.lang.editor.formatting,
                          icon: $q.iconSet.editor.formatting,
                          list: 'no-icons',
                          options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
                        },
                        {
                          label: $q.lang.editor.fontSize,
                          icon: $q.iconSet.editor.fontSize,
                          fixedLabel: true,
                          fixedIcon: true,
                          list: 'no-icons',
                          options: [
                            'size-1',
                            'size-2',
                            'size-3',
                            'size-4',
                            'size-5',
                            'size-6',
                            'size-7',
                          ],
                        },
                        {
                          label: $q.lang.editor.defaultFont,
                          icon: $q.iconSet.editor.font,
                          fixedIcon: true,
                          list: 'no-icons',
                          options: [
                            'default_font',
                            'arial',
                            'arial_black',
                            'comic_sans',
                            'courier_new',
                            'impact',
                            'lucida_grande',
                            'times_new_roman',
                            'verdana',
                          ],
                        },
                        'removeFormat',
                      ],
                      ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

                      ['undo', 'redo'],
                      ['viewsource'],
                    ]"
                    :fonts="{
                      arial: 'Arial',
                      arial_black: 'Arial Black',
                      comic_sans: 'Comic Sans MS',
                      courier_new: 'Courier New',
                      impact: 'Impact',
                      lucida_grande: 'Lucida Grande',
                      times_new_roman: 'Times New Roman',
                      verdana: 'Verdana',
                    }"
                  />
               </q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div class="flex column" style="text-align: right">
            <div v-if="editDialogStatus == 'modify'" class="q-mb-sm">
              <q-card-section class="q-pt-none">
                <q-btn color="primary" label="キャンセル" @click="onCancel" style="margin-right: 10px" />
                <q-btn
                  label="保存"
                  type="submit"
                  color="primary"
                />
              </q-card-section>
            </div>
            <div v-else class="q-mb-sm">
              <q-card-section class="q-pt-none">
                <q-btn color="primary" label="キャンセル" @click="onCancel" style="margin-right: 10px" />
                <q-btn
                  label="追加"
                  type="submit"
                  color="primary"
                />
              </q-card-section>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="isDeleteDialogOpen" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="warning" color="accent" text-color="white" />
        <span class="q-ml-sm">
          このデータを本当に削除しますか?
        </span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="キャンセル" color="primary" v-close-popup />
        <q-btn
          flat
          label="削除"
          color="accent"
          @click="onDeleteBook(resourceForDelete)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { LocalStorage, useQuasar, date } from 'quasar';
import { useRoute, useRouter } from "vue-router";
import { positiveMessage, negativeMessage } from "src/composable/light-notify";
import { columnsForTemplate } from "../composable/column-tables";
import { route } from "quasar/wrappers";
import * as dayjs from "dayjs";

const columns = columnsForTemplate;

export default {
  setup() {
    // General Variables
    const $store = useStore();
    const $q = useQuasar();
    const route = useRoute();
    const $router = useRouter();

    // Table variables
    const rows = ref([]);
    const UserName = ref("");
    const filter = ref("");
    const preffilter = ref("");
    const cityfilter = ref("");
    const streetfilter = ref("");
    const isLoadingTable = ref(false);
    const currentTime = dayjs();
    const pagination = ref({
      sortBy: "name",
      page: 1,
      rowsPerPage: 1,
      rowsNumber: 1,
    });
    const category = ref("");
    const options = ["四十九日忌", "一周忌", "お寺葬", "葬儀", "法事", "供養", "七五三", "祈願・祈祷", "宿坊", "坐禅会", "写経会", "法話会", "その他イベント"];
    const visibleColumns  = ref([ 'action', 'type', 'template', 'title', 'createHuman', 'create', 'updateHuman', 'update' ]);
    const page = 1;
    let modelAdd = ref([]);
    let modelAddUnique = ref(null);
    let modelToggle = ref(null);
    let TenantID = ref('');
    // Dialogs
    let isDialogOpen = ref(false);
    let isDeleteDialogOpen = ref(false);
    let isStartPage = ref(1);
    let isFinishPage = ref(20);
    let inputType = ref("");
    let inputTitle = ref("");
    let inputTemplateTitle = ref("");
    let inputBody = ref("");
    let inputUpdatehumam = ref("");
    let inputUpdatedtime = ref("");

    let authors = ref(null);
    let authorSelected = ref(null);

    let dialogTitle = ref("");
    let editDialogStatus = ref("");
    let resourceForUpdate = ref({});
    let resourceForId  =ref({});
    let resourceForDelete = ref({});
    let items = ref([]);
    let current_page = ref(null);
    let last_page = ref(null);
    let count = 0;

    const isDarkModeActive = computed(() => $q.dark.isActive);

    // GEt all data for the first render
    (async function setupBooks() {
      // isLoadingTable.value = true;
      try {
        // await $store.dispatch("dankaModule/readBooks",{
        //   params: {page: page}
        // });
        // console.log($store.state.dankaModule.families);
      } catch (e) {
        negativeMessage("Error", "データの読み込み中にエラーが発生しました");
      }
    })();

    const fetchDogs = async (page = 1) => {
        try{
          await $store.dispatch("authModule/userAccessToken");
          const isTenant = $store.state.authModule.users.is_tenant;
          if (isTenant == false) {
            $router.replace("/login");
            await $store.dispatch("authModule/logoutError");
            negativeMessage("Error", "あなたはログインできないユーザーです");
            return;
          }
          console.log($store.state.authModule.users)
          const user = $store.state.authModule.users
          UserName.value = user.name;
          const statetenant = LocalStorage.getItem("stateTenant") 
          TenantID.value = statetenant.id;
          console.log(statetenant)
          console.log(TenantID.value)
        }catch (e) {
          console.log(e.response)
          if(e.response.status === 401) {
          $router.replace("/login");
          await $store.dispatch("authModule/logoutError");
          negativeMessage("Error", "再度ログインしてください");
          return;
          }
        }
      // try {
      //   isLoadingTable.value = true;
      //   if (filter.value != "") {
      //     var strs = filter.value.split(/\s+/);
      //     if (strs[strs.length - 1] == "") {
      //       strs.pop();
      //     }
      //     console.log("strs : ", strs);
      //     await $store.dispatch("dankaModule/searchBooksDanka", {
      //       page: page,
      //       value: strs,
      //     });
      //   }
      //   else {
      //     await $store.dispatch("dankaModule/readBooks", {
      //       page: page,
      //     });
      //   }
      //   console.log("commited");
      //   rows.value = $store.state.dankaModule.families.data;
      //   const meta = $store.state.dankaModule.families.meta;
      //   console.log("meta見ます", meta);
      //   // current_page.value = $store.state.dankaModule.families.meta.current_page;
      //   // last_page.value = $store.state.dankaModule.families.meta.last_page;
      //   // pagination.value.page = meta.current_page;
      //   // pagination.value.rowsPerPage = meta.per_page;
      //   // pagination.value.rowsNumber = meta.total;
      //   isLoadingTable.value = false;
      // } catch (e) {
      //   negativeMessage("Error", "データの読み込み中にエラーが発生しました");
      //   isLoadingTable.value = false;
      // }
      await $store.dispatch("booksModule/readTemplate", {
        TenantID: TenantID.value,
      });
      console.log($store.state.booksModule.TemplateList)
      rows.value = $store.state.booksModule.TemplateList;
      // rows.value.push(
      //   {
      //     id: 1,
      //     type: "その他イベント",
      //     template_title: "テンプレートテスト",
      //     title: "〇〇開催のお知らせ",
      //     body: "<div style=\"text-align: left;\"><span style=\"color: rgb(47, 47, 47); font-family: &quot;Noto Sans Japanese&quot;, &quot;Noto Sans CJK JP&quot;, &quot;Hiragino Sans&quot;, Meiryo;\">紫陽花が雨に映える季節となりましたが、お変わりありませんでしょうか。</span><br></div><div style=\"text-align: left;\"><span style=\"color: rgb(47, 47, 47); font-family: &quot;Noto Sans Japanese&quot;, &quot;Noto Sans CJK JP&quot;, &quot;Hiragino Sans&quot;, Meiryo;\">今年も毎年定期的に行っている〇〇を○月○日から開催したいと思います。</span></div><div style=\"text-align: left;\"><span style=\"color: rgb(47, 47, 47); font-family: &quot;Noto Sans Japanese&quot;, &quot;Noto Sans CJK JP&quot;, &quot;Hiragino Sans&quot;, Meiryo;\">どなたでも参加いただけますのでこの際にぜひ〇〇に参加してみませんか？</span></div>",
      //     update_human: "浜島秀法",
      //     updated_at: "2022-10-9T00000",
      //   },
      //   {
      //     id: 2,
      //     type: "法話会",
      //     template_title: "テンプレートテスト2",
      //     title: "楽しく学べる〇〇！", 
      //     body: "<div style=\"text-align: left;\">お寺でよく聞く〇〇ですが、皆さんは詳しく知っていますか？</div><div style=\"text-align: left;\">今回は〇〇について私とともに楽しく学んでいきましょう！</div>",
      //     update_human: "浜島秀法",
      //     updated_at: "2022-10-9T000000",
      //   },
      // )
      pagination.value.rowsPerPage = rows.value.length;
      pagination.value.rowsNumber = rows.value.length;
    };fetchDogs();

    const btnRequest = (pagenation) => {
      console.log("page", pagination.value);
      // fetchDogs(pagination.value.page);
    };

    const onRequest = (props) => {
      // fetchDogs(props.pagination.page);
    };

    // Events in the page
    const openEditDialog = (data = null) => {
      isDialogOpen.value = !isDialogOpen.value;
      console.log(data);
      if (data) {
        dialogTitle.value = "テンプレート編集";
        inputType.value = data.type,
        inputTitle.value = data.title,
        inputTemplateTitle.value = data.name,
        inputBody.value = data.body,
        inputUpdatehumam.value = data.updated_by,
        inputUpdatedtime.value = currentTime,
        editDialogStatus.value = "modify";
        resourceForUpdate.value = data;
        resourceForId.value = data.id;
        return;
      }
      dialogTitle.value = "テンプレート追加";
      inputUpdatedtime.value = currentTime,
      editDialogStatus.value = "create";
    };

    const onEditBook = async (data) => {
      // console.log(dayjs(inputUpdatedtime.value).format("YYYY-MM-DDT000"))
      try {
        console.log(resourceForId.value)
        if(editDialogStatus.value == "modify"){
          await $store.dispatch("booksModule/updateTemplate", {
            TenantID: TenantID.value,
            id: resourceForId.value,
            type: inputType.value,
            name: inputTemplateTitle.value,
            title: inputTitle.value,
            body: inputBody.value,
            updated_by: UserName.value,
          });
          onReset();
        }else if(editDialogStatus.value == "create"){
          await $store.dispatch("booksModule/createTemplate", {
            id: TenantID.value,
            type: inputType.value,
            name: inputTemplateTitle.value,
            title: inputTitle.value,
            body: inputBody.value,
            created_by: UserName.value,
            updated_by: UserName.value,
          });
          onReset();
        }
        isDialogOpen.value = !isDialogOpen.value;
        await $store.dispatch("booksModule/readTemplate", {
          TenantID: TenantID.value,
        });
        rows.value = $store.state.booksModule.TemplateList;
        console.log($store.state.booksModule.TemplateList)
        pagination.value.rowsPerPage = rows.value.length;
        pagination.value.rowsNumber = rows.value.length;
        positiveMessage("Creacion", "新しいリソースが作成されました");
      } catch (error) {
        console.log(error);
        negativeMessage("Error", "リソースの作成中にエラーが発生しました");
      }
    };

    const onDeleteBook = async (data) => {
      console.log(data)
      try {
        await $store.dispatch("booksModule/deleteTemplate", {
          TenantID: TenantID.value,
          id: data.id,
        });
        onReset();
        isDeleteDialogOpen.value = !isDeleteDialogOpen.value;
        await $store.dispatch("booksModule/readTemplate", {
          TenantID: TenantID.value,
        });
        rows.value = $store.state.booksModule.TemplateList;
        console.log($store.state.booksModule.TemplateList)
        pagination.value.rowsPerPage = rows.value.length;
        pagination.value.rowsNumber = rows.value.length;
        positiveMessage("Creacion", "新しいリソースが作成されました");
      } catch (error) {
        console.log(error);
        negativeMessage("Error", "リソースの作成中にエラーが発生しました");
      }
    };

    const openDeleteDialog = (data) => {
      isDeleteDialogOpen.value = !isDeleteDialogOpen.value;
      resourceForDelete.value = data;
    };

    const onCancel = () => {
      onReset();
      isDialogOpen.value = !isDialogOpen.value;
    };

    const onReset = () => {
      inputType.value = "";
      inputTitle.value = "";
      inputTemplateTitle.value = "";
      inputBody.value = "";
      inputUpdatehumam.value = "";
      inputUpdatedtime.value = "";
      editDialogStatus.value = "";
      resourceForUpdate.value = "";
      resourceForId.value = "";
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
      TenantID,
      category,
      options,
      visibleColumns,
      authors,
      authorSelected,
      dialogTitle,
      editDialogStatus,
      filter,
      preffilter,
      cityfilter,
      streetfilter,
      currentTime,
      inputType,
      inputTitle,
      inputTemplateTitle,
      inputBody,
      inputUpdatehumam,
      inputUpdatedtime,
      isDarkModeActive,
      isDeleteDialogOpen,
      isDialogOpen,
      resourceForUpdate,
      resourceForId,
      resourceForDelete,
      modelAdd,
      modelAddUnique,
      modelToggle,
      isLoadingTable,
      columns,
      rows,
      UserName,
      btnRequest,
      onRequest,
      onEditBook,
      onDeleteBook,
      pagination,
      isStartPage,
      isFinishPage,
      abortFilterFn,
      filterFn,
      onCancel,
      onReset,
      openEditDialog,
      openDeleteDialog,

      current_page,
      last_page,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "../css/table-pages.scss";

.SortOrder {
  display:inline-block;
  padding:5px
}

.creation-card-simple {
  min-width: 100%;
  width: 100%;
}

// .q-card__section--vert {
//   padding: 10px;
// }

// .q-gutter-y-md > *,
// .q-gutter-md > * {
//   margin-top: 0px;
// }

</style>
