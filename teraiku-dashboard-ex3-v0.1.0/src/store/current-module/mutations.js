import * as dayjs from "dayjs";

export default {

  createCurrentResource(state, payload) {
    console.log(payload.data);
    state.currentfamily = payload.data;
    console.log(state.currentfamily);
  },

  createPastResource(state, payload) {
    console.log(payload.data);
    state.pastfamily = payload.data;
    console.log(state.pastfamily);
  },

  ReadResources(state, payload) {
    state.currentfamily = [];
    state.pastfamily = [];
    console.log(payload.data);
    console.log(payload.data.length);
    for(let index=0; index<payload.data.length; index++){
      // if(payload.data[index].type == `家族`){
        if(!payload.data[index].corporation){
          if(payload.data[index].type == `家族` || payload.data[index].is_user){
            if(payload.data[index].is_alive == true){
              state.currentfamily.push(payload.data[index]);
            } 
            else{
              state.pastfamily.push(payload.data[index]);
            }
          }
        }
      // }
    }
    for (let i = 0; i < state.pastfamily.length; i++) {
      // console.log(rows.value[i].date_of_death)
      const deathday = dayjs(state.pastfamily[i].date_of_death).format("YYYY-MM-DD");
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
      state.pastdeath[i] = [
        {
          plan: " 命日",
          scheduled: day0,
        },
        {
          plan: " 初七日忌・一七日忌",
          scheduled: day1,
        },
        {
          plan: "二七日忌",
          scheduled: day2,
        },
        {
          plan: "三七日忌",
          scheduled: day3,
        },
        {
          plan: "四七日忌",
          scheduled: day4,
        },
        {
          plan: "五七日忌・三十五日忌",
          scheduled: day5,
        },
        {
          plan: "六七日忌",
          scheduled: day6,
        },
        {
          plan: "七七日忌・四十九日忌",
          scheduled: day7,
        },
        {
          plan: "百か日忌",
          scheduled: day8,
        },
        {
          plan: "一周忌",
          scheduled: day9,
        },
        {
          plan: "三回忌",
          scheduled: day10,
        },
        {
          plan: "七回忌",
          scheduled: day11,
        },
        {
          plan: "十三回忌",
          scheduled: day12,
        },
        {
          plan: "十七回忌",
          scheduled: day13,
        },
        {
          plan: "二十三回忌",
          scheduled: day14,
        },
        {
          plan: "二十五回忌",
          scheduled: day15,
        },
        {
          plan: "二十七回忌",
          scheduled: day16,
        },
        {
          plan: "三十三回忌",
          scheduled: day17,
        },
        {
          plan: "五十回忌",
          scheduled: day18,
        }
      ]
    }
    console.log(state.pastdeath)
    console.log("state.currentfamily",state.currentfamily)
    console.log("state.pastfamily",state.pastfamily)
  },
  ReadRepresentResources(state, payload) {
    state.famikyRepresent = payload;
  },
  SearchResources(state, payload) {
    state.currentfamily = payload;
  },
  updateResource(state, payload) {
    console.log(payload.data)
    console.log(state.currentfamily)
    state.currentfamily = state.currentfamily.map((current) =>
      payload.data.id === current.id ? { ...current, ...payload.data } : current
    );
    state.createfamily = payload.data;
  },
  deleteResource(state, payload) {
    state.deletefamily = [];
    // state.currentfamily.data = state.currentfamily.data.filter((current) => current.id !== payload.id);
    // state.pastfamily.data = state.pastfamily.data.filter((past) => past.id !== payload.id);
    state.deletefamily = payload.data;
    console.log(state.deletefamily);
  },
  ReadResourcesProfile(state, payload) {
    console.log(state);
    state.currentfamily = pyaload;
  }
};
