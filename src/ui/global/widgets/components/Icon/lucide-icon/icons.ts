import type { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react'
import type { IconName } from '../types/icon-name'
import {
  History,
  ScrollText,
  Menu,
  FlipVertical,
  Sparkles,
  Clock3,
  SquarePen,
  LogOut,
  SquareCheckBig,
  NotebookTabs,
  ChevronDown,
  Plus,
  Trash,
  Eye,
  Activity,
  Users,
  type LucideProps,
} from 'lucide-react'

export const ICONS: Record<
  IconName,
  ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
> = {
  users: Users,
  activity: Activity,
  trash: Trash,
  eye: Eye,
  plus: Plus,
  'arrow-down': ChevronDown,
  menu: Menu,
  star: Sparkles,
  history: History,
  mirror: FlipVertical,
  report: ScrollText,
  logout: LogOut,
  clock: Clock3,
  edit: SquarePen,
  schedule: NotebookTabs,
  confirm: SquareCheckBig,
}
