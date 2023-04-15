<template>
  <q-page padding>
    <div class="row" padding>
      <q-btn
        outline
        dense
        no-wrap
        icon="add"
        no-caps
        color="green taskBtn"
        label="タスクを追加"
        class="q-mt-sm q-ml-sm q-pr-sm bg-white"
        @click="openEditDialog()"
      />
      <!-- v-if="$q.screen.gt.xs" -->
    </div>
    <div class="row" style="font-size: 12px">
      檀家からの予約や面談希望のタスクは両枠に色が付きます。
    </div>
    <!-- <q-form @submit="Request()">
      <div class="row" >
        <q-select
        filled
        v-model="searchModel"
        :options="tag1"
        label="タグ"
        style="width: 250px"
        />
        <div style="width:250px">
          <q-input filled v-model="date" placeholder="登録日" mask="date" :rules="['date']">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="date">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        </div>
        <q-btn flat label="検索する" type="submit" />
      </div>
      </q-form> -->
    <div class="row" padding>
      <div class="col-xs-12 col-sm-4 col-md-4 box">
        <lane :items="todoItems" title="未着手案件" id="todo" background="#ff6347" :color="todoColor" :start="todoStart" :end="todoEnd"/>
      </div>
      <div class="col-xs-12 col-sm-4 col-md-4 box">
        <lane :items="inProgressItems" title="進行中案件 " id="inProgress" background="#6495ed" :color="inProgressColor" :start="inProgressStart" :end="inProgressEnd"/>
      </div>
      <div class="col-xs-12 col-sm-4 col-md-4 box">
        <lane :items="doneItems" title="完了案件" id="done" background="#3cb371" :color="doneColor" :start="doneStart" :end="doneEnd"/>
      </div>
      <q-inner-loading
          :showing="isLoadingUser"
          color="primary"
        />
    </div>
  </q-page>

  <!-- タスクを追加するダイアログ -->

  <q-dialog v-model="isDialogOpen" persistent>
    <q-card style="">
      <q-form @submit="onSubmit" class="q-gutter-mdt">
        <q-card-section>
          <div class="text-h6">タスクを追加</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            autogrow
            dense
            v-model="inputTitle"
            label="タイトル"
            :rules="[
              (val) => (val && val.toString().length > 0) || 'タイトルを入力してください',
            ]"
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            type="textarea"
            dense
            v-model="inputDescription"
            label="詳細"
            
          />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input autogrow dense v-model="inputPlace" label="場所を追加" />
        </q-card-section>

        <div class="row justify-between">
          <div class="col-xs-12 col-sm-6 col-md-6">
            <q-card-section class="q-pt-none">
              <q-select
                filled
                v-model="inputTagoptions"
                :options="tag1"
                label="タグ"
                :rules="[
                  (val) =>
                    (val && val.toString().length > 0) || 'タグを選択してください',
                ]"
              />
            </q-card-section>
          </div>

          <div class="col-xs-12 col-sm-6 col-md-6">
            <q-card-section class="q-pt-none">
              <q-select
                filled
                v-model="inputColor"
                :options="tag2"
                label="タグの色"
                :rules="[
                  (val) =>
                    (val && val.toString().length > 0) || 'タグの色を選択してください',
                ]"
              />
            </q-card-section>
          </div>
        </div>

        <div class="row justify-between">
          <div class="col-xs-12 col-sm-6 col-md-6">
            <q-card-section class="q-pt-none">
              <div>開始時刻</div>
              <q-input filled v-model="inputStartDate">
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="inputStartDate" mask="YYYY/MM/DD HH:mm">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" @click="changeEndeDate(inputStartDate)" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-time v-model="inputStartDate" mask="YYYY/MM/DD HH:mm" format24h>
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" @click="changeEndeDate(inputStartDate)" color="primary" flat />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </q-card-section>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6">
            <q-card-section class="q-pt-none">
              <div>終了時刻</div>
              <q-input filled v-model="inputEndDate">
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="inputEndDate" mask="YYYY/MM/DD HH:mm">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
                <template v-slot:append>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-time v-model="inputEndDate" mask="YYYY/MM/DD HH:mm" format24h>
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </q-card-section>
          </div>
        </div>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="キャンセル" @click="onCancel" />
          <q-btn flat label="タスク追加" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from "vue";
import { mapState, useStore } from "vuex";
import { LocalStorage, useQuasar, date } from 'quasar';
import { useRouter } from "vue-router";
import Lane from "../components/Todo/Lane.vue";
// import Dialogs from "../components/Todo/dialog.vue";
import { positiveMessage, negativeMessage } from "src/composable/light-notify";
import * as dayjs from "dayjs";

const timeStamp = Date.now();
const formattedString = date.formatDate(timeStamp, "YYYY/MM/DD HH:mm");

