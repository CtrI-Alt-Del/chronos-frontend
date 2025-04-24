import { Button } from '@heroui/button'
import { Divider } from '@heroui/divider'
import { Input, Textarea } from '@heroui/input'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/modal'
import { Select, SelectItem } from '@heroui/select'
import { useRef, useState } from 'react'
import { useTimePunchAdjustmentSolicitationModal } from './use-time-punch-adjustment-solicitation-modal' 
import { Tab, Tabs } from '@heroui/react'
import { TimePunchAdjustmentTab } from './time-punch-adjustment-solicitation-form'
import { Dialog } from '@/ui/global/widgets/components/dialog'

export const TimePunchAdjustmentModal = () => {
  const { today } = useTimePunchAdjustmentSolicitationModal()
  return (
    <Dialog
      trigger={<Button color='primary'>Pedir Troca de Ponto</Button>}
      size='xl'
      title='Troca de ponto'
    >
      {(onClose) => (
        <>
          <ModalHeader className='w-full flex items-center justify-center text-xl '>
            Dia: {today}
          </ModalHeader>
          <ModalBody>
            <TimePunchAdjustmentTab
              onCancel={onClose}
              onSubmit={() => {
                onClose()
              }}
            />
          </ModalBody>
        </>
      )}
    </Dialog>
  )
}
