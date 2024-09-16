import { Link as RouterLink } from 'react-router-dom';

import { CardActionArea, CardContent } from '@mui/material';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { routes } from 'src/common';
import StyledCard from 'src/components/styledCard/StyledCard.ts';
import { Product } from 'src/interfaces/product.ts';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, name, description, price } = product;

  return (
    <Link component={RouterLink} to={routes.PRODUCT(id)} underline='none'>
      <StyledCard sx={{ minWidth: 275 }}>
        <CardActionArea>
          <CardContent>
            <Typography variant='h5' component='div'>
              {name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              {description}
            </Typography>
            <Typography variant='body2'>${price}</Typography>
          </CardContent>
        </CardActionArea>
      </StyledCard>
    </Link>
  );
};

export default ProductCard;
