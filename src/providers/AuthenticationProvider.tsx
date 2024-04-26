import {
  User,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from '../services/firebase'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

enum AuthenticationState {
  LOADING = 'LOADING',
  AUTHENTICATED = 'AUTHENTICATED',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
}

type Authentication = {
  user: User | null
  error: unknown
  state: AuthenticationState
  signIn: () => void
  signOut: () => void
}

const AuthenticationContext = createContext<Authentication>({
  user: null,
  error: null,
  state: AuthenticationState.UNAUTHENTICATED,
  signIn: () => {},
  signOut: () => {},
})

type AuthenticationProviderProps = {
  children: ReactNode
}

const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
        setError(null)
        return
      }

      setUser(null)
      setError(null)
    })
  }, [])

  const _signIn = useCallback(async () => {
    await signInWithCredential('developers@skooldio.com', 'tiramiso', {
      onCompleted: (user) => setUser(user),
      onError: (error) => setError(error),
    })
  }, [])

  const _signOut = useCallback(async () => {
    await signOut({
      onCompleted: () => {
        setUser(null)
        setError(null)
      },
      onError: (error) => setError(error),
    })
  }, [])

  let state: AuthenticationState = AuthenticationState.LOADING
  if (user) state = AuthenticationState.AUTHENTICATED
  if (!user && error) state = AuthenticationState.UNAUTHENTICATED
  console.log(user, error, state)

  return (
    <AuthenticationContext.Provider
      value={{ user, error, state, signIn: _signIn, signOut: _signOut }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}

const useAuthentication = (): Authentication => {
  const authUtils = useContext(AuthenticationContext)
  return authUtils
}

export type { AuthenticationProviderProps }
export { AuthenticationProvider, AuthenticationState, useAuthentication }
