<template>
    <tr>
      <td>{{ client.name }}</td>
      <td>{{ client.email }}</td>
      <td>{{ client.phone }}</td>
      <td class="text-center">
        <!-- Botón para editar, emite el evento 'edit' con el ID del cliente -->
        <v-btn
          icon="mdi-pencil"
          variant="text"
          color="info"
          @click="$emit('edit', client.id)"
        ></v-btn>
        <!-- Botón para borrar, emite el evento 'delete' con el ID del cliente -->
        <v-btn
          icon="mdi-delete"
          variant="text"
          color="error"
          @click="$emit('delete', client.id)"
        ></v-btn>
      </td>
    </tr>
  </template>
  
  <script setup>
  // Este componente recibe un objeto 'client' como prop y emite eventos.
  defineProps({
    client: {
      type: Object,
      required: true
    }
  });
  
  defineEmits(['edit', 'delete']);
  </script>
  