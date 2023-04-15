<template>
  <q-page padding>

      <h5 style="margin: 10px">法要/年回忌 予定表</h5>
      <h7>
        檀家の法要・年回忌が表示されます。
      </h7>
      <vue-cal
        locale="ja"
        :time = "false"
        resize-x
        :disable-views="['years']"
        events-count-on-year-view
        active-view="month"
        :on-event-click = "onEventClick"
        style="min-height: calc(95vh - 150px)"
        :events="events">
         <template #arrow-prev>
          <div class="btnStyleReset" v-on:click="previous"><i class="icon angle"></i></div>
        </template>
        <template #arrow-next>
          <div class="btnStyleReset" v-on:click="next"><i class="icon angle"></i></div>
        </template>
        <template #title="{ view }">
          <span>
          {{ view.endDate.format('M') !== view.startDate.format('M') 
              ? view.startDate.format('YYYY年M月') + '-' + view.endDate.format('M月') 
              : view.startDate.format('YYYY年M月') }}
          </span>
        </template>
      </vue-cal>

      <!-- Using Vuetify -->
      <q-dialog v-model="showDialog">
        <q-card class="card">
          <q-card-title>
            <span class="modal-title">{{ selectedEvent.title }}</span>
            <v-spacer/>
            <strong>{{ selectedEvent.start && selectedEvent.start.format('YYYY/MM/DD')}}</strong>
          </q-card-title>
          <q-card-text>
            <div>
              <!-- <p :style="('background:' + selectedEvent.tagcolor)" class="modal-tag">{{ selectedEvent.type }}</p> -->
                <strong v-if="selectedEvent.content" class="modal-strong">内容</strong>
                <p class="modal-content" v-html="selectedEvent.content"/>
                <!-- <div class="modal-start-end-time">
                  <p>開始時刻: {{ selectedEvent.start && selectedEvent.start.formatTime() }}</p>
                  <p>終了時刻: {{ selectedEvent.end && selectedEvent.end.formatTime() }}</p>
                </div> -->
            </div>
          </q-card-text>
        </q-card>
      </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import 'vue-cal/dist/i18n/ja.js'
import { useStore } from 'vuex';
import { LocalStorage, useQuasar, date } from 'quasar';
import { useRouter } from "vue-router";
import { negativeMessage } from 'src/composable/light-notify';
import * as dayjs from "dayjs";
import ja from "dayjs/locale/ja";

dayjs.locale(ja);

const dailyHours = { from: 9 * 60, to: 15 * 60, class: 'business-hours' };

