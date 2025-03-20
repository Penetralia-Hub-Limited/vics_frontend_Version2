"use client";

import { useState, KeyboardEvent, MouseEvent, Fragment } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import NavBarItems from "./nav-bar-items";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

type Anchor = "top";

const NavBarMobile = () => {
  const [state, setState] = useState({
    top: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const NavItems = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" ? "auto" : 250, padding: 5 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <NavBarItems />
      </List>
    </Box>
  );

  return (
    <div>
      {(["top"] as const).map((anchor) => (
        <Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuRoundedIcon
              fontSize="large"
              className={"text-primary-500 cursor-pointer"}
            />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {NavItems(anchor)}
          </Drawer>
        </Fragment>
      ))}
    </div>
  );
};

export default NavBarMobile;
