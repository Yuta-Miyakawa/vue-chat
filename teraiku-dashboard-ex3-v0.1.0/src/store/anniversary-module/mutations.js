import * as dayjs from "dayjs";
import ja from "dayjs/locale/ja";
dayjs.locale(ja);

export default {
    createResource(state, payload) {
    console.log("createResource",state.pastdeath);
    state.pastdeath.data.push(payload);
    },

    readAnniResource(state, payload) {
      console.log("readanniResource",payload);
      state.Anniversary = payload.data;
      },

    ReadResourceMeta(state, payload) {
      state.pastMeta = payload;
    },

    ReadResources(state, payload) {
      state.pastfamily = []
      state.pastdeath = []
      console.log(state.pastfamily)

      for (let index = 0; index < payload.data.length; index++) {
        // if(payload.data[index].type == `家族`){
          // console.log(payload.data[index].is_alive);
        if (payload.data[index].is_alive == false) {
          state.pastfamily.push(payload.data[index]);
        }
        else {
          // state.pastfamily.push(payload.data[index]);
        }
        // }
      }
      console.log(state.pastfamily)
      // if (state.pastfamily){
      //   return;
      // }
      state.pastfamily.forEach((past, index) => {
        console.log(past)
        const deathday = dayjs(past.date_of_death).format("YYYY-MM-DD");
        // state.pastdeath[index] = {}
        const day0 = dayjs(deathday).format("YYYY-MM-DD");
        const day1 = dayjs(deathday).add(6, "d").format("YYYY-MM-DD");
        const day2 = dayjs(deathday).add(13, "d").format("YYYY-MM-DD");
        const day3 = dayjs(deathday).add(20, "d").format("YYYY-MM-DD");
        const day4 = dayjs(deathday).add(27, "d").format("YYYY-MM-DD");
        const day5 = dayjs(deathday).add(34, "d").format("YYYY-MM-DD");
        const day6 = dayjs(deathday).add(41, "d").format("YYYY-MM-DD");
        const day7 = dayjs(deathday).add(48, "d").format("YYYY-MM-DD");
        const day8 = dayjs(deathday).add(99, "d").format("YYYY-MM-DD");
        const day9 = dayjs(deathday).add(1, "y").format("YYYY-MM-DD");
        const day10 = dayjs(deathday).add(2, "y").format("YYYY-MM-DD");
        const day11 = dayjs(deathday).add(6, "y").format("YYYY-MM-DD");
        const day12 = dayjs(deathday).add(12, "y").format("YYYY-MM-DD");
        const day13 = dayjs(deathday).add(16, "y").format("YYYY-MM-DD");
        const day14 = dayjs(deathday).add(22, "y").format("YYYY-MM-DD");
        const day15 = dayjs(deathday).add(24, "y").format("YYYY-MM-DD");
        const day16 = dayjs(deathday).add(26, "y").format("YYYY-MM-DD");
        const day17 = dayjs(deathday).add(32, "y").format("YYYY-MM-DD");
        const day18 = dayjs(deathday).add(49, "y").format("YYYY-MM-DD");


        state.pastdeath[index] = [
          {
            plan: " 命日",
            scheduled: day0,
            passaway: "御命日",
          },
          {
            plan: " 初七日忌・一七日忌",
            scheduled: day1,
            passaway: "７日目",
          },
          {
            plan: "二七日忌",
            scheduled: day2,
            passaway: "14日目",
          },
          {
            plan: "三七日忌",
            scheduled: day3,
            passaway: "21日目",
          },
          {
            plan: "四七日忌",
            scheduled: day4,
            passaway: "28日目",
          },
          {
            plan: "五七日忌・三十五日忌",
            scheduled: day5,
            passaway: "35日目",
          },
          {
            plan: "六七日忌",
            scheduled: day6,
            passaway: "42日目",
          },
          {
            plan: "七七日忌・四十九日忌",
            scheduled: day7,
            passaway: "49日目",
          },
          {
            plan: "百か日忌",
            scheduled: day8,
            passaway: "100日目",
          },
          {
            plan: "一周忌",
            scheduled: day9,
            passaway: "満1年目",
          },
          {
            plan: "三回忌",
            scheduled: day10,
            passaway: "満2年目",
          },
          {
            plan: "七回忌",
            scheduled: day11,
            passaway: "満6年目",
          },
          {
            plan: "十三回忌",
            scheduled: day12,
            passaway: "満12年目",
          },
          {
            plan: "十七回忌",
            scheduled: day13,
            passaway: "満16年目",
          },
          {
            plan: "二十三回忌",
            scheduled: day14,
            passaway: "満22年目",
          },
          {
            plan: "二十五回忌",
            scheduled: day15,
            passaway: "満24年目",
          },
          {
            plan: "二十七回忌",
            scheduled: day16,
            passaway: "満26年目",
          },
          {
            plan: "三十三回忌",
            scheduled: day17,
            passaway: "満32年目",
          },
          {
            plan: "五十回忌",
            scheduled: day18,
            passaway: "満49年目",
          }
        ]
        
      })
      console.log("readpastdeath",state.pastdeath)
      console.log("readpastfamily",state.pastfamily)
  
      // state.pastdeath = payload;
    },
    SearchResources(state, payload) {

      state.pastdeath = payload;
    },
    updateResource(state, payload) {
      state.pastdeath.data = state.pastdeath.data.map((past) =>
        payload.id === past.id ? { ...past, ...payload } : past
      );
    },
    deleteResource(state, payload) {
      console.log(state);
      state.pastdeath.data = state.pastdeath.data.filter((current) => current.id !== payload.id);
    },
    ReadResourcesProfile(state, payload) {
      console.log(state);
      state.pastdeath = pyaload;
    }
  };
  