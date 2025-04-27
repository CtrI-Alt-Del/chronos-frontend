import { Tabs, type TabsProps } from '@heroui/react'

export const TabsContainerView = (props: TabsProps) => {
  return (
    <Tabs
      {...props}
      aria-label='Opções'
      color='primary'
      classNames={{
        base: 'block',
        tabList: 'w-full mx-auto relative rounded-none p-0 border-b border-divider',
        cursor: 'w-full bg-[#22d3ee]',
        tab: 'w-full px-0 h-12',
        tabContent: 'group-data-[selected=true]:text-[#06b6d4]',
        panel: 'pt-3',
      }}
      variant='underlined'
    />
  )
}
