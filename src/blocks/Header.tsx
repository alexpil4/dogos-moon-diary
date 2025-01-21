import * as React from 'react';
import { NavLink } from 'react-router';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Avatar,
  Container,
  Tooltip,
  MenuItem,
  Icon,
  Switch,
} from '@mui/material';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

type Props = {
  theme: 'light' | 'dark';
  setTheme: (mode: 'light' | 'dark') => void;
};

const pages = [
  { slug: '/', name: 'DASHBOARD' },
  { slug: '/observations', name: 'OBSERVATIONS' },
];
const settings = ['Logout'];

export default function Header(props: Props) {
  const { theme, setTheme } = props;
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // It handle theme mode switching
  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(event.target.checked ? 'dark' : 'light');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Icon sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>bedtime</Icon>

          <Typography
            variant="h5"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              mr: 4,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {"DOGO'S MOON DIARY"}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <Icon>menu</Icon>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <NavLink to={page.slug} style={{ textDecoration: 'none' }} key={page.slug}>
                  {({ isActive }) => (
                    <MenuItem onClick={handleCloseNavMenu} selected={isActive}>
                      <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                    </MenuItem>
                  )}
                </NavLink>
              ))}
            </Menu>
          </Box>
          <Icon sx={{ display: { xs: 'flex', md: 'none' }, mr: 2 }}>bedtime</Icon>
          <Typography
            variant="h5"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MOON VIEW
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <NavLink
                to={page.slug}
                style={{ textDecoration: 'none', marginRight: 16 }}
                key={page.slug}
              >
                {({ isActive }) => (
                  <Typography
                    component="span"
                    onClick={handleCloseNavMenu}
                    sx={{
                      color: 'white',
                      mr: 2,
                      textDecoration: 'none',
                      borderBottom: isActive ? '2px solid white' : 'none',
                      fontWeight: isActive ? 'bolder' : 'normal',
                    }}
                  >
                    {page.name}
                  </Typography>
                )}
              </NavLink>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 8 }}>
            <LightModeIcon />
            <Switch
              checked={theme === 'dark'}
              onChange={handleThemeChange}
              inputProps={{ 'aria-label': 'theme switch' }}
            />
            <DarkModeIcon />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Astronaut" src="/avatars/avatar.png" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography
                    color="primary"
                    sx={{ textAlign: 'center', textDecoration: 'none' }}
                    component={NavLink}
                    to={`/${setting.toLowerCase()}`}
                  >
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
