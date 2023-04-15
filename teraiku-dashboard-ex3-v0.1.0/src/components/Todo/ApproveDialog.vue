<template>
<!-- 受付ボタン -->
<q-btn
  v-if="item.request_id == '2'"
  dense
  label="面談"
  color="red"
  class="text-capitalize bg-info "
  @click="InterviewDialog = true;inputDescription = item.description"
/>

<q-btn
  v-if="item.request_id == '3'"
  dense
  label="承認"
  color='#6495ed'
  class="text-capitalize bg-info "
  @click="ApprovalDialog = true;inputDescription = item.description"
/>

<!-- 編集ボタン -->
<q-btn flat class="col-1" @click="openEditDialog(item)">
  <q-icon name="create" size="xm" color="primary" class="action-button" />
</q-btn>

  <q-dialog v-model="InterviewDialog" persistent>
    <q-card>
      <q-card-section class="">
        <div class="text-h6" style="height: 36px">{{ item.title}}の面談について</div>
      </q-card-section>
      <q-card-section class="row items-center">
        <span class="text-h6">
          <span class="text-weight-bold">{{ start_date }} ~ {{ end_date }}</span>
          <br>に面談を希望しています。承認しますか?
        </span>
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="キャンセル" color="primary" v-close-popup />
        <q-btn
          flat
          label="承認しない"
          @click="NoApprove(item)"
        />
        <q-btn
          flat
          label="承認する"
          @click="Approve(item)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- 入檀、入信申請について -->
  <q-dialog v-model="ApprovalDialog" persistent>
    <q-card>
      <q-card-section class="">
        <div class="text-h6" style="height: 36px">{{ item.title}}の承認設定について</div>
      </q-card-section>
      <q-card-section class="row items-center">
        <span class="text-h6">{{item.type}}希望しています。承認しますか?
        </span>
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="キャンセル" color="primary" v-close-popup />
        <q-btn
          flat
          label="承認しない"
          @click="NoJoin(item)"
        />
        <q-btn
          flat
          label="承認する"
          @click="Join(item)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- タスク編集 -->
  <q-dialog v-model="isDialogOpen" persistent>
    <q-card style="">
      <q-form @submit="onSubmit" class="q-gutter-mdt">
        <q-card-section>
          <div class="row justify-between">
            <div class="col-xs-8 col-sm-10 col-md-10">
              <div class="text-h6" style="height: 36px">タスクを編集</div>
            </div>
            <div class="col-xs-4 col-sm-2 col-md-2">
              <q-btn
                color="red"
                label="削除"
                sytle="height:10px"
                @click="onDelete(resourceForUpdate.id)"
              />
            </div>
          </div>
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
          <q-input type="textarea" dense v-model="inputDescription" label="詳細" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input autogrow dense v-model="inputPlace" label="場所を追加" />
        </q-card-section>

        <div class="row justify-between">
          <div class="col-xs-12 col-sm-6 col-md-6">
            <q-card-section class="q-pt-none">
              <q-select filled v-model="inputTagoptions" :options="tag1" label="タグ" />
            </q-card-section>
          </div>

          <div class="col-xs-12 col-sm-6 col-md-6">
            <q-card-section class="q-pt-none">
              <q-select filled v-model="inputColor" :options="tag2" label="タグの色" />
            </q-card-section>
          </div>
        </div>

        <div class="row justify-between">
          <div class="col-xs-12 col-sm-6 col-md-6">
            <q-card-section class="q-pt-none">
              <div >開始時刻</div>
              <q-input filled v-model="inputStartDate">
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="inputStartDate" mask="YYYY/MM/DD HH:mm">
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
                      <q-time v-model="inputStartDate" mask="YYYY/MM/DD HH:mm" format24h>
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
          <div class="col-xs-12 col-sm-6 col-md-6">
            <q-card-section class="q-pt-none">
              <div >終了時刻</div>
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
          <q-btn flat label="編集完了" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { date,LocalStorage } from "quasar";
import { positiveMessage, negativeMessage } from "src/composable/light-notify";

