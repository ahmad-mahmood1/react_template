import { useEffect, useState } from 'react';

import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import { FormControl, InputLabel, MenuItem, Stack } from '@mui/material';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import { useSettingsQuery, useUpdateSettingMutation } from 'src/apis/settings.ts';
import { utils } from 'src/common';
import { CLAUSES, SETTING_NAMES } from 'src/common/constants.ts';
import RowBox from 'src/components/rowBox/RowBox.tsx';
import StyledCard from 'src/components/styledCard/StyledCard.ts';

const ThemeSetting = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [backendError, setBackendError] = useState('');
  const [theme, setTheme] = useState('White');
  const [update] = useUpdateSettingMutation();
  const { data: settings } = useSettingsQuery();
  const themeColor = settings?.find((setting) => setting.name === SETTING_NAMES.THEME);

  const handleChange = async (event: SelectChangeEvent) => {
    setTheme(event.target.value as string);

    if (themeColor) {
      try {
        await update({ settingId: themeColor.id, value: event.target.value }).unwrap();
        setSuccessMessage(CLAUSES.THEME_UPDATED);
      } catch (error: any) {
        setBackendError(utils.getErrorString(error));
      }
    }
  };

  useEffect(() => {
    themeColor && setTheme(themeColor.value);
  }, [themeColor]);

  return (
    <StyledCard>
      <Grid item xs={12} marginBottom={1}>
        {backendError && <Alert severity='error'>{backendError}</Alert>}
        {successMessage && <Alert severity='success'>{successMessage}</Alert>}
      </Grid>
      <RowBox width='400px' padding={2} justifyContent={'space-between'}>
        <Stack direction='row' gap={2}>
          <FormatPaintIcon />
          <Typography>Theme</Typography>
        </Stack>
        <FormControl sx={{ width: 200 }}>
          <InputLabel>Theme</InputLabel>
          <Select label='Theme' onChange={handleChange} size='small' value={theme}>
            <MenuItem value='White'>White</MenuItem>
            <MenuItem value='AliceBlue'>Alice Blue</MenuItem>
            <MenuItem value='Tan'>Tan</MenuItem>
            <MenuItem value='AntiqueWhite'>Antique White</MenuItem>
          </Select>
        </FormControl>
      </RowBox>
    </StyledCard>
  );
};

export default ThemeSetting;
