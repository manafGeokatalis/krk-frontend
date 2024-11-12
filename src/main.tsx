import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from '@emotion/react'
import { createTheme } from '@mui/material/styles'
import axios from 'axios'
import Notification from './components/Notification.tsx'
import ReactGA from "react-ga4";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4B96CC',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#ADADAD',
      contrastText: '#000000'
    },
    success: {
      main: '#33B679',
      contrastText: '#FFFFFF'
    },
    warning: {
      main: '#FFCD4E',
      contrastText: '#000000'
    },
    error: {
      main: '#F15F5F',
      contrastText: '#FFFFFF'
    },
    text: {
      primary: '#FFFFFF'
    }
  }
});

axios.defaults.baseURL = import.meta.env.VITE_API_URL || '/api';
axios.defaults.withCredentials = true;
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`;
axios.defaults.headers.common['Content-Type'] = 'application/json';

ReactGA.initialize("G-0XSNGDFWWJ");

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <Notification />
      <App />
    </ThemeProvider>
  </RecoilRoot>
  ,
)
