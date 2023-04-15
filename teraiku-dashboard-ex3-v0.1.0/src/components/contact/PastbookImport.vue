<template>

  <q-btn
    round
    size="xs"
    class="q-mx-xs"
    color="black"
    icon="mdi-swap-vertical-bold"
    @click="openFetchDialog"
  >
    <q-tooltip>インポート</q-tooltip>
  </q-btn>
  

  <q-dialog v-model="isExportDialogOpen" persistent>
    <div class="q-gutter-y-md" style="width: 520px;">
      <q-card>
      <q-card-section>
        <div class="text-h6 text-center">インポート(Excel)</div>
        <!-- <div class="text-subtitle2 text-center">Excel</div> -->
      </q-card-section>

      <!-- <q-tabs v-model="tab" class="text-teal">
        <q-tab label="インポート" name="one" />
        <q-tab label="エクスポート" name="two" />
      </q-tabs> -->

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="one">
          <q-card-section>
            <div class="text-h6 text-center">過去帳をインポート
              <!-- <a href="../../assets/連絡先名簿-インポート例.xlsx" download="連絡先名簿-インポート例.xlsx"> -->
              <q-btn
                round
                size="sm"
                class="q-mx-xs"
                color="info"
                icon="mdi-file-download-outline"
              >
                <q-tooltip class="bg-dark text-body2">Excelフォーマットファイル</q-tooltip>
              </q-btn>
              <!-- </a> -->
            </div>
          </q-card-section>
          <p class="text-center">
            右上のボタンからExcelファイルのフォーマットがダウンロードできます。<br>
            Excelファイルのシート名と1行目の値は変えないでください。<br>
            2行目の値を消してお使いください。
            
          </p>
          <q-form @submit="handleFile" class="text-center">
            
            <input class="fileinput" type="file" id="file" v-on:change="onChangeFile" />
            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="キャンセル" color="primary" v-close-popup />
              <q-btn type="submit">インポート</q-btn>
            </q-card-actions>
          </q-form>
        </q-tab-panel>

        <!-- <q-tab-panel name="two">
          <q-card-section>
            <div class="text-h6 text-center">{{(isFinishPage-isStartPage)*15}}件の連絡先をエクスポート</div>
          </q-card-section>
          <p class="text-center">
            Excelにエクスポートできます。20ページ以内でエクスポートしてください。<br>
            1ページ(15件)ごとにエクスポートする連絡数が決まります。
          </p>
            <q-form @submit="ExportExcel('xlsx')">
              <div class="row justify-between">
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <q-card-section class="q-pt-none">
                    <q-input
                      v-model.number="isStartPage"
                      type="number"
                      min="1"
                      max="isFinishPage"
                      filled
                      label="始まり"
                      :rules="[
                        (val) =>
                          (val && isFinishPage - val <= 20) ||
                          '20ページ以内でExportしてください。',
                      ]"
                    />
                    <p align="right">ページ</p>
                  </q-card-section>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <q-card-section class="q-pt-none">
                    <q-input
                      v-model.number="isFinishPage"
                      type="number"
                      min="2"
                      filled
                      label="終わり"
                      :rules="[
                        (val) =>
                          (val && val - isStartPage <= 20) ||
                          '20ページ以内でExportしてください。',
                      ]"
                    />
                    <p align="right">ページ</p>
                  </q-card-section>
                </div>
              </div>
              <q-card-actions align="right" class="text-primary">
                <q-btn flat label="キャンセル" color="primary" v-close-popup />
                <q-btn type="submit">エクスポート</q-btn>
              </q-card-actions>
            </q-form>
          </q-tab-panel> -->
        </q-tab-panels>
      </q-card>
    </div>
    </q-dialog>


</template>

<script>
import { defineComponent,ref} from 'vue';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { positiveMessage, negativeMessage } from "src/composable/light-notify";
import * as dayjs from "dayjs";
import * as XLSX from "xlsx";

