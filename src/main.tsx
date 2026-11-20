import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from 'react-redux';
import store from './app/store.ts';
import { ThemeProvider } from './app/providers.tsx';
import { applyTheme, getInitialTheme } from './app/theme.ts';

const initialTheme = getInitialTheme();
applyTheme(initialTheme);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider initialTheme={initialTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
