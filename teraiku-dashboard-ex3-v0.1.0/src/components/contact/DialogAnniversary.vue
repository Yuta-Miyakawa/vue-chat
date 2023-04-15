
<template>
  <q-btn
    v-if="!PastbooksInformation"
    round
    size="sm"
    class="q-mx-xs"
    color="black"
    icon="event_note"
    @click="displayTable(contacts);"
  >
    <q-tooltip>年回忌法要表</q-tooltip>
  </q-btn>

    <q-dialog v-model="isDialogOpen">
      <q-card class="creation-card-simple q-pa-sm">
        <q-card-section>
          <div class="text-h6">
            <q-btn
              size="sm"
              class="q-mx-xs"
              color="primary"
              icon="arrow_back"
              round
              @click="onCancel"
              ><q-tooltip>戻る</q-tooltip>
            </q-btn>
            年回忌法要表
          </div>
        </q-card-section>
        <q-card-section>
          <div>
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
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>


</template>

<script>
import { defineComponent,ref} from 'vue';
import { dankalistDetail } from "src/composable/column-tables";
import * as dayjs from "dayjs";

const columns = dankalistDetail;

export default defineComponent({
    name: "Dialog",
    props: ["contacts",'PastbooksInformation'],
    setup(){
      const mourning = ref([]);
      const isDialogOpen = ref(false);
      

      const displayTable = async (date) => {
        isDialogOpen.value = !isDialogOpen.value;
      
        console.log(date);
        const deathday = dayjs(date.date_of_death).format("YYYY-MM-DD");
        const day = [
          dayjs(deathday).format("YYYY年MM月DD日"),
          dayjs(deathday).add(6, "d").format("YYYY年MM月DD日"),
          dayjs(deathday).add(13, "d").format("YYYY年MM月DD日"),
          dayjs(deathday).add(20, "d").format("YYYY年MM月DD日"),
          dayjs(deathday).add(27, "d").format("YYYY年MM月DD日"),
          dayjs(deathday).add(34, "d").format("YYYY年MM月DD日"),
          dayjs(deathday).add(41, "d").format("YYYY年MM月DD日"),
          dayjs(deathday).add(48, "d").format("YYYY年MM月DD日"),
          dayjs(deathday).add(99, "d").format("YYYY年MM月DD日"),
          dayjs(deathday).add(1, "y").format("YYYY年MM月DD日"),
          dayjs(deathday).add(2, "y").format("YYYY年MM月DD日"),
          dayjs(deathday).add(6, "y").format("YYYY年MM月DD日"),
          dayjs(deathday).add(12, "y").format("YYYY年MM月DD日"),
          dayjs(deathday).add(16, "y").format("YYYY年MM月DD日"),
          dayjs(deathday).add(22, "y").format("YYYY年MM月DD日"),
          dayjs(deathday).add(24, "y").format("YYYY年MM月DD日"),
          dayjs(deathday).add(26, "y").format("YYYY年MM月DD日"),
          dayjs(deathday).add(32, "y").format("YYYY年MM月DD日"),
          dayjs(deathday).add(49, "y").format("YYYY年MM月DD日"),
        ]
        mourning.value = [
          {
            plan: " 命日",
            scheduled: day[0],
            passaway: "御命日",
          },
          {
            plan: " 初七日忌・一七日忌",
            scheduled: day[1],
            passaway: "７日目",
          },
          {
            plan: "二七日忌",
            scheduled: day[2],
            passaway: "14日目",
          },
          {
            plan: "三七日忌",
            scheduled: day[3],
            passaway: "21日目",
          },
          {
            plan: "四七日忌",
            scheduled: day[4],
            passaway: "28日目",
          },
          {
            plan: "五七日忌・三十五日忌",
            scheduled: day[5],
            passaway: "35日目",
          },
          {
            plan: "六七日忌",
            scheduled: day[6],
            passaway: "42日目",
          },
          {
            plan: "七七日忌・四十九日忌",
            scheduled: day[7],
            passaway: "49日目",
          },
          {
            plan: "百か日忌",
            scheduled: day[8],
            passaway: "100日目",
          },
          {
            plan: "一周忌",
            scheduled: day[9],
            passaway: "満1年目",
          },
          {
            plan: "三回忌",
            scheduled: day[10],
            passaway: "満2年目",
          },
          {
            plan: "七回忌",
            scheduled: day[11],
            passaway: "満6年目",
          },
          {
            plan: "十三回忌",
            scheduled: day[12],
            passaway: "満12年目",
          },
          {
            plan: "十七回忌",
            scheduled: day[13],
            passaway: "満16年目",
          },
          {
            plan: "二十三回忌",
            scheduled: day[14],
            passaway: "満22年目",
          },
          {
            plan: "二十五回忌",
            scheduled: day[15],
            passaway: "満24年目",
          },
          {
            plan: "二十七回忌",
            scheduled: day[16],
            passaway: "満26年目",
          },
          {
            plan: "三十三回忌",
            scheduled: day[17],
            passaway: "満32年目",
          },
          {
            plan: "五十回忌",
            scheduled: day[18],
            passaway: "満49年目",
          },
        ];
    };

      const onCancel = () => {
        isDialogOpen.value = !isDialogOpen.value;
      };
      

      return{
        displayTable,
        isDialogOpen,
        onCancel,
        mourning,
        columns
      }
    
    }    
    
    
  });
</script>

<style lang="scss" scoped>

.q-card__section--vert {
  padding: 10px;
}

.q-gutter-y-md > *,
.q-gutter-md > * {
  margin-top: 0px;
}
</style>