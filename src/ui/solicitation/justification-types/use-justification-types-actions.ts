'use client'

import { useCallback, useState, useMemo } from 'react'
import { useAction } from 'next-safe-action/hooks'
import { solicitationActions } from '@/server/next-safe-action'
import type { JustificationTypeDto } from '@/@core/solicitation/dtos'
import { useToast } from '@/ui/global/hooks/use-toast'

export function useJustificationTypesActions() {
  const [error, setError] = useState<string | null>(null)
  const { showError, showSuccess } = useToast()

  const { executeAsync: executeCreateJustificationType, isPending: isCreating } =
    useAction(solicitationActions.createJustificationType, {
      onSuccess() {
        showSuccess('Justificativa criada com sucesso')
      },
      onError(error) {
        if (error.error.serverError) {
          showError(error.error.serverError)
        }
      },
    })
  const { executeAsync: executeUpdateJustificationType, isPending: isUpdating } =
    useAction(solicitationActions.updateJustificationType, {
      onSuccess() {
        showSuccess('Justificativa atualizada com sucesso')
      },
      onError(error) {
        if (error.error.serverError) {
          showError(error.error.serverError)
        }
      },
    })
  const { executeAsync: executeDeleteJustificationType, isPending: isDeleting } =
    useAction(solicitationActions.deleteJustificaionType, {
      onSuccess() {
        showSuccess('Justificativa deletada com sucesso')
      },
      onError(error) {
        if (error.error.serverError) {
          showError(error.error.serverError)
        }
      },
    })
  const isLoading = isCreating || isUpdating || isDeleting

  const createJustificationType = useCallback(
    async (data: JustificationTypeDto) => {
      await executeCreateJustificationType(data)
    },
    [executeCreateJustificationType],
  )

  const updateJustificationType = useCallback(
    async (id: string, data: JustificationTypeDto) => {
      await executeUpdateJustificationType({
        justificationTypeId: id,
        justificationType: data,
      })
    },
    [executeUpdateJustificationType],
  )

  const deleteJustificationType = useCallback(
    async (id: string) => {
      await executeDeleteJustificationType({
        justificationTypeId: id,
      })
    },
    [executeDeleteJustificationType],
  )

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
    createJustificationType,
    updateJustificationType,
    deleteJustificationType,
  }
}
