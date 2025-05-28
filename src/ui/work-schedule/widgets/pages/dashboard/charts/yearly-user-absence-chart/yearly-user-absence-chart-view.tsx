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
import { Select, SelectItem } from '@heroui/select'
import { useState } from 'react'

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
  console.log('[YearlyUserAbsenceChartView] Data in view:', yearlyUserAbsence);
  console.log('[YearlyUserAbsenceChartView] Number of months:', yearlyUserAbsence?.length);

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  function handleYearChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const year = Number(event.target.value);
    setSelectedYear(year);
    handleStartDateInputChange(new Date(`${year}-01-01`));
    handleEndDateInputChange(new Date(`${year}-12-31`));
  }

  return (
    <Card>
      <CardHeader className='px-6 pt-6'>
        <h3 className='text-xl font-semibold'>Faltas por mês</h3>
      </CardHeader>
      <CardBody>
        <div className='flex gap-4 mb-4'>
          <Select
            label='Year'
            value={selectedYear}
            onChange={handleYearChange}
            variant='flat'
            size='lg'
            radius='sm'
            classNames={{ trigger: 'bg-[#f4f4f5] text-gray-700' }}
          >
            {years.map((year) => (
              <SelectItem key={year}>{year}</SelectItem>
            ))}
          </Select>
        </div>
        <div className='w-full h-[400px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              data={yearlyUserAbsence}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray='4 4' stroke='#d1d5db' />
              <XAxis
                dataKey='month'
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
                interval={0}
                padding={{ left: 10, right: 10 }}
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
