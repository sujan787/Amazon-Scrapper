import './index.css'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import App from './App.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'

// import { trpc, trpcClient } from './lib/trpc';





const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <trpc.Provider client={trpcClient} queryClient={queryClient}> */}
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    {/* </trpc.Provider> */}
  </React.StrictMode>
)
