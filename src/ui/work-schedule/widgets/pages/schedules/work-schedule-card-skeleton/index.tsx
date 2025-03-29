import { Card, CardBody, CardHeader } from '@heroui/card'
import { Skeleton } from '@heroui/react'

export const WorkScheduleCardSckeleton = () => {
  return (
    <Card
      className='border hover:bg-gray-100 transition-all cursor-pointer'
      shadow='none'
    >
      <CardBody>
        <div className='flex items-center gap-3'>
          <Skeleton className='rounded-lg size-14' />
          <Skeleton className='rounded-lg h-6 w-40' />
        </div>
      </CardBody>
    </Card>
  )
}
