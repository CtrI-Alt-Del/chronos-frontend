import { PrivateLayout } from '@/ui/global/widgets/layouts/private-layout'
import type { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

const PrivateLayoutWrapper = ({ children }: LayoutProps) => {
  return <PrivateLayout>{children}</PrivateLayout>
}

export default PrivateLayoutWrapper
