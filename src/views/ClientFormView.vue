<template>
  <div>
    <v-container class="py-8">
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card elevation="8" class="overflow-hidden">
            <!-- Header mejorado -->
            <v-card-title class="pa-0">
              <v-app-bar color="primary" dark flat>
                <v-btn
                  icon
                  @click="goBack"
                  class="mr-2"
                  :disabled="isSubmitting"
                >
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <v-app-bar-title>
                  {{ isEditMode ? 'Editar Cliente' : 'Nuevo Cliente' }}
                </v-app-bar-title>
              </v-app-bar>
            </v-card-title>
            
            <v-card-text class="pa-0">
              <!-- Mostrar error si existe -->
              <v-alert
                v-if="hasError"
                type="error"
                variant="tonal"
                class="ma-4"
                closable
              >
                <template v-slot:prepend>
                  <v-icon>mdi-alert-circle</v-icon>
                </template>
                {{ error }}
              </v-alert>
              
              <!-- Formulario de cliente -->
              <ClientForm
                :client="clientData"
                :loading="isSubmitting"
                :is-edit-mode="isEditMode"
                @submit="handleSubmit"
                @cancel="goBack"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Spinner elegante que solo opaca la pantalla -->
    <LoadingSpinner
      :show="isSubmitting"
      :show-text="false"
      :type="isEditMode ? 'warning' : 'success'"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { useSweetAlert } from '../composables/useSweetAlert'
import ClientForm from '../components/ClientForm.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const store = useStore()
const router = useRouter()
const route = useRoute()
const { showSuccess, showError } = useSweetAlert()

// Props del componente (para modo edición)
const props = defineProps({
  id: String
})

// Estado local
const clientData = ref({
  id: null,
  nombre: '',
  email: '',
  telefono: ''
})

// Computed properties
const isEditMode = computed(() => !!props.id)
const isSubmitting = computed(() => {
  return isEditMode.value 
    ? store.getters['clients/isOperationLoading']('update')
    : store.getters['clients/isOperationLoading']('create')
})
const hasError = computed(() => store.getters['clients/hasError'])
const error = computed(() => store.getters['clients/error'])

// Cargar datos del cliente si estamos en modo edición
const loadClientData = () => {
  if (isEditMode.value) {
    const client = store.getters['clients/clientById'](props.id)
    if (client) {
      clientData.value = { ...client }
    } else {
      // Cliente no encontrado, redirigir a la lista
      router.push({ name: 'ClientList' })
    }
  }
}

onMounted(() => {
  loadClientData()
})

// Manejar envío del formulario con SweetAlert2
const handleSubmit = async (formData) => {
  let result
  
  if (isEditMode.value) {
    // Actualizar cliente existente
    result = await store.dispatch('clients/updateClient', {
      ...formData,
      id: parseInt(props.id)
    })
  } else {
    // Crear nuevo cliente
    result = await store.dispatch('clients/createClient', formData)
  }
  
  if (result.success) {
    await showSuccess(
      isEditMode.value ? '¡Cliente actualizado!' : '¡Cliente creado!',
      result.message
    )
    router.push({ name: 'ClientList' })
  } else {
    await showError(
      isEditMode.value ? 'Error al actualizar' : 'Error al crear',
      result.message
    )
  }
}

// Volver a la lista
const goBack = () => {
  if (!isSubmitting.value) {
    router.push({ name: 'ClientList' })
  }
}
</script>

<style scoped>
.v-card {
  border-radius: 16px !important;
}
</style>
