import { Chip } from '@heroui/react'
import { cn } from '@heroui/theme'

const TITLES: Record<string, string> = {
  time_punch: 'Registro de ponto',
  day_off_schedule: 'Escala de folga',
  day_off: 'Pedido de folga',
  excused_absence: 'Abono de falta',
  paid_overtime: 'Hora extra remunerada',
  withdraw: "Afastamento"
}

const INDICATOR_COLORS: Record<string, string> = {
  approved: 'bg-green-500 text-white',
  pending: 'bg-yellow-500',
  denied: 'bg-red-500',
}

const CHIP_COLORS: Record<string, 'success' | 'warning' | 'danger'> = {
  approved: 'success',
  pending: 'warning',
  denied: 'danger',
}

const LABELS: Record<string, string> = {
  pending: 'Pendente',
  approved: 'Aprovada',
  denied: 'Negada',
}

type Props = {
  solicitationType: string
  solicitationStatus: string
}

export const SolicitationTitleView = ({
  solicitationType,
  solicitationStatus,
}: Props) => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-between w-full text-sm lg:text-base'>
      <div className='flex items-center gap-2'>
        <div
          className={cn('w-3 h-3 rounded-full', INDICATOR_COLORS[solicitationStatus.toLowerCase()])}
        />
        <span className='text-gray-500 text-sm md:text-lg'>
          {TITLES[solicitationType.toLowerCase()]}
        </span>
      </div>
      <Chip variant='bordered' color={CHIP_COLORS[solicitationStatus.toLowerCase()]}>
        {LABELS[solicitationStatus.toLowerCase()]}
      </Chip>
    </div>
  )
}
