// Módulo Vuex para gestión de clientes
// Simula persistencia de datos en memoria

const state = {
    clients: [
      {
        id: 1,
        nombre: "Juan Pérez",
        email: "juan.perez@email.com",
        telefono: "+34 123 456 789",
      },
      {
        id: 2,
        nombre: "María García",
        email: "maria.garcia@email.com",
        telefono: "+34 987 654 321",
      },
      {
        id: 3,
        nombre: "Carlos López",
        email: "carlos.lopez@email.com",
        telefono: "+34 555 123 456",
      },
    ],
    nextId: 4, // Contador para el próximo ID
    loading: false,
    error: null,
    operationLoading: {
      create: false,
      update: false,
      delete: false,
      fetch: false,
    },
  }
  
  const mutations = {
    SET_LOADING(state, loading) {
      state.loading = loading
    },
  
    SET_OPERATION_LOADING(state, { operation, loading }) {
      state.operationLoading[operation] = loading
    },
  
    SET_ERROR(state, error) {
      state.error = error
    },
  
    SET_CLIENTS(state, clients) {
      state.clients = clients
    },
  
    ADD_CLIENT(state, client) {
      // Usar el contador para generar ID secuencial
      const newClient = {
        ...client,
        id: state.nextId,
      }
      state.clients.push(newClient)
      state.nextId++ // Incrementar el contador
    },
  
    UPDATE_CLIENT(state, updatedClient) {
      const index = state.clients.findIndex((client) => client.id === updatedClient.id)
      if (index !== -1) {
        state.clients.splice(index, 1, updatedClient)
      }
    },
  
    DELETE_CLIENT(state, clientId) {
      state.clients = state.clients.filter((client) => client.id !== clientId)
    },
  }
  
  const actions = {
    // Simular operación asíncrona para obtener clientes
    async fetchClients({ commit }) {
      commit("SET_OPERATION_LOADING", { operation: "fetch", loading: true })
      commit("SET_ERROR", null)
  
      try {
        // Simular delay de API más realista
        await new Promise((resolve) => setTimeout(resolve, 800))
        // En una app real, aquí haríamos la llamada a la API
        commit("SET_OPERATION_LOADING", { operation: "fetch", loading: false })
      } catch (error) {
        commit("SET_ERROR", "Error al cargar los clientes")
        commit("SET_OPERATION_LOADING", { operation: "fetch", loading: false })
      }
    },
  
    // Crear nuevo cliente
    async createClient({ commit, dispatch }, clientData) {
      commit("SET_OPERATION_LOADING", { operation: "create", loading: true })
      commit("SET_ERROR", null)
  
      try {
        // Simular delay de API
        await new Promise((resolve) => setTimeout(resolve, 1000))
  
        commit("ADD_CLIENT", clientData)
        commit("SET_OPERATION_LOADING", { operation: "create", loading: false })
  
        return { success: true, message: "Cliente creado exitosamente" }
      } catch (error) {
        commit("SET_ERROR", "Error al crear el cliente")
        commit("SET_OPERATION_LOADING", { operation: "create", loading: false })
  
        return { success: false, message: "Error al crear el cliente" }
      }
    },
  
    // Actualizar cliente existente
    async updateClient({ commit, dispatch }, clientData) {
      commit("SET_OPERATION_LOADING", { operation: "update", loading: true })
      commit("SET_ERROR", null)
  
      try {
        // Simular delay de API
        await new Promise((resolve) => setTimeout(resolve, 1000))
  
        commit("UPDATE_CLIENT", clientData)
        commit("SET_OPERATION_LOADING", { operation: "update", loading: false })
  
        return { success: true, message: "Cliente actualizado exitosamente" }
      } catch (error) {
        commit("SET_ERROR", "Error al actualizar el cliente")
        commit("SET_OPERATION_LOADING", { operation: "update", loading: false })
  
        return { success: false, message: "Error al actualizar el cliente" }
      }
    },
  
    // Eliminar cliente
    async deleteClient({ commit, dispatch }, clientId) {
      commit("SET_OPERATION_LOADING", { operation: "delete", loading: true })
      commit("SET_ERROR", null)
  
      try {
        // Simular delay de API
        await new Promise((resolve) => setTimeout(resolve, 800))
  
        commit("DELETE_CLIENT", clientId)
        commit("SET_OPERATION_LOADING", { operation: "delete", loading: false })
  
        return { success: true, message: "Cliente eliminado exitosamente" }
      } catch (error) {
        commit("SET_ERROR", "Error al eliminar el cliente")
        commit("SET_OPERATION_LOADING", { operation: "delete", loading: false })
  
        return { success: false, message: "Error al eliminar el cliente" }
      }
    },
  }
  
  const getters = {
    allClients: (state) => state.clients,
    clientById: (state) => (id) => state.clients.find((client) => client.id === Number.parseInt(id)),
    clientsCount: (state) => state.clients.length,
    isLoading: (state) => state.loading,
    isOperationLoading: (state) => (operation) => state.operationLoading[operation],
    hasError: (state) => state.error !== null,
    error: (state) => state.error,
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
  }
  