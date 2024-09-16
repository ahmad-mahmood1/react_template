import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { usePackagesQuery } from 'src/apis/packageApi.ts';
import { useSettingsQuery } from 'src/apis/settings.ts';
import { CLAUSES, SETTING_NAMES } from 'src/common/constants.ts';
import Loading from 'src/components/loading/Loading.tsx';
import ResponsiveBox from 'src/components/styled/ResponsiveBox.tsx';
import PackageCard from 'src/pages/packages/components/PackageCard.tsx';

export default function Packages() {
  const { data: packages, isLoading } = usePackagesQuery();
  const { data: settings } = useSettingsQuery();
  const unavailablePackages = settings?.find(
    (setting) => setting.name === SETTING_NAMES.UNAVAILABLE_PACKAGES,
  );

  let filteredPackages = packages;
  if (unavailablePackages) {
    const unavailablePackagesIds = JSON.parse(unavailablePackages.value);
    filteredPackages = packages?.filter(
      (packageItem) => !unavailablePackagesIds.includes(packageItem.id),
    );
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ResponsiveBox>
          {filteredPackages && filteredPackages.length > 0 ? (
            filteredPackages.map((packageItem, index) => (
              <Grid key={index}>
                <PackageCard packageItem={packageItem} />
              </Grid>
            ))
          ) : (
            <Typography color='text.secondary'>{CLAUSES.NO_PACKAGES}</Typography>
          )}
        </ResponsiveBox>
      )}
    </>
  );
}
