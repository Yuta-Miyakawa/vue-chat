<template>
 <q-page padding>
    <!-- Layout Page -->
    <div class="container">
      <div class="row">
        <div class="column">
          <h5 style="margin:20px 0px">お知らせ</h5>
          <h7>お寺や事務局からのお知らせ</h7>
        </div>
      </div>

        <q-list bordered class="rounded-borders q-my-lg" v-show="showSimulatedReturnData">
          <div v-for="i in rows.length" :key="i">
            <q-item clickable v-ripple @click="openDeteil(rows[i-1],rowstime[i-1])">

              <q-item-section avatar>
                <q-avatar>
                  <img src="../assets/img/monk.svg" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">{{rows[i-1].title}}</q-item-label>
                <q-item-label caption lines="2">
                  <!-- <span class="text-weight-bold"></span> -->
                  <div class="ellipsis-1-lines body htmlBody" v-html="$sanitize(rows[i-1].body)" ></div>
                </q-item-label>
              </q-item-section>

              <q-item-section side top> {{rowstime[i-1]}} </q-item-section>
            </q-item>

            <q-separator inset="item" />
          </div>
        </q-list>

      <q-inner-loading
          :showing="isLoadingUser"
          color="primary"
        />
    </div>

  </q-page>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { LocalStorage, useQuasar, date } from 'quasar';
import { useRouter } from 'vue-router'
import { positiveMessage, negativeMessage } from "src/composable/light-notify";
import { contactAddress } from "../composable/column-tables";
import sanitizeHTML from 'sanitize-html'

