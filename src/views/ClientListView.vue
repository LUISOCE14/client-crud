<template>
  <div>
    <v-container class="py-6">
      <!-- Header mejorado -->
      <v-row class="mb-6">
        <v-col cols="12">
          <div class="d-flex align-center justify-space-between flex-wrap">
            <div>
              <h1 class="text-h4 font-weight-bold mb-2">
                <v-icon class="mr-2" color="primary">mdi-account-group</v-icon>
                Gestión de Clientes
              </h1>
              <p class="text-body-1 text-medium-emphasis">
                Administra tu base de datos de clientes
              </p>
            </div>
            <v-btn
              color="primary"
              size="large"
              :to="{ name: 'ClientCreate' }"
              prepend-icon="mdi-plus"
              class="mt-4 mt-sm-0"
              :disabled="isOperationLoading('fetch')"
            >
              Nuevo Cliente
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <!-- Contenido principal -->
      <v-row>
        <v-col cols="12">
          <!-- Mostrar loading inicial -->
          <v-card v-if="isOperationLoading('fetch') && clients.length === 0" class="pa-8 text-center">
            <div class="loading-state">
              <div class="custom-spinner mb-4">
                <div class="spinner-ring primary"></div>
                <div class="spinner-ring primary"></div>
                <div class="spinner-ring primary"></div>
                <div class="spinner-ring primary"></div>
              </div>
              <div class="text-h6 mb-2">Cargando clientes...</div>
              <div class="text-body-2 text-medium-emphasis">
                Obteniendo la información más reciente
              </div>
            </div>
          </v-card>
          
          <!-- Mostrar error si existe -->
          <v-alert
            v-else-if="hasError"
            type="error"
            variant="tonal"
            class="mb-4"
            closable
          >
            <template v-slot:prepend>
              <v-icon>mdi-alert-circle</v-icon>
            </template>
            <div class="font-weight-medium">Error al cargar los datos</div>
            <div>{{ error }}</div>
          </v-alert>
          
          <!-- Tabla de clientes -->
          <ClientTable
            v-else
            :clients="clients"
            :loading="isOperationLoading('delete')"
            @edit-client="handleEditClient"
            @delete-client="handleDeleteClient"
            @create-client="handleCreateClient"
          />
        </v-col>
      </v-row>
    </v-container>

    <!-- Spinner simple que opaca la pantalla -->
    <LoadingSpinner
      :show="isOperationLoading('delete')"
      title="Eliminando cliente..."
      message="Procesando solicitud..."
      type="error"
      :show-text="false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { useSweetAlert } from '../composables/useSweetAlert'
import ClientTable from '../components/ClientTable.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const store = useStore()
const router = useRouter()
const { confirmDelete, showSuccess, showError } = useSweetAlert()

// Computed properties del store
const clients = computed(() => store.getters['clients/allClients'])
const isOperationLoading = (operation) => store.getters['clients/isOperationLoading'](operation)
const hasError = computed(() => store.getters['clients/hasError'])
const error = computed(() => store.getters['clients/error'])

// Cargar clientes al montar el componente
onMounted(() => {
  store.dispatch('clients/fetchClients')
})

// Manejar creación de cliente
const handleCreateClient = () => {
  router.push({ name: 'ClientCreate' })
}

// Manejar edición de cliente
const handleEditClient = (client) => {
  router.push({ name: 'ClientEdit', params: { id: client.id } })
}

// Manejar eliminación de cliente con SweetAlert2
const handleDeleteClient = async (client) => {
  const confirmed = await confirmDelete(client.nombre)
  
  if (confirmed) {
    const result = await store.dispatch('clients/deleteClient', client.id)
    
    if (result.success) {
      await showSuccess('¡Cliente eliminado!', result.message)
    } else {
      await showError('Error al eliminar', result.message)
    }
  }
}
</script>

<style scoped>
.loading-state {
  padding: 2rem;
}

.custom-spinner {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto;
}

.spinner-ring {
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 6px solid transparent;
  border-radius: 50%;
  animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
}

.spinner-ring.primary {
  border-color: #1976d2 transparent transparent transparent;
}

.spinner-ring:nth-child(1) { animation-delay: -0.45s; }
.spinner-ring:nth-child(2) { animation-delay: -0.3s; }
.spinner-ring:nth-child(3) { animation-delay: -0.15s; }

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
