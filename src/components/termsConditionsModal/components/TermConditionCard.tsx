import { CardContent } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import StyledCard from 'src/components/styledCard/StyledCard.ts';
import { TermCondition } from 'src/interfaces/interfaces.ts';

const TermConditionCard = ({ name, details }: TermCondition) => {
  return (
    <StyledCard sx={{ my: 2 }}>
      <CardContent>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', padding: '10px' }}
        >
          <Typography component='h1' variant='h5'>
            {name}
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ pt: '10px' }}>
            {details}
          </Typography>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default TermConditionCard;
