import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import LoginMenuHeader from "../../features/account/LoginMenuHeader";
import "./Header.scss"

const midLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];
interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const Header = ({ darkMode, handleThemeChange }: Props) => {
  const { shoppingCart } = useAppSelector((state) => state.shoppingCart);
  const itemsInCartCount =
    shoppingCart?.items.reduce((value, item) => value + item.quantity, 0) || 0;
  const { user } = useAppSelector((state) => state.account);

  return (
    <AppBar className="header-app-bar">
      <Toolbar className="header-toolbar">
        <Box className="header-container">
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            className="header-home"
          >
            TechHeaven
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChange} />
        </Box>

        <List className="header-list">
          {midLinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} className="header-nav-style">
              {title.toUpperCase()}
            </ListItem>
          ))}

          {user && user.roles?.includes('Admin') && (
            <ListItem component={NavLink} to={"/inventory"} className="header-nav-style">
              INVENTORY
            </ListItem>
          )}

          {user && user.roles?.includes('Admin') && (
            <ListItem component={NavLink} to={"/error-test"} className="header-nav-style">
              TEST
            </ListItem>
          )}
        </List>

        <Box display="flex" alignItems="center">
          <IconButton
            component={NavLink}
            to={"/shopping-cart"}
            size="large"
            edge="start"
            color="inherit"
            className="header-shopping-cart"
          >
            <Badge
              badgeContent={itemsInCartCount?.toString()}
              color="secondary"
            >
              <ShoppingCart />
            </Badge>
          </IconButton>

          {user ? (
            <LoginMenuHeader />
          ) : (
            <List className="header-list">
              {rightLinks.map(({ title, path }) => (
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  className="header-nav-style"
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
