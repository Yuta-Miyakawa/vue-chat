<template>
  <q-layout view="hHh lpR fFf">
    <!-- Layout -->
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar class="q-px-md q-py-xs">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-weight-medium q-px-md q-pr-lg">
          <img src="~assets/img/logo-w.svg" style="width: 100px" />
        </q-toolbar-title>
<!-- 右側のアイコン -->
        <div class="q-gutter-sm">

            <!-- <q-btn round dense flat color="white" icon="notifications" class="displaynone">
            <q-badge color="red" text-color="white" floating>
              2
            </q-badge>
            <q-menu>
              <q-list style="min-width: 100px">
                <dangerous></dangerous>
                <q-card class="text-center no-shadow no-border">
                  <q-btn label="全てを表示" style="max-width: 120px !important;" flat dense
                         class="text-indigo-8"></q-btn>
                </q-card>
              </q-list>
            </q-menu>
          </q-btn>

          <q-btn round dense flat color="white" icon="settings">
            <q-menu>
              <div class="q-pa-md" style="max-width: 350px">
                <q-bar class="bg-settings">
                  設定
                  <q-space />
    
                </q-bar>
                <q-list style="min-width: 100px">
                  <q-item tag="label" v-ripple>
                    <q-item-section side>
                      <q-toggle
                        v-model="isNightMode"
                        checked-icon="dark_mode"
                        size="sm"
                        :label="isNightMode ? 'ナイトモード：はい' : 'ナイトモード：いいえ'"
                        unchecked-icon="light_mode"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-menu>
          </q-btn> -->

          <!-- <div class="profile"> -->

          <!-- <q-btn-dropdown unelevated no-caps class="profile" v-if="Tenants.length > 1">
            <template v-slot:label>
              <div class="row items-center no-wrap">
                <div class="text-center q-pa-sm displaynone">
                  寺院変更
                </div>
              </div>
            </template>
            <tenant-info :tenant="Tenants"></tenant-info>
          </q-btn-dropdown> -->

          <q-btn-dropdown unelevated no-caps class="profile">
            <template v-slot:label>
              <div class="row items-center no-wrap">
                <q-avatar size="sm">
                  <img :src="UserAvatar">
                  <!-- <img src="~/assets/img/syuhousan.png"> -->
                </q-avatar>
                <div class="text-center q-pa-sm displaynone">
                  <!-- 浜島秀法 -->
                  {{UserName}}
                </div>
              </div>
            </template>
            <user-info :user="UserName" :tenant="Tenants" :stateTenant="UserTenant" :avatar="UserAvatar"></user-info>
          </q-btn-dropdown>
        </div>

        <!-- </div> -->

      </q-toolbar>
    </q-header>


    <q-drawer
      v-model="leftDrawerOpen"
      :width="256"
      show-if-above
      bordered
      content-class="bg-secondary"
    >
      <div class="absolute-top text-secondary" style="box-sizing: border-box; height: 144px">
        <div class="absolute-bottom bg-transparent flex column q-py-md q-px-lg">
          <q-avatar size="40px" class="q-mb-sx">
            <img :src="UserAvatar">
            <!-- <img src="~/assets/img/syuhousan.png"> -->
          </q-avatar>
          <div class="text-weight-bold title" style="font-size: 20px; margin-top: 20px">
            {{UserName}}
            <!-- 浜島秀法 -->
          </div>
          <div class="text-caption role-text">{{UserTenant}}</div>
          <!-- <div class="text-caption role-text">修性院</div> -->
        </div>
      </div>
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 144px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-separator />

          <q-item
            to="/system"
            clickable
            :active="isMyComponent('principal')"
            @click="selectComponent('principal')"
            active-class="item-active"
            v-ripple
            exact
          >
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>

            <q-item-section>概要</q-item-section>
          </q-item>



        <!-- <q-expansion-item
          icon="person"
          label="檀家管理"
        > -->
          <q-item
              to="/system/test"
              :active="isMyComponent('test')"
              @click="selectComponent('test')"
              active-class="item-active"
              v-ripple
              exact
            >
              <q-item-section avatar>
                <q-icon name="account_box"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>コンタクトリスト</q-item-label>
              </q-item-section>
            </q-item>

