import useFormatter from '../../shared/hooks/useFormatter';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import CoinTableCharts from './Coin Table/CoinTableCharts';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 280,
    minHeight: 150,
    border: ' 10px solid ',
    borderRadius: '15px',
    borderColor: theme.palette.primary.light,
    justifyContent: 'center',
    padding: '1em',
    '@media (max-width: 600px)': {
      root: {
        minWidth: 250,
      },
    },
  },

  logo: {
    maxnWidth: '3em',
    maxHeight: '3em',
  },
  name: {
    textTransform: 'capitalize',
    fontSize: '1.2em',
    color: theme.palette.primary.main,
  },
  symbolName: {
    textTransform: 'uppercase',
    fontSize: '1em',
    opacity: '0.6',
  },
  currentPrice: {
    fontSize: '2em',
    fontWeight: 'bold',
    marginTop: '0.3em',
    color: theme.palette.primary.main,
  },
  '@media (max-width: 600px)': {
    currentPrice: {
      fontSize: '1.7em',
    },
  },

  percentageChange: {
    marginTop: '1em',
    fontSize: '1.2em',
    fontWeight: 'bold',
  },
}));

const CoinCard = ({ coins }) => {
  const classes = useStyles();
  const [topMovest, setTopMovest] = useState([]);
  const { currencyFormatter, percentageFormatter } = useFormatter();

  // Selecting Top Movers
  useEffect(() => {
    const percentageSortedCoins = [...coins].sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    );
    const top = percentageSortedCoins.slice(0, 2);
    const low = percentageSortedCoins.slice(98, 100);
    const topAndLow = top.concat(low);
    setTopMovest(topAndLow);
  }, [coins]);
  return (
    <>
      {topMovest.map((coin) => {
        return (
          <Grid item container xs direction="column" key={coin.name}>
            <Card className={classes.root}>
              <Grid item container>
                {/*Top  */}
                <Grid item container direction="row">
                  {/**Coin logo**/}
                  <Grid item container xs={3} justify="flex-start">
                    <img
                      src={coin.image}
                      className={classes.logo}
                      alt="coinImage"
                    />
                  </Grid>
                  {/**Coin Charts**/}
                  <Grid item container xs={9} justify="flex-end">
                    <CoinTableCharts width={200} coin={coin} />
                  </Grid>
                </Grid>

                {/*Middle  */}

                <Grid item container alignItems="center" justify="flex-start">
                  <span className={classes.name}> {coin.symbol}</span>
                  &nbsp; &nbsp;
                  <span className={classes.symbolName}> {coin.symbol}</span>
                </Grid>

                {/*Bottom  */}

                <Grid container item direction="row">
                  <Grid
                    item
                    container
                    xs={7}
                    className={classes.currentPrice}
                    justify="flex-start"
                  >
                    {currencyFormatter(coin.current_price, 4)}
                  </Grid>

                  <Grid
                    item
                    container
                    xs={5}
                    justify="flex-end"
                    className={classes.percentageChange}
                    style={{
                      color:
                        coin.price_change_percentage_24h > 0 ? 'green' : 'red',
                    }}
                  >
                    {coin.price_change_percentage_24h > 0 ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <ArrowDropDownIcon />
                    )}

                    {percentageFormatter(coin.price_change_percentage_24h)}
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        );
      })}
    </>
  );
};

export default CoinCard;
