import type { NextParams } from '@/api/next/types'
import { workScheduleActions } from '@/server/next-safe-action'
import { SchedulePage } from '@/ui/work-schedule/widgets/pages/schedule'

const Page = async ({ params }: NextParams<'scheduleId'>) => {
  const response = await workScheduleActions.getWorkSchedule({
    workScheduleId: await params.scheduleId,
  })
  if (!response?.data) return

  console.log(response?.data)

  return <SchedulePage schedule={response?.data?.workSchedule} />
}

export default Page
