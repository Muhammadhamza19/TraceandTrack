import { Link, Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import FooterComponent from './Footer'
import React from "react"
import './AppLayout.scss';
import { useNavigate } from 'react-router-dom'
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Logo from "../../Assets/Logo.png";
import PeopleIcon from '@mui/icons-material/People';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Avatar, Button, Container, Menu, MenuItem } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import PersonIcon from '@mui/icons-material/Person';


import getWeb3 from "../../getWeb3";
import { useState, useEffect } from 'react';
import manufacturer from "../../contracts/Manufacturer.json";
import distributor from "../../contracts/Distributor.json";
import transporter from "../../contracts/Transporter.json";
import regional from "../../contracts/Regional.json";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function AppLayout() {
  const list = [
    { name: "Manufacture", path: "/" },
    { name: "Transporter", path: "/transporter" },
    { name: "Distributer", path: "/distributor" },
    { name: "Region", path: "/region" },
    { name: "User", path: "/user" },
    { name: "Login", path: "/login" },

  ];
const [open, setOpen] = React.useState(true); 
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate()
    
  
   
  
    const logOut = () => {
      localStorage.clear();
      setAnchorEl(null);
      navigate('/');
    };
  
    const handleDrawer = () => {
      setOpen(!open);
    };
  
    const opendropdown = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    useEffect(() => {
      setAuth(localStorage.getItem("token"))
    });



    return (
      // <Box sx={{ flexGrow: 1 }}>

      //   {/* {if(something)}   */}
        
      //   {SideBar}
      //   <AppBar position="static" style={{ background: '' }} >
      //     <Toolbar>
      //       <IconButton
      //         size="large"
      //         edge="start"
      //         color="inherit"
      //         aria-label="menu"
      //         sx={{ mr: 2 }}
      //         onClick={handleSideBar}
      //       >
      //         <MenuIcon />
      //       </IconButton>
            
      //       <Typography component="div" sx={{ flexGrow: 1 }}>
      //           <div className="sidebar_logo"><h3>SupplyChain</h3></div>
      //       </Typography>
      //       {auth && (
      //         <div>
      //           <IconButton
      //             size="large"
      //             aria-label="account of current user"
      //             aria-controls="menu-appbar"
      //             aria-haspopup="true"
      //             onClick={handleMenu}
      //             color="inherit"
      //           >
      //             <AccountCircle />
      //           </IconButton>
      //           <Menu
      //             id="menu-appbar"
      //             anchorEl={anchorEl}
      //             anchorOrigin={{
      //               vertical: 'top',
      //               horizontal: 'right',
      //             }}
      //             keepMounted
      //             transformOrigin={{
      //               vertical: 'top',
      //               horizontal: 'right',
      //             }}
      //             open={Boolean(anchorEl)}
      //             onClose={handleClose}
      //           >
      //             <MenuItem onClick={logout}>Logout</MenuItem>
      //           </Menu>
      //         </div>
      //       )}
      //     </Toolbar>
      //   </AppBar>
        
      
      // <FooterComponent/>
      // </Box>
      <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open} sx={{ bgcolor: "#0693e3" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawer}
              edge="start"
              sx={{
                marginRight: 5,
                ...open,
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              SupplyChain
            </Typography>
          </Box>
          {
            auth&&
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

            
              
              <IconButton
              sx={{borderRadius: "10px",}}
                onClick={handleClick}
                size="small"
                aria-controls={opendropdown ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={opendropdown ? 'true' : undefined}
              >
                <Avatar  sx={{ width: 30, height: 30,mr:1}}/>
            <Typography variant="h6" sx={{fontSize:'1rem',color:'white'}}></Typography>
              </IconButton>

          </Box>
          }
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={anchorEl}
            onClose={handleClose}
            onClick={handleClose}
            
            PaperProps={{
              elevation: 0,
              sx: {
                width:'400px',
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 80,
                  height: 80,
                  ml: 1,
                  mr: 1,
                  
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <Typography sx={{
              fontSize:'1.125rem',fontWeight:500,
              p:1.5
              }}>User Profile</Typography>
              <Box sx={{display:'flex'}}>
              <Avatar s sx={{borderRadius:'50px'}} /> 
              <Box sx={{mt:1}}>
              <Typography variant="h4"
              sx={{
                fontSize:'1.125rem',
                fontWeight:500
              }}>User</Typography>
              <Typography variant="h6"
              sx={{
                fontSize:'0.875rem',
                fontWeight:500,
                color: "rgb(119, 126, 137)"
              }}>Administrator</Typography>
              
              </Box>
              </Box>
            <Divider sx={{p:1}} />
            {/* <MenuItem sx={{p:2}} component={Link} to={`/edit/users/_id=${_id}&name=${user?.name}`}>
              <Box sx={{display:'flex'}}>
              <Button sx={{
                bgcolor:'#F2F6F6',
                mr:1,
                borderRadius:'10px'
              }}><PersonIcon fontSize="small" sx={{color:'#447E36'}} />
              </Button>
              <Box >
              <Typography variant="h5"
              sx={{
                fontSize:'1rem'
              }}>My Profile</Typography>
              <Typography variant="h6"
              sx={{
                fontSize:'0.875rem',
                color:'rgb(119, 126, 137)'
              }}>Account Settings</Typography>
              </Box>
              </Box>
            </MenuItem> */}
            <Button fullWidth onClick={logOut}
            sx={{
              p:1,
              color: 'white', bgcolor: '#1273DE',
              '&:hover': {
                backgroundColor: '#1273DE',
              }
            }}>Logout</Button>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <img src={Logo} width="100%"  />
        </DrawerHeader>
        <Divider />
        <List>
          {list.map((text, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <Link to={text.path}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index % 2 === 0 ? <ManageAccountsIcon /> : <PeopleIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={text.name}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
          <Outlet/>
      </Box>
    </Box>
      
    );
  }

