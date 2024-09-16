import { styled } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: '999px',
  backdropFilter: 'blur(24px)',
  maxHeight: 40,
  border: '1px solid',
});

export default StyledToolbar;
