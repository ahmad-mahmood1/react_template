import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoadingButton } from '@mui/lab';
import Alert from '@mui/material/Alert';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useRefundMutation } from 'src/apis/paymentApi.ts';
import { CLAUSES, LABELS, routes, utils } from 'src/common';
import { PAYMENTS, STATUS } from 'src/common/constants.ts';
import ColumnBox from 'src/components/columnBox/ColumnBox.tsx';
import StyledCard from 'src/components/styledCard/StyledCard.ts';
import { Invoice, Refund, RequestRefund } from 'src/interfaces/invoice.ts';

interface InvoiceCardProps {
  invoice: Invoice;
  isDetailed?: boolean;
  refundInfo?: Refund | null;
  isClickable?: boolean;
}

const InvoiceCard = ({
  invoice,
  isDetailed = false,
  refundInfo = null,
  isClickable = true,
}: InvoiceCardProps) => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [backendError, setBackendError] = useState('');
  const [refund, { isLoading }] = useRefundMutation();
  const {
    id,
    status,
    line_items: lineItems,
    amount,
    created_at: createdAt,
    payment_processor: processor,
    payment_id: paymentId,
    mode,
    is_refundable: isRefundable,
  } = invoice;

  const refundSubscription = async () => {
    const refundData: RequestRefund = {
      invoice_id: id,
      processor_name: PAYMENTS.STRIPE,
    };

    try {
      await refund(refundData).unwrap();
      setSuccessMessage(CLAUSES.REFUND_SUCCESSFUL);
    } catch (error: any) {
      setBackendError(utils.getErrorString(error));
    }
  };

  return (
    <>
      <Grid item xs={12}>
        {backendError && <Alert severity='error'>{backendError}</Alert>}
        {successMessage && <Alert severity='success'>{successMessage}</Alert>}
      </Grid>
      <StyledCard sx={{ my: 1.5 }}>
        <CardActionArea disabled={!isClickable} onClick={() => navigate(routes.INVOICE(id))}>
          <CardContent>
            <Stack marginBottom={2} justifyContent='space-between' direction='row'>
              <Typography variant='body2'>
                {utils.convertUtcToLocalTime(refundInfo?.created_at || createdAt)}
              </Typography>
              <Stack direction='row' gap={1}>
                {refundInfo && refundInfo.status === STATUS.SUCCEEDED ? (
                  <Chip label={LABELS.REFUNDED} color='error' variant='outlined' />
                ) : (
                  <Chip label={status} color='success' variant='outlined' />
                )}
                {mode.toLowerCase() === PAYMENTS.SUBSCRIPTION.toLowerCase() && (
                  <Chip label={mode} color='info' variant='outlined' />
                )}
              </Stack>
            </Stack>
            {isDetailed && (
              <Stack marginBottom={2} justifyContent='space-between' direction='row'>
                <Chip label={`${processor} - ${paymentId}`} />
              </Stack>
            )}
            {lineItems.map((item, index) => (
              <Grid key={index}>
                <Stack direction='row' justifyContent='space-between' marginY={1}>
                  <Typography variant='body1' width='20rem'>
                    {item.name}
                  </Typography>
                  <Typography variant='body2'>
                    ${item.price} x {item.quantity}
                  </Typography>
                </Stack>
                <Divider />
              </Grid>
            ))}
            <Typography
              variant='body2'
              marginLeft='auto'
              textAlign='right'
              mt={2}
              fontWeight='bold'
            >
              ${amount}
            </Typography>
          </CardContent>
        </CardActionArea>
        {isDetailed && isRefundable && (
          <ColumnBox sx={{ mb: 2 }}>
            <LoadingButton
              variant={'outlined'}
              color='error'
              onClick={refundSubscription}
              loading={isLoading}
              component='span'
            >
              {LABELS.REFUND}
            </LoadingButton>
          </ColumnBox>
        )}
      </StyledCard>
    </>
  );
};

export default InvoiceCard;
