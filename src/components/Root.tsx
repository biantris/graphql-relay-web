import React, { Suspense } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { Outlet } from "react-router-dom";

import EventCreateDialog from "./event/eventCreate/EventCreateDialog";

const Root = () => {

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <CssBaseline />
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              GraphQL Relay Web
            </Typography>
            <EventCreateDialog />
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Suspense
            fallback={
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Loading...
              </Typography>
            }
          >
            <Outlet />
          </Suspense>
        </Box>
      </Box>
    </>
  );
};

export default Root;
