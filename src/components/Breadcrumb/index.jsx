import React from 'react';
import { Box, Typography, Breadcrumbs, Link, Container } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import UsaIcon from '../../assets/usaicon.png'

const BreadCrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Box sx={{ backgroundColor: '#f0f7ff', padding: '16px 16px', borderRadius: 5, marginBottom: '30px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Typography variant="h6">{pathnames?.[0]?.charAt(0)?.toUpperCase() + pathnames?.[0]?.slice(1)}</Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} to="/" underline="hover" color="inherit">
              Home
            </Link>
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join('/')}`;

              return last ? (
                <Typography color="textPrimary" key={to}>
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </Typography>
              ) : (
                <Link component={RouterLink} to={to} key={to} underline="hover" color="inherit">
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </Link>
              );
            })}
          </Breadcrumbs>
        </div>
        <Box component="img" src={UsaIcon} alt="logo" sx={{ height: '50px' }} />
      </Box>
    </Box>
  );
};

export default BreadCrumb;
