import { useQueryState, parseAsIsoDate } from 'nuqs'

export function useQueryParamDate(
  key: string,
  defeaulDate = new Date(),
): [Date, (newDate: Date) => void] {
  const [date, setDate] = useQueryState(key, parseAsIsoDate)

  function setState(newDate: Date) {
    setDate(newDate)
  }

  return [date ?? defeaulDate, setState]
}
