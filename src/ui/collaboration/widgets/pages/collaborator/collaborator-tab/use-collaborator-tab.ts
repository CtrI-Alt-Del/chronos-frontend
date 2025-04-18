import type { z } from 'zod'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { collaboratorSchema } from '@/validation/schemas/work-schedule'
import { useAuthContext } from '@/ui/auth/hooks/use-auth-context'
import type { CollaboratorDto } from '@/@core/collaboration/dtos'
import { useCollaboratorStore } from '@/ui/collaboration/stores/collaborator-store'
import { useUpdateCollaboratorAction } from './use-update-collaborator-action'

export type CollaboratorFormData = z.infer<typeof collaboratorSchema>

export function useCollaboratorTab(currentCollaborator?: CollaboratorDto) {
  const { account, isAdmin, isManager } = useAuthContext()
  const { useCollaboratorSlice, useTabSlice } = useCollaboratorStore()
  const { collaborator, setCollaborator } = useCollaboratorSlice()
  const { setTab } = useTabSlice()
  const { isUpdating, updateCollaborator } = useUpdateCollaboratorAction(
    currentCollaborator?.id,
  )
  const defaultValues = useMemo(() => {
    if (collaborator) {
      return collaborator
    }

    if (isManager && !currentCollaborator)
      return {
        sector: account?.collaborationSector,
        isActive: true,
      }

    if (currentCollaborator) {
      return currentCollaborator
    }

    return {
      isActive: true,
    }
  }, [account, isManager, collaborator, currentCollaborator])

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<CollaboratorFormData>({
    resolver: zodResolver(collaboratorSchema),
    defaultValues,
  })

  async function updateCollaboratorData(collaboratorDto: CollaboratorDto) {
    if (!collaborator?.id) return
    await updateCollaborator(collaboratorDto)
    setCollaborator(collaboratorDto)
  }

  async function handleFormSubmit(data: CollaboratorFormData) {
    if (currentCollaborator) {
      await updateCollaboratorData(data)
      return
    }
    setCollaborator(data)
    setTab('day-off-schedule-tab')
  }

  return {
    isAdmin,
    isManager,
    formErrors: errors,
    isFormReadOnly: !isAdmin && !isManager,
    isFormSubmitting: isSubmitting || isUpdating,
    isFormDirty: isDirty,
    collaboratorRole: collaborator ? collaborator.role : currentCollaborator?.role,
    collaboratorSector: collaborator ? collaborator.sector : currentCollaborator?.sector,
    collaboratorWorkload: collaborator
      ? collaborator.workload
      : currentCollaborator?.workload,
    registerField: register,
    handleFormSubmit: handleSubmit(handleFormSubmit),
  }
}
