<template>
<!-- &&contacts.is_user!==true -->
  <q-btn
    v-if="SelectEditDialog != 'rows'"
    round
    size="sm"
    class="q-mx-xs"
    color="red"
    icon="delete"
    @click="isDelete = true "
  >
    <q-tooltip class="bg-dark text-body2">削除</q-tooltip>
  </q-btn>


<q-dialog v-model="isDelete">
    <q-card>
    <q-card-section class="bg-accent text-white">
      <div class="text-h6">{{ contacts.last_name + contacts.first_name }}様の削除処理</div>
    </q-card-section>
    <q-card-section class="row items-center">
      <span class="q-ml-sm">
        <span class="text-weight-bold">{{ contacts.last_name + contacts.first_name }}様</span>
        を本当に削除しますか?
      </span>
    </q-card-section>
    <q-card-actions align="right">
      <q-btn flat label="キャンセル" color="primary" v-close-popup />
      <q-btn
        flat
        label="削除"
        color="accent"
        @click="DankaDelete(contacts,SelectEditDialog)"
      />
    </q-card-actions>
  </q-card>
</q-dialog>

</template>

<script>
import { defineComponent,ref} from 'vue';
import { LocalStorage, useQuasar, date } from 'quasar';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { positiveMessage, negativeMessage } from "src/composable/light-notify";
import * as dayjs from "dayjs";

export default defineComponent({
    name: "Dialog",
    props: ["id", "contacts", "SelectEditDialog"],
    emits: ['updateROWS', 'updateDANKA', 'deleteDANKA'],
    setup(props, context){
      const $store = useStore();
      const $router = useRouter();

      const TenantID = ref('');
      const family = ref([]);
      let isTenant = ref(false);
      let isDialogOpen = ref(false);

      let isDelete = ref(false);

     

      const DankaDelete = async (data,target) => {
        console.log(data)
        console.log(target)
        console.log(props)
        const stateTenant = LocalStorage.getItem("stateTenant")
        TenantID.value = stateTenant.id
        console.log(TenantID.value)
        await $store.dispatch("dankaModule/readBooks", {
          TenantID: TenantID.value,
          ReadID: props.contacts.id,
        });
        
        family.value = $store.state.dankaModule.families.data;
        console.log(family.value,"userID取れるはずです")
        switch(target) {
          case 'contactLists':
            try{
              await $store.dispatch("booksModule/deleteBook", {
                id: data.id,
                TenantID: TenantID.value,
              });
              isDelete.value = false;
              positiveMessage("Creacion", "コンタクトリストが削除されました");
              context.emit('deleteDANKA');
            } catch (e) {
              console.log(e)
              negativeMessage("Error", "コンタクトリスト削除中にエラーが発生しました");
             isDelete.value = false;
            }
          break;
          case 'currentContacts':
          case 'pastbooksContact':
            try{
              await $store.dispatch("currentModule/deleteBook", {
                ReadID: data.id,
                pageID: family.value[0].id,
              });
              isDelete.value = false;
              positiveMessage("Creacion", "詳細情報が削除されました");
              context.emit('deleteDANKA');
            } catch (e) {
              console.log(e)
              negativeMessage("Error", "詳細情報の削除中にエラーが発生しました");
              isDelete.value = false;
            }
          break;
        }
      };


      return{
       
        DankaDelete,
        isDelete,

        
        TenantID,
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