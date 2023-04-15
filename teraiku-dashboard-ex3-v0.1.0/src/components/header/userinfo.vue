<template>
  <div class="q-pa-md" style="max-width: auto">
    <q-list style="width: auto">
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img :src="avatar" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label lines="1">
            <div class="text-h6">{{user}}</div>
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />
      <!-- <q-item to="/system" clickable v-ripple v-close-popup>
        <q-item-section avatar>
          <q-icon name=""></q-icon>
        </q-item-section>
        <q-item-section>
          <q-item-label lines="1">
            {{tenant}}
          </q-item-label>
        </q-item-section>
      </q-item> -->

      <q-item to="/system/myprofile" clickable v-ripple v-close-popup>
        <q-item-section avatar>
          <q-icon name="mdi-account"></q-icon>
        </q-item-section>
        <q-item-section>
          <q-item-label lines="1">
            マイアカウント
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-expansion-item
        icon="published_with_changes"
        label="管理対象の変更"
        v-if="tenant.length > 1"
      >
        <q-list v-for="i in tenant.length" :key="i">
          <q-item 
            clickable 
            v-ripple 
            v-close-popup 
            @click="submitTenant(tenant[i-1])"
            active-class="item-active"
            exact
          >
            <q-item-section avatar v-if="tenant[i-1].corporation == stateTenant">
              <q-icon name="done"></q-icon>
            </q-item-section>
            <q-item-section avatar v-else>
              <q-icon></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{tenant[i-1].corporation}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>

      <!-- <q-item to=/system/#newInquiry clickable v-ripple v-close-popup>
        <q-item-section avatar>
          <q-icon name="mdi-bell"></q-icon>
        </q-item-section>
        <q-item-section>
          <q-item-label lines="1">
            通知
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-badge color="red" label="2" />
        </q-item-section>
      </q-item>-->

      <q-item @click="onSubmit" clickable v-ripple v-close-popup>
        <q-item-section avatar>
          <q-icon name="mdi-logout"></q-icon>
        </q-item-section>
        <q-item-section>
          <q-item-label lines="1">
            ログアウト
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    
    <q-item-label lines="1">
            version: 0.4.7　　2023/02/12
          </q-item-label>

    

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
  props:['user','tenant', 'stateTenant', 'avatar'],
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const $router = useRouter();


    // const username = LocalStorage.getItem('userName');

    async function onSubmit() {
      $q.loading.show()
      console.log('Before Logout')
      
      try {
        await $store.dispatch("authModule/logout");
         
         positiveMessage("OK", "ログアウト成功: ログイン画面に移動します");
        $router.replace("/login");
        $q.loading.hide()
      } catch (e) {
        if(e.response.status === 401) {
          $router.replace("/login");
          $q.loading.hide()
          await $store.dispatch("authModule/logoutError");
          return;
        }
        $q.loading.hide()
        negativeMessage("Error", `ログアウト失敗: ログアウトエラーが発生しました: ${e.message}`);
      }
    }

    async function submitTenant(Tenants) {
      console.log(Tenants)
      await $store.dispatch("authModule/TenantsChange", Tenants);
      console.log(LocalStorage.getItem("stateTenant"))
      $router.go({name: "System", force: true});
    }

    return {
      onSubmit,
      submitTenant,
    };
  },
};
</script>

<style lang="scss" scoped>
.ellipsis {
  overflow:none
}
</style>
