'use client'

import type { JustificationTypeDto } from '@/@core/solicitation/dtos'
import { useJustificationTypesActions } from './use-justification-types-actions'

export function useJustificationTypesPage() {
  const {
    isLoading,
    error,
    createJustificationType,
    updateJustificationType,
    deleteJustificationType,
  } = useJustificationTypesActions()

  const handleCreateJustificationType = async (data: JustificationTypeDto) => {
    await createJustificationType(data)
  }

  const handleUpdateJustificationType = async (
    id: string,
    data: JustificationTypeDto,
  ) => {
    await updateJustificationType(id, data)
  }

  const handleDeleteJustificationType = async (id: string) => {
    await deleteJustificationType(id)
  }

  return {
    isLoading,
    error,
    handleCreateJustificationType,
    handleUpdateJustificationType,
    handleDeleteJustificationType,
  }
}
