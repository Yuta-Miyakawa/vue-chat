<template>
    <q-card 
      text-color="dark" 
      class="q-mb-sm my-card"
      :style="{ borderLeftColor: backcolor, borderRightColor: backcolor }"
      style="border-left-width: 4px; border-right-width: 4px"
      bordered
    >
    <q-card-section class="PaddingSize">
      <div class="row items-center">
        <span class="q-px-sm col title-size">{{ item.title }}</span>
        <approve-dialog :item="item" :start_date="start_date" :end_date="end_date"/>
      </div>
    </q-card-section>

    <q-separator inset/>

    <q-card-section class="PaddingSize">
      <!-- <div class="ellipsis-3-lines description q-px-md">
        {{ item.description }}
      </div> -->
    </q-card-section>
    <q-card-section class="PaddingSize ">
      <!-- <div class="row"> -->
        <q-chip dense :style="{ background: item.tagcolor }" class="itemText ">
          {{ item.type }}
        </q-chip>
        

        <div align="left" class="text-subtitle2" >{{ start_date }}~{{ end_date }}</div>
      <!-- </div> -->
    </q-card-section>
  </q-card>

</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { date } from "quasar";
import { positiveMessage, negativeMessage } from "src/composable/light-notify";
import ApproveDialog from "./ApproveDialog.vue";

export default {
  name: "IndexPages",
  props: ["item", "backcolor", "start_date", "end_date"],
  components: {
    ApproveDialog,    
  },

  setup() {

    return {

    };
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%

.title-size
  font-size: 14px

.text-subtitle2
  font-size: 12px

.PaddingSize
  padding:2px

.q-icon
  padding: 0

.itemText
  color: #fff
</style>
