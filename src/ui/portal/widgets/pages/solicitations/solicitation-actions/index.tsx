import { SolicitationActionsView } from './solicitation-actions-view'
import { useSolicitationActions } from './use-solicitation-actions'

type Props = {
  isLoading: boolean
  onApprove: (feedbackMessage?: string) => void
  onDeny: (feedbackMessage?: string) => void
}

export const SolicitationActions = ({ isLoading, onApprove, onDeny }: Props) => {
  const { handleApproveSolicitationFormSubmit, handleDenySolicitationFormSubmit } =
    useSolicitationActions(onApprove, onDeny)

  return (
    <SolicitationActionsView
      isLoading={isLoading}
      onApproveSubmit={handleApproveSolicitationFormSubmit}
      onDenySubmit={handleDenySolicitationFormSubmit}
    />
  )
}
