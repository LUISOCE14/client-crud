# CRUD de Clientes con Vue 3

Una aplicación completa de gestión de clientes desarrollada con Vue 3, Vuex, Vue Router y Vuetify.

## 🚀 Características

- ✅ **CRUD completo**: Crear, leer, actualizar y eliminar clientes
- ✅ **Vue 3 + Composition API**: Arquitectura moderna y reactiva
- ✅ **Vuex**: Gestión centralizada del estado
- ✅ **Vue Router**: Navegación entre vistas
- ✅ **Vuetify**: Interfaz Material Design responsiva
- ✅ **Validación de formularios**: Validación completa de datos
- ✅ **Confirmación de eliminación**: Modal de confirmación para acciones destructivas
- ✅ **Notificaciones**: Feedback visual para las acciones del usuario
- ✅ **Responsive**: Adaptado para dispositivos móviles y desktop

## 📋 Funcionalidades

### Gestión de Clientes
- **Listado**: Tabla con todos los clientes registrados
- **Creación**: Formulario para agregar nuevos clientes
- **Edición**: Modificar datos de clientes existentes
- **Eliminación**: Borrar clientes con confirmación previa

### Validaciones
- **Nombre**: Obligatorio, mínimo 2 caracteres, solo letras
- **Email**: Obligatorio, formato válido de correo electrónico
- **Teléfono**: Obligatorio, formato válido de número telefónico

## 🛠️ Tecnologías Utilizadas

- **Vue 3**: Framework JavaScript progresivo
- **Composition API**: API moderna de Vue para mejor organización del código
- **Vuex**: Biblioteca de gestión de estado
- **Vue Router**: Enrutador oficial de Vue
- **Vuetify**: Framework de componentes Material Design
- **JavaScript ES6+**: Sintaxis moderna de JavaScript

## 📁 Estructura del Proyecto

\`\`\`
src/
├── components/           # Componentes reutilizables
│   ├── ClientForm.vue   # Formulario de cliente
│   ├── ClientTable.vue  # Tabla de clientes
│   └── ConfirmationModal.vue # Modal de confirmación
├── composables/         # Lógica reutilizable
│   └── useClientForm.js # Composable para formularios
├── router/              # Configuración de rutas
│   └── index.js
├── store/               # Gestión de estado Vuex
│   ├── index.js         # Store principal
│   └── modules/
│       └── clients.js   # Módulo de clientes
├── views/               # Vistas principales
│   ├── ClientFormView.vue # Vista de formulario
│   └── ClientListView.vue # Vista de listado
├── App.vue              # Componente raíz
├── main.js              # Punto de entrada
└── style.css            # Estilos globales
\`\`\`

## 🚦 Instalación y Uso

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Instalación

1. **Clonar el repositorio**
   \`\`\`bash
   git clone <url-del-repositorio>
   cd vue-crud-clientes
   \`\`\`

2. **Instalar dependencias**
   \`\`\`bash
   npm install
   \`\`\`

3. **Ejecutar en modo desarrollo**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Abrir en el navegador**
   La aplicación estará disponible en \`http://localhost:5173\`

### Comandos Disponibles

- \`npm run dev\`: Ejecuta la aplicación en modo desarrollo
- \`npm run build\`: Construye la aplicación para producción
- \`npm run preview\`: Previsualiza la build de producción

## 🏗️ Arquitectura

### Gestión de Estado (Vuex)
- **Módulo clients**: Maneja todas las operaciones CRUD de clientes
- **Estado global**: Gestiona notificaciones y UI global
- **Acciones asíncronas**: Simula llamadas a API con delays

### Enrutamiento (Vue Router)
- \`/\`: Redirección a lista de clientes
- \`/clients\`: Lista de clientes
- \`/clients/create\`: Crear nuevo cliente
- \`/clients/:id/edit\`: Editar cliente existente

### Componentes
- **ClientTable**: Tabla responsiva con acciones
- **ClientForm**: Formulario reutilizable para crear/editar
- **ConfirmationModal**: Modal de confirmación genérico

### Composables
- **useClientForm**: Lógica reutilizable para formularios de cliente

## 🎨 Diseño y UX

- **Material Design**: Interfaz consistente con Vuetify
- **Responsive**: Adaptado para móviles y desktop
- **Accesibilidad**: Tooltips, labels y navegación por teclado
- **Feedback visual**: Loading states y notificaciones
- **Confirmaciones**: Modales para acciones destructivas

## 🔧 Personalización

### Agregar nuevos campos
1. Actualizar el modelo en \`store/modules/clients.js\`
2. Añadir validaciones en \`composables/useClientForm.js\`
3. Actualizar el formulario en \`components/ClientForm.vue\`
4. Modificar la tabla en \`components/ClientTable.vue\`



## 👨‍💻 Autor

Desarrollado como ejercicio práctico de Vue 3 con Vuex, Vue Router y Vuetify.

---

¡Gracias por revisar este proyecto! 🚀
\`\`\`

