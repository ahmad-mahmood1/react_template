import { useParams } from 'react-router-dom';

import Typography from '@mui/material/Typography';

export default function Module() {
  const { module } = useParams();

  return (
    <Typography>{module}</Typography>
  );
}
