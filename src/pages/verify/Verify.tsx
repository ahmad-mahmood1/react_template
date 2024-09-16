import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, CardContent } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { skipToken } from '@reduxjs/toolkit/query';
import { useLazyResendActivationEmailQuery } from 'src/apis/authApi.ts';
import { useProfileQuery } from 'src/apis/userApi.ts';
import { CLAUSES, LABELS, routes, utils } from 'src/common';
import ColumnBox from 'src/components/columnBox/ColumnBox.tsx';
import StyledCard from 'src/components/styledCard/StyledCard.ts';
import { usePageTitle } from 'src/hooks';
import { selectCurrentUser, selectUserIsActive } from 'src/redux/reducers/authSlice.ts';

export default function Verify() {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  const isUserActive = useSelector(selectUserIsActive);
  const [successMessage, setSuccessMessage] = useState('');
  const [backendError, setBackendError] = useState('');
  const [resendEmail, { isLoading }] = useLazyResendActivationEmailQuery();
  useProfileQuery(user ? user.id : skipToken, { refetchOnFocus: true });

  const resendActivationEmail = async () => {
    setSuccessMessage('');
    setBackendError('');
    try {
      await resendEmail(user!.id).unwrap();
      setSuccessMessage(CLAUSES.EMAIL_SENT);
    } catch (error: any) {
      setBackendError(utils.getErrorString(error));
    }
  };

  usePageTitle(LABELS.VERIFY);

  return (
    isUserActive ? <Navigate to={routes.PROFILE} state={{ from: location }} replace /> :
      <StyledCard sx={{ maxWidth: 400 }}>
        <CardContent>
          <ColumnBox
            sx={{ padding: '10px' }}
          >
            <Grid item xs={12} sx={{ mt: 1 }}>
              {successMessage && (
                <Alert severity='success'>{successMessage}</Alert>
              )}
            </Grid>
            <Grid item xs={12} sx={{ mb: 1 }}>
              {backendError && (
                <Alert severity='error'>{backendError}</Alert>
              )}
            </Grid>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              {LABELS.VERIFY}
            </Typography>
            <Typography variant='body2' color='text.secondary' sx={{ pt: '10px' }}>
              {CLAUSES.RESEND_ACTIVATION_EMAIL}
            </Typography>
            <LoadingButton
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3 }}
              onClick={resendActivationEmail}
              loading={isLoading}
            >
              {LABELS.RESEND_ACTIVATION_EMAIL}
            </LoadingButton>
          </ColumnBox>
        </CardContent>
      </StyledCard>
  );
}
