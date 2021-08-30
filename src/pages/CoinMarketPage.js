import React from 'react';
import CoinTable from '../Components/CoinMarket Components/Coin Table/CoinTable';
import { makeStyles } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({}));

export default function CoinMarketPage() {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item container>
        <CoinTable />
      </Grid>
    </Grid>
  );
}
