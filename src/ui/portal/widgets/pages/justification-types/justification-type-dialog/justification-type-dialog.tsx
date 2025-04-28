'use client'

import { useRef, useState } from 'react'
import { Input } from '@heroui/input'
import { Switch } from '@heroui/switch'
import { Button } from '@heroui/button'

import type { JustificationTypeDto } from '@/@core/portal/dtos'
import { Dialog } from '@/ui/global/widgets/components/dialog'

type JustificationTypeDialogProps = {
  justificationType?: JustificationTypeDto
  trigger: React.ReactNode
  onCreateJustificationType: (data: JustificationTypeDto) => void
}

export const JustificationTypeDialog = ({
  justificationType,
  trigger,
  onCreateJustificationType,
}: JustificationTypeDialogProps) => {
  const [name, setName] = useState(justificationType?.name || '')
  const [shouldHaveAttachment, setShouldHaveAttachment] = useState(
    justificationType?.shouldHaveAttachment === true,
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit() {
    if (!name.trim()) return

    setIsSubmitting(true)

    onCreateJustificationType({
      id: justificationType?.id,
      name,
      shouldHaveAttachment: shouldHaveAttachment,
    })

    setName('')
    setIsSubmitting(false)
  }

  return (
    <Dialog
      title={justificationType ? 'Editar Justificativa' : 'Nova Justificativa'}
      trigger={trigger}
    >
      {(closeDialog) => (
        <form className='flex flex-col gap-4 pb-3'>
          <Input
            id='justificationName'
            label='Nome da Justificativa'
            labelPlacement='outside'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Digite o nome da justificativa'
            required
          />

          <div className='flex gap-2 items-center'>
            <Switch
              isSelected={shouldHaveAttachment}
              onValueChange={(value) => setShouldHaveAttachment(value)}
              size='sm'
              aria-label='Anexo obrigatório'
            />
            <label htmlFor='shouldHaveAttachment' className='text-sm'>
              Exigir anexo
            </label>
          </div>

          <div className='flex gap-2 justify-end mt-2'>
            <Button variant='flat' color='default' onPress={closeDialog}>
              Cancelar
            </Button>
            <Button
              color='primary'
              onPress={() => {
                closeDialog()
                handleSubmit()
              }}
              isLoading={isSubmitting}
            >
              {justificationType ? 'Salvar' : 'Adicionar'}
            </Button>
          </div>
        </form>
      )}
    </Dialog>
  )
}
