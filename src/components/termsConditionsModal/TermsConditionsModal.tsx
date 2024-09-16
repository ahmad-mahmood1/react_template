import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoadingButton from '@mui/lab/LoadingButton';
import { Alert } from '@mui/material';
import Grid from '@mui/material/Grid';

import { useAgreementsQuery, useSignAgreementsMutation } from 'src/apis/agreementsApi.ts';
import { LABELS, routes, utils } from 'src/common';
import Loading from 'src/components/loading/Loading.tsx';
import TermConditionCard from 'src/components/termsConditionsModal/components/TermConditionCard.tsx';

const TermsConditionsModal = () => {
  const navigate = useNavigate();
  const [backendError, setBackendError] = useState('');
  const { data: agreements, isLoading: isLoadingAgreements } = useAgreementsQuery();
  const [signAgreements, { isLoading }] = useSignAgreementsMutation();

  const handleAccept = async () => {
    setBackendError('');
    const agreementIds: number[] = agreements!.map((agreement) => agreement.id);

    try {
      await signAgreements(agreementIds).unwrap();
      navigate(routes.PRODUCTS);
    } catch (error: any) {
      setBackendError(utils.getErrorString(error));
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        {backendError && <Alert severity='error'>{backendError}</Alert>}
      </Grid>
      {isLoadingAgreements ? (
        <Loading />
      ) : (
        <>
          {agreements &&
            agreements.map((agreement) => (
              <TermConditionCard
                key={agreement.id}
                name={agreement.terms.name}
                details={agreement.terms.details}
              />
            ))}
        </>
      )}
      <Grid item xs={12} style={{ textAlign: 'right' }}>
        <LoadingButton onClick={handleAccept} loading={isLoading} variant='contained'>
          {LABELS.ACCEPT}
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default TermsConditionsModal;
