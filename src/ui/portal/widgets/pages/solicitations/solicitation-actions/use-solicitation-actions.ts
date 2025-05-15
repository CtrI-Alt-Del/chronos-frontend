import type { FormEvent } from 'react'

export function useSolicitationActions(
  onApprove: (feedbackMessage?: string) => void,
  onDeny: (feedbackMessage?: string) => void,
  onCancel: VoidFunction,
) {
  function handleApproveSolicitationFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const feedbackMessage = String(formData.get('feedback-message'))
    onApprove(feedbackMessage)
  }

  function handleDenySolicitationFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const feedbackMessage = String(formData.get('feedback-message'))
    onDeny(feedbackMessage)
  }
  function handleCancelSolicitationFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onCancel()
  }

  return {
    handleApproveSolicitationFormSubmit,
    handleDenySolicitationFormSubmit,
    handleCancelSolicitationFormSubmit,
  }
}
