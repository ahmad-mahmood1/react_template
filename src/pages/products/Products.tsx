import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { useProductsQuery } from 'src/apis/productApi.ts';
import { useSettingsQuery } from 'src/apis/settings.ts';
import { CLAUSES, utils } from 'src/common';
import { SETTING_NAMES } from 'src/common/constants.ts';
import Loading from 'src/components/loading/Loading.tsx';
import ProductCard from 'src/components/productCard/ProductCard.tsx';
import ResponsiveBox from 'src/components/styled/ResponsiveBox.tsx';

export default function Products() {
  const { data: products, isLoading } = useProductsQuery();
  const { data: settings } = useSettingsQuery();
  const shopTimings = settings?.find((setting) => setting.name === SETTING_NAMES.SHOP_TIMINGS);

  if (shopTimings) {
    const [startTime, endTime] = shopTimings.value.split('-');
    if (utils.isBetweenTimeRange(startTime, endTime)) {
      return <Typography color='text.secondary'>{CLAUSES.SHOP_CLOSED}</Typography>;
    }
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ResponsiveBox>
          {products && products.length ? (
            products.map((product, index) => (
              <Grid key={index}>
                <ProductCard product={product} />
              </Grid>
            ))
          ) : (
            <Typography color='text.secondary'>{CLAUSES.NO_PRODUCTS}</Typography>
          )}
        </ResponsiveBox>
      )}
    </>
  );
}
