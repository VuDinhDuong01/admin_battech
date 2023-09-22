import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProviderContext } from './hook/useContext.tsx'
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      < HelmetProvider>  <QueryClientProvider client={queryClient}>
        <ProviderContext>
          <App />
        </ProviderContext>
      </QueryClientProvider></HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
