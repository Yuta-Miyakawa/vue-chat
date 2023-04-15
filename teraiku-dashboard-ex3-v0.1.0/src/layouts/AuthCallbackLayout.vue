<template>
  <div>
    <h5>認証中...</h5>>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { onBeforeMount, onMounted, onBeforeUpdate , onUpdated, onBeforeUnmount, onUnmounted } from 'vue'
import PKCE from 'js-pkce'
import Cookies from 'js-cookie'

export default {
  name: AuthCallbackLayout,
  setup() {
    const text = ref('')
    const $store = useStore();
    const $q = useQuasar();
    const $router = useRouter();

    const isPwd = ref(true);
    const emailText = ref('');
    const passwordText = ref('');
    const isLoginLoading = ref(false);

    onBeforeMount(() => {
      console.log('on before mount')
    })

    onMounted(() => {
      console.log('on mount')
    }),

    onBeforeUpdate(() => {
      console.log('on before update', text.value)
    })

    onUpdated(() => {
      console.log('on update', text.value)
    })

    onBeforeUnmount(() => {
      console.log('on before unmounted')
    })

    onUnmounted(() => {
      console.log('on unmounted')
    })

    const pkce = new PKCE(
      {
        client_id: '96cce3f7-f8d6-4ba9-bc9f-9ccedf07a403',
        redirect_uri: 'http://localhost:8080/callback',
        token_endpoint: 'http://api0.teraiku.jp/oauth/token',
      }
    );

    pkce.exchangeForAccessToken(document.location.href).then(response => {
      // アクセストークンをセット
      const expiresMinutes = 30;
      Cookies.set('ACCESS_TOKEN_KEY', response.access_token, {
        expires: new Date(new Date().getTime() + expiresMinutes * 60 * 1000),
        sameSite: 'lax',
      });

      // リフレッシュトークンをセット
      const expiresDays = 5;
      Cookies.set('REFRESH_TOKEN_KEY', response.refresh_token, {
        expires: expiresDays,
        sameSite: 'lax',
      });

      isLoginLoading.value = true;
      const payload = {
        email: emailText.value,
        password: passwordText.value,
      };

      console.log('PAYLOAD::', payload)
      // 認証後に遷移するページへ
      $router.replace('/system');
    });

    return {
      ref,
      text,
      onMounted,
      useRouter,
      useStore,
      useQuasar,
      PKCE,
      Cookies,
    }
  }
}
</script>
