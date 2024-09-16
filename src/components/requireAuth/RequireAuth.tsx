import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { routes } from 'src/common';
import { selectCurrentUser } from 'src/redux/reducers/authSlice.ts';

const RequireAuth = () => {
  const user = useSelector(selectCurrentUser);

  return (
    user ? <Outlet /> : <Navigate to={routes.LOGIN} />
  );
};
export default RequireAuth;
