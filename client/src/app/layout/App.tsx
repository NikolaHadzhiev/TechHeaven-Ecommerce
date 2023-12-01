import { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoadingComponent from "./LoadingComponent";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "../hooks/reduxHooks";
import { fetchCurrentUser } from "../store/slices/accountSlice";
import { fetchShoppingCartAsync } from "../store/slices/shoppingCartSlice";
import HomePage from "../../features/home/HomePage";

const App = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchShoppingCartAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="top-right" theme="colored" />
      <CssBaseline />
      <Header
        darkMode={darkMode}
        handleThemeChange={() => {
          setDarkMode(!darkMode);
        }}
      />
      {loading ? (
        <LoadingComponent message="Loading store... 🥱" />
      ) : location.pathname === "/" ? (
        <HomePage />
      ) : (
        <Container sx={{mt: 4}}>
          <Outlet />
        </Container>
      )}
    </ThemeProvider>
  );
};

export default App;
