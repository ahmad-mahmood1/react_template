import { ChangeEvent, useEffect, useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import { FormControlLabel, RadioGroup } from '@mui/material';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { usePaymentMethodsQuery, useUpdatePaymentMethodMutation } from 'src/apis/paymentApi.ts';
import { CLAUSES, LABELS, utils } from 'src/common';
import { PAYMENTS } from 'src/common/constants.ts';
import Loading from 'src/components/loading/Loading.tsx';
import PaymentMethod from 'src/pages/paymentMethods/components/paymentMethod.tsx';

export default function PaymentMethods() {
  const [successMessage, setSuccessMessage] = useState('');
  const [backendError, setBackendError] = useState('');
  const { data: paymentMethods, isLoading } = usePaymentMethodsQuery();
  const [updateDefault, { isLoading: updatingPaymentMethod }] = useUpdatePaymentMethodMutation();
  const [value, setValue] = useState<number | undefined>(0);
  const [isUpdateDisabled, setIsUpdateDisabled] = useState<boolean>(true);

  const updatePaymentMethod = async () => {
    const paymentMethodInfo = {
      id: value!,
      processor_name: PAYMENTS.STRIPE,
    };

    try {
      await updateDefault(paymentMethodInfo).unwrap();
      setSuccessMessage(CLAUSES.PAYMENT_METHOD_UPDATED);
    } catch (error: any) {
      setBackendError(utils.getErrorString(error));
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
    setIsUpdateDisabled(false);
  };

  useEffect(() => {
    if (paymentMethods) {
      const selectedPaymentMethod = paymentMethods.find(
        (paymentMethod) => paymentMethod.is_default,
      );
      setValue(selectedPaymentMethod?.id);
    }
  }, [paymentMethods]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Grid item xs={12} marginBottom={1}>
        {backendError && <Alert severity='error'>{backendError}</Alert>}
        {successMessage && <Alert severity='success'>{successMessage}</Alert>}
      </Grid>
      {paymentMethods && paymentMethods.length ? (
        <>
          <RadioGroup value={value} onChange={handleChange}>
            {paymentMethods.map((paymentMethod) => (
              <Grid key={paymentMethod.id} marginBottom={1}>
                <FormControlLabel
                  value={paymentMethod.id}
                  control={<PaymentMethod key={paymentMethod.id} paymentMethod={paymentMethod} />}
                  label={null}
                  sx={{ margin: '0' }}
                />
              </Grid>
            ))}
          </RadioGroup>
          <Grid item xs={12} style={{ textAlign: 'right' }}>
            <LoadingButton
              variant='contained'
              disabled={isUpdateDisabled}
              onClick={updatePaymentMethod}
              loading={updatingPaymentMethod}
            >
              {LABELS.UPDATE}
            </LoadingButton>
          </Grid>
        </>
      ) : (
        <Typography color='text.secondary'>{CLAUSES.NO_PAYMENT_METHODS}</Typography>
      )}
    </>
  );
}
