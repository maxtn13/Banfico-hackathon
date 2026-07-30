import { createContext, useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser, clearUser, markReady } from '../store/authSlice.js'
import { api } from '../api/client.js'

const AuthContext = createContext(null)

const DEMO = { email: 'nivas.ganesan+aihackathonteamf@banfico.com', password: 'KWRB@(7h2Gk2L1(8daiw' }

export function AuthProvider({ children }) {
  const dispatch = useDispatch()
  const { user, ready, displayName, firstName } = useSelector((s) => s.auth)

  useEffect(() => {
    // If user was already loaded from localStorage by the slice initialState, mark ready
    if (!ready) dispatch(markReady())
  }, [dispatch, ready])

  async function signIn(email, password) {
    const result = await api.login(email.trim(), password)
    dispatch(
      setUser({
        email: email.trim(),
        sessionToken: result.sessionToken,
        consentedAt: new Date().toISOString(),
      }),
    )
    return result
  }

  function signOut() {
    dispatch(clearUser())
  }

  return (
    <AuthContext.Provider value={{ user: user ? { ...user, name: displayName } : null, ready, signIn, signOut, DEMO, displayName, firstName }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
