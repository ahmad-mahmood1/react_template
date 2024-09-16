import { Navigate, Outlet } from 'react-router-dom';

import { useAgreementsQuery } from 'src/apis/agreementsApi.ts';
import { routes } from 'src/common';
import Loading from 'src/components/loading/Loading.tsx';

const RequireAgreement = () => {
  const { data: agreements, isLoading, isFetching } = useAgreementsQuery();

  return isLoading || isFetching ? (
    <Loading />
  ) : (
    <>
      {agreements && agreements.length ? <Navigate to={routes.TERMS_AND_CONDITIONS} /> : <Outlet />}
    </>
  );
};
export default RequireAgreement;
