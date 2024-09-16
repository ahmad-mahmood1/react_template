import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import { useSubscriptionsQuery } from 'src/apis/packageApi.ts';
import { CLAUSES } from 'src/common';
import Loading from 'src/components/loading/Loading.tsx';
import SubscriptionCard from 'src/pages/subscriptions/components/SubscriptionCard.tsx';

export default function Subscriptions() {
  const { data: subscriptions, isLoading } = useSubscriptionsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {subscriptions && subscriptions.length ? (
            subscriptions.map((subscription) => (
              <Grid key={subscription.id}>
                <SubscriptionCard
                  packageItem={subscription.package}
                  subscriptionInfo={subscription}
                />
              </Grid>
            ))
          ) : (
            <Typography color='text.secondary'>{CLAUSES.NO_SUBSCRIPTIONS}</Typography>
          )}
        </>
      )}
    </>
  );
}
