import { SolicitationActionsView } from './solicitation-actions-view'
import { useSolicitationActions } from './use-solicitation-actions'

type Props = {
  isLoading: boolean
  onApprove: (feedbackMessage?: string) => void
  onDeny: (feedbackMessage?: string) => void
  onCancel: VoidFunction
  isManager: boolean
  canCancel: boolean
}

export const SolicitationActions = ({
  isLoading,
  onApprove,
  onDeny,
  onCancel,
  isManager,
  canCancel,
}: Props) => {
  const {
    handleApproveSolicitationFormSubmit,
    handleDenySolicitationFormSubmit,
    handleCancelSolicitationFormSubmit,
  } = useSolicitationActions(onApprove, onDeny, onCancel)

  return (
    <SolicitationActionsView
      isManager={isManager}
      canCancel={canCancel}
      isLoading={isLoading}
      onApproveSubmit={handleApproveSolicitationFormSubmit}
      onDenySubmit={handleDenySolicitationFormSubmit}
      onCancelSubmit={handleCancelSolicitationFormSubmit}
    />
  )
}
