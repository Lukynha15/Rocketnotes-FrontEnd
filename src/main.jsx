import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import { Routes } from './routes';
import GlobalStyles from './styles/global';
import theme from './styles/theme';

import { AuthProvider } from './hooks/auth';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </StrictMode>
  );
} else {
  console.error('Elemento root não encontrado!');
}
