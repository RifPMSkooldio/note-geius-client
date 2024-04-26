import { createContext, useContext, useState } from 'react'

type SessionNameProviderProps = {
  name: string
  onNameChange: (name: string) => void
}

const SessionNameContext = createContext<SessionNameProviderProps | undefined>(
  undefined
)

const SessionNameProvider = ({ children }: { children: React.ReactNode }) => {
  const [sessionName, setSessionName] = useState<string>('')

  const onNameChange = (name: string) => {
    setSessionName(name)
  }

  return (
    <SessionNameContext.Provider value={{ name: sessionName, onNameChange }}>
      {children}
    </SessionNameContext.Provider>
  )
}

const useSessionName = () => {
  const context = useContext(SessionNameContext)
  if (context === undefined) {
    throw new Error('useSessionName must be used within a SessionNameProvider')
  }
  return context
}

export { SessionNameProvider, useSessionName }
