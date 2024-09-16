import { Link as RouterLink } from 'react-router-dom';

import { Alert } from '@mui/material';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

import { LABELS, routes } from 'src/common';
import ColumnBox from 'src/components/columnBox/ColumnBox';

export default function PaymentSuccessful() {
  return (
    <ColumnBox>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <Alert severity='success'>{LABELS.PAYMENT_SUCCESSFUL}</Alert>
      </Grid>
      <Link component={RouterLink} to={routes.INVOICES} variant='body2'>
        {LABELS.INVOICES}
      </Link>
    </ColumnBox>
  );
}
