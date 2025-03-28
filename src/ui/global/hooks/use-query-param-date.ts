import { useQueryState, parseAsIsoDate } from 'nuqs'
import { useDatetime } from './use-datetime'

export function useQueryParamDate(
  key: string,
  defeaulDate = new Date(),
): [Date, (newDate: Date) => void] {
  const { plusDays } = useDatetime()
  const [date, setDate] = useQueryState(key, parseAsIsoDate)

  function setState(newDate: Date) {
    setDate(newDate)
  }

  return [date ?? defeaulDate, setState]
}
