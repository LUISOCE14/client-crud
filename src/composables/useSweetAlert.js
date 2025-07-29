import Swal from "sweetalert2"

/**
 * Composable para manejar SweetAlert2 con configuraciones personalizadas
 */
export function useSweetAlert() {

    // Alert de confirmación para eliminar
    const confirmDelete = async (clientName) => {
        const result = await Swal.fire({
            title: `¿Estas seguro que quieres eliminar a ${clientName}?`,
            text: "Esta acción no se puede deshacer.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            focusCancel: true,
        })

        return result.isConfirmed
    }

    // Alert de éxito
    const showSuccess = (title, message) => {
        return Swal.fire({
            title,
            text: message,
            icon: "success",
            confirmButtonText: "Entendido",
            timer: 3000,
            showClass: {
                popup: "animate__animated animate__bounceIn animate__faster",
            },
        })
    }

    // Alert de error
    const showError = (title, message) => {
        return Swal.fire({
            ...baseConfig,
            title,
            text: message,
            icon: "error",
            confirmButtonText: "Cerrar",
            showClass: {
                popup: "animate__animated animate__shakeX animate__faster",
            },
        })
    }

    // Alert de información
    const showInfo = (title, message) => {
        return Swal.fire({
            ...baseConfig,
            title,
            text: message,
            icon: "info",
            confirmButtonText: "Entendido",
        })
    }

    // Cerrar cualquier alert activo
    const close = () => {
        Swal.close()
    }

    return {
        confirmDelete,
        showSuccess,
        showError,
        showInfo,
        close,
    }
}
