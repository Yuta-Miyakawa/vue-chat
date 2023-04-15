<template>
  <div class="q-pa-xs q-mr-sm">
    <div class="row title-bg">
      <div 
        class="col ellipsis"
        style="border-bottom:3px solid"
        :style="{borderColor: background}"
      >
        {{ title }}
        <q-chip small dense class="chip-item">
          {{ items.length }}件
          
        </q-chip>
      </div>
    </div>
  </div>
  <q-scroll-area
    style="height: 1px; min-height: calc(100vh - 150px); background-color: #fffafa"
    class="q-mr-sm"
    :thumb-style="thumbStyle"
  >
    <div class="q-pa-sm item-bg" style="border: 1px solid #ccc; border-radius: 3px">
      <div>
        <draggable
          v-model="draggables"
          group="people"
          style="min-height: calc(99vh - 160px)"
        >
          <div v-for="(item, idx) in items" :key="idx">
            <item :item="item" :backcolor="color[idx]" :start_date="start[idx]" :end_date="end[idx]"/>
          </div>
        </draggable>
      </div></div
  ></q-scroll-area>
</template>
<script>
import { VueDraggableNext } from "vue-draggable-next";
import Item from "../Todo/Item.vue";

export default {
  name: "IndexPages",
  props: ["items", "title", "id", "background", "color", "start", "end"],

  components: {
    Item,
    draggable: VueDraggableNext,
  },
  setup () {
    return {
      thumbStyle: {
        right: '1px',
        borderRadius: '10px',
        backgroundColor: '#d4aa70',
        width: '3px',
        opacity: '0.5'
      }
    }
  },
  computed: {
    draggables: {
      get() {
        return this.items;
      },
      set(items) {
        let taskid = "";
        for (let i = 0; i < items.length; i++) {
          if (items[i].status != this.id) {
            taskid = items[i].id;
            console.log("taskid", taskid);
            console.log(items[i]);
            this.$store.dispatch("todoModule/updateTask", {
              items: items[i],
              id: taskid,
              status: this.id,
            });
          }
        }
        this.$store.dispatch("todoModule/moveTask", {
          items,
          id: this.id,
          data: items[0].tenant_id,
        });
      },
    },
  },
};
</script>

<style lang="sass" scoped>
.title-bg
  display: flex
  align-items: center
  margin: 0
  font-size: 16px

.item-bg
  // background-color: $purple-1

.chip-item
  background-color: $purple-1
  margin-bottom: 7px
</style>
