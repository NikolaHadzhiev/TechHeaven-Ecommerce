import { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import { useStoreContext } from "../../app/hooks/useStoreContext";
//import { getCookie } from "../util/helper";
//import apiRequests from "../api/requests";
import LoadingComponent from "./LoadingComponent";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "../hooks/reduxHooks";
import { fetchCurrentUser } from "../store/slices/accountSlice";
import { fetchShoppingCartAsync } from "../store/slices/shoppingCartSlice";


const App = () => {
  // const { setShoppingCart } = useStoreContext();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchShoppingCartAsync());
    } catch (error) {
      console.log(error)
    }
  }, [dispatch])


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

  if (loading) return <LoadingComponent message="Loading store... 🥱" />;

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
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
};

export default App;
