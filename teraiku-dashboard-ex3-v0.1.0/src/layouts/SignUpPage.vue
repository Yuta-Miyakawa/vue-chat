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
    <div class="my-signup flex shadow-4">
<!--
        <img src="../assets/SignUpSide.png" />
-->
      <q-form @submit="onSubmit" class="q-px-lg flex column justify-center">
        <div class="q-my-sm">
          <div class="text-h6">アカウント登録</div>
        </div>
        <div>
          <q-input
            v-model="nameText"
            label="名前"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'このフィールドは空欄であってはなりません',
            ]"
          />
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

          <!-- <q-input
            v-model="passwordConfirmation"
            :type="isPwd ? 'password_comfirmation' : 'text'"
            label="パスワード確認"
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
          </q-input> -->
        </div>
        <div class="q-mt-md">
          <q-btn
            :loading="isRegisterLoading"
            label="アカウント登録"
            type="submit"
            color="primary"
            class="full-width"

          />
        </div>
        <p class="q-my-sm">
          すでにアカウントをお持ちの方はこちら-->
          <router-link class="text-link" to="/login"
            >ログイン</router-link
          >
        </p>
      </q-form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

export default {
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const $router = useRouter();

    const isPwd = ref(true);
    const emailText = ref("");
    const nameText = ref("");
    const passwordText = ref("");
    const passwordConfirmation = ref("");
    const isRegisterLoading = ref(false);

    async function onSubmit() {
      // if (isRegisterLoading.value) {
      //   return;
      // }

      isRegisterLoading.value = true;
      const payload = {
        email: emailText.value,
        name: nameText.value,
        password: passwordText.value,
        password_confirmation: passwordText.value,
      };

      try {
        await $store.dispatch("authModule/signUpUser", payload);
        $q.notify({
          message: "OK",
          caption: "signUp ホーム画面に移動します",
          color: "positive",
          icon: "check_circle",
        });
        $router.replace("/login");
      } catch (error) {
        isRegisterLoading.value = false;
        $q.notify({
          message: "Error",
          caption: `signUp エラーが発生しました: ${error.message}`,
          color: "negative",
          icon: "warning_amber",
        });
      }
    }

    return {
      isPwd,
      emailText,
      nameText,
      passwordText,
      isRegisterLoading,
      onSubmit,
    };
  },
};
</script>

<style lang="scss" scoped>
.my-signup {
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
