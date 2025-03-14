import type { ReactNode } from 'react'

import { PrivateLayout } from '@/src/ui/global/widgets/layouts/private-layout'

type LayoutProps = {
  children: ReactNode
}

const PrivateLayoutWrapper = ({ children }: LayoutProps) => {
  return <PrivateLayout>{children}</PrivateLayout>
}

export default PrivateLayoutWrapper
