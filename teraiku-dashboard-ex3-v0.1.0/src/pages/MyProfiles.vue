<template>
  <q-page class="q-pa-lg">
    <div class="container">
      <div class="row">
        <div class="column">
          <h5>会員情報</h5>
        </div>
      </div>
    <div class="row q-col-gutter-sm">
      <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
        <q-card class="card-bg ">
          <q-form @submit="onSubmit" class="q-gutter-mdt">
            <q-card-section class="text-h6 ">
              <div class="text-h6">プロフィール編集</div>
            </q-card-section>
            <q-card-section class="q-pa-sm">
              <q-list class="row">
                <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-item-section side>
                    <q-avatar size="100px">
                      <img :src="UserAvatar">
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-file
                      v-model="filesImages"
                      class="q-mx-xs"
                      color=""
                      bg-color="purple-1"
                      rounded
                      clearable 
                      outlined
                      dense
                      label="アイコン アップロード"
                      accept=".jpg, image/*"
                      @update:model-value="updateFiles"
                      @rejected="onRejected"  
                    />
                    
                    <!-- <q-uploader
                      style="max-width: 300px"
                      accept=".jpg, image/*"
                    /> -->
                    
                    <!-- <q-btn label="写真を変更" class="text-capitalize" rounded color="info"
                          style="max-width: 120px"></q-btn> -->
                  </q-item-section>
                </q-item>

                <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input   
                      dense v-model="UserName" 
                      label="ユーザー名" 
                      v-model.trim="UserName"
                      :rules="[
                        (val) => (val && val.toString().length > 0) || 'ユーザー名を入力してください',]"
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input 
                      autogrow 
                      dense 
                      v-model="UserRoleKinds"
                      disable
                      label="種別"
                      v-model.trim="UserRoleKinds"
                      :rules="[
                        (val) => (val && val.toString().length > 0) || '種別を入力してください',]"
                    />
                  </q-item-section>
                </q-item>
                
                <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      dense
                      v-model="inputEmail"
                      disable
                      label="メールアドレス"
                      v-model.trim="inputPhone"
                      :rules="[
                        (val) => (val && val.toString().length > 0) || 'メールアドレスを入力してください',]"
                    />
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      dense
                      v-model="inputPhone" 
                      label="電話番号"
                      v-model.trim="inputPhone"
                      :rules="[
                        (val) => (val && val.toString().length > 0) || '電話番号を入力してください',]"
                    />
                  </q-item-section>
                </q-item>
                
                <!-- <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      autogrow 
                      dense 
                      v-model="inputStreet" 
                      label=""
                      v-model.trim="inputStreet"
                      :rules="[
                        (val) => (val && val.toString().length > 0) || 'を入力してください',]"
                    />
                  </q-item-section>
                </q-item> -->
                <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <q-item-section>
                    <q-input
                      type="textarea" 
                      dense 
                      v-model="inputComent" 
                      label="コメント"
                    />
                  </q-item-section>
                </q-item>

              </q-list>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn class="text-capitalize bg-info" color="info" type="submit">会員情報を更新</q-btn>
            </q-card-actions>
          </q-form>
        </q-card>
      </div>

      <!-- <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
        <q-card class="card-bg ">
          <q-card-section class="text-h6 q-pa-sm">
            <div class="text-h6">パスワード変更</div>
          </q-card-section>
          <q-card-section class="q-pa-sm row">
            <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <q-item-section>
                今までのパスワード
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
              <q-item-section>
                <q-input type="password" dense outlined round
                         v-model="password_dict.current_password"
                         placeholder="Current Password"/>
              </q-item-section>
            </q-item>
            <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <q-item-section>
                新しいパスワード
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
              <q-item-section>
                <q-input type="password" dense outlined round v-model="password_dict.new_password"
                         placeholder="New Password"/>
              </q-item-section>
            </q-item>
            <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <q-item-section>
                新しいパスワードを確認
              </q-item-section>
            </q-item>
            <q-item class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
              <q-item-section>
                <q-input type="password"  dense outlined round
                         v-model="password_dict.confirm_new_password"
                         placeholder="Confirm New Password"/>
              </q-item-section>
            </q-item>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn class="text-capitalize bg-info" color="info">パスワード変更</q-btn>
          </q-card-actions>

        </q-card>
      </div> -->

      <!-- <div class="col-lg-8 col-md-8 col-xs-12 col-sm-12">
        <q-card class="card-bg ">
          <q-card-section class="text-h6 q-pa-sm">
            <div class="text-h6">アカウント処理</div>
          </q-card-section>
          <q-card-section class="q-pa-sm row">
            
           
            <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <q-item-section>
                ログアウトする
              </q-item-section>
            </q-item>
            <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <q-item-section>
                 <q-btn class="text-capitalize bg-info" color="black">ログアウト</q-btn>
              </q-item-section>
            </q-item>
            <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
              <q-item-section>
                退会する
              </q-item-section>
            </q-item>
            <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <q-item-section>
                 <q-btn class="text-capitalize bg-info" color="red">退会</q-btn>
              </q-item-section>
            </q-item>
          </q-card-section>

        </q-card>
      </div> -->
    </div>
    </div>
  </q-page>
