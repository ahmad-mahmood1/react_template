import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { api } from 'src/apis/api.ts';
import { routes } from 'src/common';
import { logOut } from 'src/redux/reducers/authSlice.ts';
import { clearCart } from 'src/redux/reducers/cartSlice.ts';

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return () => {
    dispatch(api.util.resetApiState());
    dispatch(clearCart());
    dispatch(logOut());
    navigate(routes.LOGIN);
  };
};