export default {
  name: "IndexPages",
  props: ["item", "backcolor", "start_date", "end_date"],

  setup(props) {
    const $store = useStore();
    let isDialogOpen = ref(false);
    let InterviewDialog = ref(false);
    let ApprovalDialog = ref(false);

    let tasks = ref();
    let inputTitle = ref();
    let inputDescription = ref();
    let inputPlace = ref();
    let inputColor = ref();
    let inputStartDate = ref();
    let inputEndDate = ref();
    let inputTagoptions = ref();
    let inputRepetition = ref();
    let resourceForUpdate = ref({});
    let tag1 = ["法要(本堂)", "出張", "通夜", "葬儀", "祈祷", "相談受付", "寺務", "私事"];
    let tag2 =  [   {
                      "label":"赤色",
                      "color":"red"
                    },
                    {
                      "label":"青色",
                      "color":"blue"
                    },
                    {
                      "label":"緑色",
                      "color":"green"
                    },
                    {
                      "label":"紫色",
                      "color":"purple"
                    },       
                    {
                      "label":"橙色",
                      "color":"orange"
                    }
                ];

    let Tenant = ref('')

    
    // 面談承認しない
    const NoApprove = async(data) => {
      try {
        
        console.log(data);
        // ユーザーのプロフィールIDを検索する
        await $store.dispatch("booksModule/readProfile", {id: data.user_id});
        const Profile = $store.state.booksModule.profile;
        console.log(Profile[0])

        //寺院の情報を検索する
        await $store.dispatch("authModule/TenantsInformation",{
          TenantID: data.tenant_id,
        });
        Tenant.value = $store.state.authModule.tenant
        console.log(Tenant.value)

        //申請中のてらいくメンバーを一般てらいく会員にする
        // await $store.dispatch("booksModule/updateBook", {
        //     TenantID: Tenant.value.id,
        //     id: Profile[0].id,
        //     type: "てらいく会員",
        //   }); 
        await $store.dispatch("booksModule/readTaskTenant", {
          tenantmaster_id: Tenant.value.tenantmaster_id,
          user_id: data.user_id,
          status: data.type +"申請中",
        });
        const TenantTask = $store.state.booksModule.dataTaskLists;
        console.log(TenantTask)
        if(TenantTask[0]){
          await $store.dispatch("booksModule/updateTaskTenant", {
            user_id: data.user_id,
            tenant_id: TenantTask[0].id,
            status: data.type +"辞退",
            updated_by: Profile[0].last_name + Profile[0].first_name,
          });
        }

        const InterviewDate = date.formatDate(data.start_date,'YYYY年MM月DD日HH時');

        //檀家の面談キャンセルのお知らせ送信
        await $store.dispatch("contactsModule/createPost", {
          id: data.user_id,
          title: "["+Tenant.value.corporation+"]への"+data.type+"希望が承認されませんでした",
          body: "申し訳ございません。"+InterviewDate+"に希望していた面談を行うことができません。もう一度"+data.type+"申請フォームを入力するか、"+Tenant.value.corporation+"からのメッセージがあるまでしばしお待ち下さい。",
          tenant_id: data.tenant_id,
          updated_by: Profile[0].last_name + Profile[0].first_name,
          request_id: data.user_id,
          from_name: Profile[0].last_name + Profile[0].first_name,
          description: data.type+"申請キャンセル",
          meta: "{data: 'JSON\u30c7\u30fc\u30bf'}",
        });

        //task削除
        const id = data.id
        await $store.dispatch("todoModule/deleteTask", { id });

        await $store.dispatch("todoModule/readTasks",{data:Tenant.value.id});
        // tasks.value = $store.state.todoModule.tasks.data;
        positiveMessage("生成", data.type+"申請のキャンセル処理が成功しました");
        InterviewDialog.value = false;
        ApprovalDialog = false;
      } catch (error) {
        console.log(error);
        negativeMessage("Error", data.type+"申請のキャンセル処理に失敗しました");
      }
    }

    // 面談承認する
    const Approve = async(data) => {
      try {
        
        console.log(data);
        // ユーザーのプロフィールIDを検索する
        await $store.dispatch("booksModule/readProfile", {id: data.user_id});
        const Profile = $store.state.booksModule.profile;
        console.log(Profile[0])

        //寺院の情報を検索する
        await $store.dispatch("authModule/TenantsInformation",{
          TenantID: data.tenant_id,
        });
        Tenant.value = $store.state.authModule.tenant
        console.log(Tenant.value)

        //申請中のてらいくメンバーを一般てらいく会員にする
        // await $store.dispatch("booksModule/updateBook", {
        //     TenantID: Tenant.value.id,
        //     id: Profile[0].id,
        //     kind: "入檀申請中",
        //   });
        
        const InterviewDate = date.formatDate(data.start_date,'YYYY年MM月DD日HH時');

        //檀家の面談のお知らせ送信
        await $store.dispatch("contactsModule/createPost", {

          id: data.user_id,
          tenant_id: data.tenant_id,
          updated_by: Profile[0].last_name + Profile[0].first_name,
          request_id: data.user_id,
          from_name: Profile[0].last_name + Profile[0].first_name,
          description: "申請承認",
          title: "["+Tenant.value.corporation+"]への"+data.type+"希望が承認されました",
          body: "無事"+data.type+"申請の受け付けが完了いたしました。つきましては"+InterviewDate+"に"+Tenant.value.corporation+"までお越しください。よろしくお願いします。",
          meta: "{data: 'JSON\u30c7\u30fc\u30bf'}",
        });

        //task更新
        await $store.dispatch("todoModule/updateTask", {
          id: data.id,
          request_id: 3,
          status: "inProgress",
        });

        await $store.dispatch("todoModule/readTasks",{data:Tenant.value.id});
        // tasks.value = $store.state.todoModule.tasks.data;
        positiveMessage("生成", "面談キャンセル処理が成功しました");
        InterviewDialog.value = false;
        ApprovalDialog = false;
      } catch (error) {
        console.log(error);
        negativeMessage("Error", "面談キャンセル処理が失敗しました");
      }
    }

    // 入檀、入信承認しない
    const NoJoin = async(data) => {
      try{
        console.log(data)
        // ユーザーのプロフィールIDを検索する
        await $store.dispatch("booksModule/readProfile", {id: data.user_id});
        const Profile = $store.state.booksModule.profile;
        console.log(Profile[0])

        //寺院の情報を検索する
        await $store.dispatch("authModule/TenantsInformation",{
          TenantID: data.tenant_id,
        });
        Tenant.value = $store.state.authModule.tenant
        console.log(Tenant.value)

        await $store.dispatch("booksModule/updateBook", {
          TenantID: data.tenant_id,
          id: Profile[0].id,
          kind: "",
          type:"てらいく個人会員",
        });
        await $store.dispatch("dankaModule/readBooks", {
          TenantID: data.tenant_id,
          ReadID: Profile[0].id,
        });
        console.log("userID取れるはずです")
        const families = $store.state.dankaModule.families.data;
        console.log(families[0])
        console.log(Tenant.value.corporation)

        //お知らせ送信
        await $store.dispatch("contactsModule/createPost", {
          id: data.user_id,
          tenant_id: data.tenant_id,
          updated_by: Profile[0].last_name+Profile[0].first_name,
          request_id: families[0].id,
          from_name: Profile[0].last_name+Profile[0].first_name,
          title: "["+Tenant.value.corporation+"]の"+ data.type +"はキャンセルされました",
          description: "申請キャンセル",
          body: "申し訳ございません。"+Profile[0].last_name+Profile[0].first_name+"様の"+data.type+"が承認されませんでした。",
          meta: "{data: 'JSON\u30c7\u30fc\u30bf'}",
        });
        
        
        //task更新
        const id = data.id
        await $store.dispatch("todoModule/deleteTask", { id });

        await $store.dispatch("todoModule/readTasks",{data:Tenant.value.id});
        ApprovalDialog.value = false;
        positiveMessage("OK", "キャンセル処理に成功しました");
      } catch (e) {
        console.log(e)
        negativeMessage("Error", "キャンセル処理のエラーが発生しました");
      }
    }

    // 入檀、入信承認する
    const Join = async(data) => {
      switch(data.type) {
        case '入檀':
          try{
            console.log(data)
            // ユーザーのプロフィールIDを検索する
            await $store.dispatch("booksModule/readProfile", {id: data.user_id});
            const Profile = $store.state.booksModule.profile;
            console.log(Profile[0])

            //寺院の情報を検索する
            await $store.dispatch("authModule/TenantsInformation",{
              TenantID: data.tenant_id,
            });
            Tenant.value = $store.state.authModule.tenant
            console.log(Tenant.value)

            await $store.dispatch("booksModule/updateBook", {
              TenantID: data.tenant_id,
              id: Profile[0].id,
              kind: "",
              type:"檀家",
              representative: "代表者",
            });
            await $store.dispatch("dankaModule/readBooks", {
              TenantID: data.tenant_id,
              ReadID: Profile[0].id,
            });
            console.log("userID取れるはずです")
            const families = $store.state.dankaModule.families.data;
            console.log(families[0])
            console.log(Tenant.value.corporation)

             // tenantsを書き換える処理
              await $store.dispatch("booksModule/readTaskTenant", {
                tenantmaster_id: Tenant.value.tenantmaster_id,
                user_id: families[0].id,
                status: "入檀申請中",
              });
              const TenantTask = $store.state.booksModule.dataTaskLists;
              console.log(TenantTask)
              if(TenantTask[0]){
                await $store.dispatch("booksModule/updateTaskTenant", {
                  user_id: families[0].id,
                  tenant_id: TenantTask[0].id,
                  status: "檀家契約完了",
                  updated_by: Profile[0].last_name+Profile[0].first_name,
                });
              }

            //お知らせ送信
            await $store.dispatch("contactsModule/createPost", {
              id: data.user_id,
              tenant_id: data.tenant_id,
              updated_by: Profile[0].last_name+Profile[0].first_name,
              request_id: families[0].id,
              from_name: Profile[0].last_name+Profile[0].first_name,
              title: "["+Tenant.value.corporation+"]の檀家になりました",
              description: "入檀承認",
              body: Tenant.value.corporation + "へのトークはトークルームからお願いします。これから檀家としてよろしくお願いします。",
              meta: "{data: 'JSON\u30c7\u30fc\u30bf'}",
            });
            
            //トークルーム
            const user = $store.state.authModule.users
            const statetenant = LocalStorage.getItem("stateTenant")
            const TenantID = statetenant.id;

            await $store.dispatch("roomModule/createRoom", {
              name: Profile[0].last_name+Profile[0].first_name,
              owner_id:TenantID,
              owner_name:user.name,
              visitor_name: Profile[0].last_name+Profile[0].first_name,
              avatar: "https://api2.teraiku.jp/svg/login-avatar.svg",
            });
            await $store.dispatch("authModule/userAccessToken");
            const Rooms = $store.state.authModule.users.rooms;
            console.log(Rooms)
            const room = Rooms[Rooms.length - 1]
            console.log(room)
            
            await $store.dispatch("roomModule/createRoomUser", {
              room_id: room.id,
              user_id: families[0].id,
            });
            //task更新
            await $store.dispatch("todoModule/updateTask", {
              id: data.id,
              request_id: 1,
              status: "done",
            });

            await $store.dispatch("todoModule/readTasks",{data:Tenant.value.id});
            ApprovalDialog.value = false;
            positiveMessage("OK", "入檀処理に成功しました");
          } catch (e) {
            console.log(e)
            negativeMessage("Error", "入檀処理のエラーが発生しました");
          }
          break;
        case '入信':
          try{
            console.log(data)
            // ユーザーのプロフィールIDを検索する
            await $store.dispatch("booksModule/readProfile", {id: data.user_id});
            const Profile = $store.state.booksModule.profile;
            console.log(Profile[0])

            //寺院の情報を検索する
            await $store.dispatch("authModule/TenantsInformation",{
              TenantID: data.tenant_id,
            });
            Tenant.value = $store.state.authModule.tenant
            console.log(Tenant.value)

            await $store.dispatch("booksModule/updateBook", {
              TenantID: data.tenant_id,
              id: Profile[0].id,
              kind: "",
              type:"信者",
              representative: "代表者",
            });
            await $store.dispatch("dankaModule/readBooks", {
              TenantID: data.tenant_id,
              ReadID: Profile[0].id,
            });
            
            console.log("userID取れるはずです")
            const families = $store.state.dankaModule.families.data;
            console.log(families[0])
            console.log(Tenant.value.corporation)

            // tenantsを書き換える処理
              await $store.dispatch("booksModule/readTaskTenant", {
                tenantmaster_id: Tenant.value.tenantmaster_id,
                user_id: families[0].id,
                status: "入信申請中",
              });
              const TenantTask = $store.state.booksModule.dataTaskLists;
              console.log(TenantTask)
              if(TenantTask[0]){
                await $store.dispatch("booksModule/updateTaskTenant", {
                  user_id: families[0].id,
                  tenant_id: TenantTask[0].id,
                  status: "信者契約完了",
                  updated_by: Profile[0].last_name+Profile[0].first_name,
                });
              }
            // ここまで

              //お知らせ送信
            await $store.dispatch("contactsModule/createPost", {
              id: data.user_id,
              tenant_id: data.tenant_id,
              updated_by: Profile[0].last_name+Profile[0].first_name,
              request_id: families[0].id,
              from_name: Profile[0].last_name+Profile[0].first_name,
              description: "入信承認",
              title:"["+Tenant.value.corporation+"]の信者になりました",
              body: Tenant.value.corporation + "へのトークはトークルームからお願いします。これから信者としてよろしくお願いします。",
              meta: "{data: 'JSON\u30c7\u30fc\u30bf'}",
            });

            //トークルーム
            const user = $store.state.authModule.users
            const statetenant = LocalStorage.getItem("stateTenant")
            const TenantID = statetenant.id;

            await $store.dispatch("roomModule/createRoom", {
              name: Profile[0].last_name+Profile[0].first_name,
              owner_id:TenantID,
              owner_name:user.name,
              visitor_name: Profile[0].last_name+Profile[0].first_name,
              avatar: "https://api2.teraiku.jp/svg/login-avatar.svg",
            });
            await $store.dispatch("authModule/userAccessToken");
            const Rooms = $store.state.authModule.users.rooms;
            console.log(Rooms)
            const room = Rooms[Rooms.length - 1]
            console.log(room)
            
            await $store.dispatch("roomModule/createRoomUser", {
              room_id: room.id,
              user_id: families[0].id,
            });

            //task更新
            await $store.dispatch("todoModule/updateTask", {
              id: data.id,
              request_id: 1,
              status: "done",
            });
            await $store.dispatch("todoModule/readTasks",{data:Tenant.value.id});

            ApprovalDialog.value = false;
            positiveMessage("OK", "入信処理に成功しました");
          } catch (e) {
            console.log(e)
            negativeMessage("Error", "入信処理のエラーが発生しました");
          }
          break;
        case '法事':
          try{
            console.log(data)
            // ユーザーのプロフィールIDを検索する
            await $store.dispatch("booksModule/readProfile", {id: data.user_id});
            const Profile = $store.state.booksModule.profile;
            console.log(Profile[0])

            //寺院の情報を検索する
            await $store.dispatch("authModule/TenantsInformation",{
              TenantID: data.tenant_id,
            });
            Tenant.value = $store.state.authModule.tenant
            console.log(Tenant.value)

            // await $store.dispatch("booksModule/updateBook", {
            //   TenantID: data.tenant_id,
            //   id: Profile[0].id,
            //   kind: "",
            //   type:"信者",
            //   representative: "代表者",
            // });
            // await $store.dispatch("dankaModule/readBooks", {
            //   TenantID: data.tenant_id,
            //   ReadID: Profile[0].id,
            // });
            
            console.log("userID取れるはずです")
            const families = $store.state.dankaModule.families.data;
            console.log(families[0])
            console.log(Tenant.value.corporation)

            // tenantsを書き換える処理
              await $store.dispatch("booksModule/readTaskTenant", {
                tenantmaster_id: Tenant.value.tenantmaster_id,
                user_id: families[0].id,
                status: "法事申請中",
              });
              const TenantTask = $store.state.booksModule.dataTaskLists;
              console.log(TenantTask)
              if(TenantTask[0]){
                await $store.dispatch("booksModule/updateTaskTenant", {
                  user_id: families[0].id,
                  tenant_id: TenantTask[0].id,
                  status: "法事契約完了",
                  updated_by: Profile[0].last_name+Profile[0].first_name,
                });
              }
            
            const InterviewDate = date.formatDate(data.start_date,'YYYY年MM月DD日HH時');

              //お知らせ送信
            await $store.dispatch("contactsModule/createPost", {
              id: data.user_id,
              tenant_id: data.tenant_id,
              updated_by: Profile[0].last_name+Profile[0].first_name,
              request_id: families[0].id,
              from_name: Profile[0].last_name+Profile[0].first_name,
              description: "法事承認",
              title:"["+Tenant.value.corporation+"]の法事の予約が承認されました",
              body: "つきましては"+Tenant.value.corporation + "へ"+InterviewDate+"にお越しください。お待ちしております",
              meta: "{data: 'JSON\u30c7\u30fc\u30bf'}",

            });


            //task更新
            await $store.dispatch("todoModule/updateTask", {
              id: data.id,
              request_id: 1,
              status: "inProgress",
            });
            await $store.dispatch("todoModule/readTasks",{data:Tenant.value.id});

            ApprovalDialog.value = false;
            positiveMessage("OK", "入信処理に成功しました");
          } catch (e) {
            console.log(e)
            negativeMessage("Error", "入信処理のエラーが発生しました");
          }
          break;
        }
    }


    const openEditDialog = async(data) => {
      console.log("data見ます",data);
      isDialogOpen.value = !isDialogOpen.value;
      if (data) {
        // 寺院の情報を検索する
        await $store.dispatch("authModule/TenantsInformation",{
          TenantID: data.tenant_id,
        });
        Tenant.value = $store.state.authModule.tenant

        inputTitle.value = data.title;
        inputDescription.value = data.description;
        inputPlace.value = data.place;
        inputColor.value = data.tagcolor;
        inputStartDate.value = date.formatDate(data.start_date,'YYYY/MM/DD HH:mm');
        inputEndDate.value = date.formatDate(data.end_date,'YYYY/MM/DD HH:mm');
        inputTagoptions.value = data.type;
        resourceForUpdate.value = data;
        return;
      }
    };

    const onSubmit = async () => {
      try {
        await $store.dispatch("todoModule/updateTask", {
          id: resourceForUpdate.value.id,
          title: inputTitle.value,
          description: inputDescription.value,
          place: inputPlace.value,
          tagcolor: inputColor.value.color,
          start_date: inputStartDate.value,
          end_date: inputEndDate.value,
          type: inputTagoptions.value,
        });
        positiveMessage("Creacion", "タスクが更新されました");
        isDialogOpen.value = false;
        await $store.dispatch("todoModule/readTasks",{data:Tenant.value.id});
        tasks.value = $store.state.todoModule.tasks.data;
      } catch (error) {
        console.log(error);
        negativeMessage("Error", "タスク更新にエラーが発生しました");
      }
    };

    const onDelete = async (id) => {
      try {
        console.log(id);
        await $store.dispatch("todoModule/deleteTask", { id });
        positiveMessage("タスク削除", "タスクが削除されました");
        isDialogOpen.value = false;
        await $store.dispatch("todoModule/readTasks",{data:Tenant.value.id});
        tasks.value = $store.state.todoModule.tasks.data;
      } catch (error) {
        console.log(error);
        negativeMessage("Error", "タスクの削除に失敗しました");
      }
    };

    const onCancel = () => {
      isDialogOpen.value = !isDialogOpen.value;
    };

    return {
      Tenant,
      inputTitle,
      inputDescription,
      inputPlace,
      inputColor,
      inputStartDate,
      inputEndDate,
      inputTagoptions,
      inputRepetition,
      resourceForUpdate,

      tag1,
      tag2,

      onCancel,
      onSubmit,
      onDelete,

      Approve,
      NoApprove,
      NoJoin,
      Join,
      openEditDialog,
      InterviewDialog,
      ApprovalDialog,
      isDialogOpen,
    };
  },
};
</script>
