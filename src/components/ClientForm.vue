<template>
    <v-form
      ref="formRef"
      v-model="isFormValid"
      @submit.prevent="handleSubmit"
    >
      <v-card class="pa-6" elevation="0">
        <v-card-text class="px-0">
          <div class="text-h6 mb-6 text-center">
            <v-avatar class="mb-4" size="64" color="primary">
              <v-icon size="32" color="white">
                {{ isEditMode ? 'mdi-account-edit' : 'mdi-account-plus' }}
              </v-icon>
            </v-avatar>
            <div class="text-h5 font-weight-medium">
              {{ isEditMode ? 'Editar Cliente' : 'Nuevo Cliente' }}
            </div>
            <div class="text-body-2 text-medium-emphasis mt-2">
              {{ isEditMode ? 'Actualiza la información del cliente' : 'Completa los datos del nuevo cliente' }}
            </div>
          </div>
  
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="formData.nombre"
                label="Nombre completo"
                :rules="nameRules"
                variant="outlined"
                required
                :disabled="loading"
                class="mb-2"
                hide-details="auto"
              >
                <template v-slot:prepend-inner>
                  <v-icon color="primary">mdi-account</v-icon>
                </template>
              </v-text-field>
            </v-col>
            
            <v-col cols="12">
              <v-text-field
                v-model="formData.email"
                label="Correo electrónico"
                :rules="emailRules"
                variant="outlined"
                type="email"
                required
                :disabled="loading"
                class="mb-2"
                hide-details="auto"
              >
                <template v-slot:prepend-inner>
                  <v-icon color="primary">mdi-email</v-icon>
                </template>
              </v-text-field>
            </v-col>
            
            <v-col cols="12">
              <v-text-field
                v-model="formData.telefono"
                label="Teléfono"
                :rules="phoneRules"
                variant="outlined"
                type="tel"
                required
                :disabled="loading"
                class="mb-4"
                hide-details="auto"
              >
                <template v-slot:prepend-inner>
                  <v-icon color="primary">mdi-phone</v-icon>
                </template>
              </v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
  
        <v-card-actions class="px-0 pt-4">
          <v-row>
            <v-col cols="12" sm="6">
              <v-btn
                color="grey-lighten-1"
                variant="outlined"
                @click="$emit('cancel')"
                :disabled="loading"
                block
                size="large"
                prepend-icon="mdi-arrow-left"
              >
                Cancelar
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6">
              <v-btn
                type="submit"
                color="primary"
                :loading="loading"
                :disabled="!isFormValid || loading"
                block
                size="large"
                :prepend-icon="isEditMode ? 'mdi-content-save' : 'mdi-plus'"
              >
                {{ isEditMode ? 'Actualizar' : 'Crear' }} Cliente
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-form>
  </template>
  
  <script setup>
  import { ref, reactive, watch } from 'vue'
  import { useClientForm } from '../composables/useClientForm'
  
  // Props
  const props = defineProps({
    client: {
      type: Object,
      default: () => ({
        id: null,
        nombre: '',
        email: '',
        telefono: ''
      })
    },
    loading: {
      type: Boolean,
      default: false
    },
    isEditMode: {
      type: Boolean,
      default: false
    }
  })
  
  // Emits
  const emit = defineEmits(['submit', 'cancel'])
  
  // Referencia al formulario
  const formRef = ref(null)
  
  // Usar el composable para la lógica del formulario
  const { formData, isFormValid, nameRules, emailRules, phoneRules, resetForm } = useClientForm()
  
  // Observar cambios en el prop client para actualizar el formulario
  watch(() => props.client, (newClient) => {
    if (newClient) {
      formData.nombre = newClient.nombre || ''
      formData.email = newClient.email || ''
      formData.telefono = newClient.telefono || ''
    }
  }, { immediate: true, deep: true })
  
  // Manejar envío del formulario
  const handleSubmit = async () => {
    // Validar el formulario
    const { valid } = await formRef.value.validate()
    
    if (valid) {
      emit('submit', { ...formData })
      
      // Resetear formulario solo si no estamos en modo edición
      if (!props.isEditMode) {
        resetForm()
        formRef.value.resetValidation()
      }
    }
  }
  </script>
  
  <style scoped>
  .v-card {
    border-radius: 16px !important;
  }
  
  .v-text-field {
    transition: all 0.3s ease;
  }
  
  .v-text-field:hover {
    transform: translateY(-1px);
  }
  
  .v-btn {
    border-radius: 12px !important;
    text-transform: none !important;
    font-weight: 500;
  }
  </style>
  