'use client'

import { useCallback, useState, useMemo } from 'react'
import { useAction } from 'next-safe-action/hooks'
import { portalActions } from '@/server/next-safe-action'
import type { JustificationTypeDto } from '@/@core/portal/dtos'
import { useToast } from '@/ui/global/hooks/use-toast'

export function useJustificationTypesActions() {
  const { showError, showSuccess } = useToast()
  const { executeAsync: executeCreateJustificationType, isPending: isCreating } =
    useAction(portalActions.createJustificationType, {
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
    useAction(portalActions.updateJustificationType, {
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
    useAction(portalActions.deleteJustificaionType, {
      onSuccess() {
        showSuccess('Justificativa deletada com sucesso')
      },
      onError(error) {
        if (error.error.serverError) {
          showError(error.error.serverError)
        }
      },
    })

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

  return {
    isLoading: isCreating || isUpdating || isDeleting,
    createJustificationType,
    updateJustificationType,
    deleteJustificationType,
  }
}