<!-- to="/system/DankaList" -->
            <q-item
            
            to="/system/DankaList2"
            clickable
            :active="isMyComponent('prestamossin')"
            @click="selectComponent('prestamossin')"
            active-class="item-active"
            v-ripple
            exact
          >
            <q-item-section avatar>
              <q-icon name="mdi-playlist-edit" />
            </q-item-section>

            <q-item-section>檀家一覧</q-item-section>
          </q-item>

          <!-- <q-item
            
            to="/system/DankaList"
            clickable
            :active="isMyComponent('prestamos')"
            @click="selectComponent('prestamos')"
            active-class="item-active"
            v-ripple
            exact
          >
            <q-item-section avatar>
              <q-icon name="mdi-playlist-edit" />
            </q-item-section>

            <q-item-section>檀家一覧(旧)</q-item-section>
          </q-item> -->


          <q-item
            to="/system/Pastbook"
            clickable
            :active="isMyComponent('postbook')"
            @click="selectComponent('postbook')"
            active-class="item-active"
            v-ripple
            exact
          >
            <q-item-section avatar>
              <q-icon name="summarize" />
            </q-item-section>

            <q-item-section>過去帳一覧表示</q-item-section>
          </q-item>

          <q-item
            to="/system/chattest"
            :active="isMyComponent('chattest')"
            @click="selectComponent('chattest')"
            active-class="item-active"
            v-ripple
            exact
          >
            <q-item-section avatar>
              <q-icon name="chat"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>トークルーム</q-item-label>
            </q-item-section>
          </q-item>

          <!-- </q-expansion-item> -->

          <q-expansion-item
            icon="mdi-home-flood"
            label="寺務管理"
          >
          <q-list class="q-pl-lg">

            <q-item
              to="/system/kanban"
              :active="isMyComponent('kanban')"
              @click="selectComponent('kanban')"
              active-class="item-active"
              v-ripple
              exact
            >
              <q-item-section avatar>
                <q-icon name="task"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Todo管理</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              to="/system/vuecal"
              :active="isMyComponent('calendar')"
              @click="selectComponent('calendar')"
              active-class="item-active"
              v-ripple
              exact
            >
              <q-item-section avatar>
                <q-icon name="calendar_month"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>予定表(日程/時間)</q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              to="/system/anniversarycal"
              :active="isMyComponent('anniversarycal')"
              @click="selectComponent('anniversarycal')"
              active-class="item-active"
              v-ripple
              exact
            >
              <q-item-section avatar>
                <q-icon name="calendar_month"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>予定表(法要/年回忌)</q-item-label>
              </q-item-section>
            </q-item>

            <!-- <q-item
              to="/system/celebrationcal"
              style="background-color: grey"
              :active="isMyComponent('celebrationcal')"
              @click="selectComponent('celebrationcal')"
              active-class="item-active"
              v-ripple
              exact
            >
              <q-item-section avatar>
                <q-icon name="calendar_month"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>予定表(歳祝)</q-item-label>
              </q-item-section>
            </q-item> -->

            <!-- familyName.date_of_deathを外しました -->
            <q-item
              to="/system/dateofdeathcal"
              :active="isMyComponent('dateofdeathcal')"
              @click="selectComponent('dateofdeathcal')"
              active-class="item-active"
              v-ripple
              exact
            >
              <q-item-section avatar>
                <q-icon name="calendar_month"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>予定表(月命日)</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
        </q-expansion-item>

          <!-- <q-expansion-item
          icon="mdi-chat-processing-outline"
          label="コミュニケーション"
        >
          <q-list class="q-pl-lg"> -->

            

            

            <!-- <q-item
              to="/system/form"
              :active="isMyComponent('emailtemple')"
              @click="selectComponent('emailtemple')"
              active-class="item-active"
              v-ripple
              exact
            >
              <q-item-section avatar>
                <q-icon name="mark_email_read"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>テンプレート登録</q-item-label>
              </q-item-section>
            </q-item> -->

            <!-- <q-item
              to="/system/email"
              :active="isMyComponent('email')"
              @click="selectComponent('email')"
              active-class="item-active"
              v-ripple
              exact
            >
              <q-item-section avatar>
                <q-icon name="email"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>一斉連絡(メール)</q-item-label>
              </q-item-section>
            </q-item> -->

          <!-- </q-list>
        </q-expansion-item> -->

        <q-expansion-item
          icon="mdi-card-account-mail"
          label="お知らせ管理"
        >
          <q-list class="q-pl-lg">

            <q-item
              to="/system/TemplateForm"
              :active="isMyComponent('templateform')"
              @click="selectComponent('templateform')"
              active-class="item-active"
              v-ripple
              exact
            >
              <q-item-section avatar>
                <q-icon name="view_list"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>お知らせテンプレート一覧</q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              to="/system/Announce"
              :active="isMyComponent('Announce')"
              @click="selectComponent('Announce')"
              active-class="item-active"
              v-ripple
              exact
            >
              <q-item-section avatar>
                <q-icon name="campaign"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>お知らせ投稿</q-item-label>
              </q-item-section>
            </q-item>

            <q-item
              to="/system/Announcehistory"
              :active="isMyComponent('Announcehistory')"
              @click="selectComponent('Announcehistory')"
              active-class="item-active"
              v-ripple
              exact
            >
              <q-item-section avatar>
                <q-icon name="mdi-newspaper"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>投稿履歴</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
        </q-expansion-item>


        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Dialogs -->
    <q-dialog v-model="isLogoutDialogOpen" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="logout" color="primary" text-color="white" />
          <span class="q-ml-sm">ログアウトしてもよろしいですか？</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" color="primary" v-close-popup />
          <q-btn outline label="ログアウト" color="primary" @click="onLogout" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

//
<script>
// import EssentialLink from "components/EssentialLink.vue";

