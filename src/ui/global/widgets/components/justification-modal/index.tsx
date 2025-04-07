import { Button } from '@heroui/button'
import { Divider } from '@heroui/divider'
import { Input, Textarea } from '@heroui/input'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/modal'
import { Select, SelectItem } from '@heroui/select'
import { useRef, useState } from 'react'
import { useJustificationModal } from './use-justification-modal'
import { Tab, Tabs } from '@heroui/react'
import { TimePunchAdjustmentTab } from './time-punch-adjustment-tab'
import { WorkSheduleAdjustmentTab } from './work-schedule-adjustmen-tab'
import { Dialog } from '../dialog'

type JustificationModalProps = {
  onSubmit: VoidFunction
  workdayLogId?: string
}
export const JustificationModal = ({
  onSubmit,
  workdayLogId,
}: JustificationModalProps) => {
  const { today } = useJustificationModal()
  return (
    <Dialog
      trigger={<Button color='primary'>Nova solicitação</Button>}
      size='xl'
      className='mb-20'
      title='Nova solicitacao'
    >
      {(onClose) => (
        <>
          <ModalHeader className='flex justify-center items-center w-full text-xl'>
            Dia: {today}
          </ModalHeader>
          <ModalBody>
            <Tabs
              variant='underlined'
              className='flex justify-center items-center w-full'
            >
              <Tab key='time-punch' title='Ajuste de ponto'>
                <TimePunchAdjustmentTab
                  workdayLogId={workdayLogId as string}
                  onCancel={onClose}
                  onSubmit={() => {
                    onSubmit()
                    onClose()
                  }}
                />
              </Tab>
              <Tab key='work-schedule' title='Ajuste de escala'>
                <WorkSheduleAdjustmentTab
                  onCancel={onClose}
                  onSubmit={() => {
                    onSubmit()
                    onClose()
                  }}
                />
              </Tab>
            </Tabs>
          </ModalBody>
        </>
      )}
    </Dialog>
  )
}
