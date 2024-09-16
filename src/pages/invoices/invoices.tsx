import { SyntheticEvent, useState } from 'react';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Grid, Tab } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useInvoicesQuery } from 'src/apis/paymentApi.ts';
import { CLAUSES, LABELS } from 'src/common';
import { PAYMENTS } from 'src/common/constants.ts';
import Loading from 'src/components/loading/Loading.tsx';
import InvoiceCard from 'src/pages/invoices/components/invoiceCard.tsx';

export default function Invoices() {
  const [value, setValue] = useState('1');
  const { data: invoices, isLoading } = useInvoicesQuery();

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    event.preventDefault();
    setValue(newValue);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      {invoices && invoices.length ? (
        <TabContext value={value}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <TabList onChange={handleChange}>
              <Tab label={LABELS.ORDERS} value='1' />
              <Tab label={LABELS.SUBSCRIPTIONS} value='2' />
            </TabList>
          </Box>
          <TabPanel value='1'>
            {invoices
              .filter((invoice) => invoice.mode.toLowerCase() === PAYMENTS.PAYMENT)
              .map((invoice) => (
                <Grid key={invoice.id}>
                  <InvoiceCard invoice={invoice} />
                </Grid>
              ))}
          </TabPanel>
          <TabPanel value='2'>
            {invoices
              .filter((invoice) => invoice.mode.toLowerCase() === PAYMENTS.SUBSCRIPTION)
              .map((invoice) => (
                <Grid key={invoice.id}>
                  <InvoiceCard invoice={invoice} />
                </Grid>
              ))}
          </TabPanel>
        </TabContext>
      ) : (
        <Typography color='text.secondary'>{CLAUSES.NO_INVOICES}</Typography>
      )}
    </>
  );
}
