import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './services/firebase'
import { AuthenticationProvider } from './providers/AuthenticationProvider'
import { SessionNameProvider } from './containers/SessionNameProvider/SessionNameProvider.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthenticationProvider>
      <SessionNameProvider>
        <ToastContainer />
        <App />
      </SessionNameProvider>
    </AuthenticationProvider>
  </React.StrictMode>
)
