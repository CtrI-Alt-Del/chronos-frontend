'use client'

import type { JustificationTypeDto } from '@/@core/portal/dtos'
import { useJustificationTypesActions } from './use-justification-types-actions'

export function useJustificationTypesPage() {
  const {
    isLoading,
    createJustificationType,
    updateJustificationType,
    deleteJustificationType,
  } = useJustificationTypesActions()

  async function handleCreateJustificationType(dto: JustificationTypeDto) {
    await createJustificationType(dto)
  }

  async function handleUpdateJustificationType(id: string, dto: JustificationTypeDto) {
    await updateJustificationType(id, dto)
  }

  async function handleDeleteJustificationType(id: string) {
    await deleteJustificationType(id)
  }

  return {
    isLoading,
    handleCreateJustificationType,
    handleUpdateJustificationType,
    handleDeleteJustificationType,
  }
}
