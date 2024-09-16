import { ListItem, ListItemText } from '@mui/material';

import { Module } from 'src/interfaces/package.ts';

interface ModuleItemProps {
  module: Module;
}

const ModuleItem = ({ module }: ModuleItemProps) => {
  const { name, description } = module;

  return (
    <ListItem sx={{ py: 0 }}>
      <ListItemText primary={name} secondary={description} />
    </ListItem>
  );
};

export default ModuleItem;
