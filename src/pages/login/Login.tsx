import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, Navigate, useLocation, useNavigate } from 'react-router-dom';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Divider } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useFormik } from 'formik';
import { useGoogleLoginMutation, useLoginMutation } from 'src/apis/authApi.ts';
import { CLAUSES, LABELS, routes, utils } from 'src/common';
import ColumnBox from 'src/components/columnBox/ColumnBox.tsx';
import { usePageTitle } from 'src/hooks';
import { loginSchema } from 'src/pages/login/schema.ts';
import { selectAccessToken } from 'src/redux/reducers/authSlice.ts';

const defaultTheme = createTheme();

export default function Login() {
  const token = useSelector(selectAccessToken);
  const location = useLocation();
  const [backendError, setBackendError] = useState('');
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [googleLogin] = useGoogleLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (formData) => {
      setBackendError('');
      const { email, password } = formData;
      try {
        await login({ email, password }).unwrap();
        navigate(routes.PROFILE);
      } catch (error: any) {
        setBackendError(utils.getErrorString(error));
      }
    },
  });

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    setBackendError('');
    try {
      await googleLogin({ accessToken: credentialResponse!.credential }).unwrap();
      navigate(routes.PROFILE);
    } catch (error: any) {
      setBackendError(utils.getErrorString(error));
    }
  };

  usePageTitle(LABELS.LOGIN);

  return (
    token ? <Navigate to={routes.PROFILE} state={{ from: location }} replace /> :
      <ThemeProvider theme={defaultTheme}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <ColumnBox>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              {LABELS.LOGIN}
            </Typography>
            <Box component='form' onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1, width: '400px' }}>
              <Grid item xs={12}>
                {backendError && (
                  <Alert severity='error'>{backendError}</Alert>
                )}
              </Grid>
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label={LABELS.EMAIL}
                name='email'
                autoComplete='email'
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                error={Boolean(formik.touched.email && formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label={LABELS.PASSWORD}
                type='password'
                id='password'
                autoComplete='current-password'
                value={formik.values.password}
                onChange={formik.handleChange}
                error={Boolean(formik.touched.password && formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <LoadingButton
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                loading={isLoading}
              >
                {LABELS.LOGIN}
              </LoadingButton>
              <Grid container>
                <Grid item xs>
                  <Link component={RouterLink} to={routes.FORGOT_PASSWORD} variant='body2'>
                    {CLAUSES.FORGOT_PASSWORD}
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to={routes.SIGNUP} variant='body2'>
                    {CLAUSES.SIGN_UP_CLAUSE}
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <Divider flexItem sx={{ mt: 3 }} />
            <Grid item xs={12} sx={{ mt: 3 }}>
              <GoogleLogin onSuccess={handleGoogleLogin} width='400px' />
            </Grid>
          </ColumnBox>
        </Container>
      </ThemeProvider>
  );
}
