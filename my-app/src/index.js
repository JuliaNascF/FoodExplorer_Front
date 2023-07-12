import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components'
import GlobalStyle from "./styles/global"
import theme from "./styles/theme"
import { SignIn } from './pages/SignIn';
import { AuthProvider } from './hooks/auth';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <GlobalStyle/>
   <AuthProvider>
        <SignIn/>

   </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);


