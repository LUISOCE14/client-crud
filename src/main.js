import { createApp } from "vue"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import "vuetify/styles"
import "@mdi/font/css/materialdesignicons.css"

import App from "./App.vue"
import router from "./router"
import store from "./store"

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light",
  },
})

const app = createApp(App)

app.use(store)
app.use(router)
app.use(vuetify)

app.mount("#app")
