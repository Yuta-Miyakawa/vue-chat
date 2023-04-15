<template>
 <q-page padding>
    <div class="container">
      <div class="row">
        <div class="column">
          <h5 style="margin:20px 0px">お知らせ投稿画面</h5>
        </div>
      </div>
      <div class="q-pa-md">
        <q-stepper v-model="step" header-nav ref="stepper" color="primary" animated>

          <!---------------------------------------------------->
          <!---------------------- 1ページ目 ---------------------->
          <!---------------------------------------------------->

          <q-step
            :name="1"
            title="投稿情報入力"
            icon="groups"
            :done="step > 1"
            :header-nav="step > 1"
          >
            <q-form @submit="onErrorProcess" class="q-gutter-md">
              <div class="row" style="margin: 0;">
                <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding: 0px 16px;">
                  <q-item-section>
                    <q-input
                      dense
                      outlined
                      label="送信元情報"
                      disable
                      v-model="inputSender"
                    >
                      <template v-slot:label>
                        <div>送信元情報<b style="color: red; font-size: 20px;">*</b></div>
                      </template>
                    </q-input>
                  </q-item-section>
                </q-item>
                <!-- <q-item class="col-lg-6 col-md-6 col-sm-6 col-xs-6" style="padding: 0px 16px;">
                  <q-item-section>
                    <q-input 
                      dense
                      outlined
                      v-model="inputPublishDate" 
                      label="公開日"
                    >
                      <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-date v-model="inputPublishDate" mask="YYYY/MM/DD HH:mm">
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-date>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                            <q-time v-model="inputPublishDate" mask="YYYY/MM/DD HH:mm" format24h>
                              <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                      <template v-slot:label>
                        <div>公開日(設定した日付に投稿されます。)<b style="color: red; font-size: 20px;">*</b></div>
                      </template>
                    </q-input>
                  </q-item-section>
                </q-item> -->
                <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding: 0px 16px;">
                  <q-item-section>
                    <div class="text-h7 q-mt-sm q-mb-xs" style="margin-bottom: 0px">
                      送信先人数：{{postList}}人
                    </div>  
                    <q-select 
                      dense
                      style="margin-top: 0px"
                      outlined
                      v-model="inputDestination" 
                      :options="options"
                      label="以下から送り先をお選びください" 
                      @update:model-value="searchPostList()"                  
                      :rules="[
                        (val) =>
                          (val && val.toString().length > 0) ||
                          '送信先情報を入力してください',
                      ]"
                    />
                  </q-item-section>
                </q-item>
              </div>
              <div class="text-h7 q-mt-sm q-mb-xs">
                テンプレートを使いますか？
                <q-checkbox v-model="openTemplate" color="primary" size="sm" @click="clickCheckbox()" />
              </div>
              <div v-if="openTemplate">
                <div class="text-h6 q-mt-sm q-mb-xs">テンプレート一覧</div>
                <div class="row">
                  <div class="column custom-column">
                    <div class="q-py-md user-table">
                      <q-table
                        :rows="rows"                          
                        :columns="columns"
                        row-key="name"
                        clickable
                        :loading="isLoadingTable"
                        :rows-per-page-options="[]"
                        v-model:pagination="pagination"
                        @request="onRequest"
                        @row-click="useTemplate" 
                        :visible-columns="visibleColumns"
                      >
                        <template v-slot:top>
                          <div v-if="$q.screen.gt.xs" class="col">
                            <q-toggle v-model="visibleColumns" val="type" label="種別" />
                            <q-toggle v-model="visibleColumns" val="template" label="文書名" />
                            <q-toggle v-model="visibleColumns" val="title" label="タイトル" />
                            <q-toggle v-model="visibleColumns" val="createHuman" label="制作者" />
                            <q-toggle v-model="visibleColumns" val="create" label="制作日" />
                            <q-toggle v-model="visibleColumns" val="updateHuman" label="更新者" />
                            <q-toggle v-model="visibleColumns" val="update" label="更新日" />
                          </div>
                          <q-select
                            v-else
                            v-model="visibleColumns"
                            multiple
                            borderless
                            dense
                            options-dense
                            display-value="リスト表示選択"
                            emit-value
                            map-options
                            :options="columns"
                            option-value="name"
                            style="min-width: 150px"
                          />
                        </template>
                        <!-- <template v-slot:body="props">
                          <q-tr :props="props" @click="useTemplate(props.row)">
                            <q-td key="id" :props="props">
                              <q-badge :color="{color}">
                                {{ props.row.id }}
                              </q-badge>
                            </q-td>
                            <q-td key="type" :props="props">
                              {{ props.row.type }}
                            </q-td>
                            <q-td key="template" :props="props">
                              {{ props.row.template_title }}
                            </q-td>
                            <q-td key="updadeHuman" :props="props">
                              {{ props.row.update_human }}
                            </q-td>
                            <q-td key="update" :props="props">
                              {{ props.row.updated_at }}
                            </q-td>
                          </q-tr>
                        </template> -->
                      </q-table>
                    </div>
                  </div>
                </div>
              </div>
            </q-form>
            <q-stepper-navigation>
              <q-btn
                @click="() => { step = 2 }" 
                class="float-right q-mr-md q-mb-md" 
                color="blue"
                label="次へ"
              />
            </q-stepper-navigation>
          </q-step>

          <!---------------------------------------------------->
          <!---------------------- ２ページ目 ---------------------->
          <!---------------------------------------------------->

          <q-step
            :name="2"
            title="投稿内容入力"
            icon="mail"
            :done="step > 2"
            :header-nav="step > 2"
          >
          <q-form @submit="onErrorProcess" class="q-gutter-mdt">
            <div class="q-pa-md">
              <div class="text-h5 q-mt-sm q-mb-xs">タイトル</div>
              <div>
                <q-input
                  type="text"
                  dense
                  round
                  v-model="inputTitleText"
                  :rules="[
                    (val) =>
                      (val && val.toString().length > 0) ||
                      'タイトルを入力してください',
                  ]"
                />
              </div>
            </div>
            <div class="q-pa-md">
              <div class="text-h5 q-mt-sm q-mb-xs">本文</div>
              <div>
                <q-editor

                  v-model="inputQeditorText"
                  :dense="$q.screen.lt.md"
                  :toolbar="[
                    [
                      {
                        label: $q.lang.editor.align,
                        icon: $q.iconSet.editor.align,
                        fixedLabel: true,
                        list: 'only-icons',
                        options: ['left', 'center', 'right', 'justify'],
                      },
                      {
                        label: $q.lang.editor.align,
                        icon: $q.iconSet.editor.align,
                        fixedLabel: true,
                        options: ['left', 'center', 'right', 'justify'],
                      },
                    ],
                    [
                      'bold',
                      'italic',
                      'strike',
                      'underline',
                      'subscript',
                      'superscript',
                    ],
                    ['token', 'hr', 'link', 'custom_btn'],

                    [
                      {
                        label: $q.lang.editor.formatting,
                        icon: $q.iconSet.editor.formatting,
                        list: 'no-icons',
                        options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
                      },
                      {
                        label: $q.lang.editor.fontSize,
                        icon: $q.iconSet.editor.fontSize,
                        fixedLabel: true,
                        fixedIcon: true,
                        list: 'no-icons',
                        options: [
                          'size-1',
                          'size-2',
                          'size-3',
                          'size-4',
                          'size-5',
                          'size-6',
                          'size-7',
                        ],
                      },
                      {
                        label: $q.lang.editor.defaultFont,
                        icon: $q.iconSet.editor.font,
                        fixedIcon: true,
                        list: 'no-icons',
                        options: [
                          'default_font',
                          'arial',
                          'arial_black',
                          'comic_sans',
                          'courier_new',
                          'impact',
                          'lucida_grande',
                          'times_new_roman',
                          'verdana',
                        ],
                      },
                      'removeFormat',
                    ],
                    ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

                    ['undo', 'redo'],
                    ['viewsource'],
                  ]"
                  :fonts="{
                    arial: 'Arial',
                    arial_black: 'Arial Black',
                    comic_sans: 'Comic Sans MS',
                    courier_new: 'Courier New',
                    impact: 'Impact',
                    lucida_grande: 'Lucida Grande',
                    times_new_roman: 'Times New Roman',
                    verdana: 'Verdana',
                  }"
                />
                <!--プリントとフルスクリーンの設定
            ['print', 'fullscreen'], -->
              </div>
            </div>
            

            <q-stepper-navigation>
              <q-btn  
                @click="() => { step = 3 }" 
                class="float-right q-mr-md q-mb-md" 
                color="blue"
                label="次へ"
              />
              <q-btn 
                flat 
                @click="step = 1" 
                color="primary"  
                label="戻る" 
                class="q-mr-sm float-right"
              />
              <!-- <q-btn
                class="float-right q-mr-md q-mb-md"
                color="orange"
                label="テンプレ一覧"
                style="transform: translate(-10px)"
                @click="templateDialog()"
              /> -->
            </q-stepper-navigation>
          </q-form>
          </q-step>

          <!---------------------------------------------------->
          <!---------------------- 3ページ目 ---------------------->
          <!---------------------------------------------------->

          <q-step
            :name="3"
            title="投稿内容確認"
            icon="people"
            :done="step > 3"
            :header-nav="step > 3"
          >
            <div class="row">
              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-item-label class="text-h5 q-mt-sm q-mb-xs">タイトル</q-item-label>
                  <q-card flat bordered>
                    <q-card-section>{{inputTitleText}}</q-card-section>
                  </q-card>
                </q-item-section>
              </q-item>

              <q-item class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <q-item-section>
                  <q-item-label class="text-h5 q-mt-sm q-mb-xs">本文</q-item-label>
                  <q-card flat bordered>
                    <q-card-section v-html="inputQeditorText" />
                  </q-card>
                </q-item-section>
              </q-item>

            </div>

            <q-stepper-navigation>
              <q-btn
                @click="onSubmit"
                class="float-right q-mr-md q-mb-md"
                color="blue"
                label="投稿する"
              />
              <!-- () => {
                    done2 = true;
                    step = 3;
                  } -->
              <q-btn
                flat
                @click="step = 2"
                color="primary"
                label="戻る"
                class="q-mr-sm float-right"
              />
            </q-stepper-navigation>
          </q-step>

          <!---------------------------------------------------->
          <!---------------------- 4ページ目 ---------------------->
          <!---------------------------------------------------->

          <q-step
            :name="4"
            title="投稿完了"
            icon="mdi-email-edit"
            :done="step > 4"
            :header-nav="step > 4"
          >
            <div class="row">
              <div class="col-6">
                <q-item>
                  <q-item-section>
                    <q-item-label>お知らせが投稿されました</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </div>

            <!-- <q-stepper-navigation>
              <q-btn
                flat
                @click="step = 2"
                color="primary"
                label="Back"
                class="q-mr-sm float-right"
              />
            </q-stepper-navigation> -->
          </q-step>
        </q-stepper>
      </div>
    </div>
  </q-page>

  <!-- テンプレートを設定するダイアログ -->

  <!-- <q-dialog v-model="isTemplateOpen" position="bottom">
    <q-card style="width: 50%">
      <div style="color: #666666; size: 20px">保存済みテンプレート一覧</div>
      <div v-for="templateIndex in rows.length" :key="templateIndex">
        <q-item>
          <q-item-section clickable v-ripple @click="templateInput(rows[templateIndex-1])">
            {{rows[templateIndex-1].title}}
          </q-item-section>
          <q-item-section avatar>
            <q-btn 
              color="red" 
              label="削除"
              dense
              round
              size="md"
              style="display: flex; justify-content: flex-end;"
              @click="templateDelete()"
            />
          </q-item-section>
        </q-item>
        <q-separator inset />
      </div>
      <q-card-section clickable v-ripple @click="newTemplate(inputTitleText, inputQeditorText)">
        下書きをテンプレートとして保存
      </q-card-section>
    </q-card>
  </q-dialog> -->
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { LocalStorage, useQuasar, date } from 'quasar';
import * as dayjs from "dayjs";
import { columnsForTemplateList } from "../composable/column-tables";
import { positiveMessage, negativeMessage } from "src/composable/light-notify";

