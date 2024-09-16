import { useState } from 'react';
import { useSelector } from 'react-redux';

import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Dialog, DialogActions, DialogContent } from '@mui/material';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { useProductsCheckoutMutation } from 'src/apis/paymentApi.ts';
import { CLAUSES, LABELS, utils } from 'src/common';
import { PAYMENTS } from 'src/common/constants.ts';
import CartItem from 'src/components/cartModal/components/CartItem.tsx';
import { Checkout, CheckoutItem } from 'src/interfaces/cart.ts';
import { selectCart } from 'src/redux/reducers/cartSlice.ts';

interface CartModalProps {
  open: boolean;
  onClose: () => void;
}

const CartModal = ({ open, onClose }: CartModalProps) => {
  const [backendError, setBackendError] = useState('');
  const cart = useSelector(selectCart);
  const [checkout, { isLoading }] = useProductsCheckoutMutation();

  const cartCheckout = async () => {
    const checkoutItems: CheckoutItem[] = cart.map((item) => ({ id: item.product.id, quantity: item.quantity }));
    const checkoutData: Checkout = {
      products_data: checkoutItems,
      mode: PAYMENTS.PAYMENT,
      processor_name: PAYMENTS.STRIPE,
    };

    try {
      const response = await checkout(checkoutData).unwrap();
      window.location.replace(response.checkout_page_url);
    } catch (error: any) {
      setBackendError(utils.getErrorString(error));
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll={'paper'}
    >
      <DialogTitle>{LABELS.CART}</DialogTitle>
      <DialogContent dividers={true}>
        <Grid item xs={12}>
          {backendError && (
            <Alert severity='error'>{backendError}</Alert>
          )}
        </Grid>
        {cart.length ? (
            cart.map((item) => (
              <CartItem
                key={item.product.id}
                productId={item.product.id}
                name={item.product.name}
                itemQuantity={item.quantity}
                price={item.product.price}
              />
            ))) :
          <Typography>
            {CLAUSES.CART_EMPTY}
          </Typography>
        }
      </DialogContent>
      <DialogActions>
        {cart.length ?
          <>
            <Button onClick={onClose}>{LABELS.CANCEL}</Button>
            <LoadingButton onClick={cartCheckout} variant={'contained'}
                           loading={isLoading}>{LABELS.CHECKOUT}</LoadingButton>
          </> :
          <Button onClick={onClose}>{LABELS.OK}</Button>
        }
      </DialogActions>
    </Dialog>
  );
};

export default CartModal;
