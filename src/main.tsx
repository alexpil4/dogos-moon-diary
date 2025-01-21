import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Route, Routes } from 'react-router';

import PageLayout from './layout/PageLayout';
import Dashboard from './pages/Dashboard';
import ObservationPage from './pages/observation';
import { GlobalStyles } from '@mui/material';
import globalStyle from './style/global';
import { enableMocking } from './mocks/browser';

const queryClient = new QueryClient();

void enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <CssBaseline />
      <GlobalStyles styles={globalStyle} />
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route element={<PageLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="observations" element={<ObservationPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </LocalizationProvider>
    </StrictMode>,
  );
});