export default defineComponent({
    name: "Dialog",
    props: ["id", "contacts", "SelectCreateDialog"],
    emits: ['updateROWS', 'updateDANKA'],
    setup(props, context){
      const $store = useStore();
      const $router = useRouter();
      
      const TenantID = ref('');

      let inputDeath = ref(dayjs().format('YYYY/MM/DD'));
      let isExportDialogOpen = ref(false);
      let isStartPage = ref(1);
      let isFinishPage = ref(5);
      let items = ref([]);
      let InportFile = ref([]);

      
      const onReset = () => {
        // inputLastName.value = "";
        // inputLastNameKana.value = "";
        // inputFirstName.value = "";
        // inputFirstNameKana.value = "";
        // inputPhone.value = "";
        // inputFax.value = "";
        // inputEmail.value = "";
        // inputGender.value = "";
        // inputType.value = "";
        // inputBirth.value = "";
        // inputPostal.value = "";
        // inputPref.value = "";
        // inputCity.value = "";
        // inputAddress.value = "";
        // inputStreet.value = "";
        // inputComment.value = "";
        // inputdharmaName.value = "";
        // inputDeath.value = "";
        // inputPlaceofDeath.value = "";
        InportFile.value = [];
        items.value = [];
      };


      const openFetchDialog = () => {
        isExportDialogOpen.value = !isExportDialogOpen.value;
      };

      // エクスポート
      const ExportExcel = async (type, fn, dl) => {
        const tenant = $store.state.authModule.users.tenants[0]
        console.log(tenant)
        TenantID.value = tenant.id;
        const tenantName = tenant.corporation;
        console.log(TenantID.value)
        let ExcelData = [];
        let page = 0;
        
        const last_pages = isFinishPage.value;
        const start_page = isStartPage.value;

          for (let i = start_page; i <= last_pages; i++) {
            page = i;
            await $store.dispatch("booksModule/readBooks", {
              TenantID: TenantID.value,
              // ReadUserID: UserID.value,
              page: page,
            });
            const Data = $store.state.booksModule.books.data;
            const meta = $store.state.booksModule.books.meta;
            console.log(Data)
            for (let j = 1; j <= Data.length; j++) {
              // ExcelData.push(Data[j - 1]);
              const last_name = Data[j - 1].last_name || '';
              const first_name = Data[j - 1].first_name || '';
              const last_name_kana = Data[j - 1].last_name_kana || '';
              const first_name_kana = Data[j - 1].first_name_kana || '';
              const pref = Data[j - 1].pref || '';
              const city = Data[j - 1].city || '';
              const address = Data[j - 1].address || '';
              const street = Data[j - 1].street || '';
              const birth = dayjs(Data[j - 1].date_of_birth).format('YYYY/MM/DD');
              ExcelData.push({
                  種別: Data[j - 1].type,
                  名前: last_name + first_name,
                  ふりがな: last_name_kana + first_name_kana,
                  電話番号: Data[j - 1].phone,
                  メールアドレス: Data[j - 1].email,
                  立場: Data[j - 1].representative,
                  性別: Data[j - 1].gender,
                  郵便番号: Data[j - 1].postcode,
                  住所: pref + city + address + street,
                  誕生日: birth,
              });
            }
            console.log(meta.from)
            if(meta.from === meta.last_page) {
              break;
            }
          }
        console.log(ExcelData)
        const currentTime = Date.now();
        var elt = ExcelData;
        var ws = XLSX.utils.json_to_sheet(elt);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "WorksheetName");
        isExportDialogOpen.value = !isExportDialogOpen.value;
        return dl
          ? XLSX.write(wb, { bookType: type, bookSST: true, type: "base64" })
          : XLSX.writeFile(wb, fn || tenantName + "-連絡先名簿-" + dayjs(inputDeath.value).format('YYYYMMDD') + "." + (type || "xlsx"));
      };

      //インポート
      const onChangeFile = (e) => {
        onReset();
        console.log(e);
        InportFile.value = e;
      };

      const fixdata = (resultData) => {
        let o = "",
          l = 0,
          w = 10240;
        for (; l < resultData.byteLength / w; ++l)
          o += String.fromCharCode.apply(
            null,
            new Uint8Array(resultData.slice(l * w, l * w + w))
          );
        o += String.fromCharCode.apply(null, new Uint8Array(resultData.slice(l * w)));
        return o;
      };

      const to_json = (workbook, X) => {
        let result = {};
        workbook.SheetNames.forEach(function (sheetName) {
          const roa = X.utils.sheet_to_json(workbook.Sheets[sheetName], {
            raw: true,
          });
          console.log(roa)
          if (roa.length > 0) {
            result[sheetName] = roa;
          }
        });
        return result;
      };

      const handleFile = () => {
        console.log(InportFile.value)
        const X = XLSX;
        const files = InportFile.value.target.files;
        const f = files[0];
        const reader = new FileReader();
        const loadReader = (e) => {
          const resultData = e.target.result;
          const arr = fixdata(resultData);
          const wb = X.read(btoa(arr), {
            type: "base64",
            cellDates: true,
          });
          const output = to_json(wb, X);

          for (let i of output["連絡先名簿"]) {
            items.value.push(i);
          }
          InportSubmit(items.value);
  
          onReset(); 
        };
        reader.readAsArrayBuffer(f);
        reader.onload = loadReader;   
      };

      const InportSubmit = async (data) => {
        TenantID.value = $store.state.authModule.users.tenants[0].id;
        console.log(data);
        console.log(data.length);
        console.log(props.id[0].id)
        for (let i = 0; i <= data.length; i++) {
          let InportData = data[i];
          let last_name = data[i].姓;
          let last_name_kana = data[i].せい;
          let first_name = data[i].名;
          let first_name_kana = data[i].めい;
          let phone = data[i].電話番号;
          let email = data[i].メールアドレス;
          let gender = data[i].性別;
          let type = data[i].種別;
          let date_of_birth = dayjs(data[i].誕生日).format('YYYY-MM-DD');
          let postcode = data[i].郵便番号;
          let pref = data[i].都道府県;
          let city = data[i].市区町村;
          let address = data[i].町域と番地;
          let street = data[i].建物名など;
          let dharma_name = data[i].戒名;
          let date_of_death = dayjs(data[i].命日).format('YYYY-MM-DD');
          let place_of_death = data[i].墓地番号;
          let mourner_name = data[i].施主名;
           try {   
            await $store.dispatch("currentModule/createPast", {
                id: props.id[0].id,
                last_name: last_name,
                last_name_kana: last_name_kana,
                first_name: first_name,
                first_name_kana: first_name_kana,
                phone: phone,
                // fax: email,
                email: email,
                gender: gender,
                type: '家族',
                date_of_birth: date_of_birth,
                postcode: postcode,
                pref: pref,
                city: city,
                address: address,
                street: street,
                // comments: inputComment.value,
                is_alive: false,
                avatar: `https://api2.teraiku.jp/svg/login-avatar.svg`,
                dharma_name:dharma_name,
                date_of_death: date_of_death,
                place_of_death: place_of_death,
                mourner_name: mourner_name,
                // message: inputComment.value,
                connection: 'import',
            });
            const profile = $store.state.currentModule.pastfamily;
            console.log(profile)
            await $store.dispatch("booksModule/attachProfile", {
                tenant_id: TenantID.value,
                profile_id: profile.id,
            });
            context.emit('updateROWS');
            isExportDialogOpen.value = false;
            positiveMessage("Creacion", "新しい過去帳が作成されました");
            onReset();
          } catch (error) {
            console.log(error)
            isExportDialogOpen.value = false;
            negativeMessage("Error", "過去帳の作成中にエラーが発生しました");
            onReset();
          }
        }
      }
    

      return{

        onReset,

        inputDeath,
        TenantID,

        tab: ref('one'),
        isExportDialogOpen,
        isStartPage,
        isFinishPage,
        openFetchDialog,
        ExportExcel,

        onChangeFile,
        handleFile,

        InportFile,
        InportSubmit,
        items,
      }
    
    }    
    
    
  });
</script>

<style lang="scss" scoped>

.creation-card-simple {
  min-width: 350px;
  width: 100%;
}

.q-card__section--vert {
  padding: 10px;
}

.q-gutter-y-md > *,
.q-gutter-md > * {
  margin-top: 0px;
}

a {
  text-decoration: none; /* 下線を無効化 */
}
</style>