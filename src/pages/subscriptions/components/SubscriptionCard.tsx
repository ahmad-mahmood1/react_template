import { useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { Alert, CardContent, Chip, List, ListSubheader } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { useDeactivateSubscriptionMutation } from 'src/apis/packageApi.ts';
import { CLAUSES, LABELS, utils } from 'src/common';
import ColumnBox from 'src/components/columnBox/ColumnBox.tsx';
import RowBox from 'src/components/rowBox/RowBox.tsx';
import StyledCard from 'src/components/styledCard/StyledCard.ts';
import { DeactivateSubscription, Package, Subscription } from 'src/interfaces/package.ts';
import ModuleItem from 'src/pages/packages/components/ModuleItem.tsx';

interface SubscriptionCardProps {
  packageItem: Package;
  subscriptionInfo: Subscription;
}

const SubscriptionCard = ({ packageItem, subscriptionInfo }: SubscriptionCardProps) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [backendError, setBackendError] = useState('');
  const [deactivate, { isLoading }] = useDeactivateSubscriptionMutation();

  const deactivateSubscription = async () => {
    const deactivationData: DeactivateSubscription = {
      subscription_id: subscriptionInfo.id,
    };

    try {
      await deactivate(deactivationData).unwrap();
      setSuccessMessage(CLAUSES.SUBSCRIPTION_DEACTIVATED);
    } catch (error: any) {
      setBackendError(utils.getErrorString(error));
    }
  };

  return (
    <StyledCard sx={{ minWidth: 300, mb: 2 }}>
      <Grid item xs={12}>
        {successMessage && <Alert severity='success'>{successMessage}</Alert>}
        {backendError && <Alert severity='error'>{backendError}</Alert>}
      </Grid>
      <CardContent>
        <RowBox>
          <Typography variant='body2' component='div' marginRight={4}>
            {utils.convertUtcToLocalTime(subscriptionInfo.created_at)}
          </Typography>
          <Chip
            label={`${CLAUSES.VALID_UNTIL} ${subscriptionInfo.current_period_end}`}
            color={'info'}
          />
        </RowBox>
        <ColumnBox sx={{ my: 2 }}>
          <Chip label={`${subscriptionInfo.subscription_id}`} />
        </ColumnBox>
        <Typography variant='h5' component='div'>
          {packageItem.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {packageItem.description}
        </Typography>
        <Typography>${packageItem.price}</Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {packageItem.features}
        </Typography>
        <List
          sx={{ width: '100%', maxWidth: 360 }}
          subheader={
            <ListSubheader sx={{ bgcolor: 'transparent' }}>{CLAUSES.HAVE_ACCESS_TO}</ListSubheader>
          }
        >
          {packageItem.modules.map((module) => (
            <ModuleItem key={module.id} module={module} />
          ))}
        </List>
      </CardContent>
      {!successMessage && (
        <ColumnBox sx={{ mb: 2 }}>
          <LoadingButton
            variant={'outlined'}
            color='error'
            component='span'
            loading={isLoading}
            onClick={deactivateSubscription}
          >
            {LABELS.DEACTIVATE}
          </LoadingButton>
        </ColumnBox>
      )}
    </StyledCard>
  );
};

export default SubscriptionCard;
