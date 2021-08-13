import { createApp } from "vue";
import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      count: 0,
      event: "",
    };
  },
  mutations: {
    increment(state: any) {
      state.count++;
    },
    setEvent(state, eventName: string) {
      state.event = eventName;
    },
  },
});

export default store;
