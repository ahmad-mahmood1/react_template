import { useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import PaymentIcon from '@mui/icons-material/Payment';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Box, Grid, Radio } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useDeactivatePaymentMethodMutation } from 'src/apis/paymentApi.ts';
import { utils } from 'src/common';
import { PAYMENTS } from 'src/common/constants.ts';
import RowBox from 'src/components/rowBox/RowBox.tsx';
import StyledCard from 'src/components/styledCard/StyledCard.ts';
import { PaymentMethod as IPaymentMethod } from 'src/interfaces/payment.ts';

interface PaymentMethodProps {
  paymentMethod: IPaymentMethod;
}

const PaymentMethod = ({ paymentMethod }: PaymentMethodProps) => {
  const [backendError, setBackendError] = useState('');
  const [deactivate, { isLoading }] = useDeactivatePaymentMethodMutation();
  const deactivatePaymentMethod = async () => {
    const deactivationInfo = {
      id: paymentMethod.id,
      processor_name: PAYMENTS.STRIPE,
    };

    try {
      await deactivate(deactivationInfo).unwrap();
    } catch (error: any) {
      setBackendError(utils.getErrorString(error));
    }
  };

  return (
    <StyledCard>
      <Grid item xs={12}>
        {backendError && <Alert severity='error'>{backendError}</Alert>}
      </Grid>
      <RowBox width='400px' padding={1} justifyContent={'space-between'}>
        <Box display='flex' flexDirection='row' alignItems='center'>
          <PaymentIcon />
          <Box paddingLeft={1} display='flex' flexDirection='column'>
            <Typography>{paymentMethod.card_brand}</Typography>
            <Typography variant='caption'>•••• {paymentMethod.card_last_4_digits}</Typography>
          </Box>
        </Box>
        <Box>
          <LoadingButton
            variant='text'
            color='error'
            size='small'
            component='span'
            loading={isLoading}
            onClick={(event) => {
              event.preventDefault();
              deactivatePaymentMethod();
            }}
          >
            <DeleteIcon />
          </LoadingButton>
          <Radio size='small' value={paymentMethod.id} />
        </Box>
      </RowBox>
    </StyledCard>
  );
};
export default PaymentMethod;
