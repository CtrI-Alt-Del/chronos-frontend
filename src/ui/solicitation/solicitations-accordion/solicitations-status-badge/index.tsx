import { StyledSolicitationStatusBadgeView } from './solicitation-status-badge-view'

type Props = {
  status: string
}

export const StyledSolicitationStatusBadge = ({ status }: Props) => {
  return (
    <StyledSolicitationStatusBadgeView
      status={status as 'pending' | 'approved' | 'denied'}
    />
  )
}
