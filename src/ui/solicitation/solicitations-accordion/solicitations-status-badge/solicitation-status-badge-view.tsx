import { cn } from '@heroui/theme'
import { tv } from 'tailwind-variants'

const LABELS = {
  pending: 'Pendente',
  approved: 'Aprovado',
  denied: 'Negado',
}

const styles = tv({
  variants: {
    color: {
      approved: 'bg-green-500 text-green-500',
      pending: 'bg-yellow-500 text-yellow-500',
      denied: 'bg-red-500 text-red-500',
    },
  },
  defaultVariants: {
    color: 'pending',
  },
})

type Props = {
  status: 'pending' | 'approved' | 'denied'
}

export const StyledSolicitationStatusBadgeView = ({ status }: Props) => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-between w-full text-sm lg:text-base'>
      <div className='flex items-center gap-2'>
        <div className={cn('w-3 h-3 rounded-full', styles({ color: status }))} />
        <span className='text-gray-500 text-sm md:text-lg'>Pedido de folga</span>
      </div>
      <span className={cn('block translate-y-3 text-base', styles({ color: status }))}>
        {LABELS[status]}
      </span>
    </div>
  )
}
