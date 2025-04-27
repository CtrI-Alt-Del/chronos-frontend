import { Chip } from '@heroui/react'
import { cn } from '@heroui/theme'

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
  approved: 'Aprovado',
  denied: 'Negado',
}

type Props = {
  status: string
}

export const SolicitationStatusBadgeView = ({ status }: Props) => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-between w-full text-sm lg:text-base'>
      <div className='flex items-center gap-2'>
        <div className={cn('w-3 h-3 rounded-full', INDICATOR_COLORS[status])} />
        <span className='text-gray-500 text-sm md:text-lg'>Pedido de folga</span>
      </div>
      <Chip variant='bordered' color={CHIP_COLORS[status]}>
        {LABELS[status]}
      </Chip>
    </div>
  )
}
