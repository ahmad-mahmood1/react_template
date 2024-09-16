import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useFormik } from 'formik';
import { useResetPasswordMutation } from 'src/apis/authApi.ts';
import { CLAUSES, LABELS, routes, utils } from 'src/common';
import ColumnBox from 'src/components/columnBox/ColumnBox.tsx';
import { usePageTitle } from 'src/hooks';
import { resetPasswordSchema } from 'src/pages/resetPassword/schema.ts';

const defaultTheme = createTheme();

export default function ResetPassword() {
  const params = useParams();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [backendError, setBackendError] = useState('');
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (formData) => {
      setSuccessMessage('');
      setBackendError('');
      const { uid, token } = params;
      const { password } = formData;
      try {
        await resetPassword({ uid, token, password }).unwrap();
        setSuccessMessage(CLAUSES.PASSWORD_RESET_SUCCESSFUL);
      } catch (error: any) {
        setBackendError(utils.getErrorString(error));
      }
    },
  });

  usePageTitle(LABELS.RESET_PASSWORD);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <ColumnBox>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            {LABELS.RESET_PASSWORD}
          </Typography>
          {successMessage ? (
            <>
              <Grid item xs={12} sx={{ mt: 3 }}>
                <Alert severity='success'>{successMessage}</Alert>
              </Grid>
              <Button
                sx={{ mt: 3, mb: 2 }}
                onClick={() => navigate(routes.LOGIN)}
              >
                {CLAUSES.LOGIN_NOW}
              </Button>
            </>
          ) : (
            <Box component='form' noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3, width: '400px' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {backendError && (
                    <Alert severity='error'>{backendError}</Alert>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='password'
                    label={LABELS.PASSWORD}
                    type='password'
                    id='password'
                    autoComplete='new-password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={Boolean(formik.touched.password && formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='confirmPassword'
                    label={LABELS.CONFIRM_PASSWORD}
                    type='password'
                    id='confirmPassword'
                    autoComplete='new-password'
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  />
                </Grid>
              </Grid>
              <LoadingButton
                type='submit'
                fullWidth
                variant='contained'
                loading={isLoading}
                sx={{ mt: 3, mb: 2 }}
              >
                {LABELS.RESET_PASSWORD}
              </LoadingButton>
            </Box>
          )}
        </ColumnBox>
      </Container>
    </ThemeProvider>
  );
}
