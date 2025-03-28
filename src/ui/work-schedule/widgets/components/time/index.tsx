import type { ComponentProps, PropsWithChildren } from 'react'

export const Time = ({
  children,
  ...timeProps
}: PropsWithChildren<ComponentProps<'time'>>) => {
  return <time {...timeProps}>{children ?? '__:__'}</time>
}