export default defineComponent({
  name:     'IndexPage',
  components: {
    'vue-cal': VueCal,
  },
  setup() {
    const $store = useStore()
    const $router = useRouter();
    const TenantID = ref('');
    let pastdeath = ref([]);
    let pastfamily = ref([]);
    let events = ref([]);

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
        const stateTenant = LocalStorage.getItem("stateTenant")
        TenantID.value = stateTenant.id;
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
        console.log(TenantID.value)
        await $store.dispatch("dankaModule/readDanka", {
          TenantID: TenantID.value,
        });
        // const family = $store.state.dankaModule.families.data;
        // await $store.dispatch("anniversaryModule/readMeta",{
        //   TenantID: TenantID.value
        // })
        // const meta = $store.state.anniversaryModule.pastMeta.meta;
        // const last_page = meta.last_page;
        const family = $store.state.dankaModule.DankaData.data;
        console.log(family)
        console.log(family.length)
        for (let i = 0; i < family.length; i++) {
          await $store.dispatch("dankaModule/readBooks", {
            ReadID: family[i].id,
          });
          const allFamily = $store.state.dankaModule.families.data;
          console.log(allFamily[0]);
          if(allFamily[0]){
            await $store.dispatch("anniversaryModule/readBooks", {
              ReadID: allFamily[0].id,
            });
            pastdeath.value = $store.state.anniversaryModule.pastdeath;
            pastfamily.value = $store.state.anniversaryModule.pastfamily;
            console.log("pastdeath in vue",pastdeath.value[0])
            console.log("pastfamily in vue",pastfamily.value[0])
            
            pastdeath.value.forEach((date, index) => {
              // console.log(date,index)
              const familyName = pastfamily.value[index];
              console.log(familyName)
              date.forEach((past, index) => {
                // console.log(family)
                if(familyName.date_of_death){
                  let event = {}
                  event['start'] = past.scheduled;
                  event['end'] = past.scheduled;
                  event['title'] =  familyName.last_name + familyName.first_name + ' ' + "["+ past.plan +"]";
                  event['content'] = '命日 : ' + dayjs(familyName.date_of_death).format("YYYY年MM月DD日");
                  events.value.push(event);
                }
              })
              // console.log(events.value)
            });
          }
        }
        console.log(events.value)
      } catch (e) {
        negativeMessage("Error", "データの読み込み中にエラーが発生しました");
      }
    })();
    return {
      events,
      TenantID,
    }
  },
  data: () => ({
    selectedEvent :  {}, 
    showDialog :  false , 
    specialHours: {
      1: dailyHours,
      2: dailyHours,
      3: [
        { from: 9 * 60, to: 12 * 60, class: 'business-hours' },
        { from: 14 * 60, to: 18 * 60, class: 'business-hours' }
      ],
      4: dailyHours,
            5: dailyHours,
                  6: dailyHours,
      7: dailyHours
    },
    stickySplitLabels: false,
    minCellWidth: 400,
    minSplitWidth: 0,
    splitDays: [
      // The id property is added automatically if none (starting from 1), but you can set a custom one.
      // If you need to toggle the splits, you must set the id explicitly.
      { id: 1, class: 'person1', label: '住職' },
      { id: 2, class: 'person2', label: '副住職', hide: false },
      { id: 3, class: 'person1', label: '徒弟1' },
      // { id: 4, class: 'person2', label: '徒弟2' },
      // { id: 5, class: 'person3', label: '徒弟3' }
    ],


  }),
  methods: {
     onEventClick(event, e){
       this.selectedEvent = event
       this.showDialog = true
    
       // Prevent navigating to narrower view (default vue-cal behavior).
       e.stopPropagation()
     },
    customEventCreation () {
    const dateTime = prompt('Create event on (YYYY-MM-DD HH:mm)', '2022-07-09 13:15')

    // Check if date format is correct before creating event.
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(dateTime)) {
      this.$refs.vuecal.createEvent(
        // Formatted start date and time or JavaScript Date object.
        dateTime,
        // Event duration in minutes (Integer).
        120,
        // Custom event props (optional).
        { title: 'New Event', content: 'yay! 🎉', class: 'blue-event' }
      )
    } else if (dateTime) alert('Wrong date format.')
},

newEventCreation () {
    const dateTime = prompt('Create event on (YYYY-MM-DD HH:mm)', '2022-07-09 13:15')

    // Check if date format is correct before creating event.
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(dateTime)) {
      this.$refs.vuecal.createEvent(
        dateTime,
        // Event duration in minutes (Integer).
        120,
        // Custom event props (optional).
        { title: 'New Event', content: 'yay! 🎉', class: 'blue-event' }
      )
    } else if (dateTime) alert('Wrong date format.')
},
    onEventDragStart (e, draggable) {
      // Passing the event's data to Vue Cal through the DataTransfer object.
      e.dataTransfer.setData('event', JSON.stringify(draggable))
      e.dataTransfer.setData('cursor-grab-at', e.offsetY)
    },
    // The 3 parameters are destructured from the passed $event in @event-drop="onEventDrop".
    // `event` is the final event as Vue Cal understands it.
    // `originalEvent` is the event that was dragged into Vue Cal, it can come from the same
    //  Vue Cal instance, another one, or an external source.
    // `external` is a boolean that lets you know if the event is not coming from any Vue Cal.
    onEventDrop ({ event, originalEvent, external }) {
      // If the event is external, delete it from the data source on drop into Vue Cal.
      // If the event comes from another Vue Cal instance, it will be deleted automatically in there.
      if (external) {
        const extEventToDeletePos = this.draggables.findIndex(item => item.id === originalEvent.id)
        if (extEventToDeletePos > -1) this.draggables.splice(extEventToDeletePos, 1)
      }
    }
  }
 });

</script>

<style>
.vuecal__cell-content {align-self: flex-start;}
.vuecal__cell-date {text-align: center;padding: 4px;}

