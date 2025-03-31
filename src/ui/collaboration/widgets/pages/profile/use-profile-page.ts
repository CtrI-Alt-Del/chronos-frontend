import type { z } from 'zod'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/ui/global/hooks/use-toast'
import { useUpdateCollaboratorAction } from './use-update-collaborator-action'
import type { CollaboratorDto } from '@/@core/collaboration/dtos'
import { profileFormSchema } from '@/validation/schemas/work-schedule'

export type ProfileFormData = z.infer<typeof profileFormSchema>

export function useProfilePage(collaborator: CollaboratorDto) {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: collaborator,
  })
  const { updateCollaborator, isUpdating } = useUpdateCollaboratorAction()
  const toast = useToast()

  async function handleFormSubmit(data: ProfileFormData) {
    if (!collaborator.id) return

    console.log(data)
    await updateCollaborator(collaborator.id, data)
    toast.showSuccess('Perfil atualizado com sucesso!')
    return true
  }

  const isManager = collaborator.role.toLowerCase() === 'manager'
  const isAdmin = collaborator.role.toLowerCase() === 'admin'

  return {
    formControl: control,
    errors,
    isSubmitting: isSubmitting || isUpdating,
    isFormDirty: isDirty,
    isManager,
    isAdmin,
    registerField: register,
    handleFormSubmit: handleSubmit(handleFormSubmit),
  }
}
