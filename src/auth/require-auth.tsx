import { useAuth } from '@/hooks/use-auth'
import { UnauthenticatedView } from '@/components/unauthenticated-view'

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { user } = useAuth()

  if (!user) return <UnauthenticatedView />

  return children
}
