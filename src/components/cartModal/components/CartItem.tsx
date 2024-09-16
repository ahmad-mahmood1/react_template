import { useState } from 'react';
import { useDispatch } from 'react-redux';

import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';

import QuantityCounter from 'src/components/quantityCounter/QuantityCounter.tsx';
import RowBox from 'src/components/rowBox/RowBox';
import StyledCard from 'src/components/styledCard/StyledCard.ts';
import { removeItem, updateQuantity } from 'src/redux/reducers/cartSlice.ts';

interface CartItemProps {
  productId: number;
  name: string;
  itemQuantity: number;
  price: number;
}

const CartItem = ({ productId, name, itemQuantity, price }: CartItemProps) => {
  const [quantity, setQuantity] = useState(itemQuantity || 1);
  const dispatch = useDispatch();

  const handleQuantityChange = (updatedQuantity: number) => {
    setQuantity(updatedQuantity);
    dispatch(updateQuantity({ productId, quantity: updatedQuantity }));
  };

  return (
    <StyledCard sx={{ my: 1 }}>
      <RowBox sx={{ gap: 4, p: 2 }}>
        <Typography variant='body1' width={'10rem'}>
          {name}
        </Typography>
        <Box>
          <QuantityCounter quantity={quantity} onQuantityChange={handleQuantityChange} />
        </Box>
        <Typography variant='body2'>
          ${price * quantity}
        </Typography>
        <IconButton onClick={() => dispatch(removeItem({ productId }))}>
          <DeleteIcon />
        </IconButton>
      </RowBox>
    </StyledCard>
  );
};

export default CartItem;
