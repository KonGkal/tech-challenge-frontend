import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import LoginButton from './LoginButton'
import Loading from 'components/Loading'

function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isLoading, error, isAuthenticated } = useAuth0()
  if (isLoading) {
    return <Loading children={{}} />
  }
  if (error) {
    return <div>Oops... {error.message}</div>
  }
  if (!isAuthenticated) return <LoginButton />
  return <>{children}</>
}

export default AuthWrapper
