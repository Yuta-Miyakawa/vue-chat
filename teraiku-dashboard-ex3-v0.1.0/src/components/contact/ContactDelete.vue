<template>
  <q-btn
    v-if="!contacts.is_user && (checkFlag==='Contact' || !contacts.is_alive )"
    round
    size="sm"
    class="q-mx-xs"
    color="red"
    icon="delete"
    @click="isDelete = true "
  >
    <q-tooltip>削除</q-tooltip>
  </q-btn>

  <q-dialog v-model="isDelete">
      <q-card>
      <q-card-section class="bg-accent text-white">
        <div class="text-h6">{{ contacts.last_name + contacts.first_name }}様の削除処理{{id}}</div>
      </q-card-section>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">
          <span class="text-weight-bold">{{ contacts.last_name + contacts.first_name }}様</span>
          の情報を本当に削除しますか?
        </span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="キャンセル" color="primary" v-close-popup />
        <q-btn
          flat
          label="削除"
          color="accent"
          @click="DankaDelete(contacts)"
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
    props: ['id', 'user_id', 'contacts', 'checkFlag'],
    emits: ['DeleteContact'],
    setup(props, context){
      const $store = useStore();
      const $router = useRouter();
    
      let isDelete = ref(false);

      const DankaDelete = async (data) => {
        console.log(data)
        console.log(props)
        try{
          if(props.contacts.is_user){
            console.log("detachします")
            await $store.dispatch("booksModule/deleteBook", {
              TenantID: props.id,
              id: data.id,
            });
            positiveMessage("Creacion", "データの消去が完了しました。");
            context.emit('DeleteContact');
            isDelete.value = false;
          }else{
            if(!props.user_id){
              console.log("deleteします in ContactList")
              await $store.dispatch("booksModule/deleteContactBook", {
                TenantID: props.id,
                id: data.id,
              });
              positiveMessage("Creacion", "データの消去が完了しました。");
              context.emit('DeleteContact');
              isDelete.value = false;
            }else{
              console.log("deleteします in DankaList")
              await $store.dispatch("currentModule/deleteBook", {
                pageID: props.user_id,
                ReadID: data.id,
              });
              positiveMessage("Creacion", "データの消去が完了しました。");
              context.emit('DeleteContact');
              isDelete.value = false;
            }
          }
        } catch (e) {
          console.log(e)
          negativeMessage("Error", "詳細情報の読み込み中にエラーが発生しました");
          isDelete.value = false;
        }
      };

      return{
        DankaDelete,
        isDelete,
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