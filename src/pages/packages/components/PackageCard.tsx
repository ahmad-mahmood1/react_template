import { Link as RouterLink } from 'react-router-dom';

import { CardActionArea, CardContent } from '@mui/material';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { routes } from 'src/common';
import StyledCard from 'src/components/styledCard/StyledCard.ts';
import { Package } from 'src/interfaces/package.ts';

interface PackageCardProps {
  packageItem: Package;
}

const PackageCard = ({ packageItem }: PackageCardProps) => {
  const { id, name, description, price } = packageItem;

  return (
    <Link component={RouterLink} to={routes.PACKAGE(id)} underline='none'>
      <StyledCard sx={{ width: '275px' }}>
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

export default PackageCard;
