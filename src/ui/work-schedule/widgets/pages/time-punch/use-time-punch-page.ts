import { useEffect, useState } from 'react'

import type { WorkdayLogDto } from '@/@core/work-schedule/dtos'
import { DatetimeProvider } from '@/providers'
import { usePunchTimeAction } from './use-punch-time-action'

const PERIODS = ['Entrada 1', 'Saída 1', 'Entrada 2', 'Saída 2']
const datetimeProvider = DatetimeProvider()

export function useTimePunchPage(workdayLog: WorkdayLogDto) {
  const [step, setStep] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  const { isPuchingTime, punchTime } = usePunchTimeAction()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (workdayLog.timePunch.firstClockIn) {
      setStep(1)
    }
    if (workdayLog.timePunch.firstClockOut) {
      setStep(2)
    }
    if (workdayLog.timePunch.secondClockIn) {
      setStep(3)
    }
    if (workdayLog.timePunch.secondClockOut) {
      setStep(4)
    }
  }, [workdayLog])

  async function handleTimePunchConfirm() {
    if (workdayLog.id) await punchTime(workdayLog.id, currentTime)
  }

  const times = [
    workdayLog.timePunch.firstClockIn,
    workdayLog.timePunch.firstClockOut,
    workdayLog.timePunch.secondClockIn,
    workdayLog.timePunch.secondClockOut,
  ].map((time) => (time ? datetimeProvider.formatTime(time) : ''))

  return {
    currentTime: datetimeProvider.formatTime(currentTime),
    completeDate: datetimeProvider.formatCompleteDate(currentTime),
    step,
    isClosed: step === 4,
    times,
    currentPeriod: PERIODS[step],
    periods: PERIODS,
    isPuchingTime,
    handleTimePunchConfirm,
  }
}
