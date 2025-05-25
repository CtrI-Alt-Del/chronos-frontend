import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

export const useNavigation = () => {
  const pathname = usePathname()
  const router = useRouter()

  function goTo(route: string) {
    router.push(route)
  }

  function reloadRoute() {
    router.refresh()
  }

  return {
    currentRoute: pathname,
    goTo,
    reloadRoute,
  }
}
