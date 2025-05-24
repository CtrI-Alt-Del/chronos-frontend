'use client'

import { Card, CardBody, CardHeader } from '@heroui/react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { DateRangeInput } from '@/ui/global/widgets/components/date-range-input'

type CollaboratorsMissingTimeChartViewProps = {
  missingTime: Array<{
    day: string
    value: number
  }>
  startDate: Date
  endDate: Date
  handleStartDateInputChange: (date: Date) => void
  handleEndDateInputChange: (date: Date) => void
}

export function CollaboratorsMissingTimeChartView({
  missingTime,
  startDate,
  endDate,
  handleStartDateInputChange,
  handleEndDateInputChange,
}: CollaboratorsMissingTimeChartViewProps) {

  return (
    <Card>
      <CardHeader>
        <h3 className='text-xl font-semibold'>Colaboradores Sem Marcação</h3>
      </CardHeader>
      <CardBody>
        <div className='flex w-full'>
          {/* <div className='flex-1'>
            <DateRangeInput
              defeaultStartDate={startDate}
              defeaultEndDate={endDate}
              onStartDateChange={handleStartDateInputChange}
              onEndDateChange={handleEndDateInputChange}
            />
          </div> */}
        </div>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={missingTime} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray='3 3' vertical={false} />
            <XAxis
              dataKey='day'
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280' }}
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            />
            <Bar
              dataKey='value'
              fill='#2563EB'
              radius={[4, 4, 0, 0]}
              name='Colaboradores'
            />
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  )
}
