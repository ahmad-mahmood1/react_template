import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useFormik } from 'formik';
import { useRequestPasswordResetMutation } from 'src/apis/authApi.ts';
import { CLAUSES, LABELS, routes, utils } from 'src/common';
import ColumnBox from 'src/components/columnBox/ColumnBox.tsx';
import { usePageTitle } from 'src/hooks';
import { forgotPasswordSchema } from 'src/pages/forgotPassword/schema.ts';

const defaultTheme = createTheme();

export default function ForgotPassword() {
  const [successMessage, setSuccessMessage] = useState('');
  const [backendError, setBackendError] = useState('');
  const [requestPasswordReset, { isLoading }] = useRequestPasswordResetMutation();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (formData) => {
      setSuccessMessage('');
      setBackendError('');
      const { email } = formData;
      try {
        await requestPasswordReset({ email }).unwrap();
        setSuccessMessage(CLAUSES.PASSWORD_RESET_LINK);
      } catch (error: any) {
        setBackendError(utils.getErrorString(error));
      }
    },
  });

  usePageTitle(LABELS.FORGOT_PASSWORD);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <ColumnBox>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            {LABELS.FORGOT_PASSWORD}
          </Typography>
          <Box component='form' onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1, width: '400px' }}>
            <Grid item xs={12}>
              {successMessage && (
                <Alert severity='success'>{successMessage}</Alert>
              )}
            </Grid>
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
            <LoadingButton
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              loading={isLoading}
            >
              {LABELS.FIND_ACCOUNT}
            </LoadingButton>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link component={RouterLink} to={routes.SIGNUP} variant='body2'>
                  {CLAUSES.SIGN_UP_CLAUSE}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </ColumnBox>
      </Container>
    </ThemeProvider>
  );
}