</template>

<script>
import {defineComponent, ref} from 'vue'
import { LocalStorage, useQuasar } from "quasar";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { positiveMessage, negativeMessage } from "src/composable/light-notify";
export default defineComponent({
  name: "UserProfile",
  setup() {

    const $store = useStore();
    const $q = useQuasar();
    const $router = useRouter();

    const inputEmail = LocalStorage.getItem('userMail');

    const isLoadingUser = ref(false);
    const showSimulatedReturnData = ref(false);

    const UserName = ref('');
    const UserAvatar = ref('');
    const UserRoleKinds = ref('');
    const filesImages = ref('');

    let inputLastName = ref("");
    let inputFirstName = ref("");
    let inputLastNameKana = ref("");
    let inputFirstNameKana = ref("");
    let inputPhone = ref("");
    let inputPref = ref("");
    let inputCity = ref("");
    let inputPostal = ref("");
    let inputAddress = ref("");
    let inputStreet = ref("");
    let inputComent = ref("");

    (async function setupBooks() {
      isLoadingUser.value = true;
      showSimulatedReturnData.value = false;
      try{
        await $store.dispatch("authModule/userAccessToken");
        const isTenant = $store.state.authModule.users.is_tenant;
        if (isTenant == false) {
          $router.replace("/login");
          await $store.dispatch("authModule/logoutError");
          negativeMessage("Error", "あなたはログインできないユーザーです");
          return;
        }
        const user = $store.state.authModule.users
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
        UserRoleKinds.value = user.roles.display_name;
      }catch (e) {
        console.log(e.response)
        if(e.response.status === 401) {
          $router.replace("/login");
          await $store.dispatch("authModule/logoutError");
          negativeMessage("Error", "再度ログインしてください");
          isLoadingUser.value = false;
          showSimulatedReturnData.value = false;
        return;
        }
      }
      //檀家数
      isLoadingUser.value = false;
      showSimulatedReturnData.value = true;
    })();

    const updateFiles = (rejectedEntries) => {
      try{
        console.log(rejectedEntries)
        
      }catch (e) {
        negativeMessage("Error", `ファイルの読み込みに失敗しました`);
      }    
    }
    
    const onRejected = () => {
      negativeMessage("Error", `画像ファイルを読み込んでください`);
    }

    const onSubmit = async () => {
      isLoadingUser.value = true;
      showSimulatedReturnData.value = false;
        try {
          await $store.dispatch("dankaModule/updateBook", {
            id: resourceForUpdate.value.id,
            family_name: inputLastName.value,
            last_name: inputLastName.value,
            first_name: inputFirstName.value,
            phone: inputPhone.value,
            postcode: inputPostal.value,
            pref: inputPref.value,
            city: inputCity.value,
            street: inputStreet.value,
            address: inputAddress.value,
            location: inputLocation.value,
            user_id: inputUserID.value,
            member_id: inputMemberID.value,
            corporation_id: inputCorporationID.value,
          });
          positiveMessage("生成", "新しいリソース作成されました");
          isLoadingUser.value = false;
          showSimulatedReturnData.value = false;
        } catch (error) {
          console.log(error);
          negativeMessage("Error", "リソースの変更中にエラーが発生しました");
          isLoadingUser.value = false;
          showSimulatedReturnData.value = false;
        }
      }


    return {
      isLoadingUser,
      showSimulatedReturnData,

      UserName,
      UserAvatar,
      UserRoleKinds,
      filesImages,

      inputLastName,
      inputLastNameKana,
      inputFirstName,
      inputFirstNameKana,
      inputEmail,
      inputPhone,
      inputPostal,
      inputPref,
      inputCity,
      inputAddress,
      inputStreet,
      inputComent,
      updateFiles,
      onRejected,
      onSubmit,
    }
  }
})
</script>

<style lang="scss" scoped>
  @use "../css/table-pages.scss";
</style>
