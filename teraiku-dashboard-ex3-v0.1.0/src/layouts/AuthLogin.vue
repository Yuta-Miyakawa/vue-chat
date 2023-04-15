<template>
  <div />
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import PKCE from 'js-pkce'

export default {
  name: 'AuthSetupLayout',
  setup() {
    const $store = useStore();
    const $q = useQuasar();
    const $router = useRouter();

    const isPwd = ref(true);
    const emailText = ref('');
    const passwordText = ref('');
    const isLoginLoading = ref(true);

    isLoginLoading.value = true;

    console.log('on setup')

    const pkce = new PKCE({
      client_id: '97135937-7c8d-4f45-8ffa-7cb5a712c5db', // oauth_clientsテーブルに追加されているクライアントのID
      redirect_uri: 'http://localhost:8080/callback', // oauth_clientsテーブルに追加されているredirect
      authorization_endpoint: 'http://api0.teraiku.jp/oauth/authorize', // Laravel Passportが定義する認証エンドポイントのルート
      requested_scopes: '*',
    });

    console.log('Location replace', pkce.authorizeUrl())
    // 認証URLへ遷移する
    location.replace(pkce.authorizeUrl());

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
