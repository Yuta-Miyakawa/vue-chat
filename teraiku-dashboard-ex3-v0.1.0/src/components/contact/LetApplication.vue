<template>
  <q-btn
    v-if="selected_contact.kind=='入檀申請中'&&information"
    class="create-button"
    color="red"
    label="入檀承認"
    @click="entranceDialog = true;SelectEditDialog='entrance'"
  />
  <q-btn
    v-if="selected_contact.kind=='入信申請中'&&information"
    class="create-button"
    color="red"
    label="入信承認"
    @click="incomingDialog = true;SelectEditDialog='incoming'"
  />

  <!-- 入檀 -->
  <q-dialog v-model="entranceDialog">
      <q-card>
      <q-card-section class="bg-accent text-white">
        <div class="text-h6">{{ selected_contact.last_name + selected_contact.first_name}}様の入檀処理</div>
      </q-card-section>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">
          <span class="text-weight-bold">{{ selected_contact.last_name + selected_contact.first_name}}様</span>
          を檀家に入檀させますか?
        </span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="キャンセル" color="primary" v-close-popup />
        <q-btn
          flat
          label="入檀"
          color="accent"
          @click="DankaAddition(selected_contact,SelectEditDialog)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- 入信 -->
  <q-dialog v-model="incomingDialog">
      <q-card>
      <q-card-section class="bg-accent text-white">
        <div class="text-h6">{{ selected_contact.last_name + selected_contact.first_name}}様の入信処理</div>
      </q-card-section>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">
          <span class="text-weight-bold">{{ selected_contact.last_name + selected_contact.first_name}}様</span>
          を檀家に入信させますか?
        </span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="キャンセル" color="primary" v-close-popup />
        <q-btn
          flat
          label="入信"
          color="accent"
          @click="DankaAddition(selected_contact,SelectEditDialog)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>  
</template>

<script>
import { defineComponent,ref} from 'vue';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { positiveMessage, negativeMessage } from "src/composable/light-notify";
import * as dayjs from "dayjs";

