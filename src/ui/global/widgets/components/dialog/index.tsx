'use client'

import { type ForwardedRef, forwardRef, type ReactNode, useImperativeHandle } from 'react'
import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/modal'
import { Slot } from '@radix-ui/react-slot'

import type { DialogRef } from './types'
import { useDialog } from './use-dialog'

type DialogProps = {
  title: string
  children: ReactNode | ((closeDialog: VoidFunction) => ReactNode)
  trigger?: ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full'
  isDismissable?: boolean
  hideCloseButton?: boolean
  onOpen?: () => void
}

const DialogComponent = (
  {
    title,
    children,
    trigger,
    size,
    isDismissable,
    hideCloseButton,
    onOpen: onOpenDialog,
  }: DialogProps,
  ref: ForwardedRef<DialogRef>,
) => {
  const { isOpen, open, close } = useDialog(onOpenDialog)

  useImperativeHandle(
    ref,
    () => {
      return {
        close,
        open,
      }
    },
    [open, close],
  )

  return (
    <>
      <Modal
        size={size ? size : 'md'}
        isDismissable={isDismissable ?? true}
        hideCloseButton={hideCloseButton ?? false}
        isOpen={isOpen}
        scrollBehavior='inside'
        classNames={{ wrapper: 'overflow-x-hidden' }}
        onClose={close}
        className='mb-16'
      >
        <ModalContent className='z-50'>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody className='pb-6'>
            {typeof children === 'function' ? children(close) : children}
          </ModalBody>
        </ModalContent>
      </Modal>
      {trigger && <Slot onClick={open}>{trigger}</Slot>}
    </>
  )
}

export const Dialog = forwardRef(DialogComponent)
