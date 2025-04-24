'use client'

import { useRef, useState } from 'react'
import { Dialog } from '@/ui/global/widgets/components/dialog'
import { Input } from '@heroui/input'
import { Switch } from '@heroui/switch'
import { Button } from '@heroui/button'
import type { DialogRef } from '@/ui/global/widgets/components/dialog/types'
import type { JustificationTypeDto } from '@/@core/solicitation/dtos'

type JustificationTypeDialogProps = {
  justificationType?: JustificationTypeDto
  trigger: React.ReactNode
  handleCreateJustificationType: (data: JustificationTypeDto) => void
}

export const JustificationTypeDialog = ({
  justificationType,
  trigger,
  handleCreateJustificationType,
}: JustificationTypeDialogProps) => {
  const dialogRef = useRef<DialogRef>(null)
  const [name, setName] = useState(justificationType?.name || '')
  const [shouldHaveAttachment, setShouldHaveAttachment] = useState(
    justificationType?.shouldHaveAttachment === true
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close()
    }
  }

  const handleSubmit = async () => {
    if (!name.trim()) return

    setIsSubmitting(true)
    
    try {
      await handleCreateJustificationType({
        id: justificationType?.id,
        name,
        shouldHaveAttachment: shouldHaveAttachment,
      })
      
      handleClose()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog
      ref={dialogRef}
      title={justificationType ? 'Editar Justificativa' : 'Nova Justificativa'}
      trigger={trigger}
    >
      {(close) => (
        <div className="flex flex-col gap-4">
          <div>
            <label 
              htmlFor="justificationName" 
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Nome da Justificativa
            </label>
            <Input
              id="justificationName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome da justificativa"
              required
            />
          </div>

          <div className="flex gap-2 items-center">
            <Switch
              isSelected={shouldHaveAttachment}
              onValueChange={(value) => setShouldHaveAttachment(value)}
              size="sm"
              aria-label="Anexo obrigatório"
            />
            <label htmlFor="shouldHaveAttachment" className="text-sm">
              Exigir anexo
            </label>
          </div>

          <div className="flex gap-2 justify-end mt-4">
            <Button
              variant="flat"
              color="default"
              onPress={() => close()}
            >
              Cancelar
            </Button>
            <Button
              color="primary"
              onPress={handleSubmit}
              isLoading={isSubmitting}
            >
              {justificationType ? 'Salvar' : 'Adicionar'}
            </Button>
          </div>
        </div>
      )}
    </Dialog>
  )
} 