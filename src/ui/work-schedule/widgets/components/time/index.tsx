import type { ComponentProps, PropsWithChildren } from 'react'

export const Time = ({
  children,
  ...timeProps
}: PropsWithChildren<ComponentProps<'time'>>) => {
  return <time {...timeProps}>{children ? String(children).slice(0, 5) : '__:__'}</time>
}
