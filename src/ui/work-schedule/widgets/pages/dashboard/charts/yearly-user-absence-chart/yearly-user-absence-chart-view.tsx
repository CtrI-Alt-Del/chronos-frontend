import { DateRangeInput } from '@/ui/global/widgets/components/date-range-input'
import { Card, CardBody, CardHeader } from '@heroui/react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

type YearlyUserAbsenceChartViewProps = {
  yearlyUserAbsence: Array<{
    month: string
    colaboradores: number
    gestores: number
  }>
  startDate: Date
  endDate: Date
  handleStartDateInputChange: (date: Date) => void
  handleEndDateInputChange: (date: Date) => void
}

export const YearlyUserAbsenceChartView = ({
  yearlyUserAbsence,
  startDate,
  endDate,
  handleStartDateInputChange,
  handleEndDateInputChange,
}: YearlyUserAbsenceChartViewProps) => {

  return (
    <Card>
      <CardHeader>
        <h3 className='text-xl font-semibold'>Ausências por Tipo</h3>
      </CardHeader>
      <CardBody>
        {/* <DateRangeInput
          defeaultStartDate={startDate}
          defeaultEndDate={endDate}
          onStartDateChange={handleStartDateInputChange}
          onEndDateChange={handleEndDateInputChange}
        /> */}
        <div className='w-full h-[400px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={yearlyUserAbsence} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray='4 4' stroke='#d1d5db' />
              <XAxis
                dataKey='month'
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  borderRadius: 8,
                  border: '1px solid #e5e7eb',
                }}
                labelStyle={{ fontWeight: 'bold' }}
                cursor={{ stroke: '#9ca3af', strokeWidth: 1 }}
              />
              <Legend
                verticalAlign='top'
                align='center'
                iconType='circle'
                wrapperStyle={{ paddingBottom: 10 }}
              />
              <Line
                type='monotone'
                dataKey='colaboradores'
                name='FUNCIONÁRIO'
                stroke='#06b6d4'
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line
                type='monotone'
                dataKey='gestores'
                name='GESTOR'
                stroke='#207ea9'
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  )
}
