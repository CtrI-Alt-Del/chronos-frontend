import { addToast } from '@heroui/toast'

export function useToast() {
  function showSuccess(message: string) {
    addToast({
      title: 'Sucesso',
      description: message,
      color: 'success',
    })
  }

  function showError(message: string) {
    addToast({
      title: 'Erro',
      description: message,
      color: 'danger',
    })
  }

  return {
    showSuccess,
    showError,
  }
}
