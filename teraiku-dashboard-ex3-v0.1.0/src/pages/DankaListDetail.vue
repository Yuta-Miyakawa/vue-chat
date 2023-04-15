<template>
 <q-page padding>
    <!-- Layout Page -->
    <div class="container">
      <h5>
        <q-btn
          :outline="isDarkModeActive"
          size="sm"
          class="q-mx-xs"
          color="primary"
          icon="arrow_back"
          round
          @click="goBack()"
          ><q-tooltip>戻る</q-tooltip>
        </q-btn>
        {{ rows.last_name }}家の檀家情報
      </h5>
      
    </div>
    <!-- 過去帳 -->
    <div v-show="showSimulatedReturnData">
      <div class="container">
        <div class="row">
          <div class="SortOrder">
            <h5>過去帳</h5>
          </div>
          <div class="SortOrder">
            <q-btn
              :outline="isDarkModeActive"
              color="primary"
              icon="person_add"
              label="過去帳追加"
              dense
              @click="openEditDialog(null, 'newpast')"
            />
          </div>
        </div>
        <!-- <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6" style="padding-bottom: 16px">
          <q-btn
            :outline="isDarkModeActive"
            color="primary"
            class="create-button"
            icon="person_add"
            label="過去帳追加"
            @click="openEditDialog(null, 'newpast')"
          />
        </div> -->

        <q-card
          class="no-shadow border: 1px solid #ccc;"
          v-for="i in Object.keys(targetpast).length"
          :key="i"
        >
          <div>
            <div class="containers">
              <div class="item box-kako1">
                <q-div class="q-pa-xm row">
                  <q-avatar
                    color="primary"
                    text-color="white"
                    size="100px"
                    font-size="50px"
                    style="margin-bottom: 4rem; margin-top: 3rem"
                    >{{ targetpast[i - 1].last_name }}
                  </q-avatar>
                  <!-- 写真選択ボタン -->
                </q-div>
              </div>
              <div class="item box-kako2">
                <q-div class="textCenter row">
                  <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-4 smartphoneSize">
                    <q-item-section>俗名</q-item-section>
                  </q-item>
                  <q-item class="col-lg-8 col-md-8 col-sm-8 col-xs-8 smartphoneSize">
                    <q-item-section>
                      <q-item-label caption
                        >{{ targetpast[i - 1].last_name_kana }}
                        {{ targetpast[i - 1].first_name_kana }}</q-item-label
                      >
                      <q-item-label
                        >{{ targetpast[i - 1].last_name }}
                        {{ targetpast[i - 1].first_name }}</q-item-label
                      >
                    </q-item-section>
                  </q-item>
                </q-div>
              </div>
              <div class="item box-kako3">
                <q-div class="q-pa-xm row">
                  <q-item class="smartphoneSize">
                    <q-item-section>
                      <q-item-label caption>誕生日 </q-item-label>
                      <q-item-label>{{ birthDaypast[i - 1] }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-div>
              </div>
              <div class="item box-kako4">
                <q-div class="q-pa-xm row">
                  <q-item class="smartphoneSize">
                    <q-item-section>
                      <q-item-label caption>忌日</q-item-label>
                      <q-item-label>{{ deathDay[i - 1] }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-div>
              </div>
              <div class="item box-kako5">
                <q-div class="textCenter row">
                  <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-4 smartphoneSize">
                    <q-item-section>戒名</q-item-section>
                  </q-item>
                  <q-item class="col-lg-8 col-md-8 col-sm-8 col-xs-8 smartphoneSize">
                    <q-item-section>
                      <q-item-label>{{ targetpast[i - 1].dharma_name }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-div>
              </div>
              <dir class="item box-kako6">
                <q-div class="q-pa-xm row">
                  <q-item class="smartphoneSize">
                    <q-item-section>
                      <q-item-label caption>厄日</q-item-label>
                      <q-item-label>{{ pastAge[i - 1] }}歳</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-div>
              </dir>
              <dir class="item box-kako7">
                <q-div class="q-pa-xm row">
                  <q-item class="smartphoneSize">
                    <q-item-section>
                      <q-item-label caption>墓地番号</q-item-label>
                      <q-item-label>{{ targetpast[i - 1].place_of_death }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-div>
              </dir>
              <div class="item box-kako8">
                <div class="q-pa-sm row">
                  <q-item class="col-lg-11 col-md-11 col-sm-11 col-xs-10">
                    <q-item-section>
                      <q-item-label>{{ targetpast[i - 1].comments }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item class="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                    <q-btn
                      round
                      size="10px"
                      class="btnSize"
                      @click="openEditDialog(targetpast[i - 1], 'past')"
                    >
                      <q-icon
                        name="create"
                        size="xs"
                        color="primary"
                        class="action-button"
                      />
                    </q-btn>
                  </q-item>
                </div>
              </div>
            </div>
            <div class="q-pa-sm">
              <q-btn
                color="black"
                class="full-width"
                label="年回忌法要表"
                @click="displayTable(targetpast[i - 1])"
              />
              <div v-if="hiddenTable">
                <q-table
                  dense
                  :rows="mourning"
                  :columns="columns"
                  row-key="name"
                  inline
                  label="Vertical"
                  value="vertical"
                  :rows-per-page-options="[0]"
                  hide-bottom
                  wrap-cells
                  separator="cell"
                >
                </q-table>
              </div>
            </div>
          </div>
        </q-card>
      </div>
      <pre></pre>
      <!-- 現在帳 -->
      <div class="container">
        <div class="row">
          <div class="SortOrder">
            <h5>現在帳</h5>
          </div>
          <!-- <div class="SortOrder">
            <q-btn
              :outline="isDarkModeActive"
              color="primary"
              icon="person_add"
              label="現在帳追加"
              dense
              @click="openEditDialog(null, 'newcurrent')"
            />
          </div> -->
        </div>
        <!-- <div class="col-lg-2 col-md-3 col-sm-4 col-xs-6" style="padding-bottom: 16px">
          <q-btn
            :outline="isDarkModeActive"
            color="primary"
            class="create-button"
            icon="person_add"
            label="現在帳追加"
            @click="openEditDialog(null, 'newcurrent')"
          />
        </div> -->

        <q-card
          class="no-shadow border: 1px solid #ccc;"
          v-for="i in Object.keys(targetcurrent).length"
          :key="i"
        >
          <div class="containers">
            <div class="item box-big1">
              <q-div class="q-pa-xm row">
                <q-avatar
                  color="primary"
                  text-color="white"
                  size="100px"
                  font-size="50px"
                  style="margin-bottom: 2rem"
                  >{{ targetcurrent[i - 1].last_name }}
                </q-avatar>
                <!-- 写真選択ボタン -->
                <!-- <q-img
                  src="https://cdn.quasar.dev/img/avatar2.jpg"
                  loading="lazy"
                  spinner-color="white"

                  style="max-width: 150px"
                  class="smartphoneSizeIMG"
                /> -->
              </q-div>
            </div>
            <div class="item box-big2">
              <q-div class="q-pa-xm row">
                <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-4 smartphoneSize">
                  <q-item-section> 俗名 </q-item-section>
                </q-item>
                <q-item class="col-lg-8 col-md-8 col-sm-8 col-xs-8 smartphoneSize">
                  <q-item-section>
                    <q-item-label caption
                      >{{ targetcurrent[i - 1].last_name_kana }}
                      {{ targetcurrent[i - 1].first_name_kana }}</q-item-label
                    >
                    <q-item-label
                      >{{ targetcurrent[i - 1].last_name }}
                      {{ targetcurrent[i - 1].first_name }}</q-item-label
                    >
                  </q-item-section>
                </q-item>
              </q-div>
            </div>
            <div class="item box-big3">
              <q-div class="q-pa-xm row">
                <q-item class="smartphoneSize">
                  <q-item-section>
                    <q-item-label caption> 誕生日 </q-item-label>
                    <q-item-label>{{ birthDaycurrent[i - 1] }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-div>
            </div>
            <div class="item box-big4">
              <q-div class="q-pa-xm row">
                <q-item class="col-lg-4 col-md-4 col-sm-4 col-xs-4 smartphoneSize">
                  <q-item-section>現住所</q-item-section>
                </q-item>
                <q-item class="col-lg-8 col-md-8 col-sm-8 col-xs-8 smartphoneSize">
                  <q-item-section>
                    <q-item-label caption>
                      〒{{ targetcurrent[i - 1].postcode }}
                    </q-item-label>
                    <q-item-label
                      >{{ targetcurrent[i - 1].pref }}{{ targetcurrent[i - 1].city
                      }}{{ targetcurrent[i - 1].street
                      }}{{ targetcurrent[i - 1].address }}</q-item-label
                    >
                  </q-item-section>
                </q-item>
              </q-div>
            </div>
            <dir class="item box-big5">
              <q-div class="q-pa-xm row">
                <q-item class="smartphoneSize">
                  <q-item-section>
                    <q-item-label caption>年齢</q-item-label>
                    <q-item-label>{{ currentAge[i - 1] }}歳</q-item-label>
                  </q-item-section>
                </q-item>
              </q-div>
            </dir>
            <div class="item box-big6">
              <div class="q-pa-xm row">
                <!-- <q-item class="col-lg-2 col-md-2 col-sm-3 col-xs-4">
                  <q-item-section> コメント </q-item-section>
                </q-item> -->
                <q-item class="col-lg-11 col-md-11 col-sm-11 col-xs-10 smartphoneSize">
                  <q-item-section>
                    <q-item-label>{{ targetcurrent[i - 1].comments }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item class="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                  <q-btn
                    round
                    size="10px"
                    class="btnSize"
                    @click="openEditDialog(targetcurrent[i - 1], 'current')"
                  >
                    <q-icon name="create" size="xs" color="primary" class="action-button" />
                  </q-btn>
                </q-item>
              </div>
            </div>
          </div>
          <pre></pre>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="isDialogOpen" persistent>
      <q-card class="creation-card-simple q-pa-sm">
        <q-card-section>
          <div class="row justify-between" v-if="targettable == 'current'">
            <div class="col-xs-7 col-sm-9 col-md-9">
              <div class="text-h6" style="height: 0px">{{ dialogTitle }}</div>
            </div>
            <div class="col-xs-5 col-sm-3 col-md-3">
              <q-btn
                color="red"
                label="データ移行"
                @click="openMoveDialog(resourceForUpdate)"
              />
            </div>
          </div>
          <div v-else class="col-xs-8 col-sm-10 col-md-10">
            <div class="text-h6" style="height: 0px">{{ dialogTitle }}</div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-mdt">
            <div v-if="targettable != 'past' && targettable != 'movepast'">
              <div class="row justify-between">
                <div class="col-5">
                  <q-input
                    v-model="inputLastName"
                    type="text"
                    label="姓"
                    class="q-mb-xs"
                    v-model.trim="inputLastName"
                    :rules="[
                      (val) =>
                        (val && val.toString().length > 0) || '姓を入力してください',
                    ]"
                  />
                </div>
                <div class="col-5">
                  <q-input
                    v-model="inputFirstName"
                    type="text"
                    label="名"
                    class="q-mb-xs"
                    v-model.trim="inputFirstName"
                    :rules="[
                      (val) =>
                        (val && val.toString().length > 0) || '名を入力してください',
                    ]"
                  />
                </div>
                <div class="col-5">
                  <q-input
                    v-model="inputLastNameKana"
                    type="text"
                    label="せい"
                    class="q-mb-xs"
                    v-model.trim="inputLastNameKana"
                    :rules="[
                      (val) =>
                        (val && val.toString().length > 0) || 'せいを入力してください',
                    ]"
                  />
                </div>
                <div class="col-5">
                  <q-input
                    v-model="inputFirstNameKana"
                    type="text"
                    label="めい"
                    class="q-mb-xs"
                    v-model.trim="inputFirstNameKana"
                    :rules="[
                      (val) =>
                        (val && val.toString().length > 0) || 'めいを入力してください',
                    ]"
                  />
                </div>
              </div>
            </div>
            <div v-if="targettable == 'movepast' || targettable == 'createpast'">
              <div class="row justify-between">
                <div class="col-12">
                  <q-input
                    v-model="inputdharmaName"
                    type="text"
                    label="戒名/法名"
                    class="q-mb-xs"
                    v-model.trim="inputdharmaName"
                    :rules="[
                      (val) =>
                        (val && val.toString().length > 0) || '名を入力してください',
                    ]"
                  />
                </div>
              </div>
            </div>
            <div v-if="targettable == 'createcurrent' || targettable == 'createpast'">
              <q-item-label caption
                >誕生日
                <div class="row">
                  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <!-- <q-input v-model="date" filled type="date" hint="Native date" /> -->
                    <q-input
                      v-model="inputYear"
                      type="text"
                      label="年"
                      dense
                      v-model.trim="inputYear"
                      :rules="[
                        (val) =>
                          (val && val.toString().length > 0) || '年を入力してください',
                      ]"
                    />
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <q-input
                      v-model="inputMonth"
                      type="text"
                      dense
                      label="月"
                      v-model.trim="inputMonth"
                      :rules="[
                        (val) =>
                          (val && val.toString().length > 0) || '月を入力してください',
                      ]"
                    />
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <q-input
                      v-model="inputDay"
                      type="text"
                      dense
                      label="日"
                      v-model.trim="inputDay"
                      :rules="[
                        (val) =>
                          (val && val.toString().length > 0) || '日を入力してください',
                      ]"
                    />
                  </div>
                </div>
              </q-item-label>
            </div>
            <div v-if="targettable == 'movepast' || targettable == 'createpast'">
              <q-item-label caption
                >命日
                <div class="row">
                  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <q-input
                      v-model="inputDeadYear"
                      type="text"
                      label="年"
                      dense
                      v-model.trim="inputDeadYear"
                      :rules="[
                        (val) =>
                          (val && val.toString().length > 0) || '年を入力してください',
                      ]"
                    />
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <q-input
                      v-model="inputDeadMonth"
                      type="text"
                      dense
                      label="月"
                      v-model.trim="inputDeadMonth"
                      :rules="[
                        (val) =>
                          (val && val.toString().length > 0) || '月を入力してください',
                      ]"
                    />
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                    <q-input
                      v-model="inputDeadDay"
                      type="text"
                      dense
                      label="日"
                      v-model.trim="inputDeadDay"
                      :rules="[
                        (val) =>
                          (val && val.toString().length > 0) || '日を入力してください',
                      ]"
                    />
                  </div>
                </div>
              </q-item-label>
              <div class="col-5">
                <q-input
                  v-model="inputPlaceofDeath"
                  type="text"
                  label="墓地番号"
                  class="q-mb-xs"
                  v-model.trim="inputPlaceofDeath"
                  :rules="[
                    (val) =>
                      (val && val.toString().length > 0) || 'めいを入力してください',
                  ]"
                />
              </div>
            </div>
            <div v-if="targettable == 'current' || targettable == 'createcurrent'">
              <div class="col-5">
                <q-input
                  v-model="inputPostal"
                  type="text"
                  label="郵便番号"
                  class="q-mb-xs"
                  v-model.trim="inputPostal"
                />
              </div>
            </div>
            <div v-if="targettable == 'current' || targettable == 'createcurrent'">
              <div class="row justify-between">
                <div class="col-5">
                  <q-input
                    v-model="inputPref"
                    type="text"
                    label="都道府県"
                    v-model.trim="inputPref"
                  />
                </div>
                <div class="col-5">
                  <q-input
                    v-model="inputCity"
                    type="text"
                    label="市町村"
                    v-model.trim="inputCity"
                  />
                </div>
                <div class="col-5">
                  <q-input
                    v-model="inputStreet"
                    type="text"
                    label="町域・番地"
                    v-model.trim="inputStreet"
                  />
                </div>
                <div class="col-5">
                  <q-input
                    v-model="inputAddress"
                    type="text"
                    label="建物名など"
                    v-model.trim="inputAddress"
                  />
                </div>
              </div>
            </div>
            <div v-if="targettable == 'current' || targettable == 'createcurrent'">
              <q-input
                v-model="inputComment"
                type="textarea"
                label="家族メモ(寺院様のみご覧いただけます)"
                class="q-mb-xs"
                v-model.trim="inputComment"
              />
            </div>
            <div v-else>
              <q-input
                v-model="inputComment"
                type="textarea"
                label="故人メモ(寺院様のみご覧いただけます)"
                class="q-mb-xs"
                v-model.trim="inputComment"
              />
            </div>
            <div class="flex column">
              <div class="q-mb-md">
                <q-btn
                  label="保存"
                  type="submit"
                  color="primary"
                  style="margin-right: 10px"
                />
                <q-btn color="primary" label="キャンセル" @click="onCancel" />

                  <q-btn
                    label="リセット"
                    type="reset"
                    color="primary"
                    flat
                    v-if="targettable == 'createcurrent' || targettable == 'createpast'"
                  />
 
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-inner-loading
          :showing="isLoadingUser"
          color="primary"
        />
  </q-page>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import { positiveMessage, negativeMessage } from "src/composable/light-notify";
