import  React, { useState}  from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import {Button, Avatar, Menu, MenuItem, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore, HomeOutlined, FileCopyOutlined, BusinessOutlined, GroupOutlined, SettingsOutlined, ManageAccountsOutlined , AppRegistrationOutlined, MenuBookOutlined, PersonOutlined, BadgeOutlined} from '@mui/icons-material';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import BreadCrumb from '../components/Breadcrumb';
import UsaLogo from '../assets/usalogo.png'

const drawerWidth = 300;
const menuList = [
  { title: 'Title Company', icon : <BusinessOutlined/>, },
  { title: 'Notary Management', icon :  <BadgeOutlined/>, },
  { title: 'User Management', icon :  <GroupOutlined/>, },
  { title: 'Services', icon :  <SettingsOutlined/>, },
  { title: 'Client Management', icon :  <ManageAccountsOutlined/>, },
  { title: 'Menu Management', icon :  <AppRegistrationOutlined/>, },
  { title: 'Notarization Logs', icon :  <MenuBookOutlined/>, },
  { title: 'My Account', icon :  <PersonOutlined/>, },
]

const DashboardLayout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openJobManagement, setOpenJobManagement] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Handle logout logic
    // handleMenuClose();
  };

  
const handleJobManagementClick = () => {
    setOpenJobManagement(!openJobManagement);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}  sx={{ bgcolor: 'white', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'}}>
      <Toolbar>
        <IconButton
          color="primary"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Button component={NavLink} to={`/title-company`} size='medium' variant="text">Add an Title Company/Agency</Button>
        <div style={{ flexGrow: 1 }}></div> {/* This is to push the Avatar to the right */}

        <IconButton onClick={handleMenuOpen} sx={{ ml: 2 }}>
          <Avatar alt="Admin" src="/static/images/avatar/1.jpg" />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 3,
            sx: {
              overflow: 'visible',
              mt: 1.5,
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem>
            <Avatar /> Admins
          </MenuItem>
          <MenuItem>
            <Typography variant="body2" color="text.secondary">
              admin@usanotary.net
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem>My Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Log Out</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
        <Logo src={UsaLogo} alt="Logo" />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
      
        <List>
          <ListItem  component={NavLink} to="/dashboard"  disablePadding sx={linkStyle(theme, open)}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 {<HomeOutlined />}
                </ListItemIcon>
                <ListItemText primary={'Dashboard'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem   onClick={handleJobManagementClick} disablePadding sx={linkStyle(theme, open)}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 {<FileCopyOutlined />}
                </ListItemIcon>
                
                <ListItemText primary="Job Management" sx={{ opacity: open ? 1 : 0 }} />
               
             {open && (openJobManagement ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </ListItem>
        
           
           <Collapse style={{ marginLeft: 50 }} in={openJobManagement && open} timeout="auto" unmountOnExit>
             <List component="div" disablePadding>
               <ListItem  sx={nestedLinkStyle(theme)} component={NavLink} to="/create-job">
                 <ListItemText primary="Create Job" />
               </ListItem>
               <ListItem  sx={nestedLinkStyle(theme)} component={NavLink} to="/jobs-list">
                 <ListItemText primary="Jobs List" />
               </ListItem>
               <ListItem  sx={nestedLinkStyle(theme)} component={NavLink} to="/notarize-a-document">
                 <ListItemText primary="Notarize A Document" />
               </ListItem>
             </List>
           </Collapse>
          {menuList.map((menu, index) => (
            <ListItem key={menu.title} component={NavLink} to={`/${menu.title.toLowerCase().replace(/\s+/g, '-')}`} disablePadding sx={linkStyle(theme, open)}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {menu?.icon}
                </ListItemIcon>
                <ListItemText primary={menu.title} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Button
          to="/login"
          sx={{
            margin: 2,
            color: theme.palette.primary.main,
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: '8px',
            fontWeight: 'bold',
            display: open ? 'block' : 'none',
            textAlign: 'center'
          }}
        >
          Logout
         </Button>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
         <BreadCrumb />
         <Outlet />
      </Box>
    </Box>
  );
}

export default DashboardLayout


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Logo = styled('img')(({ theme }) => ({
    width: '190px',
  }));
  const linkStyle = (theme, drawerOpen) => ({
    color: '#4A4A4A',
    borderRadius: '8px',
    justifyContent: drawerOpen ? 'initial' : 'center',
    paddingLeft: drawerOpen ? theme.spacing(2) : theme.spacing(1),
    paddingRight: drawerOpen ? theme.spacing(2) : theme.spacing(1),
    '& .MuiListItemIcon-root': {
      color: '#4A4A4A'  // Ensuring icon color consistency
    },
   
    '&.active': {
      backgroundColor: theme.palette.primary.main,
      color: '#ffffff',
      '& .MuiListItemText-root': {
        color: '#ffffff',
      },
      '& .MuiListItemIcon-root': {
        color: '#ffffff', // Ensuring icon color is white for active state
      },
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: '#5d87ff',
      '& .MuiListItemText-root': {
        color: '#5d87ff',
      },
      '& .MuiListItemIcon-root': {
        color: '#5d87ff',
      },
    },
  });
  
  const nestedLinkStyle = (theme) => ({
    pl: 6,
    padding: '12px 24px',
    color: '#4A4A4A',
    borderRadius: '8px',
    '&.active': {
      backgroundColor: theme.palette.primary.main,
      color: '#ffffff',
      '& .MuiListItemText-root': {
        color: '#ffffff',
      },
      '& .MuiListItemIcon-root': {
        color: '#ffffff', // Ensuring icon color is white for active state
      },
    },
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: '#5d87ff',
      '& .MuiListItemText-root': {
        color: '#5d87ff',
      },
      '& .MuiListItemIcon-root': {
        color: '#5d87ff',
      },
    },
  });

