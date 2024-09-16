import { useState } from 'react';
import { useSelector } from 'react-redux';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, IconButton } from '@mui/material';

import CartModal from 'src/components/cartModal/CartModal.tsx';
import { selectCart } from 'src/redux/reducers/cartSlice.ts';

const CartButton = () => {
  const cart = useSelector(selectCart);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleOpenDialog}>
        <Badge badgeContent={cart.length}>
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <CartModal open={dialogOpen} onClose={handleCloseDialog} />
    </>
  );
};

export default CartButton;
