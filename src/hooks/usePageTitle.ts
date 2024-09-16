import { useEffect } from 'react';

import { LABELS } from 'src/common';

export const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = `${LABELS.APP} - ${title}`;

    return () => {
      document.title = `${LABELS.APP}`;
    };
  }, [title]);
};
