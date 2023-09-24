import { useState } from 'react';
import Header from './Header';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light'
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? "#eaeaea" : "#121212"
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='top-right' theme='colored' />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={() => {setDarkMode(!darkMode)}}/>
      <Container> 
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
