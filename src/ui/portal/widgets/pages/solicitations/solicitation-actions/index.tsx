import { SolicitationActionsView } from './solicitation-actions-view'
import { useSolicitationActions } from './use-solicitation-actions'

type Props = {
  isLoading: boolean
  isManager: boolean
  canCancel: boolean
  onApprove: (feedbackMessage?: string) => void
  onDeny: (feedbackMessage?: string) => void
  onCancel: VoidFunction
}

export const SolicitationActions = ({
  isLoading,
  isManager,
  canCancel,
  onApprove,
  onDeny,
  onCancel,
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
