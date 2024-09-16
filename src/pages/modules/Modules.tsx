import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { List, ListItemIcon, Stack } from '@mui/material';

import { useModulesQuery, useUserModulesQuery } from 'src/apis/packageApi.ts';
import Loading from 'src/components/loading/Loading.tsx';
import StyledCard from 'src/components/styledCard/StyledCard.ts';
import ModuleItem from 'src/pages/packages/components/ModuleItem.tsx';

export default function Modules() {
  const { data: modules, isLoading: modulesLoading } = useModulesQuery();
  const { data: userModules, isLoading: userModulesLoading } = useUserModulesQuery();

  const idExists = (id: number) => {
    return userModules && userModules.some((module) => module.id === id);
  };

  return modulesLoading || userModulesLoading ? (
    <Loading />
  ) : (
    modules && userModules && (
      <StyledCard>
        <List sx={{ width: '100%', maxWidth: 360 }}>
          {modules.map((module) => (
            <Stack display='flex' flexDirection='row' alignItems='center' gap={4} key={module.id}>
              <ModuleItem module={module} />
              {idExists(module.id) && (
                <ListItemIcon>
                  <CheckCircleOutlineIcon />
                </ListItemIcon>
              )}
            </Stack>
          ))}
        </List>
      </StyledCard>
    )
  );
}
