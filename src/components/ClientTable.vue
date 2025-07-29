<template>
    <div>
      <!-- Header con estadísticas -->
      <v-row class="mb-4">
        <v-col cols="12" sm="6" md="3">
          <v-card class="pa-4 text-center" color="primary" variant="tonal">
            <v-icon size="32" class="mb-2">mdi-account-group</v-icon>
            <div class="text-h4 font-weight-bold">{{ clients.length }}</div>
            <div class="text-body-2">Total Clientes</div>
          </v-card>
        </v-col>
      </v-row>
  
      <!-- Mostrar mensaje si no hay clientes -->
      <v-card v-if="clients.length === 0" class="pa-8 text-center" elevation="2">
        <v-avatar size="80" color="grey-lighten-3" class="mb-4">
          <v-icon size="40" color="grey">mdi-account-off</v-icon>
        </v-avatar>
        <div class="text-h6 mb-2">No hay clientes registrados</div>
        <div class="text-body-2 text-medium-emphasis mb-4">
          ¡Comienza agregando tu primer cliente!
        </div>
        <v-btn color="primary" prepend-icon="mdi-plus" @click="$emit('create-client')">
          Crear Primer Cliente
        </v-btn>
      </v-card>
      
      <!-- Tabla de clientes mejorada -->
      <v-card v-else elevation="2" class="overflow-hidden">
        <v-card-title class="d-flex align-center pa-4 bg-grey-lighten-5">
          <v-icon class="mr-2">mdi-table</v-icon>
          Lista de Clientes
          <v-spacer></v-spacer>
          <v-chip color="primary" variant="tonal">
            {{ clients.length }} cliente{{ clients.length !== 1 ? 's' : '' }}
          </v-chip>
        </v-card-title>
  
        <v-data-table
          :headers="headers"
          :items="clients"
          :items-per-page="10"
          class="elevation-0"
          hover
        >
          <!-- Slot personalizado para el ID -->
          <template v-slot:item.id="{ item }">
            <v-chip size="small" color="primary" variant="tonal">
              #{{ item.id }}
            </v-chip>
          </template>
  
          <!-- Slot personalizado para el nombre con avatar -->
          <template v-slot:item.nombre="{ item }">
            <div class="d-flex align-center">
              <v-avatar size="32" class="mr-3" color="primary">
                <span class="text-white font-weight-bold">
                  {{ getInitials(item.nombre) }}
                </span>
              </v-avatar>
              <div>
                <div class="font-weight-medium">{{ item.nombre }}</div>
              </div>
            </div>
          </template>
          
          <!-- Slot para el email con formato mejorado -->
          <template v-slot:item.email="{ item }">
            <div class="d-flex align-center">
              <v-icon size="16" class="mr-2" color="grey">mdi-email</v-icon>
              <a 
                :href="`mailto:${item.email}`" 
                class="text-decoration-none text-primary"
                @click.stop
              >
                {{ item.email }}
              </a>
            </div>
          </template>
          
          <!-- Slot para el teléfono con formato mejorado -->
          <template v-slot:item.telefono="{ item }">
            <div class="d-flex align-center">
              <v-icon size="16" class="mr-2" color="grey">mdi-phone</v-icon>
              <a 
                :href="`tel:${item.telefono}`" 
                class="text-decoration-none text-primary"
                @click.stop
              >
                {{ item.telefono }}
              </a>
            </div>
          </template>
  
          <!-- Slot personalizado para las acciones mejoradas -->
          <template v-slot:item.actions="{ item }">
            <div class="d-flex gap-1">
              <v-btn
                icon
                size="small"
                color="primary"
                variant="tonal"
                @click="$emit('edit-client', item)"
              >
                <v-icon size="18">mdi-pencil</v-icon>
                <v-tooltip activator="parent" location="top">
                  Editar cliente
                </v-tooltip>
              </v-btn>
              
              <v-btn
                icon
                size="small"
                color="error"
                variant="tonal"
                @click="$emit('delete-client', item)"
              >
                <v-icon size="18">mdi-delete</v-icon>
                <v-tooltip activator="parent" location="top">
                  Eliminar cliente
                </v-tooltip>
              </v-btn>
            </div>
          </template>
  
          <!-- Slot para personalizar el footer -->
          <template v-slot:bottom>
            <div class="pa-4 d-flex justify-center">
              <v-pagination
                v-model="page"
                :length="Math.ceil(clients.length / itemsPerPage)"
                :total-visible="5"
                color="primary"
              ></v-pagination>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  // Props
  const props = defineProps({
    clients: {
      type: Array,
      required: true,
      default: () => []
    }
  })
  
  // Emits
  defineEmits(['edit-client', 'delete-client', 'create-client'])
  
  // Estado local
  const page = ref(1)
  const itemsPerPage = ref(10)
  
  // Headers mejorados de la tabla
  const headers = [
    {
      title: 'ID',
      key: 'id',
      sortable: true,
      width: '80px'
    },
    {
      title: 'Cliente',
      key: 'nombre',
      sortable: true,
      width: '250px'
    },
    {
      title: 'Email',
      key: 'email',
      sortable: true
    },
    {
      title: 'Teléfono',
      key: 'telefono',
      sortable: true
    },
    {
      title: 'Acciones',
      key: 'actions',
      sortable: false,
      width: '120px',
      align: 'center'
    }
  ]
  
  // Función para obtener iniciales del nombre
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }
  </script>
  
  <style scoped>
  .v-data-table {
    border-radius: 0 0 12px 12px;
  }
  
  .v-data-table >>> .v-data-table__tr:hover {
    background-color: rgba(var(--v-theme-primary), 0.04) !important;
  }
  
  .v-card {
    border-radius: 12px !important;
  }
  
  .v-btn {
    border-radius: 8px !important;
  }
  
  .v-chip {
    border-radius: 8px !important;
  }
  
  .v-avatar {
    border: 2px solid rgba(var(--v-theme-primary), 0.1);
  }
  </style>
  