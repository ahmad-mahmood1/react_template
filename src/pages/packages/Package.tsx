import { useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';

import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, CardContent, List, ListSubheader } from '@mui/material';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { usePackageQuery, useSubscribeMutation } from 'src/apis/packageApi.ts';
import { CLAUSES, LABELS, routes, utils } from 'src/common';
import { PAYMENTS } from 'src/common/constants.ts';
import ColumnBox from 'src/components/columnBox/ColumnBox.tsx';
import Loading from 'src/components/loading/Loading.tsx';
import StyledCard from 'src/components/styledCard/StyledCard';
import { Subscribe } from 'src/interfaces/package.ts';
import ModuleItem from 'src/pages/packages/components/ModuleItem.tsx';

export default function Package() {
  const params = useParams();
  const id = Number(params.id);
  const [backendError, setBackendError] = useState('');
  const { data: packageItem, isLoading } = usePackageQuery(id);
  const [subscribe, { isLoading: checkoutLoading }] = useSubscribeMutation();

  const subscribePackage = async () => {
    const subscriptionData: Subscribe = {
      package_id: id,
      mode: PAYMENTS.SUBSCRIPTION,
      processor_name: PAYMENTS.STRIPE,
    };

    try {
      const response = await subscribe(subscriptionData).unwrap();
      window.location.replace(response.checkout_page_url);
    } catch (error: any) {
      setBackendError(utils.getErrorString(error));
    }
  };

  return (
    <>
      <Grid item xs={12}>
        {backendError && <Alert severity='error'>{backendError}</Alert>}
      </Grid>
      {isLoading ? (
        <Loading />
      ) : (
        packageItem && (
          <>
            <StyledCard sx={{ minWidth: 300, mb: 1 }}>
              <CardContent>
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
                    <ListSubheader sx={{ bgcolor: 'transparent' }}>
                      {CLAUSES.WILL_HAVE_ACCESS_TO}
                    </ListSubheader>
                  }
                >
                  {packageItem.modules.map((module) => (
                    <ModuleItem key={module.id} module={module} />
                  ))}
                </List>
                <ColumnBox sx={{ mt: 2 }}>
                  <LoadingButton
                    variant={'contained'}
                    loading={checkoutLoading}
                    onClick={subscribePackage}
                  >
                    {LABELS.SUBSCRIBE}
                  </LoadingButton>
                </ColumnBox>
              </CardContent>
            </StyledCard>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link component={RouterLink} to={routes.PACKAGES} variant='body2'>
                  {CLAUSES.VIEW_PACKAGES}
                </Link>
              </Grid>
            </Grid>
          </>
        )
      )}
    </>
  );
}