.vuecal--week-view .vuecal__bg .vuecal__event--all-day.pink-event,
.vuecal--day-view .vuecal__bg .vuecal__event--all-day.pink-event {left: 50%;}
.vuecal--week-view .vuecal__bg .vuecal__event--all-day.leisure,
.vuecal--day-view .vuecal__bg .vuecal__event--all-day.leisure {left: 50%;}
/* You can easily set a different style for each split of your days. */
.vuecal__cell-split.person2 {background-color: rgba(221, 238, 255, 0.5);}
.vuecal__cell-split.person1 {background-color: rgba(d5, 232, 251, 0.5);}
.vuecal__cell-split.person1 {background-color: rgba(221, 255, 239, 0.5);}
.vuecal__cell-split.person2 {background-color: rgba(255, 250, 196, 0.5);}
.vuecal__cell-split.person3 {background-color: rgba(255, 206, 178, 0.5);}
.vuecal__cell-split .split-label {color: rgba(0, 0, 0, 0.1);font-size: 26px;}


/* カレンダーイベント背景色 */
.vuecal__event {background-color: rgba(255, 255, 0, 0.15);border: 2px solid rgba(255, 210, 0, 0.3);color: rgb(25, 25, 25); }
.vuecal__event.red {background-color: red;border: 1px solid rgb(233, 136, 46);color: #fff;}
.vuecal__event.blue {background-color: blue;border: 1px solid rgb(144, 210, 190); color:#fff}
.vuecal__event.orange {background-color: orange;border: 1px solid rgb(235, 82, 82);color: #fff;}
.vuecal__event.purple {background-color: purple;border: 1px solid rgb(25, 25, 25);color: #fff;}
.vuecal__event.green {background-color: green;border: 1px solid rgb(25, 25, 25);color: #fff;}




.business-hours {
  background-color: rgba(255, 255, 0, 0.2);
  border: solid rgba(255, 210, 0, 0.6);
  border-width: 2px 0;
}

/* Different color for different event types. */
.vuecal__event.jobs {background-color: rgba(253, 156, 66, 0.9);border: 1px solid rgb(233, 136, 46);color: #fff;}
.vuecal__event.planings {background-color: rgba(46, 70, 231, 0.9);border: 1px solid rgb(235, 82, 82);color: #fff;}


/* .vuecal--year-view .vuecal__cell-content {
  justify-content: flex-start;
  height: 100%;
  align-items: center;
} */

.vuecal--month-view .vuecal__cell-content {
  justify-content: flex-start;
  height: 100%;
  align-items: center;
}

/* .vuecal--month-view .vuecal__cell-date {
  padding: 4px;
} */

.vuecal--month-view .vuecal__no-event {
  display: none;
}

.vuecal__event {
  cursor: pointer;  
}

.vuecal__event-title {
  margin: 0px 0px;
  font-size: 12px;
 /* text-align: center; */
}

/* .vuecal__event-time {
  display: inline-block;
  margin: 5px;
  padding-bottom: 3px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
} */

.vuecal__event-content {
  font-style: italic;
  font-size: 10px;
}

.vuecal__cell-events-count {
  background: #43c441;
  min-width: 22px;
  min-height: 22px;
  padding-top: 3px;
  font-size: 16px;
  vertical-align: top;
}

.vuecal__event.sport {background-color: rgba(255, 102, 102, 0.9);border: 1px solid rgb(235, 82, 82);color: #fff;}

.vuecal__event.lunch {
  background: repeating-linear-gradient(45deg, transparent, transparent 10px, #f2f2f2 10px, #f2f2f2 20px);/* IE 10+ */
  color: #999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.vuecal__event.lunch .vuecal__event-time {display: none;align-items: center;}
.card {
  background: #fff;
  padding:30px;
  width: 50%;
  margin:0 auto;
}

.modal-title {
  margin-right: 15px;
  font-size: 1.4rem;
}

.modal-strong {
  display: block;
  font-size: 1.2rem;
  padding: 5px 0 10px 0;
}

.modal-content {
  font-size:1.3rem;
  margin:0px 0 15px 0;
}

.modal-start-end-time {
  display: flex;
  justify-content: flex-start;
  margin:15px 0;
}

.modal-start-end-time p{
  margin-right:10px;
}

.modal-tag {
  display: block;
  color: #fff;
  width: 30%;
  text-align:center;
  padding:5px;
  border-radius: 2.5em;
  margin:15px 0;
}

.btnStyleReset{
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
}

</style>
