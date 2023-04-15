<template>
  <q-page class="q-pa-lg">

    <div class="container">
      <div class="row">
        <div class="column">
          <h4>一斉連絡(メール送信)ウィザード</h4>
        </div>
      </div>
      <div class="row">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 column">
        <q-stepper
          v-model="step"
          header-nav
          ref="stepper"
          color="primary"
          animated
        >

    <!---------------------------------------------------->
    <!---------------------- 1ページ目 ---------------------->
    <!---------------------------------------------------->

          <q-step
            :name="1"
            title="送信の準備"
            icon="mail"
            :done="step > 1"
            :header-nav="step > 1"
          >
            <div class="row">
                <q-list>

      <q-item tag="label" v-ripple>
        この画面では、コンタクトリストに登録された方のメールアドレスを複数選択し、
        <br>「てらいくシステム」からメールによる一斉連絡が行なえます。
        <br>※ このメールの送信元のシステムメールアドレスには、受信者から返信いただくことはできません。
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-radio v-model="emailMethod" val="to" />
        </q-item-section>
        <q-item-section>
          <q-item-label>メールの宛先は、次の画面でリストから複数選んでいただけます。</q-item-label>
        </q-item-section>
      </q-item>
<!--
      <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-radio v-model="emailMethod" val="orange"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>CC・・・宛先以外の人に同時に報告したい場合</q-item-label>
        </q-item-section>
      </q-item> -->

      <q-item tag="label" v-ripple>
        <q-item-section avatar top>
          <q-radio v-model="emailMethod" val="cyan"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>ご自身の個人アドレスにもメールが送信されます。</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

            </div>

            <q-stepper-navigation>
              <q-btn  @click="() => { done1 = true; step = 2 }" class="float-right q-mr-md q-mb-md" color="blue"
                     label="Next"/>
            </q-stepper-navigation>
          </q-step>

    <!---------------------------------------------------->
    <!---------------------- 2ページ目 ---------------------->
    <!---------------------------------------------------->

          <q-step
            :name="2"
            title="送信先の選択"
            icon="people"
            :done="step > 2"
            :header-nav="step > 2"
          >

            <div class="row">

                <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <q-item-section>
                    送信先：To
                </q-item-section>
                </q-item>
                <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <q-item-section>
                    <q-input type="email" dense  round
                            v-model="emailContents.name"
                            label="Toのメールアドレス入力"/>
                </q-item-section>
                </q-item>
            <div class="col-12">
                <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <q-item-section>
                    送信先：
                </q-item-section>
                </q-item>
              <q-table
              title="Profile"
              :rows="rows"
              :columns="columns"
              row-key="id"
              :filter="filter"
              :loading="isLoadingTable"
              :rows-per-page-options="[5]"
              selection="multiple"
              v-model:selected="selected"
            >
            <template v-slot:top>
                <q-space />
                <q-input
                  outlined
                  dense
                  label="送信先検索"
                  debounce="300"
                  color="primary"
                  v-model="filter"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </template>
            </q-table>
             </div>
            </div>

            <q-stepper-navigation>
              <q-btn  @click="() => { done2 = true; step = 3 }" class="float-right q-mr-md q-mb-md" color="blue"
                     label="Next"/>
              <q-btn flat @click="step = 1" color="primary"  label="Back" class="q-mr-sm float-right"/>
            </q-stepper-navigation>
          </q-step>

    <!---------------------------------------------------->
    <!---------------------- 3ページ目 ---------------------->
    <!---------------------------------------------------->

          <q-step
            :name="3"
            title="メール送信"
            icon="mdi-email-edit"
            :done="step > 3"
            :header-nav="step > 3"
          >
            <div class="row">
                <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <q-item-section>
                    送信先：To
                </q-item-section>
                </q-item>
                <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <q-item-section>
                    <q-input type="email" dense  round
                            v-model="emailContents.name"
                            label="Toのメールアドレス表示"/>
                </q-item-section>
                </q-item>
                <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <q-item-section>
                    送信先一覧：BCC
                </q-item-section>
                </q-item>
                <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <q-item-section>
                    <q-input type="email" dense round v-model="emailContents.email"
                        label="全ての送信先メール"/>
                </q-item-section>
                </q-item>
                <q-item class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <q-item-section>
                    メール内容
                </q-item-section>
                </q-item>
                <q-item class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <q-item-section>
                    <q-input type="textarea" dense round outlined
                            v-model="emailContents.contents"
                            label="内容"/>
                </q-item-section>
                </q-item>
            </div>


            <q-stepper-navigation>
              <q-btn  @click="() => { done2 = true; step = 4 }" class="float-right q-mr-md q-mb-md" color="blue"
                     label="Next"/>
              <q-btn flat @click="step = 2" color="primary"  label="Back" class="q-mr-sm float-right"/>
            </q-stepper-navigation>
          </q-step>

    <!---------------------------------------------------->
    <!---------------------- 4ページ目 ---------------------->
    <!---------------------------------------------------->

        <q-step
            :name="4"
            title="メール確認"
            icon="mdi-email-Announceletter"
            :done="step > 4"
            :header-nav="step > 4"
          >

            <div class="row">
                <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section class="form-group">
                        <q-item-label caption>To</q-item-label>
                        <q-item-label class="form_answer">wada@atf.co.jp</q-item-label>
                    </q-item-section>
                </q-item>

                <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <q-item-section class="form-group">
                        <q-item-label caption>BCC</q-item-label>
                        <q-item-label caption class="form_answer" dark>wada@atf.co.jp</q-item-label>
                    </q-item-section>
                </q-item>


                <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <q-item-section class="form-group">
                        <q-item-label caption>メール内容</q-item-label>
                        <q-item-label caption class="form_answer">
                            お疲れ様です。<br>
                            お仕事の件でご連絡させていただきました。

                        </q-item-label>
                    </q-item-section>
                </q-item>
            </div>

            <q-stepper-navigation>
              <q-btn  @click="() => { done2 = true; step = 5 }" class="float-right q-mr-md q-mb-md" color="blue"
                     label="Next"/>
              <q-btn flat @click="step = 3" color="primary"  label="Back" class="q-mr-sm float-right"/>
            </q-stepper-navigation>
          </q-step>



    <!---------------------------------------------------->
    <!---------------------- 5ページ目 ---------------------->
    <!---------------------------------------------------->


        <q-step
            :name="5"
            title="メール送信"
            icon="mdi-email-send-outline"
            :header-nav="step > 5"
          >

            <div class="row">
              <div class="col-6">
                <q-item>
                  <q-item-section>
                    <q-item-label>メールが送信されました</q-item-label>
                  </q-item-section>
                </q-item>
              </div>

            </div>



            <q-stepper-navigation>

              <!-- <q-btn  @click="done3 = true" class="float-right q-mr-md q-mb-md" color="blue"
                     label="Place Order"/> -->
              <q-btn flat @click="step = 4" color="primary"  label="Back" class="q-mr-sm float-right"/>
            </q-stepper-navigation>
          </q-step>
        </q-stepper>
      </div>
    </div>
      </div>

  </q-page>
