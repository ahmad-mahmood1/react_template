import { useState } from 'react';

import { DialogActions } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { LABELS } from 'src/common';
import { ProfileDialogProps } from 'src/interfaces/interfaces.ts';

const ProfileDialog = (props: ProfileDialogProps) => {
  const { open, onClose, initialFirstName, initialLastName, onUpdate } = props;
  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);

  const handleSave = () => {
    onUpdate(firstName, lastName);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoFocus
              margin='dense'
              label='First Name'
              type='text'
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin='dense'
              label='Last Name'
              type='text'
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>{LABELS.UPDATE}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileDialog;
