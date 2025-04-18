import { useQueryState } from 'nuqs'

export function useQueryParamString(
  key: string,
  defeaulString = '',
): [string, (newValue: string) => void] {
  const [string, setString] = useQueryState(key)

  function setState(newstring: string) {
    setString(newstring)
  }

  return [string ?? defeaulString, setState]
}