import { dankalistDetail } from "../composable/column-tables";
import * as dayjs from "dayjs";
import ja from "dayjs/locale/ja";
dayjs.locale(ja);

import router from "src/router";

dayjs().format();
const columns = dankalistDetail;

export default {
  setup() {
    // General Variables
    const $store = useStore();
    const $q = useQuasar();
    const route = useRoute();
    const $router = useRouter();

    // Table variables
    const mourning = ref([]);
    const rows = ref([]);
    const currentfamily = ref([]);
    const targetcurrent = ref([]);
    const targetpast = ref([]);
    const birthDaycurrent = ref([]);
    const birthDaypast = ref([]);
    const deathDay = ref([]);

    const currentAge = ref([]);
    const pastAge = ref([]);
    const filter = ref("");
    const family = ref("");

    const hiddenTable = ref(false);
    const isLoadingUser = ref(false);
    const showSimulatedReturnData = ref(false);

    // Dialogs
    let isDialogOpen = ref(false);
    let isDeleteDialogOpen = ref(false);

    let inputLastName = ref("");
    let inputFirstName = ref("");
    let inputLastNameKana = ref("");
    let inputFirstNameKana = ref("");
    let inputYear = ref("");
    let inputMonth = ref("");
    let inputDay = ref("");
    let inputDeadYear = ref("");
    let inputdharmaName = ref("");
    let inputDeadMonth = ref("");
    let inputDeadDay = ref("");
    let inputPostal = ref("");
    let inputPlaceofDeath = ref("");
    let inputPref = ref("");
    let inputCity = ref("");
    let inputAddress = ref("");
    let inputStreet = ref("");
    let inputComment = ref("");

    let authors = ref(null);
    let authorSelected = ref(null);

    let dialogTitle = ref("");
    let targettable = ref("");
    let resourceForUpdate = ref({});
    let resourceForDelete = ref({});

    const isDarkModeActive = computed(() => $q.dark.isActive);

    // GEt all data for the first render
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
      try {
        // console.log("page示します");
        // console.log(route.params.page);
        // if (route.params.filter != null) {
        //   console.log("route.params.filter", route.params.filter);
        //   await $store.dispatch("dankaModule/searchBooksDanka", {
        //     page: route.params.page,
        //     value: route.params.filter,
        //   });
        // } else {
        //   await $store.dispatch("dankaModule/readBooks", {
        //     page: route.params.page,
        //   });
        // }
        // console.log($store.state.dankaModule.families.data);
        // const family = $store.state.dankaModule.families.data;
        // console.log("family", family);
        // let familyid = route.params.id;
        // console.log(familyid);
        // const targetfamily = family.find((v) => v.id == familyid);
        // console.log(targetfamily);

        // rows.value = targetfamily;

        console.log(route.params.id);
        await $store.dispatch("dankaModule/readRepresentative", {
          ReadID: route.params.id,
        });
        console.log($store.state.dankaModule.RepresentativeData.data);
        rows.value = $store.state.dankaModule.RepresentativeData.data;

        await $store.dispatch("dankaModule/readBooks", {
          ReadID: route.params.id,
        });

        console.log($store.state.dankaModule.families.data);
        family.value = $store.state.dankaModule.families.data;
        console.log(family.value[0].id);

        console.log("現在帳");
        // await $store.dispatch("currentModule/searchBooks", familyid);
        await $store.dispatch("currentModule/readBooks", {
          ReadID: family.value[0].id,
        });
        // console.log(dayjs('2000-01-01-10:30').format('YYYY/MM/DD/HH'))
        console.log($store.state.currentModule.currentfamily);
        targetcurrent.value = $store.state.currentModule.currentfamily;
        console.log("targetcurrent.value", targetcurrent.value);
        console.log("length", targetcurrent.value.length);
        for (var i = 0; i < targetcurrent.value.length; i++) {
          console.log("targetcurrent", targetcurrent.value[i]);
          console.log("かな苗字", targetcurrent.value[i].last_name);
          console.log(targetcurrent.value[i].date_of_birth);
          birthDaycurrent.value[i] = dayjs(targetcurrent.value[i].date_of_birth).format(
            "YYYY年MM月DD日"
          );
          currentAge.value[i] = dayjs().diff(targetcurrent.value[i].date_of_birth, "year");
        }

        console.log("過去帳");
        // await $store.dispatch("pastModule/readBooks", {
        //   page:familyid
        // });
        console.log("data", $store.state.pastModule.currentfamily);
        targetpast.value = $store.state.currentModule.pastfamily;
        console.log("targetpast.value", targetpast.value);
        console.log("length", targetpast.value.length);
        for (var i = 0; i < targetpast.value.length; i++) {
          console.log("targetpast", targetpast.value[i]);
          console.log(targetpast.value[i].date_of_birth);
          birthDaypast.value[i] = dayjs(targetpast.value[i].date_of_birth).format(
            "YYYY年MM月DD日"
          );
          deathDay.value[i] = dayjs(targetpast.value[i].date_of_death).format("YYYY年MM月DD日");
          pastAge.value[i] = dayjs(targetpast.value[i].date_of_death).diff(
            targetpast.value[i].date_of_birth,
            "year"
          );
        }
        isLoadingUser.value = false;
        showSimulatedReturnData.value = true;
      } catch (e) {
        console.log("EROOR発生しました");
        negativeMessage("Error", "データの読み込み中にエラーが発生しました");
        isLoadingUser.value = false;
        showSimulatedReturnData.value = true;
      }
    })();

    // Events in the page
    const openEditDialog = (data = null, target) => {
      console.log("data", data);
      isDialogOpen.value = !isDialogOpen.value;
      if (data) {
        dialogTitle.value = data.last_name + data.first_name + "様";
        inputLastName.value = data.last_name;
        inputFirstName.value = data.first_name;
        inputLastNameKana.value = data.last_name_kana;
        inputFirstNameKana.value = data.first_name_kana;
        inputYear.value = dayjs(data.birth).format("YYYY");
        console.log(dayjs(data.birth).format("YYYY"));
        inputMonth.value = dayjs(data.birth).format("MM");
        console.log(dayjs(data.birth).format("MM"));
        inputDay.value = dayjs(data.birth).format("DD");
        console.log(dayjs(data.birth).format("DD"));
        inputPref.value = data.pref;
        inputCity.value = data.city;
        inputComment.value = data.message;
        inputPostal.value = data.postcode;
        inputAddress.value = data.address;
        inputStreet.value = data.street;
        resourceForUpdate.value = data;
        console.log(inputYear.value + "-" + inputMonth.value + "-" + inputDay.value);
        if (target == "current") {
          console.log("target is current");
          targettable.value = target;
        } else {
          console.log("target is past");
          targettable.value = target;
        }
        return;
      } else if (target == "newcurrent") {
        dialogTitle.value = "新規檀家情報";
        targettable.value = "createcurrent";
      } else {
        dialogTitle.value = "過去帳新規追加";
        targettable.value = "createpast";
      }
    };

    const openMoveDialog = (data) => {
      dialogTitle.value =
        data.last_name + data.first_name + "様を現在帳から過去帳へ移動させます";
      inputLastName.value = data.last_name;
      inputFirstName.value = data.first_name;
      inputLastNameKana.value = data.last_name_kana;
      inputFirstNameKana.value = data.first_name_kana;
      inputYear.value = dayjs(data.birth).format("YYYY");
      console.log(dayjs(data.birth).format("YYYY"));
      inputMonth.value = dayjs(data.birth).format("MM");
      console.log(dayjs(data.birth).format("MM"));
      inputDay.value = dayjs(data.birth).format("DD");
      console.log(dayjs(data.birth).format("DD"));
      inputPref.value = data.pref;
      inputCity.value = data.city;
      inputComment.value = data.message;
      inputPostal.value = data.postcode;
      inputAddress.value = data.address;
      inputStreet.value = data.street;
      resourceForUpdate.value = data;
      targettable.value = "movepast";
    };

    const openDeleteDialog = (data) => {
      isDeleteDialogOpen.value = !isDeleteDialogOpen.value;
      resourceForDelete.value = data;
    };

    const onDeleteBook = async (id) => {
      try {
        await $store.dispatch("currentModule/deleteBook", { id });
        positiveMessage("データ編集", "リソースが変更されました");
        targetcurrent.value = $store.state.currentModule.currentfamily.data;
        isDeleteDialogOpen.value = false;
      } catch (error) {
        negativeMessage("Error", "リソースの削除に失敗しました");
      }
    };

    const onCancel = () => {
      onReset();
      isDialogOpen.value = !isDialogOpen.value;
    };

    const onSubmit = async () => {
      if (targettable.value === "createcurrent") {
        try {
          console.log("createします");
          console.log(route.params.id);

          await $store.dispatch("currentModule/createBook", {
            id: family.value[0].id,
            type: "檀家",
            gender: "男",
            place_of_birth: inputPref.value,
            last_name: inputLastName.value,
            last_name_kana: inputLastNameKana.value,
            first_name: inputFirstName.value,
            first_name_kana: inputFirstNameKana.value,
            date_of_birth: inputYear.value + "-" + inputMonth.value + "-" + inputDay.value,
            pref: inputPref.value,
            city: inputCity.value,
            email: inputFirstName.value + "@teraiku.jp",
            message: inputComment.value,
            postcode: inputPostal.value,
            address: inputAddress.value,
            street: inputStreet.value,
            is_alive: true,
          });
          positiveMessage("Creacion", "新しいリソースが作成されました");
          await $store.dispatch("currentModule/searchBooks", route.params.id);
          targetcurrent.value = $store.state.currentModule.currentfamily.data;
          const i = targetcurrent.value.length - 1;
          birthDaycurrent.value[i] = dayjs(targetcurrent.value[i].birth).format(
            "YYYY年MM月DD日"
          );
          currentAge.value[i] = dayjs().diff(targetcurrent.value[i].birth, "year");
          isDialogOpen.value = false;
          onReset();
        } catch (e) {
          negativeMessage("Error", "リソースの作成中にエラーが発生しました");
        }
      } else if (targettable.value === "createpast") {
        try {
          console.log("createします");
          console.log(route.params.id);
          console.log(family.value)

          await $store.dispatch("currentModule/createPast", {
            id: family.value[0].id,
            type: "檀家",
            gender: "男",
            place_of_birth: inputPref.value,
            last_name: inputLastName.value,
            last_name_kana: inputLastNameKana.value,
            first_name: inputFirstName.value,
            first_name_kana: inputFirstNameKana.value,
            date_of_birth: inputYear.value + "-" + inputMonth.value + "-" + inputDay.value,
            date_of_death: inputDeadYear.value + "-" + inputDeadMonth.value + "-" + inputDeadDay.value,
            pref: inputPref.value,
            city: inputCity.value,
            email: inputFirstName.value + "@teraiku.jp",
            message: inputComment.value,
            postcode: inputPostal.value,
            address: inputAddress.value,
            street: inputStreet.value,
            is_alive: false,
          });
          positiveMessage("Creacion", "新しいリソースが作成されました");
          targetpast.value = $store.state.currentModule.pastfamily;
          const i = targetpast.value.length - 1;
          console.log(targetpast.value[i].id)
          await $store.dispatch("pastModule/createBook", {
            id: 4,
            resources: targetpast.value[i].id,
          });
          birthDaypast.value[i] = dayjs(targetpast.value[i].date_of_birth).format(
            "YYYY年MM月DD日"
          );
          deathDay.value[i] = dayjs(targetpast.value[i].date_of_death).format("YYYY年MM月DD日");
          pastAge.value[i] = dayjs(targetpast.value[i].date_of_death).diff(
            targetpast.value[i].birth,
            "year"
          );
          const deathday = dayjs(targetpast.value[i].date_of_death).format("YYYY-MM-DD");
          console.log(deathday);
          await $store.dispatch("dateofdeathModule/createBook", {
            id: targetpast.value[i].id,
            name: targetpast.value[i].last_name + targetpast.value[i].first_name,
            gender: targetpast.value[i].gender,
            date_of_death: deathday,
            day7: dayjs(deathday).add(7, "d").format("YYYY-MM-DD"),
            day27: dayjs(deathday).add(27, "d").format("YYYY-MM-DD"),
            day37: dayjs(deathday).add(37, "d").format("YYYY-MM-DD"),
            day57: dayjs(deathday).add(57, "d").format("YYYY-MM-DD"),
            day67: dayjs(deathday).add(67, "d").format("YYYY-MM-DD"),
            day77: dayjs(deathday).add(77, "d").format("YYYY-MM-DD"),
            day100: dayjs(deathday).add(100, "d").format("YYYY-MM-DD"),
            year1: dayjs(deathday).add(1, "y").format("YYYY-MM-DD"),
            year3: dayjs(deathday).add(3, "y").format("YYYY-MM-DD"),
            year7: dayjs(deathday).add(7, "y").format("YYYY-MM-DD"),
            year13: dayjs(deathday).add(13, "y").format("YYYY-MM-DD"),
            year17: dayjs(deathday).add(17, "y").format("YYYY-MM-DD"),
            year23: dayjs(deathday).add(23, "y").format("YYYY-MM-DD"),
            year25: dayjs(deathday).add(25, "y").format("YYYY-MM-DD"),
            year27: dayjs(deathday).add(27, "y").format("YYYY-MM-DD"),
            year33: dayjs(deathday).add(33, "y").format("YYYY-MM-DD"),
            year50: dayjs(deathday).add(50, "y").format("YYYY-MM-DD"),
          });
          isDialogOpen.value = false;
          onReset();
        } catch (e) {
          negativeMessage("Error", "リソースの作成中にエラーが発生しました");
        }
      } else if (targettable.value === "current") {
        console.log("value current");
        try {
          await $store.dispatch("currentModule/updateBook", {
            id: resourceForUpdate.value.id,
            last_name: inputLastName.value,
            last_name_kana: inputLastNameKana.value,
            first_name: inputFirstName.value,
            first_name_kana: inputFirstNameKana.value,
            birth: inputYear.value + "-" + inputMonth.value + "-" + inputDay.value,
            pref: inputPref.value,
            city: inputCity.value,
            message: inputComment.value,
            postcode: inputPostal.value,
            address: inputAddress.value,
            street: inputStreet.value,
          });
          positiveMessage("生成", "新しいリソース作成されました");
          await $store.dispatch("currentModule/searchBooks", route.params.id);
          targetcurrent.value = $store.state.currentModule.currentfamily.data;
          isDialogOpen.value = false;
          onReset();
        } catch (error) {
          negativeMessage("Error", "リソースの変更中にエラーが発生しました");
        }
      } else if (targettable.value === "past") {
        console.log("value past");
        try {
          await $store.dispatch("pastModule/updateBook", {
            id: resourceForUpdate.value.id,
            last_name: inputLastName.value,
            last_name_kana: inputLastNameKana.value,
            first_name: inputFirstName.value,
            first_name_kana: inputFirstNameKana.value,
            birth: inputYear.value + "-" + inputMonth.value + "-" + inputDay.value,
            pref: inputPref.value,
            city: inputCity.value,
            message: inputComment.value,
            postcode: inputPostal.value,
            address: inputAddress.value,
            street: inputStreet.value,
          });
          positiveMessage("生成", "新しいリソース作成されました");
          await $store.dispatch("pastModule/searchBooks", route.params.id);
          targetpast.value = $store.state.pastModule.pastfamily.data;
          isDialogOpen.value = false;
          onReset();
        } catch (error) {
          negativeMessage("Error", "リソースの変更中にエラーが発生しました");
        }
      } else {
        try {
          console.log("move to pastbook");
          await $store.dispatch("pastModule/createBook", {
            family_id: route.params.id,
            place_of_birth: inputPref.value,
            place_of_death: inputPlaceofDeath.value,
            last_name: inputLastName.value,
            last_name_kana: inputLastNameKana.value,
            first_name: inputFirstName.value,
            first_name_kana: inputFirstNameKana.value,
            dharma_name: inputdharmaName.value,
            birth: inputYear.value + "-" + inputMonth.value + "-" + inputDay.value,
            death: inputDeadYear.value + "-" + inputDeadMonth.value + "-" + inputDeadDay.value,
            pref: inputPref.value,
            city: inputCity.value,
            email: inputFirstName.value + "@teraiku.jp",
            message: inputComment.value,
            postcode: inputPostal.value,
            address: inputAddress.value,
            steet: inputStreet.value,
          });
          positiveMessage("Creacion", "新しいリソースが作成されました");
          await $store.dispatch("currentModule/deleteBook", resourceForUpdate.value.id);
          targetcurrent.value = $store.state.currentModule.currentfamily.data;
          const j = targetcurrent.value.length - 1;
          birthDaycurrent.value[j] = dayjs(targetcurrent.value[j].birth).format(
            "YYYY年MM月DD日"
          );
          currentAge.value[j] = dayjs().diff(targetcurrent.value[j].birth, "year");
          await $store.dispatch("pastModule/searchBooks", route.params.id);
          targetpast.value = $store.state.pastModule.pastfamily.data;
          const i = targetpast.value.length - 1;
          birthDaypast.value[i] = dayjs(targetpast.value[i].birth).format(
            "YYYY年MM月DD日"
          );
          deathDay.value[i] = dayjs(targetpast.value[i].death).format("YYYY年MM月DD日");
          pastAge.value[i] = dayjs(targetpast.value[i].death).diff(
            targetpast.value[i].birth,
            "year"
          );
          isDialogOpen.value = false;
          onReset();
        } catch (e) {
          negativeMessage("Error", "リソースの作成中にエラーが発生しました");
        }
      }
    };

    const onReset = () => {
      inputLastName.value = "";
      inputLastNameKana.value = "";
      inputFirstName.value = "";
      inputFirstNameKana.value = "";
      inputYear.value = "";
      inputMonth.value = "";
      inputDay.value = "";
      inputDeadYear.value = "";
      inputDeadMonth.value = "";
      inputDeadDay.value = "";
      inputdharmaName.value = "";
      inputPlaceofDeath.value = "";
      inputPref.value = "";
      inputCity.value = "";
      inputComment.value = "";
      inputPostal.value = "";
      inputAddress.value = "";
      inputStreet.value = "";
    };

    const goBack = () => {
      console.log("route.params.page", route.params.page);
      $router.push({
        name: "DankaList",
      });
    };

    const displayTable = async (date) => {
      if (hiddenTable.value === false) {
        console.log(date.date_of_death);
        const deathday = dayjs(date.date_of_death).format("YYYY-MM-DD");
        
        const day0 = dayjs(deathday).format("YYYY年MM月DD日 (dddd)");
        const day1 = dayjs(deathday).add(6, "d").format("YYYY年MM月DD日 (dddd)");
        const day2 = dayjs(deathday).add(13, "d").format("YYYY年MM月DD日 (dddd)");
        const day3 = dayjs(deathday).add(20, "d").format("YYYY年MM月DD日 (dddd)");
        const day4 = dayjs(deathday).add(27, "d").format("YYYY年MM月DD日 (dddd)");
        const day5 = dayjs(deathday).add(34, "d").format("YYYY年MM月DD日 (dddd)");
        const day6 = dayjs(deathday).add(41, "d").format("YYYY年MM月DD日 (dddd)");
        const day7 = dayjs(deathday).add(48, "d").format("YYYY年MM月DD日 (dddd)");
        const day8 = dayjs(deathday).add(99, "d").format("YYYY年MM月DD日 (dddd)");
        const day9 = dayjs(deathday).add(1, "y").format("YYYY年MM月DD日 (dddd)");
        const day10 = dayjs(deathday).add(2, "y").format("YYYY年MM月DD日 (dddd)");
        const day11 = dayjs(deathday).add(6, "y").format("YYYY年MM月DD日 (dddd)");
        const day12 = dayjs(deathday).add(12, "y").format("YYYY年MM月DD日 (dddd)");
        const day13 = dayjs(deathday).add(16, "y").format("YYYY年MM月DD日 (dddd)");
        const day14 = dayjs(deathday).add(22, "y").format("YYYY年MM月DD日 (dddd)");
        const day15 = dayjs(deathday).add(24, "y").format("YYYY年MM月DD日 (dddd)");
        const day16 = dayjs(deathday).add(26, "y").format("YYYY年MM月DD日 (dddd)");
        const day17 = dayjs(deathday).add(32, "y").format("YYYY年MM月DD日 (dddd)");
        const day18 = dayjs(deathday).add(49, "y").format("YYYY年MM月DD日 (dddd)");

        mourning.value = [
          {
            plan: " 命日",
            scheduled: day0,
            passaway: "御命日",
          },
          {
            plan: " 初七日忌・一七日忌",
            scheduled: day1,
            passaway: "７日目",
          },
          {
            plan: "二七日忌",
            scheduled: day2,
            passaway: "14日目",
          },
          {
            plan: "三七日忌",
            scheduled: day3,
            passaway: "21日目",
          },
          {
            plan: "四七日忌",
            scheduled: day4,
            passaway: "28日目",
          },
          {
            plan: "五七日忌・三十五日忌",
            scheduled: day5,
            passaway: "35日目",
          },
          {
            plan: "六七日忌",
            scheduled: day6,
            passaway: "42日目",
          },
          {
            plan: "七七日忌・四十九日忌",
            scheduled: day7,
            passaway: "49日目",
          },
          {
            plan: "百か日忌",
            scheduled: day8,
            passaway: "100日目",
          },
          {
            plan: "一周忌",
            scheduled: day9,
            passaway: "満1年目",
          },
          {
            plan: "三回忌",
            scheduled: day10,
            passaway: "満2年目",
          },
          {
            plan: "七回忌",
            scheduled: day11,
            passaway: "満6年目",
          },
          {
            plan: "十三回忌",
            scheduled: day12,
            passaway: "満12年目",
          },
          {
            plan: "十七回忌",
            scheduled: day13,
            passaway: "満16年目",
          },
          {
            plan: "二十三回忌",
            scheduled: day14,
            passaway: "満22年目",
          },
          {
            plan: "二十五回忌",
            scheduled: day15,
            passaway: "満24年目",
          },
          {
            plan: "二十七回忌",
            scheduled: day16,
            passaway: "満26年目",
          },
          {
            plan: "三十三回忌",
            scheduled: day17,
            passaway: "満32年目",
          },
          {
            plan: "五十回忌",
            scheduled: day18,
            passaway: "満49年目",
          },
        ];
        console.log(mourning.value)

        hiddenTable.value = true;
        console.log("開く");
      } else {
        hiddenTable.value = false;
        console.log("閉じる");
      }
    };

    // Return reactive variables
    return {
      isLoadingUser,
      showSimulatedReturnData,
      authors,
      authorSelected,
      columns,
      dialogTitle,
      targettable,
      filter,
      family,

      inputYear,
      inputMonth,
      inputDay,
      inputDeadYear,
      inputdharmaName,
      inputDeadMonth,
      inputDeadDay,
      inputPref,
      inputCity,
      inputComment,
      inputLastName,
      inputLastNameKana,
      inputFirstName,
      inputFirstNameKana,

      inputPostal,
      inputPlaceofDeath,
      inputAddress,
      inputStreet,

      isDarkModeActive,
      isDeleteDialogOpen,
      isDialogOpen,
      resourceForUpdate,
      resourceForDelete,
      rows,
      currentfamily,
      targetcurrent,
      targetpast,
      birthDaycurrent,
      birthDaypast,
      deathDay,
      currentAge,
      pastAge,
      onCancel,
      onReset,
      onSubmit,
      openEditDialog,
      onDeleteBook,
      openMoveDialog,
      openDeleteDialog,
      goBack,

      displayTable,
      hiddenTable,
      mourning,
    };
  },
  watch: {
    $route(to, from) {
      console.log(to, from);
    },
  },
  computed: {
    routeID: function () {
      let routeID = this.$route.params.id != undefined ? this.$route.params.id : "3";
      console.log(routeID);
      return routeID;
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../css/table-pages.scss";

.button {
  text-align: right;
}

.btn-tel {
  position: relative;
  display: block;
  border-radius: 50px;
  color: white;
  font-weight: bold;
  text-align: center;
  background: #f75065;
  padding: 5px 0;
  margin: auto;
  max-width: 250px;
  text-decoration: none;
}

.btn-tel::after {
  content: "";
  width: 24px;
  height: 24px;
  position: absolute;
  top: calc(50% - 12px);
  left: 15px;
}

.tablebottom {
  min-height: 0px;
  padding: none;
  font-size: none;
}

.item {
  padding: 5px;
  border: 1px solid #ccc;
}

.containers {
  // border: 1px solid #ccc;
  display: grid;
  // gap: 5px;
  grid-template-columns: 1fr 3fr 2fr;
  grid-template-rows: 60px 60px 60px 60px auto;
}

//現在帳
.box-big1 {
  grid-column: 1 / 2;
  grid-row: 1 / 4;
}
.box-big2 {
  grid-column: 2 / 4;
  grid-row: 1/ 2;
}
.box-big3 {
  grid-column: 2 / 3;
  grid-row: 3 / 4;
}
.box-big4 {
  grid-column: 2 / 4;
  grid-row: 2 / 3;
}
.box-big5 {
  grid-column: 3/4;
  grid-row: 3/4;
  margin: 0px 0px;
}
.box-big6 {
  grid-column: 1 / 4;
}

.smartphoneSize {
  padding: 5px;
}

.smartphoneSizeIMG {
  max-width: 100px;
  height: 100px;
}

//過去帳
.box-kako1 {
  grid-column: 1 / 2;
  grid-row: 1 / 5;
}
.box-kako2 {
  grid-column: 2 / 4;
  grid-row: 1 / 2;
}
.box-kako3 {
  grid-column: 2 / 3;
  grid-row: 3 / 4;
}
.box-kako4 {
  grid-column: 2 / 3;
  grid-row: 4 / 5;
}
.box-kako5 {
  grid-column: 2 / 4;
  grid-row: 2 / 3;
}

.box-kako6 {
  grid-column: 3 / 4;
  grid-row: 3 / 4;
  margin: 0px 0px;
}
.box-kako7 {
  grid-column: 3 / 4;
  grid-row: 4 / 5;
  margin: 0px 0px;
}
.box-kako8 {
  grid-column: 1 / 4;
}

.textCenter {
  padding: 2px;
}

.btnSize {
  width: 10px;
  height: 10px;
}

.SortOrder {
  display:inline-block;
  padding:10px
}
</style>
