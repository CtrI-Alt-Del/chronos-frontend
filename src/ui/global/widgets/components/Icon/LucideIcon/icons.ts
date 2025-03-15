import type { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react'
import type { IconName } from '../types/IconName'
import {
  History,
  ScrollText,
  FlipVertical,
  Sparkles,
  type LucideProps,
} from 'lucide-react'

export const ICONS: Record<
  IconName,
  ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
> = {
  star: Sparkles,
  history: History,
  mirror: FlipVertical,
  report: ScrollText,
}