import { defineComponent, ref, computed, onMounted, watch } from "vue";
import { LocalStorage, useQuasar } from "quasar";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { api } from "boot/axios";
import { notifyMessage, getTokenFromStorage } from "../composable/utils";
import { positiveMessage, negativeMessage } from "../composable/light-notify";
import { columnsForClients } from 'src/composable/column-tables';
import UserInfo from '../components/header/userinfo.vue';
import TenantInfo from '../components/header/tenantinfo.vue';

import Dangerous from "../components/header/Dangerous.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    // Dangerous,
    UserInfo,
  },

  setup() {
    const $q = useQuasar();
    const $store = useStore();
    const $router = useRouter();

    const isNightMode = ref($q.dark.isActive);
    const leftDrawerOpen = ref(false);
    const componentSelected = ref("principal");
    const isLogoutDialogOpen = ref(false);
    const UserName = ref('');
    const UserAvatar = ref('');
    const UserTenant = ref('');
    const Tenants = ref('');

    const isMyComponent = (componentName) =>
      componentName === componentSelected.value;

    watch(isNightMode, (newValue) => {
      $q.dark.set(newValue);
      $q.localStorage.set("isDarkMode", newValue);
    });

    async function verifyValidSession() {
      try {
        await $store.dispatch("authModule/userAccessToken");
        console.log($store.state.authModule.users)
        const user = $store.state.authModule.users
        console.log(user.is_tenant)
        UserName.value = user.name;
        await $store.dispatch("booksModule/readMyProfile", {
          id: user.id,
          uuid: user.uuid,
        });
        const profile = $store.state.booksModule.representative;
        if(profile[0]){
          UserAvatar.value = profile[0].avatar;
          console.log(UserAvatar.value)
        }
        await $store.dispatch("authModule/TenantsAccessToken", {
          UserID: user.id
        });
        console.log($store.state.authModule.tenant)
        Tenants.value = $store.state.authModule.tenant;
        const tenant = LocalStorage.getItem("stateTenant");
        UserTenant.value = tenant.corporation;
        console.log(UserTenant.value)
      } catch (e) {
        console.log(e)
        if(e.response.status === 401) {
           console.log('400 Error!!')
          $router.replace("/login");
          negativeMessage("Error", "認証の問題は発生しました");
          await $store.dispatch("authModule/logoutError");
          return;
        }
        negativeMessage("Error", "データの読み込み中にエラーが発生しました");
      }
    }verifyValidSession();

    function selectComponent(componentName) {
      componentSelected.value = componentName;
    }

    function onLogoutDialog() {
      isLogoutDialogOpen.value = !isLogoutDialogOpen.value;
    }

    async function onLogout() {
      console.log("ログアウトします")
      try {
        await $store.dispatch("authModule/logout");
        $router.replace("/setup");
      } catch (error) {
        negativeMessage(
          "Error",
          "操作中にエラーが発生しました"
        );
      }
    }

    return {
      isNightMode,
      leftDrawerOpen,
      isLogoutDialogOpen,
      UserName,
      UserAvatar,
      UserTenant,
      Tenants,
      onLogoutDialog,
      onLogout,
      selectComponent,
      isMyComponent,
      userName: computed(() => $store.getters["authModule/getUserName"]),
      userRole: computed(() => $store.getters["authModule/getUserRole"]),
      userMail: computed(() => $store.getters["authModule/getUserMail"]),
      userIcon: computed(() =>
        $store.getters["authModule/getUserRole"] === "SUPERADMIN"
          ? "admin_panel_settings"
          : $store.getters["authModule/getUserRole"] === "ADMIN"
            ? "assignment_ind"
            : "person"
      ),
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

    };
  },
});
</script>

<style lang="scss" scoped>
* {
  transition: 0.1s all ease-in;
}

.role-text {
  color: black;
}

.avatar-icon {
  color: green;
}

.q-toolbar {
  background-color: $primary;
  color: white;
  .img-logo {
    height: 3rem;
  }
}

.q-drawer {
  .title {
    color: black;
    cursor: default;
  }
  .q-list {
    padding: 0 0.4rem;
    .q-item {
      i {
        opacity: 54%;
      }
    }
    .q-item__section {
      font-size: 14px;
      font-weight: 500;
    }
  }
}


.item-active {
  background-color: #e3f2fd;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 0 1rem;
  opacity: 100%;
  color: $primary;
  i {
    opacity: 100%;
    color: $primary;
  }
}

.body--dark {
  .role-text {
    color: white;
  }

  .avatar-icon {
    color: white;
  }

  .q-drawer {
    .title {
      color: $primary-dark-text;
    }
  }

  .item-active {
    background-color: $bg-dark-third;
    color: $primary-dark;
    i {
      color: $secondary-dark;
    }
  }
  .q-toolbar {
    background-color: $bg-dark-primary;
    color: $primary;
  }
}

.bg-settings{
  background-color: transparent;
  font-size: 1.2em;
}

@media screen and (max-width: 480px) {
	.displaynone {
		display: none;
	}
}

</style>
