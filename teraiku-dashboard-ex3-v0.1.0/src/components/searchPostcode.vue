
<template>
  <q-btn
    dense
    size="md"
    padding="xs"
    color="info"
    label="検索"
    style="margin-top: 5px; height: 35px"
    @click="searchPostcode()"
  >
    <!-- <q-tooltip>郵便番号から住所を検索します</q-tooltip> -->
  </q-btn>

  <q-dialog v-model="openPostcodeDialog">
    <q-card>
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">以下の住所から正しい住所をお選びください</div>
      </q-card-section>
      <div v-for="i in inputCode.length" :key="i">
        <q-card-section clickable v-ripple @click="inputPostcode(inputCode[i-1])" class="row items-center">
          <span class="q-ml-sm">
            <div v-if="inputCode[i-1].street == '以下に掲載がない場合'">
              {{inputCode[i-1].pref + inputCode[i-1].city}}
            </div>
            <div v-else>
              {{inputCode[i-1].pref + inputCode[i-1].city + inputCode[i-1].street}}
            </div>
          </span>
        </q-card-section>
      </div>
      <q-separator inset="item" />
      <q-card-actions align="right">
        <q-btn flat label="キャンセル" color="primary" v-close-popup />
        <!-- <q-btn
          flat
          label="会員情報へ"
          color="accent"
          to="/system/myprofile"
        /> -->
      </q-card-actions>
      <!-- <div v-for="i in rows.length" :key="i">
        <q-item clickable v-ripple >

          <q-item-section>
            <q-item-label lines="1">{{inputCode[i-1].pref + inputCode[i-1].city + inputCode[i-1].street}}</q-item-label>
            <q-item-label caption lines="2">
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator inset="item" />
      </div> -->
    </q-card>
  </q-dialog>   

</template>

<script>
import { defineComponent,ref} from 'vue';
import { useStore } from "vuex";
import { positiveMessage, negativeMessage } from "src/composable/light-notify";

export default defineComponent({
    name: "",
    props: ["postcode"],
    emits: ['inputPostal'],
    setup(props, context){
      const $store = useStore();

      let openPostcodeDialog = ref(false);
      let inputCode = ref([]);
      let inputPref = ref("");
      let inputMunicipality = ref("");
      let inputStreet = ref("");
      
      const searchPostcode = async () => {
        try{
          console.log(props.postcode);
          await $store.dispatch("contactsModule/searchPostcode", props.postcode);
          inputCode.value = $store.state.contactsModule.Postcodes;
          console.log(inputCode.value)
          if(inputCode.value.length > 10){
            negativeMessage("Error", `検索結果の候補が多すぎます。検索し直してください。`);  
          }
          else if(inputCode.value.length == 0){
            negativeMessage("Error", `検索結果の候補が見つかりませんでした。検索し直してください。`);  
          }
          else if(inputCode.value.length == 1){
            inputPref.value = inputCode.value[0].pref;
            inputMunicipality.value = inputCode.value[0].city;
            if(inputCode.value[0].street != '以下に掲載がない場合'){
              inputStreet.value = inputCode.value[0].street;
            }
            const postcode = {code: inputCode.value[0].code, pref: inputPref.value, city: inputMunicipality.value, street: inputStreet.value}
            context.emit('inputPostal',postcode);
          }
          else{
            openPostcodeDialog.value = !openPostcodeDialog.value;
          }
        }catch (e) {
          negativeMessage("Error", `ファイルの読み込みに失敗しました`);
        }    
      };

      const inputPostcode = (postcode) => {
        console.log(postcode)
        context.emit('inputPostal',postcode);
        openPostcodeDialog.value = !openPostcodeDialog.value;
      }     

      return{
        searchPostcode,
        inputPostcode,
        openPostcodeDialog,
        inputCode,
        inputPref,
        inputMunicipality,
        inputStreet,
      }
    }      
  });
</script>