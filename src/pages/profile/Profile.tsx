import { useState } from 'react';
import { useSelector } from 'react-redux';

import { PersonOutline } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { Alert, Chip, IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { useProfileQuery, useUpdateUserMutation } from 'src/apis/userApi.ts';
import { LABELS, utils } from 'src/common';
import ColumnBox from 'src/components/columnBox/ColumnBox.tsx';
import Loading from 'src/components/loading/Loading.tsx';
import StyledCard from 'src/components/styledCard/StyledCard.ts';
import { usePageTitle } from 'src/hooks';
import ProfileDialog from 'src/pages/profile/components/ProfileDialog.tsx';
import { selectCurrentUser } from 'src/redux/reducers/authSlice.ts';

const Profile = () => {
  const user = useSelector(selectCurrentUser);
  const { data: profile, isLoading } = useProfileQuery(user!.id);
  const [backendError, setBackendError] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updateUser] = useUpdateUserMutation();

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleUserUpdate = async (firstName: string, lastName: string) => {
    setBackendError('');
    try {
      await updateUser({ id: user!.id, firstName, lastName }).unwrap();
    } catch (error: any) {
      setBackendError(utils.getErrorString(error));
    }
  };

  usePageTitle(LABELS.PROFILE);

  return (
    <StyledCard sx={{ minWidth: 275 }}>
      <ColumnBox
        sx={{ padding: '10px' }}
      >
        <Grid item xs={12}>
          {backendError && (
            <Alert severity='error'>{backendError}</Alert>
          )}
        </Grid>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <PersonOutline />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {LABELS.PROFILE}
        </Typography>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {profile && (
              <>
                <Chip sx={{ margin: '8px' }} label={profile.email} />
                {(profile.first_name || profile.last_name) && (
                  <Chip sx={{ margin: '8px' }} label={`${profile.first_name} ${profile.last_name}`} />
                )}
                <IconButton color='primary' onClick={handleOpenDialog}>
                  <EditIcon />
                </IconButton>
                <ProfileDialog open={dialogOpen} onClose={handleCloseDialog} initialFirstName={profile.first_name}
                               initialLastName={profile.last_name} onUpdate={handleUserUpdate} />
              </>
            )}
          </>
        )}
      </ColumnBox>
    </StyledCard>
  );
};

export default Profile;
