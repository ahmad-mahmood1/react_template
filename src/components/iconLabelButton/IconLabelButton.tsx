import { ReactNode } from 'react';

import { IconButton, Typography } from '@mui/material';

interface IconLabelButtonProps {
  onClick: () => void;
  icon: ReactNode;
  label: string;
}

const IconLabelButton = ({ onClick, icon, label }: IconLabelButtonProps) => {
  return (
    <IconButton onClick={onClick}>
      {icon}
      <Typography variant='body2' marginLeft={0.5}>
        {label}
      </Typography>
    </IconButton>
  );
};

export default IconLabelButton;
