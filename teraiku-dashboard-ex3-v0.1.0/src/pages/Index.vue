<template>
 <q-page padding>
    <div class="container">
      <div class="row">
        <div class="column" v-show="showSimulatedReturnData">
          <div class="row no-wrap row-card">
                          <!-- class="col-lg-4 col-md-4 col-sm-6 col-xs-6" -->
            <card-info
              v-for="data in cardData" :key="data"
              v-bind="data"
            >
            <!-- <div class="col-4"></div> -->
            </card-info>
          </div>
          <!-- <div class="row" id="newInquiry"> -->
            <h6 style="margin: 5px">最新のお知らせ：{{rows.length}}件</h6>
              <q-list bordered class="rounded-borders q-my-lg" v-show="showSimulatedReturnData">
                <div v-for="i in rows.length" :key="i">

                  <q-slide-item @left="onDelete(rows[i-1])" left-color="red">
                    <template v-slot:left>
                      <q-icon name="delete" />
                    </template>
                    <q-item clickable v-ripple to="/system/kanban" >

                      <q-item-section v-if="avatar[i-1]" avatar>
                        <q-avatar>
                          <img :src="avatar[i-1]" />
                        </q-avatar>
                      </q-item-section>
                      <q-item-section v-else avatar>
                        <q-avatar>
                          <img src="../assets/img/monk.svg" />
                        </q-avatar>
                      </q-item-section>

                      <q-item-section>
                        <q-item-label lines="1">{{rows[i-1].title}}</q-item-label>
                        <q-item-label caption lines="2">                    
                          <div class="ellipsis-1-lines body htmlBody" v-html="rows[i-1].body" ></div>
                        </q-item-label>
                      </q-item-section>

                      <q-item-section side top> 
                        <q-item-label lines="1">
                          日付：{{rowstime1[i-1]}}
                        </q-item-label>
                        <q-item-label lines="2">
                          時間：{{rowstime2[i-1]}}
                        </q-item-label>
                      </q-item-section>
                    </q-item>

                  </q-slide-item>

                  <q-separator inset="item" />
                </div>
              </q-list>
              <!-- <q-list bordered class="rounded-borders q-my-lg" v-show="showSimulatedReturnData">
                <div v-for="i in rows.length" :key="i">
                  <q-item clickable v-ripple to="/system/kanban" >

                    <q-item-section avatar>
                      <q-avatar>
                        <img src="https://api2.teraiku.jp/svg/login-avatar.svg" />
                      </q-avatar>
                    </q-item-section>

                    <q-item-section>
                      <q-item-label lines="1">{{rows[i-1].title}}</q-item-label>
                      <q-item-label caption lines="2">                    
                        <div class="ellipsis-1-lines body htmlBody" v-html="rows[i-1].body" ></div>
                      </q-item-label>
                    </q-item-section>

                    <q-item-section side top> {{rowstime[i-1]}} </q-item-section>
                  </q-item>

                  <q-separator inset="item" />
                </div>
              </q-list> -->
            <!-- <q-list bordered class="rounded-borders q-my-lg">
              <q-item-label header>新着問い合わせ</q-item-label>

              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">法要について</q-item-label>
                  <q-item-label caption lines="2">
                    <span class="text-weight-bold">田中陽子</span>
                    -- 父の法要の日程を変更できますか?
                  </q-item-label>
                </q-item-section>

                <q-item-section side top> 1 min ago </q-item-section>
              </q-item>

              <q-separator inset="item" />

              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="1">お彼岸の予約の件</q-item-label>
                  <q-item-label caption lines="2">
                    <span class="text-weight-bold">仲野太郎</span>
                    -- お彼岸の法要の予約はいつからできますか？ また申込みはどのようにすればいいですか？
                  </q-item-label>
                </q-item-section>

                <q-item-section side top> 1 min ago </q-item-section>
              </q-item>
            </q-list> -->
          <!-- </div> -->
        </div>
        <!-- <div class="column">
          <q-date class="q-mt-sm" v-model="dateToShow" />
        </div> -->
      </div>
      <q-inner-loading
          :showing="isLoadingUser"
          color="primary"
        />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import CardInfo from "../components/CardInfo.vue";
