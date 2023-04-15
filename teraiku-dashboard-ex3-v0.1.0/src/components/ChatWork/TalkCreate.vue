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

  
  <q-dialog v-model="isDialogOpen" persistent>
    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      animated
    >
      <q-step
        :name="1"
        title="トークルームに呼ぶ人"
        icon="settings"
        :done="step > 1"
      >
        <q-table
          :rows="ContactList"                          
          :columns="columns"
          row-key="name"
          clickable
          :loading="isLoadingTable"
          :rows-per-page-options="[]"
          v-model:pagination="pagination"
          @request="onRequest"
          @row-click="useTemplate" 
        >
        </q-table>
        <q-stepper-navigation>
            <q-btn align="right" label="閉じる" color="primary" v-close-popup />
            <q-btn
            @click="() => { step = 2 }" 
            class="float-right q-mr-md q-mb-md" 
            color="blue"
            label="次へ"
            />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="グループ名"
        icon="settings"
        :done="step > 2"
      >
        <q-card-section class="q-pt-none">
          <q-input
            v-model="inputdharmaName"
            type="text"
            label="グループ名"
            class="q-mb-xs"
            v-model.trim="inputdharmaName"
            :rules="[
              (val) =>
                (val && val.toString().length > 0) || 'グループ名を入力してください',
            ]"
          />
        </q-card-section>
        <q-stepper-navigation>
          <q-btn align="right" label="閉じる" color="primary" v-close-popup />
          <q-btn  
            @click="() => { step = 3 }" 
            class="float-right q-mr-md q-mb-md" 
            color="blue"
            label="次へ"
          />
          <q-btn 
            flat 
            @click="step = 1" 
            color="primary"  
            label="戻る" 
            class="q-mr-sm float-right"
          />
        </q-stepper-navigation>
      </q-step>

    </q-stepper>
  </q-dialog>



</template>

<script>
import { defineComponent,ref} from 'vue';
import { LocalStorage, useQuasar, date } from 'quasar';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { positiveMessage, negativeMessage } from "src/composable/light-notify";
import { columsForDanka } from "../../composable/column-tables";
// import { saveAs } from 'file-saver';
import * as dayjs from "dayjs";


export default defineComponent({
    name: "Dialog",
    props: ["id", "SelectCreateDialog"],
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
      let inputType = ref("");
      let inputBirth = ref('');
      let inputPostal = ref("");
      let inputPref = ref("");
      let inputCity = ref("");
      let inputAddress = ref("");
      let inputStreet = ref("");

      let inputdharmaName = ref("");
      let inputmournerName = ref("");
      let inputDeath = ref(dayjs().format('YYYY/MM/DD'));
      let inputPlaceofDeath = ref("");
      let inputClientName = ref("");
      let inputComment = ref("");

      let isExportDialogOpen = ref(false);
      let isStartPage = ref(1);
      let isFinishPage = ref(5);
      let items = ref([]);
      let InportFile = ref([]);

      const columns = columsForDanka;
      const pagination = ref({
        // page:1,
        // rowsPerPage: 15,
        // rowsNumber: 0
      });
      const ContactList = ref([]);


       const SeeContactList = async(page = 1) => {
        const statetenant = LocalStorage.getItem("stateTenant")
        const TenantID= statetenant.id;

        await $store.dispatch("booksModule/readBooks", {
          TenantID: TenantID,
          page: page,
        });
        console.log($store.state.booksModule.books.data);
        ContactList.value = $store.state.booksModule.books.data;
        const meta = $store.state.booksModule.books.meta;
        console.log("meta見ます", meta);
        // contentTotal.value = meta.total;
        pagination.value.page = meta.current_page;
        pagination.value.rowsPerPage = meta.per_page
        pagination.value.rowsNumber = meta.total
      }
      SeeContactList();

      const onRequest = (props) => {
        SeeContactList(props.pagination.page);
      };

      const useTemplate = (evt, rows) => {
        console.log(evt)
        console.log(rows)
        
        SelectColor();
      };

      const SelectColor = () => {

      let table = document.querySelector("table");
      let tr = table.querySelectorAll("tr");
      table.addEventListener("click", function(e) {
        if(e.target.tagName.toLowerCase() === "td") {
          //まずは全て背景色白
          for(var i = 0; i < tr.length; i++) {
            tr[i].style.backgroundColor = "white";
          }
          e.target.parentNode.style.backgroundColor = "#eef";
        }
      }, false);
    }

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
                positiveMessage("Creacion", "新しい現在帳が作成されました");
                context.emit('updateDANKA');
                isDialogOpen.value = false;
                onReset();
              } catch (error) {
                negativeMessage("Error", "現在帳の作成中にエラーが発生しました");
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

    

      return{
        SeeContactList,
        ContactList,
        pagination,
        columns,
        onRequest,
        useTemplate,
        SelectColor,


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

        step: ref(1),
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