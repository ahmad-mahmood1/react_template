import { Link as RouterLink, useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

import { useInvoiceQuery } from 'src/apis/paymentApi.ts';
import { CLAUSES, routes } from 'src/common';
import Loading from 'src/components/loading/Loading.tsx';
import InvoiceCard from 'src/pages/invoices/components/invoiceCard.tsx';

export default function Invoices() {
  const params = useParams();
  const { data: invoice, isLoading } = useInvoiceQuery(Number(params.id));

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>{invoice && <InvoiceCard invoice={invoice} isDetailed={true} isClickable={false} />}</>
      )}
      <Grid container justifyContent='flex-end'>
        <Grid item>
          <Link component={RouterLink} to={routes.INVOICES} variant='body2'>
            {CLAUSES.VIEW_INVOICES}
          </Link>
        </Grid>
      </Grid>
    </>
  );
}
