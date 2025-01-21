import { useState } from 'react';
import { Outlet } from 'react-router';
import { Stack, ThemeProvider, createTheme, CssBaseline } from '@mui/material';

import Header from '../blocks/Header';

const defaultMode = 'light';

function PageLayout() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(defaultMode);

  // Theme configuration
  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  const handleThemeMode = (mode: 'light' | 'dark') => setThemeMode(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack direction="column" height="100%">
        <Header theme={themeMode} setTheme={handleThemeMode} />
        <Stack component="main" direction="column" height="100%" flex={1} p={4}>
          <Outlet />
        </Stack>
      </Stack>
    </ThemeProvider>
  );
}

export default PageLayout;
