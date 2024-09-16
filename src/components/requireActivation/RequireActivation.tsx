import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { routes } from 'src/common';
import { selectUserIsActive } from 'src/redux/reducers/authSlice.ts';

const RequireActivation = () => {
  const isUserActivated = useSelector(selectUserIsActive);

  return (
    isUserActivated ? <Outlet /> : <Navigate to={routes.VERIFY} />
  );
};
export default RequireActivation;
