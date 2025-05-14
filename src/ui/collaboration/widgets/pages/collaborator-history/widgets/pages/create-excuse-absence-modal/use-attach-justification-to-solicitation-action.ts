import { portalActions } from '@/server/next-safe-action'
import { useToast } from '@/ui/global/hooks/use-toast'
import { useAction } from 'next-safe-action/hooks'

export function useAttachJusficationToSolicitationAction() {
  const { showError, showSuccess } = useToast()
  const { executeAsync, isExecuting } = useAction(
    portalActions.attachJustificationToSolicitation,
    {
      onSuccess() {
        showSuccess('Solicitação de abono de falta criada com sucesso')
      },
      onError(error) {
        if (error.error.serverError) {
          showError(error.error.serverError)
        }
      },
    },
  )
  async function attachSolicitationToSolicitation(
    solicitationId: string,
    justificationTypeId: string,
    justificationTypeName: string,
    justificationTypeShouldHaveAttachment: string,
    description: string,
    attachment?: File,
  ) {
    await executeAsync({
      solicitationId,
      justificationTypeId,
      justificationTypeName,
      justificationTypeShouldHaveAttachment,
      description,
      attachment,
    })
  }
  return {
    attachSolicitationToSolicitation,
    isAttaching: isExecuting,
  }
}
