import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  IconButton,
  Collapse,
  Divider,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ExpandLess, ExpandMore, Menu as MenuIcon, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import UsaLogo from '../assets/usalogo.png'
import { styled } from '@mui/system';
import BreadCrumb from '../components/Breadcrumb';

const drawerWidth = 240;
const collapsedDrawerWidth = 60; // Width when the drawer is collapsed

const Layout = () => {
  const theme = useTheme();
  const [openJobManagement, setOpenJobManagement] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(true);

  const handleJobManagementClick = () => {
    setOpenJobManagement(!openJobManagement);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh'}}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: drawerOpen ? `calc(100% - ${drawerWidth}px)` : `calc(100% - ${collapsedDrawerWidth}px)`,
          ml: drawerOpen ? `${drawerWidth}px` : `${collapsedDrawerWidth}px`,
          backgroundColor: 'white',
          boxShadow: 'none',
          borderBottom: '1px solid #E0E0E0',
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton edge="start" onClick={handleDrawerToggle}>
            {drawerOpen ? <ChevronLeft sx={{ color: '#4A4A4A' }} /> : <ChevronRight sx={{ color: '#4A4A4A' }} />}
          </IconButton>
          <Typography variant="h6" noWrap sx={{ color: '#4A4A4A' }}>
            Add a Title Company/Agency
          </Typography>
          <IconButton edge="end">
            <AccountCircleIcon sx={{ color: '#4A4A4A', fontSize: 40 }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerOpen ? drawerWidth : collapsedDrawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerOpen ? drawerWidth : collapsedDrawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#F9FAFB',
            borderRight: '1px solid #E0E0E0',
            paddingRight: drawerOpen ? 2 : 0,
            paddingLeft: drawerOpen ? 2 : 0,
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar >

        <Logo src={UsaLogo} alt="Logo" />
        </Toolbar>
        
        <List>
          <ListItem  component={NavLink} to="/dashboard" sx={linkStyle(theme, drawerOpen)}>
            <ListItemText primary="Dashboard" sx={{ display: drawerOpen ? 'block' : 'none' }} />
          </ListItem>
          <ListItem  onClick={handleJobManagementClick} sx={linkStyle(theme, drawerOpen)}>
            <ListItemText primary="Job Management" sx={{ display: drawerOpen ? 'block' : 'none' }} />
            {drawerOpen && (openJobManagement ? <ExpandLess /> : <ExpandMore />)}
          </ListItem>
          <Collapse in={openJobManagement && drawerOpen} timeout="auto" unmountOnExit>
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
          {['Title Company', 'Notary Management', 'User Management', 'Services', 'Client Management', 'Menu Management', 'Notarization Logs', 'My Account'].map((text) => (
            <ListItem key={text} component={NavLink} to={`/${text.toLowerCase().replace(/\s+/g, '-')}`} sx={linkStyle(theme, drawerOpen)}>
              <ListItemText primary={text} sx={{ display: drawerOpen ? 'block' : 'none' }} />
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
            textTransform: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            display: drawerOpen ? 'block' : 'none',
          }}
        >
          Logout
        </Button>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Toolbar />
        <BreadCrumb />
        <Outlet />
      </Box>
    </Box>
  );
};

const linkStyle = (theme, drawerOpen) => ({
  color: '#4A4A4A',
  borderRadius: '8px',
  justifyContent: drawerOpen ? 'initial' : 'center',
  paddingLeft: drawerOpen ? theme.spacing(2) : theme.spacing(1),
  paddingRight: drawerOpen ? theme.spacing(2) : theme.spacing(1),
  '& .MuiListItemText-root': {
    opacity: drawerOpen ? 1 : 0,
  },
  '&.active': {
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    '& .MuiListItemText-root': {
      color: '#ffffff',
    },
  },
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: '#ffffff',
    '& .MuiListItemText-root': {
      color: '#ffffff',
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
  },
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: '#ffffff',
    '& .MuiListItemText-root': {
      color: '#ffffff',
    },
  },
});


const Logo = styled('img')(({ theme }) => ({
  width: '170px',
}));

export default Layout;
