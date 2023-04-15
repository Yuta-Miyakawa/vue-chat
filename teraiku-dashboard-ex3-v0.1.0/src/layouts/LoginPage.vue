<template>
  <div
    class="
      q-ma-sm q-pa-md
      window-width window-height
      flex
      justify-center
      items-center
      bg-gray-2
    "
  >
    <div class="my-login flex shadow-4">
<!--
        <img src="../assets/SignUpSide.png" />
-->
      <q-form @submit="onSubmit" class="q-px-lg flex column justify-center">
        <div class="q-my-sm">
          <div class="text-h6">ログイン</div>
        </div>
        <div>
          <q-input
            v-model="emailText"
            label="Eメール"
            type="email"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
            ]"
          />
          <q-input
            v-model="passwordText"
            :type="isPwd ? 'password' : 'text'"
            label="パスワード"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </div>
        <div class="q-mt-md">
          
          <q-btn
            
            label="ログイン"
            type="submit"
            color="primary"
            class="full-width"
            :loading="isLoginLoading"
          />
        </div>
        <!-- <p class="q-my-sm">
          まだログインアカウントお持ちでない方はこちら
          <router-link class="text-link" to="/signup"
            >サインナップ</router-link
          >
        </p> -->
      </q-form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { LocalStorage, useQuasar } from 'quasar'
import { useRouter } from 'vue-router';
import { positiveMessage, negativeMessage } from "src/composable/light-notify";

export default {
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const $router = useRouter();

    const isPwd = ref(true);
    const emailText = ref('');
    const passwordText = ref('');
    const isLoginLoading = ref(false);

    async function onSubmit() {
      isLoginLoading.value = true;
      if (isLoginLoading.value) {
        console.log('isLoginLoading::', isLoginLoading.value)
        //return;
      }

      const payload = {
        email: emailText.value,
        password: passwordText.value,
      };

      console.log('Before userLogin::',payload)
      
      try {
        await $store.dispatch("authModule/userLogin", payload);
        const isTenant = $store.state.authModule.isTenant
        console.log(isTenant)
        if(isTenant == false) {
          negativeMessage("Error",  `あなたはログインできないユーザーです`);
          isLoginLoading.value = false;
          return;
        }
        const UserID = $store.state.authModule.userId;
        await $store.dispatch("authModule/TenantsAccessToken", { UserID });
        console.log($store.state.authModule.tenant)
        const TenantName  = $store.state.authModule.tenant;
        console.log(TenantName)
        let searchTenant = 0;
        if(LocalStorage.getItem("stateTenant")){
          const checkTenant = LocalStorage.getItem("stateTenant");
          for(let index=0; index < TenantName.length; index++){
            if(TenantName[index].corporation == checkTenant.corporation){
              searchTenant++;
            }
          }
        }
        if(!searchTenant){
          console.log("localにtenantありませんでした")
          console.log(TenantName[0])
          await $store.dispatch("authModule/TenantDefault", TenantName[0]);
        }
        positiveMessage("OK", "ログイン成功: ダッシュボード画面に移動します");
        $router.replace("/system");
      } catch (error) {
        isLoginLoading.value = false;
        negativeMessage("Error", `ログイン失敗:ログインエラーが発生しました: ${error.message}`);
      }
    }

    return {
      isPwd,
      emailText,
      passwordText,
      isLoginLoading,
      onSubmit,
    };
  },
};
</script>

<style lang='scss' scoped>
.my-login {
  max-width: 390px;
  max-height: 493px;
  width: 100%;
  height: 100%;
  .q-form {
    width: 100%;
    img {
      display: none;
    }
    .text-link {
      text-decoration: none;
      color: black;
      &:hover {
        text-decoration: underline;
        font-weight: bold;
        color: $primary;
      }
    }
  }

  @media screen and (max-width: 810px) {
    max-width: 480px;
    .q-form {
      width: 100%;
      img {
        margin: 0 auto;
        display: block;
        width: 80px;
      }
    }
    img {
      display: none;
    }
  }
}

.body--dark {
  .q-form {
    background-color: $dark;
    .text-link {
      color: white;
    }
  }
}
</style>