const timeStamp = dayjs();
const columns = columnsForTemplateList;
const formattedString = dayjs(timeStamp).format('YYYY-MM-DD HH:mm');
// import sanitizeHTML from 'sanitize-html'

// const $sanitize = sanitizeHTML

export default defineComponent({
  name: "Checkout",
  components: {},
  setup() {
    const $store = useStore();
    const $router = useRouter();
 
    const step = ref(1);
    const isTemplateOpen = ref(false);
    const isLoadingTable = ref(false);
    const CurrentTime = ref("");
    const inputQeditorText = ref("");
    const inputSender = ref("");
    const inputDestination = ref([]);
    const inputTitleText = ref("");
    const inputPublishDate = ref(formattedString);
    const openTemplate = ref(false);
    const testclass = document.getElementsByClassName('q-editor');
    const rows = ref([]);
    const postList = ref(0);
    const color = ref();
    const pagination = ref({
      sortBy: "name",
      page: 1,
      rowsPerPage: 1,
      rowsNumber: 1,
    });
    let options = ['檀家様全員へ送信', 'ご関係者様へ送信', '檀家様代表者へ送信', '信者様へ送信']
    const visibleColumns  = ref([ 'type', 'template', 'title', 'createHuman', 'create', 'updateHuman', 'update' ]);
    const UserID = ref('');
    const TenantID = ref('');
    const TenantmasterID = ref('');
    const UserName = ref('');

    // GEt all data for the first render
    (async function setupBooks() {
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
        UserID.value = user.id; 
        UserName.value = user.name;
        const stateTenant = LocalStorage.getItem("stateTenant");
        TenantmasterID.value = stateTenant.tenantmaster_id;
        TenantID.value = stateTenant.id;
        console.log(TenantmasterID.value)
        console.log(inputPublishDate.value)
      }catch (e) {
        console.log(e.response)
        if(e.response.status === 401) {
          $router.replace("/login");
          await $store.dispatch("authModule/logoutError");
          negativeMessage("Error", "再度ログインしてください");
          return;
        }
      }
      try {
        inputSender.value = UserName.value

        const DateTime = Date.now();
        CurrentTime.value = date.formatDate(DateTime, "YYYY-MM-DD");
        // console.log(testclass)
        // testclass[0].classList.remove("q-editor--dense");
        await $store.dispatch("booksModule/readTemplate", {
          TenantID: TenantID.value,
        });
        console.log($store.state.booksModule.TemplateList)
        rows.value = $store.state.booksModule.TemplateList;
        // rows.value.push(
        //   {
        //     id: 1,
        //     type: "その他イベント",
        //     template_title: "テンプレートテスト",
        //     title: "〇〇開催のお知らせ",
        //     body: "<div style=\"text-align: left;\"><span style=\"color: rgb(47, 47, 47); font-family: &quot;Noto Sans Japanese&quot;, &quot;Noto Sans CJK JP&quot;, &quot;Hiragino Sans&quot;, Meiryo;\">紫陽花が雨に映える季節となりましたが、お変わりありませんでしょうか。</span><br></div><div style=\"text-align: left;\"><span style=\"color: rgb(47, 47, 47); font-family: &quot;Noto Sans Japanese&quot;, &quot;Noto Sans CJK JP&quot;, &quot;Hiragino Sans&quot;, Meiryo;\">今年も毎年定期的に行っている〇〇を○月○日から開催したいと思います。</span></div><div style=\"text-align: left;\"><span style=\"color: rgb(47, 47, 47); font-family: &quot;Noto Sans Japanese&quot;, &quot;Noto Sans CJK JP&quot;, &quot;Hiragino Sans&quot;, Meiryo;\">どなたでも参加いただけますのでこの際にぜひ〇〇に参加してみませんか？</span></div>",
        //     update_human: "浜島秀法",
        //     updated_at: "2022-10-9T00000",
        //   },
        //   {
        //     id: 2,
        //     type: "法話会",
        //     template_title: "テンプレートテスト2",
        //     title: "楽しく学べる〇〇！", 
        //     body: "<div style=\"text-align: left;\">お寺でよく聞く〇〇ですが、皆さんは詳しく知っていますか？</div><div style=\"text-align: left;\">今回は〇〇について私とともに楽しく学んでいきましょう！</div>",
        //     update_human: "浜島秀法",
        //     updated_at: "2022-10-9T000000",
        //   },
        // );
        // for(let index=0; index<rows.value.length; index++){
        //   rows.value[index].updated_at = dayjs(rows.value[index].updated_at.split('T')[0]).format("YYYY年MM月DD日")
        // }
        pagination.value.rowsPerPage = rows.value.length;
        pagination.value.rowsNumber = rows.value.length;
      } catch (e) {
        negativeMessage("Error", "データの読み込み中にエラーが発生しました");
      }
    })();

    const onErrorProcess = () => {
      try{
        console.log(CurrentTime.value)
        step.value = 3;
      } catch (error) {
        console.log(error);
        negativeMessage("Error", "リソースの作成中にエラーが発生しました");
      }
    }

    const onSubmit = async () => {
      try {
        console.log(inputDestination.value)
        // console.log(inputDestination.value.length)
        // console.log(inputDestination.value[0])
        // for(let index=0; index <= inputDestination.value.length; index++){
        //   const str = inputDestination.value[index].split('へ')
        //   console.log(str[0])
        //   await $store.dispatch("contactsModule/createBook", {
        //     title: inputTitleText.value,
        //     body: inputQeditorText.value,
        //     tenant_id: TenantmasterID.value,
        //     to_name: str[0],
        //     meta: "{data: 'JSON\u30c7\u30fc\u30bf'}",
        //     id: UserID.value,
        //   });
        // }
        const str = inputDestination.value.split('様')
        console.log(str[0])
        const str2 = str[1].split('へ')
        if(str2[0] == '代表者'){
          str[0] += str2[0];
        }
        console.log(str[0])
        await $store.dispatch("booksModule/readTenant", {
          tenantmaster_id: TenantmasterID.value,
          type: str[0],
        });
        const list = $store.state.booksModule.dataLists;
        console.log(list)
        let postData = [];
        for(let postNumber=0; postNumber<list.length; postNumber++){
          postData.push({
            title: inputTitleText.value,
            body: inputQeditorText.value,
            tenant_id: TenantmasterID.value,
            created_by: UserName.value,
            publish_at: inputPublishDate.value,
            request_id: list[postNumber].user_id,
            from_name: UserName.value,
            description: "お知らせ投稿",
            meta: "{data: 'JSON\u30c7\u30fc\u30bf'}",
          })
        };
        postData.push({
          title: inputTitleText.value,
          body: inputQeditorText.value,
          tenant_id: TenantmasterID.value,
          created_by: UserName.value,
          publish_at: inputPublishDate.value,
          request_id: UserID.value,
          from_name: UserName.value,
          description: "お知らせ投稿",
          meta: "{data: 'JSON\u30c7\u30fc\u30bf'}",
        })
        console.log(postData)
        await $store.dispatch("contactsModule/createBook", {
          id: UserID.value,
          data: postData
        });
        positiveMessage("Creacion", "新しいリソースが作成されました");
        onReset();
        console.log(step.value);
        step.value = 4;
      } catch (error) {
        console.log(error);
        negativeMessage("Error", "リソースの作成中にエラーが発生しました");
      }
    };

    const onRequest = (props) => {
      // fetchDogs(props.pagination.page);
    };

    const clickCheckbox = () => {
      if(!openTemplate.value){
        console.log(openTemplate.value)
        onReset();
      }
    };

    const searchPostList = async () => {
      try {
        console.log(inputDestination.value)
        const str = inputDestination.value.split('様')
        console.log(str[0])
        const str2 = str[1].split('へ')
        if(str2[0] == '代表者'){
          str[0] += str2[0];
        }
        console.log(str[0])
        await $store.dispatch("booksModule/readTenant", {
          tenantmaster_id: TenantmasterID.value,
          type: str[0],
        });
        const list = $store.state.booksModule.dataLists;
        console.log(list)
        postList.value = list.length;
      } catch (error) {
        console.log(error);
        negativeMessage("Error", "リソースの作成中にエラーが発生しました");
      }
    };

    const useTemplate = (evt, rows) => {
      console.log(evt)
      console.log(rows)
      inputTitleText.value = rows.title;
      inputQeditorText.value = rows.body;
      SelectColor();
    };

    const SelectColor = () => {
      console.log('aa')
      let table = document.querySelector("table");
      let tr = table.querySelectorAll("tr");
      table.addEventListener("click", function(e) {
        if(e.target.tagName.toLowerCase() === "td") {
          //まずは全て背景色白
          for(var i = 0; i < tr.length; i++) {
            tr[i].style.backgroundColor = "white";
          }
          e.target.parentNode.style.backgroundColor = "#eef";
        }
      }, false);
    }

    const onReset = () => {
      inputTitleText.value = "";
      inputQeditorText.value = "";
    };

    const templateDialog = () => {
      isTemplateOpen.value = !isTemplateOpen.value
    };

    const templateInput = (template) => {
      inputTitleText.value = template.title;
      inputQeditorText.value = template.body;
      isTemplateOpen.value = !isTemplateOpen.value
    };

    const templateDelete = () => {
      rows.value.pop();
      isTemplateOpen.value = !isTemplateOpen.value
    };

    const newTemplate = (title, body) => {
      console.log(title)
      console.log(body)
      console.log(rows.value)
      rows.value.push(
        {
          title: title,
          body: body,
        }
      );
      console.log(rows.value)
      isTemplateOpen.value = !isTemplateOpen.value
    };

    return {
      // $sanitize,
      options,
      columns,
      isTemplateOpen,
      isLoadingTable,
      inputDestination,
      inputSender,
      inputTitleText,
      inputQeditorText,
      step,
      inputPublishDate,
      UserID,
      TenantID,
      TenantmasterID,
      UserName,
      testclass,
      rows,
      postList,
      openTemplate,
      CurrentTime,
      pagination,
      onErrorProcess,
      onSubmit,
      onRequest,
      clickCheckbox,
      searchPostList,
      useTemplate,
      SelectColor,
      onReset,
      templateDialog,
      templateInput,
      newTemplate,
      templateDelete,
      visibleColumns,
    };
  },
});
</script>

<style lang="sass" scoped>
>


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

.q-editor--dense
  // flex-wrap: initial
  // align-items: initial
  // display: initial

</style>

<style lang="scss" scoped>
@use "../css/table-pages.scss";

.form_answer{
    font-size: 16px;
    font-weight: 500;
    padding: 2px 0px 0px 0px;
}

.SortOrder {
  display:inline-block;
  padding:5px
}

.q-item__label--caption{
    color: #000;
// @media screen and (max-width: 768px)
}
.form-group{
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: solid 1px #eee;
}

// .q-editor--dense{
//   flex-wrap: initial;
//   align-items: initial;
//   display: initial;
// }

</style>
