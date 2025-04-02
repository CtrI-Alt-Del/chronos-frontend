'use client'

import type { PropsWithChildren, ReactNode } from 'react'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal'
import { Button } from '@heroui/button'
import { Slot } from '@radix-ui/react-slot'

import { useAlertDialog } from './use-alert-dialog'

type AlertModalProps = {
  trigger: ReactNode
  title: string
  isLoading?: boolean
  onConfirm: VoidFunction
  onCancel?: VoidFunction
}

export const AlertDialog = ({
  trigger,
  children,
  title,
  onConfirm,
  onCancel,
  isLoading,
}: PropsWithChildren<AlertModalProps>) => {
  const {
    isOpen,
    open,
    handleOpenChange,
    handleConfirmButtonClick,
    handleCancelButtonClick,
  } = useAlertDialog(onConfirm, onCancel)

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={handleOpenChange}>
        <ModalContent className='mx-5 mb-72 md:mb-0 md:mx-0'> 
          {() => (
            <>
              <ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
              <ModalBody>{children}</ModalBody>
              <ModalFooter>
                <Button className='bg-slate-300' onPress={handleCancelButtonClick}>
                  Cancelar
                </Button>
                <Button
                  color='primary'
                  onPress={handleConfirmButtonClick}
                  isLoading={isLoading ? isLoading : false}
                >
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
