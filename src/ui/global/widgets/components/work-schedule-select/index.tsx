import { Accordion, AccordionItem, Button, Spinner } from '@heroui/react'
import { useWorkScheduleSelect } from './use-work-schedule-select'
import { Dialog } from '../dialog'
import { Icon } from '../Icon'
import { Select } from '../select'

type WorkScheduleSelectProps = {
  defaultSelectedWorkScheduleId?: string
  onSelectChange: (workScheduleId: string) => void
}

export const WorkScheduleSelect = ({
  defaultSelectedWorkScheduleId,
  onSelectChange,
}: WorkScheduleSelectProps) => {
  const {
    workSchedules,
    isLoading,
    pagesCount,
    page,
    handlePageChange,
    handleWorkScheduleIdChange,
    selectedWorkScheduleName,
  } = useWorkScheduleSelect(onSelectChange, defaultSelectedWorkScheduleId)

  return isLoading ? (
    <Spinner size='sm' className='w-full h-12 mx-auto' />
  ) : (
    <Dialog
      title='Selecione a escala de trabalho'
      size='2xl'
      trigger={
        <Select className='w-full'>
          {selectedWorkScheduleName || 'Selecione a escala de trabalho'}
        </Select>
      }
    >
      {(closeDrawer) => (
        <div className='flex flex-col pb-6'>
          {workSchedules.length === 0 && (
            <p className='text-center text-bg-zinc-600 font-semibold my-12'>
              Nenhuma escala encontrada
            </p>
          )}
          {workSchedules.length > 0 && (
            <Accordion selectionMode='single'>
              {workSchedules.map((workSchedule) => (
                <AccordionItem
                  key={workSchedule.id}
                  title={workSchedule.description}
                  indicator={
                    <div
                      className='bg-transparent rounded-lg flex items-center justify-center hover:bg-primary hover:text-white duration-1000 border-zinc-400 h-10 min-w-10'
                      onClick={() => {
                        handleWorkScheduleIdChange(workSchedule.id)
                        closeDrawer()
                      }}
                    >
                      <Icon name='plus' size={18} />
                    </div>
                  }
                >
                  {`Folgas: ${workSchedule.daysOffCount} / Dias de trabalho: ${workSchedule.workdaysCount}`}
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      )}
    </Dialog>
  )
}
