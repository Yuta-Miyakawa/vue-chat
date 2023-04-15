<template>
  <q-item clickable>
    <q-item-section avatar>
      <q-avatar>
        <img :src="avatar">
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1">{{ name }}</q-item-label>
      <q-item-label caption lines="2">
        <span class="text-weight-bold">{{ position }}</span>
      </q-item-label>
      <q-item-label v-if="type" lines="3">
        <q-badge outline color="primary" :label="'次の'+type+'は'+label+'です'">
        </q-badge>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent,ref} from 'vue';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { positiveMessage, negativeMessage } from "src/composable/light-notify";
import * as dayjs from "dayjs";

export default defineComponent({
  name: "ContactItem",
  props: ['avatar', 'name', 'position', 'label', 'type'],
  setup(props, context) {
    const $store = useStore();
    const $router = useRouter();

    // (async function setupBooks() {
    //   try{
    //     await $store.dispatch("authModule/userAccessToken");
    //     const isTenant = $store.state.authModule.users.is_tenant;
    //     if (isTenant == false) {
    //       $router.replace("/login");
    //       await $store.dispatch("authModule/logoutError");
    //       negativeMessage("Error", "あなたはログインできないユーザーです");
    //       return;
    //     }
    //   }catch (e) {
    //     console.log(e.response)
    //     if(e.response.status === 401) {
    //       $router.replace("/login");
    //       await $store.dispatch("authModule/logoutError");
    //       negativeMessage("Error", "再度ログインしてください");
    //       isLoadingUser.value = false;
    //       showSimulatedReturnData.value = false;
    //       return;
    //     }
    //   }
    // });
    // return {

    // };
  },
})
</script>

<style scoped>

</style>
