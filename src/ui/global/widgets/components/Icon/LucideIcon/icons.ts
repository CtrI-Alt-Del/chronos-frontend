import type { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react'
import type { IconName } from '../types/Icon-name'
import {
  History,
  ScrollText,
  Menu,
  FlipVertical,
  Sparkles,
  LogOut,
  type LucideProps,
} from 'lucide-react'

export const ICONS: Record<
  IconName,
  ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
> = {
  menu: Menu,
  star: Sparkles,
  history: History,
  mirror: FlipVertical,
  report: ScrollText,
  logout: LogOut,
}
