import { SolicitationActionsView } from './solicitation-actions-view'
import { useSolicitationActions } from './use-solicitation-actions'

type Props = {
  onApprove: (feedbackMessage?: string) => void
  onDeny: (feedbackMessage?: string) => void
}

export const SolicitationActions = ({ onApprove, onDeny }: Props) => {
  const { handleApproveSolicitationFormSubmit, handleDenySolicitationFormSubmit } =
    useSolicitationActions(onApprove, onDeny)

  return (
    <SolicitationActionsView
      onApproveSubmit={handleApproveSolicitationFormSubmit}
      onDenySubmit={handleDenySolicitationFormSubmit}
    />
  )
}
