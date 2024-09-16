import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useParams } from 'react-router-dom';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, CardContent } from '@mui/material';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { useProductQuery } from 'src/apis/productApi.ts';
import { CLAUSES, routes } from 'src/common';
import CartModal from 'src/components/cartModal/CartModal.tsx';
import CenteredGrid from 'src/components/centeredGrid/CenteredGrid.tsx';
import ColumnBox from 'src/components/columnBox/ColumnBox.tsx';
import Loading from 'src/components/loading/Loading.tsx';
import QuantityCounter from 'src/components/quantityCounter/QuantityCounter.tsx';
import StyledCard from 'src/components/styledCard/StyledCard';
import { addToCart, selectCart } from 'src/redux/reducers/cartSlice.ts';

export default function Product() {
  const params = useParams();
  const id = Number(params.id);
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const cartItem = cart.find((item) => item.product.id === id);
  const [quantity, setQuantity] = useState(cartItem?.quantity || 1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data: product, isLoading } = useProductQuery(id);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        product && (
          <>
            <StyledCard sx={{ minWidth: 300, mb: 1 }}>
              <CardContent>
                <Typography variant='h5' component='div'>
                  {product.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                  {product.description}
                </Typography>
                <Typography variant='body2'>${product.price}</Typography>
                {cartItem ? (
                  <ColumnBox sx={{ mt: 2 }}>
                    <Button
                      variant='contained'
                      onClick={handleOpenDialog}
                      endIcon={<ShoppingCartIcon />}
                    >
                      View in Cart
                    </Button>
                  </ColumnBox>
                ) : (
                  <>
                    <CenteredGrid sx={{ display: 'grid', py: 2 }}>
                      <QuantityCounter quantity={quantity} onQuantityChange={setQuantity} />
                    </CenteredGrid>
                    <ColumnBox>
                      <Button
                        variant='contained'
                        onClick={() => dispatch(addToCart({ product: product, quantity }))}
                      >
                        Add to Cart
                      </Button>
                    </ColumnBox>
                  </>
                )}
              </CardContent>
              <CartModal open={dialogOpen} onClose={handleCloseDialog} />
            </StyledCard>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link component={RouterLink} to={routes.PRODUCTS} variant='body2'>
                  {CLAUSES.VIEW_PRODUCTS}
                </Link>
              </Grid>
            </Grid>
          </>
        )
      )}
    </>
  );
}
