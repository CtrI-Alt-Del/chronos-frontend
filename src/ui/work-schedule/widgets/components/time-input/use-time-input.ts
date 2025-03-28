export function useTimeInput(defaultValue: string | null) {
  const parts = defaultValue ? defaultValue.split(':') : null
  const time = parts
    ? {
        hours: Number(parts[0]),
        minutes: Number(parts[1]),
      }
    : null

  return {
    time,
  }
}