export default defineComponent({
  name: "IndexPages",
  components: { Lane },

  computed: mapState({
    todoItems: (s) => s.todoModule.items.todo,
    inProgressItems: (s) => s.todoModule.items.inProgress,
    doneItems: (s) => s.todoModule.items.done,
    todoColor: (s) => s.todoModule.items.todoColor,
    inProgressColor: (s) => s.todoModule.items.inProgressColor,
    doneColor: (s) => s.todoModule.items.doneColor,
    todoStart: (s) => s.todoModule.items.todoStart,
    inProgressStart: (s) => s.todoModule.items.inProgressStart,
    doneStart: (s) => s.todoModule.items.doneStart,
    todoEnd: (s) => s.todoModule.items.todoEnd,
    inProgressEnd: (s) => s.todoModule.items.inProgressEnd,
    doneEnd: (s) => s.todoModule.items.doneEnd,
  }),

  setup() {
    const $store = useStore();
    const $router = useRouter();

    let tasks = ref();
    
    const isLoadingUser = ref(false);
    const showSimulatedReturnData = ref(false);
    let isDialogOpen = ref(false);
    let inputTitle = ref();
    let inputDescription = ref();
    let inputPlace = ref();
    let inputColor = ref();
    let inputStartDate = ref(formattedString);
    let inputEndDate = ref(formattedString);
    let inputTagoptions = ref();
    let inputRepetition = ref();
    let memberid = ref();
    let searchModel = ref('')
    let date = ref('')
    let tag1 = ["法事予約", "出張", "通夜", "葬儀", "祈祷", "相談受付", "寺務", "私事"];
    let tag2 = [
      {
        label: "赤色",
        color: "red",
      },
      {
        label: "青色",
        color: "blue",
      },
      {
        label: "緑色",
        color: "green",
      },
      {
        label: "紫色",
        color: "purple",
      },
      {
        label: "橙色",
        color: "orange",
      },
    ];

    const UserID = ref('');
    const TenantID = ref('');

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
          console.log(user)
          UserID.value = user.id;
          const statetenant = LocalStorage.getItem("stateTenant")
          console.log(statetenant)
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
        await $store.dispatch("todoModule/readTasks", {data:TenantID.value});
        const tasks = $store.state.todoModule.tasks.data;
        console.log("tasksの値見ます", tasks);
        memberid.value = $store.state.todoModule.nextId;
        isLoadingUser.value = false;
        showSimulatedReturnData.value = true;
      } catch (e) {
        negativeMessage("Error", "データの読み込み中にエラーが発生しました");
        isLoadingUser.value = false;
        showSimulatedReturnData.value = true;
      }
    })();

    const Request = async () => {
      if(searchModel.value !== "") {
        const result = await $store.dispatch("todoModule/searchTask", searchModel.value)
        console.log(result);
      }
    }

    const onSubmit = async () => {
      try {
        console.log(inputStartDate.value)
        await $store.dispatch("todoModule/addTasks", {
          tenant_id: TenantID.value,
          corporation_id: 1,
          task_id: memberid.value,
          request_id: 1,
          user_id: UserID.value,
          status: "todo",
          title: inputTitle.value,
          description: inputDescription.value,
          place: inputPlace.value,
          tagcolor: inputColor.value.color,
          start_date: dayjs(inputStartDate.value).format("YYYY-MM-DD HH:mm:ss"),
          end_date: dayjs(inputEndDate.value).format("YYYY-MM-DD HH:mm:ss"),
          type: inputTagoptions.value,
          // repetition: inputRepetition.value,
        });
        positiveMessage("Creacion", "新しいリソースが作成されました");
        console.log("nextId", $store.state.todoModule.nextId);
        memberid.value = $store.state.todoModule.nextId;
        isDialogOpen.value = false;
        await $store.dispatch("todoModule/readTasks", {data:TenantID.value});
        tasks.value = $store.state.todoModule.tasks.data;
        console.log("tasksの値見ます in Submit", tasks.value);
        onReset();
      } catch (e) {
        console.log(e);
        negativeMessage("Error", "リソースの作成中にエラーが発生しました");
      }
    };

    const openEditDialog = () => {
      isDialogOpen.value = !isDialogOpen.value;
    };

    const onCancel = () => {
      onReset();
      isDialogOpen.value = !isDialogOpen.value;
    };

    const changeEndeDate = (date) => {
      console.log(date)
      inputEndDate.value = dayjs(date).add(1,'hour').format('YYYY/MM/DD HH:mm');
      console.log(inputEndDate.value)
    }

    const onReset = () => {
      inputTitle.value = "";
      inputDescription.value = "";
      inputPlace.value = "";
      inputColor.value = "";
      inputStartDate.value = formattedString;
      inputEndDate.value = formattedString;
      inputTagoptions.value = "";
      inputRepetition.value = "";
    };

    return {
      tasks,
      UserID,
      TenantID,


      isLoadingUser,
      showSimulatedReturnData,

      inputTitle,
      inputDescription,
      inputPlace,
      inputColor,
      inputStartDate,
      inputEndDate,
      inputTagoptions,
      inputRepetition,
      searchModel,
      tag1,
      tag2,
      date,
      onReset,
      onCancel,
      onSubmit,
      Request,
      isDialogOpen,
      openEditDialog,
      changeEndeDate,
    };
  },
});
</script>

<style lang="sass" scoped>
.row + .row
  margin-top: 0.5rem

.taskBtn
  margin: 0

.box
  margin-bottom: 6px

// @media screen and (max-width:480px)
//   .dialogCard
//     min-width: 300px
</style>
