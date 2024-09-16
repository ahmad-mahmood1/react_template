import { Link as RouterLink } from 'react-router-dom';

import { Alert } from '@mui/material';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

import { CLAUSES, LABELS, routes } from 'src/common';
import ColumnBox from 'src/components/columnBox/ColumnBox';

export default function PaymentFailed() {
  return (
    <ColumnBox>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <Alert severity='error'>{LABELS.PAYMENT_FAILED}</Alert>
      </Grid>
      <Link component={RouterLink} to={routes.PRODUCTS} variant='body2'>
        {CLAUSES.VIEW_PRODUCTS}
      </Link>
    </ColumnBox>
  );
}
