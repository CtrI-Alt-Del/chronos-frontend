import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

export const useNavigation = () => {
  const pathname = usePathname();
  const router = useRouter()

  function goTo(route: string) {
    router.push(route)
  }

  return {
    currentRoute: pathname,
    goTo,
  };
}; 