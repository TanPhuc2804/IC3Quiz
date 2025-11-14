
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import "./index.css"
import { AuthProvider } from './contexts/AuthContext.tsx'
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <Provider store={store}>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </Provider>
  // </StrictMode>,
)
