import { usePathname } from 'next/navigation';

export const useNavigation = () => {
    const pathname = usePathname();

    return {
        currentRoute: pathname,
    };
}; 