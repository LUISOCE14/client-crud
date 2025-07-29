import { createStore } from "vuex"
import clients from "./modules/clients"

export default createStore({
  modules: {
    clients,
  },
  state: {
    ui: {
      snackbar: {
        show: false,
        message: "",
        color: "success",
      },
    },
  },
  mutations: {
    SHOW_SNACKBAR(state, { message, color = "success" }) {
      state.ui.snackbar = {
        show: true,
        message,
        color,
      }
    },
    HIDE_SNACKBAR(state) {
      state.ui.snackbar.show = false
    },
  },
  actions: {
    showSnackbar({ commit }, payload) {
      commit("SHOW_SNACKBAR", payload)
    },
    hideSnackbar({ commit }) {
      commit("HIDE_SNACKBAR")
    },
  },
})
