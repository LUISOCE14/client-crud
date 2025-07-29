<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-app-bar-title>
        <v-icon left>mdi-account-group</v-icon>
        Gestión de Clientes
      </v-app-bar-title>
      
      <v-spacer></v-spacer>
      
      <v-btn 
        :to="{ name: 'ClientList' }" 
        text
        class="mr-2"
      >
        <v-icon left>mdi-view-list</v-icon>
        Lista
      </v-btn>
      
      <v-btn 
        :to="{ name: 'ClientCreate' }" 
        text
      >
        <v-icon left>mdi-plus</v-icon>
        Nuevo Cliente
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <!-- Snackbar para notificaciones -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
      top
    >
      {{ snackbar.message }}
      <template v-slot:actions>
        <v-btn
          color="white"
          variant="text"
          @click="snackbar.show = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

// Computed para el snackbar global
const snackbar = computed(() => store.state.ui.snackbar)
</script>
