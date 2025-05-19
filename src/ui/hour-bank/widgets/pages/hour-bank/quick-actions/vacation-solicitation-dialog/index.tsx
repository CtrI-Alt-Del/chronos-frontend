'use client'

import { useVacationSolicitationDialog } from './use-vacation-solicitation-dialog'
import { VacationSolicitationDialogView } from './vacation-solicitation-dialog-view'

export const VacationSolicitationDialog = () => {
  const { handleDatesChange, handleSubmit, isSubmitting } =
    useVacationSolicitationDialog()
  return (
    <VacationSolicitationDialogView
      handleDatesChange={handleDatesChange}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    />
  )
}
