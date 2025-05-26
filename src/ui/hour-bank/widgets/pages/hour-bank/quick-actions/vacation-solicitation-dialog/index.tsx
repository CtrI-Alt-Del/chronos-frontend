'use client'

import { useCreateVacationSolicitationAction } from './use-create-vacation-solicitation-action'
import { useVacationSolicitationDialog } from './use-vacation-solicitation-dialog'
import { VacationSolicitationDialogView } from './vacation-solicitation-dialog-view'

export const VacationSolicitationDialog = () => {
  const { createVacationSolicitation, isCreatingSolicitation } =
    useCreateVacationSolicitationAction()
  const { handleDatesChange, handleSubmit } = useVacationSolicitationDialog(
    createVacationSolicitation,
  )

  return (
    <VacationSolicitationDialogView
      isSubmitting={isCreatingSolicitation}
      onDateRangeChange={handleDatesChange}
      onSubmit={handleSubmit}
    />
  )
}
