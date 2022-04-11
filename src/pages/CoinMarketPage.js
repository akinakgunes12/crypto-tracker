import React from 'react';
import CoinTable from '../Components/CoinMarket Components/Coin Table/CoinTable';
import { Grid } from '@material-ui/core';

export default function CoinMarketPage() {
  return (
    <Grid container>
      <Grid item container>
        <CoinTable />
      </Grid>
    </Grid>
  );
}
