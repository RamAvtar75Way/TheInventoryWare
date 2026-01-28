import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import './index.css';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { store } from './store/store';
import { queryClient } from './lib/queryClient';
import { env } from './config/env';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={env.VITE_GOOGLE_CLIENT_ID}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
);
