import React from 'react';
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { loadLocalStorageData } from './localStorage';

import App from './App';
import store from './store';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppProvider } from '@shopify/polaris';
import { useId } from 'react';
import enTranslations from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/build/esm/styles.css';

global.loadData = loadLocalStorageData;
const theme = createTheme({
  //here you set palette, typography ect...
})

const rootElement = document.getElementById("main");
const root = createRoot(rootElement);

root.render(

  <Provider store={store}>
    <AppProvider i18n={enTranslations}>
      <ThemeProvider theme={theme}>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </AppProvider>
  </Provider>
);