const columns = contactAddress;
const $sanitize = sanitizeHTML
export default {
  setup() {
    // General Variables
    const $store = useStore();
    const $q = useQuasar();
    const $router = useRouter();

    // Table variables
    const rows = ref([]);
    const filter = ref("");
    const selected = ref([]);

    const isLoadingUser = ref(false);
    const showSimulatedReturnData = ref(false);

    // Dialogs
    let isDialogOpen = ref(false);

    let rowstime = ref([]);
    let inputLastName = ref("");
    let inputFirstName = ref("");
    let inputLastNameKana = ref("");
    let inputFirstNameKana = ref("");
    let inputEmail = ref("");
    let inputPostal = ref("");
    let inputAddress = ref("");
    let UserID = ref('');
    let TenantID = ref('');

    let authors = ref(null);
    let authorSelected = ref(null);

    let dialogTitle = ref("");
    let editDialogStatus = ref("");
    let resourceForUpdate = ref({});
    let resourceForDelete = ref({});

    const isDarkModeActive = computed(() => $q.dark.isActive);

    // GEt all data for the first render
    (async function setupBooks() {
      isLoadingUser.value = true;
      showSimulatedReturnData.value = false;
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
        const statetenant = LocalStorage.getItem("stateTenant") 
        TenantID.value = statetenant.tenantmaster_id;
        console.log(TenantID.value)
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
      try {
        await $store.dispatch("contactsModule/readBooks", { 
          TenantID: TenantID.value,
          ReadUserID: UserID.value 
        });
        // console.log("contactsdata",$store.state.contactsModule.Contacts.data)
        rows.value = $store.state.contactsModule.Contacts;
        console.log(rows.value)
        // console.log("length",rows.value.length)
        // console.log("updated_at",rows.value[0].updated_at)
        for (let i=0; i<rows.value.length; i++){
          // console.log("body",rows.value[i].body)
          var strs = rows.value[i].updated_at.split('T');
          rowstime.value[i] = strs[0];
          // console.log(rowstime.value[i])
          // console.log(rows.value[i])
        }
        isLoadingUser.value = false;
        showSimulatedReturnData.value = true;
      } catch (e) {
        negativeMessage("Error", "データの読み込み中にエラーが発生しました");
        isLoadingUser.value = false;
        showSimulatedReturnData.value = true;
      }
    })()

    const openDeteil = (data,time) => {
      if (!data) {
        negativeMessage("Error", "データを取得できませんでした");
        console.log(err)
        return false
      }
      $router.push({
        name: 'AnnouncehistoryDeteil',
        params:{ id: data.id }  
      })
    }

    // Events in the page
    const openEditDialog = (data = null) => {
      isDialogOpen.value = !isDialogOpen.value;
      if (data) {
        dialogTitle.value = "編集するには"
        // inputName.value = `${data.last_name} ${data.first_name}`;
        // inputNameKana.value = `${data.last_name_kana} ${data.first_name_kana}`;
        inputLastName.value = data.last_name;
        inputFirstName.value = data.first_name;
        inputLastNameKana.value = data.last_name_kana;
        inputFirstNameKana.value = data.first_name_kana;
        inputEmail.value = data.email;
        inputPostal.value = data.postal;
        // inputAddress.value = `${data.pref} ${data.city} ${data.town} ${data.address}`;
        inputAddress.value = data.address;

        editDialogStatus.value = "modify";
        resourceForUpdate.value = data;
        return;
      }
      dialogTitle.value = "新規コンタクト先情報";
      editDialogStatus.value = "create";
    }



    const onDeleteBook = async (id) => {
      try {
        await $store.dispatch("booksModule/deleteBook", { id });
        positiveMessage("データ編集", "リソースが変更されました");
        rows.value = $store.state.booksModule.books.data;

      } catch (error) {
        negativeMessage("Error", "リソースの削除に失敗しました");
      }
    }

    const onCancel = () => {
      onReset();
      isDialogOpen.value = !isDialogOpen.value;
    }

    const onSubmit = async () => {
      if (editDialogStatus.value === "create") {
        try {
          await $store.dispatch("booksModule/createBook", {
            last_name: inputLastName.value,
            last_name_kana: inputLastNameKana.value,
            first_name: inputFirstName.value,
            first_name_kana: inputFirstNameKana.value,
            email: inputEmail.value,
            postal: inputPostal.value,
            address: inputAddress.value,
          });
          positiveMessage("Creacion", "新しいリソースが作成されました");
          rows.value = $store.state.booksModule.books.data;
          isDialogOpen.value = false;
          onReset();
        } catch (error) {
          negativeMessage("Error", "リソースの作成中にエラーが発生しました");
        }
      } else if (editDialogStatus.value === 'modify') {
        try {
          await $store.dispatch("booksModule/updateBook", {
            id: resourceForUpdate.value.id,
            last_name: inputLastName.value,
            last_name_kana: inputLastNameKana.value,
            first_name: inputFirstName.value,
            first_name_kana: inputFirstNameKana.value,
            email: inputEmail.value,
            postal: inputPostal.value,
            address: inputAddress.value,
          })
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
    }

    const onReset = () => {
      inputLastName.value = "";
      inputLastNameKana.value = "";
      inputFirstName.value = "";
      inputFirstNameKana.value = "";
      inputEmail.value = "";
      inputPostal.value = "";
      inputAddress.value = "";
    }

    const filterFn = async (val, update, abort) => {
      if (authors.value !== null) {
        update();
        return;
      }

      await $store.dispatch("authorsModule/readAuthors");
      const allAuthors = [...$store.state.authorsModule.authors]
        .map((author) => `${author.id} ${author.name}`);

      update(() => {
        authors.value = allAuthors;
      })
    }

    const abortFilterFn = () => {
      console.log("Aborting filter...");
    }

    // Return reactive variables
    return {
      authors,
      authorSelected,
      columns,
      $sanitize,
      dialogTitle,
      editDialogStatus,
      filter,
      

      isLoadingUser,
      showSimulatedReturnData,
      rowstime,
      inputLastName,
      inputLastNameKana,
      inputFirstName,
      inputFirstNameKana,
      inputEmail,
      inputPostal,
      inputAddress,
      UserID,
      TenantID,
      selected,

      isDarkModeActive,

      isDialogOpen,

      resourceForUpdate,
      resourceForDelete,
      rows,
      openDeteil,
      abortFilterFn,
      filterFn,
      onCancel,
      onReset,
      onSubmit,
      openEditDialog,
      onDeleteBook,

    }
  }
}
</script>

<style lang="scss" scoped>
@use "../css/table-pages.scss";

.btn-tel{
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

.btn-tel::after{
  content: "";
  width: 24px;
  height: 24px;
  position: absolute;
  top: calc(50% - 12px);
  left: 15px;
}

// :deep(.htmlBody) {
//  font-size: 1em;
// }

</style>
