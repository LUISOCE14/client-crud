<template>
    <v-dialog
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      max-width="500px"
      persistent
    >
      <v-card>
        <v-card-title class="d-flex align-center">
          <v-icon color="warning" class="mr-2">mdi-alert</v-icon>
          {{ title }}
        </v-card-title>
        
        <v-card-text>
          <p class="text-body-1 mb-0">{{ message }}</p>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          
          <v-btn
            color="grey"
            variant="outlined"
            @click="$emit('cancel')"
            :disabled="loading"
          >
            Cancelar
          </v-btn>
          
          <v-btn
            color="error"
            @click="$emit('confirm')"
            :loading="loading"
            :disabled="loading"
          >
            Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  // Props
  defineProps({
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'Confirmar acción'
    },
    message: {
      type: String,
      default: '¿Está seguro de que desea continuar?'
    },
    loading: {
      type: Boolean,
      default: false
    }
  })
  
  // Emits
  defineEmits(['update:modelValue', 'confirm', 'cancel'])
  </script>
  