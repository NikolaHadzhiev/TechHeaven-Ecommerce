import { Button, Fade, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks/reduxHooks";
import { signOut } from "../../app/store/slices/accountSlice";

const LoginMenuHeader = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.account);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <>
        <Button onClick={handleClick} color="inherit" sx={{typography: "h7"}}>
          {user?.email}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My orders</MenuItem>
          <MenuItem onClick={() => dispatch(signOut())}>Logout</MenuItem>
        </Menu>
      </>
    )
}

export default LoginMenuHeader