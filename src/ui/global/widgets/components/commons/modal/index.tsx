import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@heroui/modal"
import { Slot } from "@radix-ui/react-slot"
import { ForwardedRef, ReactNode, useImperativeHandle } from "react"

import { ModalRef } from "./modal-ref"
import { useModal } from "./use-point-history"

type ModalProps = {
  title?: string
  children: (closeDialog: VoidFunction) => ReactNode
  trigger?: ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full'
  isDismissable?: boolean
  hideCloseButton?: boolean
  onOpen?: () => void
  ref?: ForwardedRef<ModalRef>,
}

export const ModalComponent = (
  {
    title,
    children,
    trigger,
    size,
    isDismissable,
    hideCloseButton,
    onOpen: onOpenModal,
    ref,
  }: ModalProps,
) => {
  const { isOpen, open, close } = useModal(onOpenModal)

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
      >
        <ModalContent className=''>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>{children(close)}</ModalBody>
        </ModalContent>
      </Modal>
      {trigger && <Slot onClick={open}>{trigger}</Slot>}
    </>
  )
}