import { LocalStorage, useQuasar, date } from 'quasar';
import { positiveMessage, negativeMessage } from "../composable/light-notify";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export default defineComponent({
  name: "PageIndex",
  components: { CardInfo },
  setup() {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    dayjs.tz.setDefault("Asia/Tokyo");

    const $store = useStore();
    const $router = useRouter();
    const dateToShow = ref(getTodayDate());
    const statetenant = ref('');
    const cardData = ref([]);
    const rows = ref([]);
    const avatar = ref([]);
    let rowstime1 = ref([]);
    let rowstime2 = ref([]);
    const UserID = ref('');
    const TenantID = ref('');

    const isLoadingUser = ref(false);
    const showSimulatedReturnData = ref(false);


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
        statetenant.value = LocalStorage.getItem("stateTenant")
        console.log(statetenant.value)
        TenantID.value = statetenant.value.id;
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
      //檀家数
      try{
        console.log(TenantID.value)
        await $store.dispatch("contactsModule/readTenantBooks", {
          user_id: UserID.value,
          tenantmaster_id: statetenant.value.tenantmaster_id
        });
        rows.value = $store.state.contactsModule.Contacts;
        console.log("今ここです",rows.value);
        await $store.dispatch("booksModule/readProfile", {
          id: 8,
        });
        const tenantProfile = $store.state.booksModule.tenantProfile;
        for (let i=0; i<rows.value.length; i++){
          // if(UserID.value == rows.value[i].user_id){
          //   avatar.value[i] = ""
          // }else{
          //   await $store.dispatch("booksModule/readProfile", {
          //     id: rows.value[i].user_id,
          //   });
          //   const tenantProfile = $store.state.booksModule.representative;
          //   avatar.value[i] = tenantProfile[0].avatar
          // }
          avatar.value[i] = tenantProfile[0].avatar
          let times = dayjs(rows.value[i].updated_at).tz().format();
          // var strs1 = times.split('T');
          // var strs2 = strs1[1].split('.');
          rowstime1.value[i] = dayjs(times).format('YYYY/MM/DD');
          rowstime2.value[i] = dayjs(times).format('HH:mm');
          console.log("body",dayjs(times).format('HH:mm'))

          // console.log(rowstime.value[i])
          // console.log(rows.value[i])
        }
        await $store.dispatch("dankaModule/readDanka", {
          TenantID:  TenantID.value
        });
        const dankameta = $store.state.dankaModule.DankaData.meta;
        console.log(dankameta)
        const dankatotal = dankameta.total;

        //新着問合わせ
        
        await $store.dispatch("todoModule/readTasks",{data:TenantID.value});
        //完了法務数
        const taskdone = $store.state.todoModule.items.done;
        const donetotal = taskdone.length;
        
        //予約数
        const todoColor = $store.state.todoModule.items.todoColor;
        const inProgressColor = $store.state.todoModule.items.inProgressColor;
        const reservetotal = todoColor.length + inProgressColor.length;

        cardData.value = [
          {
            icon: "face",
            amount: dankatotal,
            // amount: 711,
            name: "檀家数",
            link: 'system/DankaList2'
          },
          {
            icon: "notifications",
            amount: rows.value.length,
            name: "新着問い合わせ",
            link: 'system/#newInquiry'
          },
          {
            icon: "calendar_month",
            amount: reservetotal,
            name: "予約数",
            link: 'system/vuecal'
          },
          {
            icon: "assignment_turned_in",
            amount: donetotal,
            name: "完了寺務数",
            link: 'system/kanban'
          }

        ];
        isLoadingUser.value = false;
        showSimulatedReturnData.value = true;
      }catch (e) {
        negativeMessage("Error", "データの読み込み中にエラーが発生しました");
        isLoadingUser.value = false;
        showSimulatedReturnData.value = true;
      }
    })();

    function getTodayDate() {
      const currentTime = Date.now();
      const formattedTime = date.formatDate(currentTime, "YYYY/MM/DD");
      return formattedTime;
    }

    const onDelete = async (data) => {
      try{
        await $store.dispatch("contactsModule/deleteBook", {
          id: data.id, 
          ReadUserID: UserID.value
        });
        positiveMessage("データ編集", "リソースが変更されました");
      } catch (error) {
        negativeMessage("Error", "リソースの変更中にエラーが発生しました");
      }
    }

    return {
      rows,
      avatar,
      rowstime1,
      rowstime2,
      cardData,
      statetenant,
      dateToShow,
      isLoadingUser,
      showSimulatedReturnData,
      UserID,
      TenantID,
      onDelete,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 3840px;
}

@media screen and (max-width: 790px) {
  .row {
    justify-content: center;
  }
  .row-card {
    justify-content: center;
    flex-wrap: wrap;
  }

}
@media screen and (max-width: 480px) {
  .my-card[data-v-4e104d0e],
  .my-card[data-v-39ee2b3a]{
    min-width:150px;
    max-width:150px;
  }

}

</style>
