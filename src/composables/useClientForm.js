import { reactive, ref } from "vue"

/**
 * Composable para manejar la lógica del formulario de clientes
 * Incluye validaciones y estado del formulario
 */
export function useClientForm(initialData = {}) {
  // Estado reactivo del formulario
  const formData = reactive({
    nombre: initialData.nombre || "",
    email: initialData.email || "",
    telefono: initialData.telefono || "",
  })

  // Estado de validación del formulario
  const isFormValid = ref(false)

  // Reglas de validación para el nombre
  const nameRules = [
    (v) => !!v || "El nombre es obligatorio",
    (v) => (v && v.length >= 2) || "El nombre debe tener al menos 2 caracteres",
    (v) => (v && v.length <= 100) || "El nombre no puede exceder 100 caracteres",
    (v) => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(v) || "El nombre solo puede contener letras y espacios",
  ]

  // Reglas de validación para el email
  const emailRules = [
    (v) => !!v || "El correo electrónico es obligatorio",
    (v) => /.+@.+\..+/.test(v) || "Debe ser un correo electrónico válido",
    (v) => (v && v.length <= 255) || "El correo electrónico es demasiado largo",
  ]

  // Reglas de validación para el teléfono
  const phoneRules = [
    (v) => !!v || "El teléfono es obligatorio",
    (v) => /^[+]?[0-9\s\-$$$$]{7,20}$/.test(v) || "Debe ser un número de teléfono válido",
    (v) => (v && v.length >= 7) || "El teléfono debe tener al menos 7 dígitos",
    (v) => (v && v.length <= 20) || "El teléfono no puede exceder 20 caracteres",
  ]

  // Función para resetear el formulario
  const resetForm = () => {
    formData.nombre = ""
    formData.email = ""
    formData.telefono = ""
  }

  // Función para validar todo el formulario
  const validateForm = () => {
    const isNameValid = nameRules.every((rule) => rule(formData.nombre) === true)
    const isEmailValid = emailRules.every((rule) => rule(formData.email) === true)
    const isPhoneValid = phoneRules.every((rule) => rule(formData.telefono) === true)

    return isNameValid && isEmailValid && isPhoneValid
  }

  // Función para limpiar espacios en blanco
  const trimFormData = () => {
    formData.nombre = formData.nombre.trim()
    formData.email = formData.email.trim()
    formData.telefono = formData.telefono.trim()
  }

  return {
    formData,
    isFormValid,
    nameRules,
    emailRules,
    phoneRules,
    resetForm,
    validateForm,
    trimFormData,
  }
}
