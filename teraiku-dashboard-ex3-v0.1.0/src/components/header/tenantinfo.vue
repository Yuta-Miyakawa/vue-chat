<template>
  <div class="q-pa-md" style="max-width: auto">
    <q-list style="width: auto">
      <q-item style="font-size: 15px">
        <q-item-section>
          <q-item-label lines="1">
            <!-- font-sizeが働いていないです -->
            お寺を選択してください
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />
      
      <q-item v-for="i in tenant.length" :key="i" clickable v-ripple v-close-popup @click="onSubmit(tenant[i-1])">
        <q-item-section>
          <q-item-label lines="1">
            {{tenant[i-1].corporation}}
          </q-item-label>
        </q-item-section>
      </q-item>

    </q-list>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { LocalStorage, useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { positiveMessage, negativeMessage } from "src/composable/light-notify";

export default {
  name: 'UserInfo',
  props:['tenant'],
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const $router = useRouter();


    // const username = LocalStorage.getItem('userName');

    async function onSubmit(Tenants) {
      console.log(Tenants)
      await $store.dispatch("authModule/TenantsChange", Tenants);
      console.log(LocalStorage.getItem("stateTenant"))
      $router.go({name: "System", force: true});
    }

    return {
      onSubmit,
    };
  },
};
</script>

<style lang="scss" scoped>
.ellipsis {
  overflow:none
}
</style>
