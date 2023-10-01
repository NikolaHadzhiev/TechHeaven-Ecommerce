import { useEffect, useState } from "react";
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
import { getCookie } from "../util/helper";
import apiRequests from "../api/requests";
import LoadingComponent from "./LoadingComponent";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "../hooks/reduxHooks";
import { setShoppingCart } from "../store/slices/shoppingCartSlice";


const App = () => {
  // const { setShoppingCart } = useStoreContext();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const buyerId = getCookie("BUYER_ID");
    if (buyerId) {
      apiRequests.ShoppingCart.get()
        // .then((shoppingCart) => setShoppingCart(shoppingCart))
        .then((shoppingCart) => dispatch(setShoppingCart(shoppingCart)))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch]);

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
