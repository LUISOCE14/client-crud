import { createRouter, createWebHistory } from "vue-router"
import ClientListView from "../views/ClientListView.vue"
import ClientFormView from "../views/ClientFormView.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: { name: "ClientList" }, // Redirigir directamente a la lista
  },
  {
    path: "/clients",
    name: "ClientList",
    component: ClientListView,
    meta: {
      title: "Lista de Clientes",
    },
  },
  {
    path: "/clients/create",
    name: "ClientCreate",
    component: ClientFormView,
    meta: {
      title: "Crear Cliente",
    },
  },
  {
    path: "/clients/:id/edit",
    name: "ClientEdit",
    component: ClientFormView,
    props: true,
    meta: {
      title: "Editar Cliente",
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Guard para actualizar el título de la página
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - Gestión de Clientes` : "Gestión de Clientes"
  next()
})

export default router
