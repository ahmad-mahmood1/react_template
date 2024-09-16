import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useRefundsQuery } from 'src/apis/paymentApi.ts';
import { CLAUSES } from 'src/common';
import Loading from 'src/components/loading/Loading.tsx';
import InvoiceCard from 'src/pages/invoices/components/invoiceCard.tsx';

export default function Refunds() {
  const { data: refunds, isLoading } = useRefundsQuery();

  return isLoading ? (
  <Loading />
) : (
  <>
    {refunds && refunds.length ? (
      refunds.map((refund) => (
        <Grid key={refund.id}>
          <InvoiceCard
            invoice={refund.invoice}
            refundInfo={refund}
            isDetailed={true}
            isClickable={false}
          />
        </Grid>
      ))
    ) : (
      <Typography color='text.secondary'>{CLAUSES.NO_REFUNDS}</Typography>
    )}
  </>
  );
}
