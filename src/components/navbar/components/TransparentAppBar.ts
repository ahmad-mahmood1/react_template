import { styled } from '@mui/material';
import AppBar from '@mui/material/AppBar';

const TransparentAppBar = styled(AppBar)({
  backgroundColor: 'transparent',
  backgroundImage: 'none',
  marginTop: 16,
  boxShadow: 'none',
});

export default TransparentAppBar;
