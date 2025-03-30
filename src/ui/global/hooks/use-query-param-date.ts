import { useQueryState, parseAsIsoDate } from 'nuqs'
import { useDatetime } from './use-datetime'

export function useQueryParamDate(
  key: string,
  defeaulDate = new Date(),
): [Date, (newDate: Date) => void] {
  const { plusDays, minusDays } = useDatetime()
  const [date, setDate] = useQueryState(key, parseAsIsoDate)

  function setState(newDate: Date) {
    setDate(minusDays(newDate, 1))
  }

  return [plusDays(date ?? defeaulDate, 1), setState]
}