</template>

<script>
import {defineComponent} from 'vue';
import {ref} from 'vue';
import { useStore } from "vuex";

import { positiveMessage, negativeMessage } from "src/composable/light-notify";
import { emailForms } from "../composable/column-tables";

const columns = emailForms;

export default defineComponent({
  name: "Checkout",
  components: {
  },
  setup() {
    const $store = useStore();
    const isLoadingTable = ref(false);
    const filter = ref("");
    const rows = ref([]);
    const selected = ref([]);

    // GEt all data for the first render
    (async function setupBooks() {
      isLoadingTable.value = true;
      try {
        // await $store.dispatch("booksModule/readBooks");
        // isLoadingTable.value = false;
        // console.log($store.state.booksModule.books)
        // rows.value = $store.state.booksModule.books.data;
      } catch (e) {
        negativeMessage("Error", "データの読み込み中にエラーが発生しました");
      }
    })()


    return {
      step: ref(1),
      address_detail: ref({}),
      card_detail: ref({}),

      emailContents: {},

      emailMethod: ref(false),

      columns,
      isLoadingTable,
      filter,
      rows,
      selected

    }
  }
})
</script>

<style lang="sass" scoped>>
.form_answer
    font-size: 16px
    font-weight: 500
    padding: 2px 0px 0px 0px


.q-item__label--caption
    color: #000
// @media screen and (max-width: 768px)
.form-group
    margin-bottom: 10px
    padding-bottom: 10px
    border-bottom: solid 1px #eee



</style>
