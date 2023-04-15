<template>
 <q-page padding>
    <div class="container">
    <div class="row">
      <div class="column">
        <h5>
          <q-btn
            :outline="isDarkModeActive"
            size="sm"
            class="q-mx-xs"
            color="primary"
            icon="arrow_back"
            round
            @click="goBack()"
          ><q-tooltip>戻る</q-tooltip>
          </q-btn>
          お知らせ詳細
        </h5>
      </div>
    </div>
  </div>
  <div class="container">
    <q-card style="width: 100%">
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img src="../assets/img/monk.svg" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <q-input
              type="text"
              v-model="inputTitle"
              :rules="[
                (val) =>
                  (val && val.toString().length > 0) ||
                  'タイトルを入力してください',
              ]"
            />
            <!-- <div class="text-h6">{{inputTitle}}</div> -->
          </q-item-label>
        </q-item-section>

      <q-item-section side top> {{inputTime}} </q-item-section>
    </q-item>

      <q-separator inset />

      <q-card-section>
        <q-editor
          v-model="inputQeditorText"
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
        <!-- <div v-html="rows.body" /> -->
      </q-card-section>
      <div class="flex column" style="text-align: right">
        <div class="q-mb-sm">
          <q-btn
            label="更新"
            type="submit"
            color="primary"
            style="margin-right: 10px"
            @click="openEditDialog(rows.id)"
          />
          <q-btn 
            color="red" 
            label="削除" 
            style="margin-right: 5px"
            @click="openDeleteDialog(rows.id)"
          />
        </div>
      </div>
    </q-card>
  </div>
  </q-page>

  <q-dialog v-model="isEditDialogOpen" persistent>
    <div>
      <q-card style="width: 100%">
        <q-card-section class="row">
          このデータを本当に更新しますか？
      </q-card-section>
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img src="../assets/img/monk.svg" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <div class="text-h6">{{EditTitle}}</div>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator inset />
        <!-- <div style="text-align: left">
          [編集済み]
        </div> -->
        <q-card-section >
          <div v-html="$sanitize(inputQeditorText)" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="キャンセル" color="primary" v-close-popup />
        <q-btn
          flat
          label="更新"
          color="green"
          @click="onEditBook(resourceForEdit)"
        />
      </q-card-actions>
      </q-card>
    </div>
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
import { useRoute, useRouter } from 'vue-router';
import { positiveMessage, negativeMessage } from "src/composable/light-notify";
import sanitizeHTML from 'sanitize-html'

const $sanitize = sanitizeHTML

export default {
  setup() {
    // General Variables
    const $store = useStore();
    const $q = useQuasar();
    const route = useRoute();
    const $router = useRouter();

    // Table variables
    const rows = ref("");

    const inputTime = ref("");
    const inputTitle = ref("");
    const inputQeditorText = ref("");
    const UserID = ref('');

    let EditTitle = ref("");
    let isDeleteDialogOpen = ref(false);
    let resourceForDelete = ref({});
    let isEditDialogOpen = ref(false);
    let resourceForEdit = ref({});

    const isDarkModeActive = computed(() => $q.dark.isActive);

    // GEt all data for the first render
    (async function setupBooks() {
      console.log("setup")
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

        console.log(route.params.id)
        await $store.dispatch("contactsModule/readBooksDeteil" ,{
          id: route.params.id,
          ReadUserID: UserID.value
        });
       
        rows.value = $store.state.contactsModule.Contacts;
         console.log(rows.value)
        // console.log(rows.value.id)

        // console.log(rows.value.updated_at)
        var strs = rows.value.updated_at.split('T');
        inputTime.value = strs[0];
        inputTitle.value = rows.value.title;
        inputQeditorText.value = rows.value.body;
      }catch (e) {
        console.log("EROOR発生しました")
        negativeMessage("Error", "データの読み込み中にエラーが発生しました");
      }
    })();

    const goBack = () => {
      console.log("route.params.page",route.params.page)
      $router.push({
        name: 'Announcehistory',
      })
    };

    const openEditDialog = (data) => {
      console.log("変数済み検索",inputTitle.value.indexOf("編集済み"))
      if(inputTitle.value.indexOf("編集済み") === -1){
        EditTitle.value = inputTitle.value+"[編集済み]";
        console.log("== -1",EditTitle.value)
      }else{
        EditTitle.value = inputTitle.value;
        console.log("!= -1",EditTitle.value)
      }
      isEditDialogOpen.value = !isEditDialogOpen.value;
      resourceForEdit.value = data;
      console.log(resourceForEdit.value)
    };

    const onEditBook = async (id) => {
      try {
        console.log(id)
        await $store.dispatch("contactsModule/updateBook", {
          ReadUserID: UserID.value,
          id: id,
          title: EditTitle.value,
          body: inputQeditorText.value,
          meta: "{data: 'JSON\u30c7\u30fc\u30bf'}",
          // user_id: 5,
        });
        isEditDialogOpen.value = false;
        $router.push({
          name: 'Announcehistory'
        })
        positiveMessage("データ編集", "リソースが変更されました");
      } catch (error) {
        console.log(error);
        negativeMessage("Error", "リソースの削除に失敗しました");
      }
    };
    
    const openDeleteDialog = (data) => {
      isDeleteDialogOpen.value = !isDeleteDialogOpen.value;
      resourceForDelete.value = data;
      console.log(resourceForDelete.value)
    };

    const onDeleteBook = async (id) => {
      try {
        await $store.dispatch("contactsModule/deleteBook", {
          id, 
          ReadUserID: UserID.value
        });
        positiveMessage("データ編集", "リソースが変更されました");
        isDeleteDialogOpen.value = false;
        $router.push({
          name: 'Announcehistory'
        })
      } catch (error) {
        console.log(error);
        negativeMessage("Error", "リソースの削除に失敗しました");
      }
    };

    return {
      $sanitize,
      isDarkModeActive,
      rows,
      inputTime,
      inputTitle,
      inputQeditorText,
      UserID,
      EditTitle,
      isEditDialogOpen,
      resourceForEdit,
      isDeleteDialogOpen,
      resourceForDelete,
      openEditDialog,
      onEditBook,
      openDeleteDialog,
      onDeleteBook,
      goBack,
    };

    }
}

</script>

<style lang="scss" scoped>

@use "../css/table-pages.scss";

</style>