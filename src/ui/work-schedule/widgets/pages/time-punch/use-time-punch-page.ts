import { useEffect, useState } from 'react'

import type { WorkdayLogDto } from '@/@core/work-schedule/dtos'
import { DatetimeProvider } from '@/providers'
import { usePunchTimeAction } from './use-punch-time-action'

const PERIODS = ['Entrada 1', 'Saída 1', 'Entrada 2', 'Saída 2']
const datetimeProvider = DatetimeProvider()

export function useTimePunchPage(workdayLog: WorkdayLogDto) {
  const [step, setStep] = useState(2)
  const [currentTime, setCurrentTime] = useState(new Date())
  const { isPuchingTime, punchTime } = usePunchTimeAction()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (workdayLog.timePunchLog.firstClockIn) {
      setStep(1)
    }
    if (workdayLog.timePunchLog.firstClockOut) {
      setStep(2)
    }
    if (workdayLog.timePunchLog.secondClockIn) {
      setStep(3)
    }
    if (workdayLog.timePunchLog.secondClockOut) {
      setStep(4)
    }
  }, [workdayLog])

  function handlePunchRegister() {
    const newStep = step + 1
    if (newStep > 4) {
      setStep(1)
    } else {
      setStep(newStep)
    }
  }

  async function handleTimePunchLogConfirm() {
    await punchTime(workdayLog.timePunchLog.id, currentTime)
  }

  const timesSchedule = [
    workdayLog.timePunchSchedule.firstClockIn,
    workdayLog.timePunchSchedule.firstClockOut,
    workdayLog.timePunchSchedule.secondClockIn,
    workdayLog.timePunchSchedule.secondClockOut,
  ].map(datetimeProvider.formatTime)

  const timesLog = [
    workdayLog.timePunchLog.firstClockIn,
    workdayLog.timePunchLog.firstClockOut,
    workdayLog.timePunchLog.secondClockIn,
    workdayLog.timePunchLog.secondClockOut,
  ]
    .filter(Boolean)
    .map(datetimeProvider.formatTime)

  return {
    currentTime: datetimeProvider.formatTime(currentTime),
    completeDate: datetimeProvider.formatCompleteDate(currentTime),
    step,
    isClosed: step === 4,
    timesSchedule,
    timesLog,
    currentPeriod: PERIODS[step],
    currentTimeSchedule: timesSchedule[step],
    periods: PERIODS,
    isPuchingTime,
    handlePunchRegister,
    handleTimePunchLogConfirm,
  }
}
