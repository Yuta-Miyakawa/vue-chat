import * as dayjs from "dayjs";
import ja from "dayjs/locale/ja";
dayjs.locale(ja);

export default {
    createResource(state, payload) {
    console.log("createResource",state.currentbirth);
    state.currentbirth.data.push(payload);
    },

    ReadResourceMeta(state, payload) {
      state.currentMeta = payload;
    },

    ReadResources(state, payload) {
      console.log(payload)
      state.currentfamily = payload.data
      console.log(state.currentfamily)

      for (let index = 0; index < payload.data.length; index++) {
        // if(payload.data[index].type == `家族`){
        if (payload.data[index].is_alive == true) {
          state.currentfamily.push(payload.data[index]);
        }
        else {
          // state.pastfamily.push(payload.data[index]);
        }
        // }
      }
      // if (state.currentfamily) {
      //   return;
      // }
      console.log(state.currentfamily)

      state.pastfamily.forEach((current, index) => {
        console.log(current.date_of_birth)
        const birthday = dayjs(current.date_of_birth).format("YYYY-MM-DD");
        // state.currentbirth[index] = {}

        const day0 = dayjs(birthday).add(3, "y").format("YYYY-MM-DD");
        const day1 = dayjs(birthday).add(5, "y").format("YYYY-MM-DD");
        const day2 = dayjs(birthday).add(7, "y").format("YYYY-MM-DD");
        const day3 = dayjs(birthday).add(61, "y").format("YYYY-MM-DD");
        const day4 = dayjs(birthday).add(70, "y").format("YYYY-MM-DD");
        const day5 = dayjs(birthday).add(77, "y").format("YYYY-MM-DD");
        const day6 = dayjs(birthday).add(80, "y").format("YYYY-MM-DD");
        const day7 = dayjs(birthday).add(88, "y").format("YYYY-MM-DD");
        const day8 = dayjs(birthday).add(90, "y").format("YYYY-MM-DD");
        const day9 = dayjs(birthday).add(99, "y").format("YYYY-MM-DD");
        const day10 = dayjs(birthday).add(100, "y").format("YYYY-MM-DD");
        const day11 = dayjs(birthday).add(108, "y").format("YYYY-MM-DD");

        state.currentbirth[index] = [
          {
            plan: "七五三(3歳)",
            scheduled: day0,
          },
          {
            plan: "七五三(5歳)",
            scheduled: day1,
          },
          {
            plan: "七五三(7歳)",
            scheduled: day2,
          },
          {
            plan: "還暦(61歳)",
            scheduled: day3,
          },
          {
            plan: "古希(70歳)",
            scheduled: day4,
          },
          {
            plan: "喜寿(77歳)",
            scheduled: day5,
          },
          {
            plan: "傘寿(80歳)",
            scheduled: day6,
          },
          {
            plan: "米寿(88歳)",
            scheduled: day7,
          },
          {
            plan: "卒寿(90歳)",
            scheduled: day8,
          },
          {
            plan: "白寿(99歳)",
            scheduled: day9,
          },
          {
            plan: "上寿(100歳)",
            scheduled: day10,
          },
          {
            plan: "茶寿(108歳)",
            scheduled: day11,
          },
        ]
        
      })
      console.log("readcurrentbirth",state.currentbirth)
      console.log("readcurrentfamily",state.currentfamily)
  
      // state.currentbirth = payload;
    },
    SearchResources(state, payload) {

      state.currentbirth = payload;
    },
    updateResource(state, payload) {
      state.currentbirth.data = state.currentbirth.data.map((current) =>
        payload.id === current.id ? { ...current, ...payload } : current
      );
    },
    deleteResource(state, payload) {
      console.log(state);
      state.currentbirth.data = state.currentbirth.data.filter((current) => current.id !== payload.id);
    },
    ReadResourcesProfile(state, payload) {
      console.log(state);
      state.currentbirth = pyaload;
    }
  };
  