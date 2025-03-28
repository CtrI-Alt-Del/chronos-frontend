'use client'

import type { PropsWithChildren, ReactNode } from 'react'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal'
import { Button } from '@heroui/button'
import { Slot } from '@radix-ui/react-slot'

import { useAlertDialog } from './use-alert-dialog'

type AlertModalProps = {
  trigger: ReactNode
  title: string
  onConfirm: VoidFunction
}

export const AlertDialog = ({
  trigger,
  children,
  title,
  onConfirm,
}: PropsWithChildren<AlertModalProps>) => {
  const { isOpen, open, handleOpenChange, handleConfirmButton } =
    useAlertDialog(onConfirm)

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={handleOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>
                <Button className='bg-slate-300' onPress={onClose}>
                  Cancelar
                </Button>
                <Button color='primary' onPress={handleConfirmButton}>
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Slot onClick={open}>{trigger}</Slot>
    </>
  )
}
