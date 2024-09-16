import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

import Navbar from 'src/components/navbar/Navbar.tsx';
import { useSettingsQuery } from 'src/apis/settings.ts';
import { SETTING_NAMES } from 'src/common/constants.ts';

const Layout = () => {
  const { data: settings } = useSettingsQuery();
  const theme = settings?.find((setting) => setting.name === SETTING_NAMES.THEME);

  return (
    <HelmetProvider>
      {theme && (
        <Helmet>
          <style>{`body { background-color: ${theme.value ? theme.value : 'white'}; }`}</style>
        </Helmet>
      )}
      <Navbar />
      <Outlet />
    </HelmetProvider>
  );
};

export default Layout;
