import { useAuthContext } from './use-auth-context'
import { ROLE_PERMISSIONS } from '@/@core/auth/types'

export function useAuthorization() {
  // const { role } = useAuthContext()
  // const hasPermission = (permission: string): boolean => {
  //     if (!role) return false
  //     const permissions = ROLE_PERMISSIONS[role]
  //     return permissions.includes('all') || permissions.includes(permission)
  // }
  // const canAccessRoute = (requiredPermission: string): boolean => {
  //     return hasPermission(requiredPermission)
  // }
  // return {
  //     hasPermission,
  //     canAccessRoute
  // }
}
