import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { useActivateUserQuery } from 'src/apis/authApi.ts';
import { CLAUSES, LABELS, routes, utils } from 'src/common';
import ColumnBox from 'src/components/columnBox/ColumnBox.tsx';
import Loading from 'src/components/loading/Loading.tsx';
import { usePageTitle } from 'src/hooks';

const defaultTheme = createTheme();

export default function ActivateUser() {
  const navigate = useNavigate();
  const params = useParams();
  const { uid, token } = params;
  const [successMessage, setSuccessMessage] = useState('');
  const [backendError, setBackendError] = useState('');
  const { isLoading, isError, error } = useActivateUserQuery({ uid, token });

  useEffect(() => {
    if (!isLoading) {
      if (isError) {
        setBackendError(utils.getErrorString(error));
      } else {
        setSuccessMessage(CLAUSES.ACTIVATION_SUCCESSFUL);
      }
    }
  }, [isLoading, isError, error]);

  usePageTitle(LABELS.ACTIVATE_USER);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <ColumnBox>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            {LABELS.ACTIVATE_USER}
          </Typography>
          {isLoading ? <Loading /> : (
            <>
              {successMessage ? (
                <>
                  <Grid item xs={12} sx={{ mt: 3 }}>
                    <Alert severity='success'>{successMessage}</Alert>
                  </Grid>
                  <Button
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => navigate(routes.PROFILE)}
                  >
                    {CLAUSES.VIEW_PROFILE}
                  </Button>
                </>
              ) : (
                <Grid item xs={12} sx={{ mt: 3 }}>
                  {backendError && (
                    <Alert severity='error'>{backendError}</Alert>
                  )}
                </Grid>
              )}
            </>
          )}
        </ColumnBox>
      </Container>
    </ThemeProvider>
  );
}
