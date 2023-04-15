<template>
<div v-if="label==='電話番号'" class="PhoneClass" @click=CallPhone();>
  <a :href="'tel:' + inputPhone">
  <q-item clickable v-ripple>
    <q-item-section avatar top>
      <q-avatar :icon="icon" color="grey-2" :text-color="text_color"/>
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1">{{ value }}</q-item-label>
      <q-item-label caption class="text-grey-8">{{ label }}</q-item-label>
    </q-item-section>

  </q-item>
  </a>
</div>

<div v-else-if="label==='トークルームへ'" @click=TalkRoom();>
  <q-item clickable v-ripple>
    <q-item-section avatar top>
      <q-avatar :icon="icon" color="grey-2" :text-color="text_color"/>
    </q-item-section>

    <q-item-section>
      <!-- <q-item-label lines="1">{{ value }}</q-item-label> -->
      <q-item-label caption class="text-grey-8">{{ label }}</q-item-label>
    </q-item-section>

  </q-item>
  
</div>

<div v-else-if="label==='メールアドレス'" class="EmailClass" @click=SendEmail() >
  <a :href="'mailto:' + inputEmail">
  <q-item clickable v-ripple>
    <q-item-section avatar top>
      <q-avatar :icon="icon" color="grey-2" :text-color="text_color"/>
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1">{{ value }}</q-item-label>
      <q-item-label caption class="text-grey-8">{{ label }}</q-item-label>
    </q-item-section>

  </q-item>
  </a>
</div>

<div v-else-if="label==='住所'">
  <q-item clickable v-ripple>
    <q-item-section avatar top>
      <q-avatar :icon="icon" color="grey-2" :text-color="text_color"/>
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1">{{ address }}</q-item-label>
      <q-item-label caption class="text-grey-8">{{ label }}</q-item-label>
    </q-item-section>

  </q-item>
</div>

<div v-else-if="label==='誕生日'">
  <q-item clickable v-ripple>
    <q-item-section avatar top>
      <q-avatar :icon="icon" color="grey-2" :text-color="text_color"/>
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1">{{ birthday }}</q-item-label>
      <q-item-label caption class="text-grey-8">{{ label }}</q-item-label>
    </q-item-section>

  </q-item>
</div>

<div v-else-if="label==='行年'">
  <q-item clickable v-ripple>
    <q-item-section avatar top>
      <q-avatar :icon="icon" color="grey-2" :text-color="text_color"/>
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1">{{ deathday }}</q-item-label>
      <q-item-label caption class="text-grey-8">{{ label }}</q-item-label>
    </q-item-section>

  </q-item>
</div>

<div v-else-if="label==='享年'">
  <q-item clickable v-ripple>
    <q-item-section avatar top>
      <q-avatar :icon="icon" color="grey-2" :text-color="text_color"/>
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1">{{ old }}</q-item-label>
      <q-item-label caption class="text-grey-8">{{ label }}</q-item-label>
    </q-item-section>

  </q-item>
</div>

<div v-else-if="label==='次の法要'">
  <q-item clickable v-ripple>
    <q-item-section avatar top>
      <q-avatar :icon="icon" color="grey-2" :text-color="text_color"/>
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1">{{ dayofNext }}</q-item-label>
      <q-item-label caption class="text-grey-8">{{ label }}</q-item-label>
    </q-item-section>

  </q-item>
</div>


<div v-else>
  <q-item clickable v-ripple>
    <q-item-section avatar top>
      <q-avatar :icon="icon" color="grey-2" :text-color="text_color"/>
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1">{{ value }}</q-item-label>
      <q-item-label caption class="text-grey-8">{{ label }}</q-item-label>
    </q-item-section>

  </q-item>
</div>
</template>

<script>
import {defineComponent, ref} from 'vue';
import * as dayjs from "dayjs";
import { useRouter } from 'vue-router'

export default defineComponent({
  name: "ContactDetailItem",
  props: ['icon', 'text_color', 'value', 'label', 'address' , 'birthday', 'deathday', 'old', 'dayofNext'],
  setup(props){
    const $router = useRouter();
    const inputPhone = ref('');
    const inputEmail = ref('');
    const inputBirth = ref('');

    const CallPhone = () => {
      inputPhone.value = props.value;
    };

    const TalkRoom = () => {
      console.log('aaa')
      $router.push({
        name: 'ChatworkTest',
        // params:{ id: data.id }  
      })
    }

    const SendEmail = () => {
      inputEmail.value = props.value;
      console.log(inputEmail.value)
    }
    
    return{
      inputPhone,
      inputEmail,
      inputBirth,
      CallPhone,
      TalkRoom,
      SendEmail,
    }
  }
 
})
</script>
<style scoped>

a {
  text-decoration: none; /* 下線を無効化 */
  color : inherit;
}

.PhoneClass:hover {
  background-color:#84ffff
}

.EmailClass:hover {
  background-color: #dbffb7
}

</style>