export default defineComponent({
    name: "ContactDelete",
    props: ['tenant_id','tenant','selected_contact','information'],
    emits: ['DeleteContact'],
    setup(props, context){
      const $store = useStore();
      const $router = useRouter();

      const entranceDialog = ref(false);
      const incomingDialog = ref(false)
      const SelectEditDialog = ref('');
      const family = ref([]);


      const DankaAddition = async(data = null,target) => {

          console.log(target)
          console.log(data)
          console.log(props)
           switch(target) {
            case 'entrance':
              try{
                await $store.dispatch("booksModule/updateBook", {
                  // id1:data.id,
                  // id2: props.tenant_id,
                  TenantID: props.tenant_id,
                  id: data.id,
                  kind: "",
                  type:"檀家",
                  representative: "代表者",
                });
                await $store.dispatch("dankaModule/readBooks", {
                  TenantID: props.tenant_id,
                  ReadID: data.id,
                });
                console.log("userID取れるはずです")
                family.value = $store.state.dankaModule.families.data;
                console.log(family.value[0])
                console.log(props.tenant)

                // tenantsを書き換える処理
                  await $store.dispatch("booksModule/readTaskTenant", {
                    tenantmaster_id: props.tenant.tenantmaster_id,
                    user_id: family.value[0].id,
                    status: "入檀申請中",
                  });
                  const TenantTask = $store.state.booksModule.dataTaskLists;
                  console.log(TenantTask)
                  if(TenantTask[0]){
                    await $store.dispatch("booksModule/updateTaskTenant", {
                      user_id: family.value[0].id,
                      tenant_id: TenantTask[0].id,
                      status: "檀家契約完了",
                      updated_by: data.last_name+data.first_name,
                    });
                  }
                // ここまで

                //お知らせ　出来てない
                await $store.dispatch("contactsModule/createPost", {
                  id: family.value[0].id,
                  tenant_id: props.tenant_id,
                  updated_by: data.last_name+data.first_name,
                  request_id: family.value[0].id,
                  from_name: data.last_name+data.first_name,
                  description: "入檀承認",
                  title:"["+props.tenant.corporation+"]の檀家になりました",
                  body: props.tenant.corporation + "へのトークはトークルームからお願いします。これから檀家としてよろしくお願いします。",
                  meta: "{data: 'JSON\u30c7\u30fc\u30bf'}",
                });

                const user = $store.state.authModule.users

                await $store.dispatch("roomModule/createRoom", {
                  name: data.last_name+data.first_name,
                  owner_id:props.tenant_id,
                  owner_name:user.name,
                  visitor_name: data.last_name+data.first_name,
                  avatar: "https://api2.teraiku.jp/svg/login-avatar.svg",
                });
                await $store.dispatch("authModule/userAccessToken");
                const Rooms = $store.state.authModule.users.rooms;
                console.log(Rooms)
                const room = Rooms[Rooms.length - 1]
                console.log(room)
                
                await $store.dispatch("roomModule/createRoomUser", {
                  room_id: room.id,
                  user_id: family.value[0].id,
                });
                entranceDialog.value = false;
                context.emit('CreateContact');
                positiveMessage("OK", "入檀処理に成功しました");
              } catch (e) {
                console.log(e)
                negativeMessage("Error", "入檀処理のエラーが発生しました");
              }
              break;
            case 'incoming':
              try{
                await $store.dispatch("booksModule/updateBook", {
                  TenantID: props.tenant_id,
                  id:data.id,
                  kind: "",
                  type:"信者",
                  representative: "代表者",
                });
                await $store.dispatch("dankaModule/readBooks", {
                  TenantID: props.tenant_id,
                  ReadID: data.id,
                });
                console.log("userID取れるはずです")
                family.value = $store.state.dankaModule.families.data;
                console.log(family.value[0])
                console.log(props.tenant.corporation)

                // tenantsを書き換える処理
                  await $store.dispatch("booksModule/readTaskTenant", {
                    tenantmaster_id: props.tenant.tenantmaster_id,
                    user_id: family.value[0].id,
                    status: "入信申請中",
                  });
                  const TenantTask = $store.state.booksModule.dataTaskLists;
                  console.log(TenantTask)
                  if(TenantTask[0]){
                    await $store.dispatch("booksModule/updateTaskTenant", {
                      user_id: family.value[0].id,
                      tenant_id: TenantTask[0].id,
                      status: "信者契約完了",
                      updated_by: data.last_name+data.first_name,
                    });
                  }
                // ここまで

                await $store.dispatch("contactsModule/createPost", {
                  id: family.value[0].id,
                  tenant_id: props.tenant_id,
                  updated_by: data.last_name+data.first_name,
                  request_id: family.value[0].id,
                  from_name: data.last_name+data.first_name,
                  description: "入信承認",
                  title:"["+props.tenant.corporation+"]の信者になりました",
                  body: props.tenant.corporation + "へのトークはトークルームからお願いします。これから信者としてよろしくお願いします。",
                  meta: "{data: 'JSON\u30c7\u30fc\u30bf'}",
                });
                await $store.dispatch("roomModule/createRoom", {
                  name: data.last_name+data.first_name,
                  owner_id:props.tenant_id,
                  owner_name:props.tenant.corporation,
                  visitor_name: data.last_name+data.first_name,
                  avatar: "https://api2.teraiku.jp/svg/login-avatar.svg",
                });
                await $store.dispatch("authModule/userAccessToken");
                const Rooms = $store.state.authModule.users.rooms;
                console.log(Rooms)
                const room = Rooms[Rooms.length - 1]
                console.log(room)
                
                await $store.dispatch("roomModule/createRoomUser", {
                  room_id: room.id,
                  user_id: family.value[0].id,
                });
                incomingDialog.value = false;
                context.emit('CreateContact');
                positiveMessage("OK", "入信処理に成功しました");
              } catch (e) {
                console.log(e)
                negativeMessage("Error", "入信処理のエラーが発生しました");
              }
              break;
           }
      }

    

      return{
        entranceDialog,
        incomingDialog,
        DankaAddition,
        SelectEditDialog,
        family,
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
</style>