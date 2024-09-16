import { MouseEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Settings } from '@mui/icons-material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InventoryIcon from '@mui/icons-material/Inventory';
import LogoutIcon from '@mui/icons-material/Logout';
import PaidIcon from '@mui/icons-material/Paid';
import PaymentIcon from '@mui/icons-material/Payment';
import ReceiptIcon from '@mui/icons-material/Receipt';
import StorefrontIcon from '@mui/icons-material/Storefront';
import UndoIcon from '@mui/icons-material/Undo';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { IconButton, Menu, MenuItem, Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { deepOrange } from '@mui/material/colors';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useUserModulesQuery } from 'src/apis/packageApi.ts';
import { LABELS, routes } from 'src/common';
import CartButton from 'src/components/cartButton/CartButton.tsx';
import CenteredGrid from 'src/components/centeredGrid/CenteredGrid.tsx';
import IconLabelButton from 'src/components/iconLabelButton/IconLabelButton';
import StyledToolbar from 'src/components/navbar/components/StyledToolbar.ts';
import TransparentAppBar from 'src/components/navbar/components/TransparentAppBar.ts';
import { useLogout } from 'src/hooks';
import { selectCurrentUser } from 'src/redux/reducers/authSlice.ts';

const defaultTheme = createTheme();

const Navbar = () => {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const logout = useLogout();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { data: userModules } = useUserModulesQuery();

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <TransparentAppBar position='fixed'>
        <Container maxWidth='lg'>
          <StyledToolbar variant='regular' sx={{ borderColor: 'divider' }}>
            {user ? (
              <>
                <CenteredGrid container>
                  <IconLabelButton
                    onClick={() => navigate(routes.PROFILE)}
                    icon={<AccountBoxIcon />}
                    label={LABELS.PROFILE}
                  />
                  <IconLabelButton
                    onClick={() => navigate(routes.PRODUCTS)}
                    icon={<StorefrontIcon />}
                    label={LABELS.PRODUCTS}
                  />
                  <IconLabelButton
                    onClick={() => navigate(routes.PACKAGES)}
                    icon={<InventoryIcon />}
                    label={LABELS.PACKAGES}
                  />
                  <CartButton />
                  {userModules &&
                    userModules.map((module) => (
                      <IconLabelButton
                        key={module.id}
                        onClick={() => navigate(routes.MODULE(module.name))}
                        label={module.name}
                        icon={null}
                      />
                    ))}
                </CenteredGrid>
                <Grid item sx={{ position: 'absolute', right: '2%' }}>
                  <IconButton onClick={handleOpenUserMenu}>
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>
                      {user.first_name ? user.first_name.charAt(0) : user.email.charAt(0)}
                    </Avatar>
                  </IconButton>
                </Grid>
                <Box sx={{ flexGrow: 0 }}>
                  <Menu
                    anchorEl={anchorElUser}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem disabled>
                      <Typography variant={'body2'}>
                        {user.first_name ? `${user.first_name} ${user.last_name}` : user.email}
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={() => navigate(routes.SETTINGS)}>
                      <Stack alignItems='center' direction='row' gap={2}>
                        <Settings />
                        {LABELS.SETTINGS}
                      </Stack>
                    </MenuItem>
                    <MenuItem onClick={() => navigate(routes.PAYMENT_METHODS)}>
                      <Stack alignItems='center' direction='row' gap={2}>
                        <PaymentIcon />
                        {LABELS.PAYMENT_METHODS}
                      </Stack>
                    </MenuItem>
                    <MenuItem onClick={() => navigate(routes.SUBSCRIPTIONS)}>
                      <Stack alignItems='center' direction='row' gap={2}>
                        <PaidIcon />
                        {LABELS.SUBSCRIPTIONS}
                      </Stack>
                    </MenuItem>
                    <MenuItem onClick={() => navigate(routes.REFUNDS)}>
                      <Stack alignItems='center' direction='row' gap={2}>
                        <UndoIcon />
                        {LABELS.REFUNDS}
                      </Stack>
                    </MenuItem>
                    <MenuItem onClick={() => navigate(routes.INVOICES)}>
                      <Stack alignItems='center' direction='row' gap={2}>
                        <ReceiptIcon />
                        {LABELS.INVOICES}
                      </Stack>
                    </MenuItem>
                    <MenuItem onClick={() => navigate(routes.MODULES)}>
                      <Stack alignItems='center' direction='row' gap={2}>
                        <ViewModuleIcon />
                        {LABELS.MODULES}
                      </Stack>
                    </MenuItem>
                    <MenuItem onClick={() => logout()}>
                      <Stack alignItems='center' direction='row' gap={2}>
                        <LogoutIcon />
                        {LABELS.LOGOUT}
                      </Stack>
                    </MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
              <CenteredGrid container>
                <Button onClick={() => navigate(routes.LOGIN)}>{LABELS.LOGIN}</Button>
                <Button onClick={() => navigate(routes.SIGNUP)}>{LABELS.SIGNUP}</Button>
              </CenteredGrid>
            )}
          </StyledToolbar>
        </Container>
      </TransparentAppBar>
      <Toolbar />
    </ThemeProvider>
  );
};

export default Navbar;
