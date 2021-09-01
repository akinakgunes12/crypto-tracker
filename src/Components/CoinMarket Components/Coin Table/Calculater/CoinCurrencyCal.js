import React, { useState, useEffect } from 'react';
import CalculaterTab from './CalculaterTab';
import useFormatter from '../../../../shared/hooks/useFormatter';
import openExchangeApi from '../../../../shared/apis/openExchangeApi';

import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import ExposureIcon from '@material-ui/icons/Exposure';

const useStyles = makeStyles((theme) => ({
  popoverPaper: {
    backgroundColor: theme.palette.common.blue3,
    borderRadius: '2em',
    border: '0.5em solid ',
    borderColor: theme.palette.primary.light,
  },
  mainCalGrid: {
    marginTop: '1.5em',
  },
  input1: {
    width: '11.4em',
    fontSize: '1.2em',
    padding: '0.7em',
    backgroundColor: theme.palette.common.blue2,
    color: theme.palette.secondary.main,
    borderRadius: '1.5em',
    outline: 'none',
    marginBottom: '1em',
  },
  inputText: {
    width: '8.4em',
    height: '1.4em',
    fontSize: '1.4em',
    backgroundColor: theme.palette.common.blue2,
    color: theme.palette.secondary.main,
    margin: '0.1em 0.5em 1em 0.5em',
    borderRadius: '1.5em',
    outline: 'none',
    padding: '0.4em 0.4em 0.4em 1em',
  },
  inputTotalAmount: {
    width: '8.4em',
    height: '1.4em',
    fontSize: '1.4em',
    backgroundColor: theme.palette.common.blue4,
    color: theme.palette.secondary.main,
    margin: '0.1em 0.5em 0.5em 0.5em',
    borderRadius: '1.5em',
    outline: 'none',
    padding: '0.4em 0.4em 0.4em 1em',
  },
  inputUpText: {
    color: theme.palette.common.white,
  },
  optionText: {
    fontSize: '0.7em',
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.common.blue2,
    maxHeight: '3em',
  },
  inputsOptionGrid: {
    marginBottom: '1.5em',
  },
}));

const CoinCurrencyCal = ({ coins }) => {
  const classes = useStyles();
  const { currencyFormatter, numberFormatter } = useFormatter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [input1CoinPrice, setInput1CoinPrice] = useState('');
  const [input2CoinPrice, setInput2CoinPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [tabValue, setTabValue] = React.useState(0);
  const [namesOfCurrencies, setNamesOfCurrencies] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('AED');
  const [calcResult, setCalcResult] = useState('');
  const [coinSelected1, setCoinSelected1] = useState('');

  // Handle Events
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // selectedcoin1
  useEffect(() => {
    const selected1 = coins.filter(
      (coin) => coin.current_price == input1CoinPrice
    );
    console.log(selected1);

    setCoinSelected1(selected1);
  }, [input1CoinPrice]);

  // Calculater Logic
  useEffect(() => {
    let result;
    if (tabValue === 0) {
      result =
        (input1CoinPrice * quantity) /
          (input2CoinPrice === '' ? 1 : input2CoinPrice) ===
        0
          ? ''
          : (input1CoinPrice * quantity) /
            (input2CoinPrice === '' ? 1 : input2CoinPrice);
    } else {
      result =
        input1CoinPrice *
          quantity *
          (currencies[selectedCurrency] === ''
            ? 1
            : currencies[selectedCurrency]) ===
        0
          ? ''
          : input1CoinPrice *
            quantity *
            (currencies[selectedCurrency] === ''
              ? 1
              : currencies[selectedCurrency]);
    }

    console.log(currencies[selectedCurrency]);

    setCalcResult(result);
  }, [
    tabValue,
    currencies,
    input1CoinPrice,
    input2CoinPrice,
    quantity,
    selectedCurrency,
  ]);
  console.log(currencies);
  //data fetch
  useEffect(() => {
    const response = async () => {
      const prices = await openExchangeApi.get('/latest.json');
      const names = await openExchangeApi.get('/currencies.json');

      setCurrencies(prices.data.rates);
      setNamesOfCurrencies(names.data);

      console.log(names.data);
    };

    response();
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className={classes.main}>
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <ExposureIcon />
        &nbsp; Calculater
      </Button>
      <Popover
        classes={{ paper: classes.popoverPaper }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'left',
          horizontal: 'right',
        }}
      >
        <CalculaterTab value={tabValue} setValue={setTabValue} />
        <Grid container direction="column" className={classes.mainCalGrid}>
          {/*inputs options */}
          <Grid
            container
            direction="row"
            justify="center"
            className={classes.inputsOptionGrid}
          >
            {/*input1  */}
            <Grid
              item
              container
              direction="column"
              justify="center"
              alignItems="center"
              xs
            >
              <Typography align="center" className={classes.inputUpText}>
                Choose a coin
              </Typography>
              <select
                className={classes.input1}
                onChange={(e) => setInput1CoinPrice(e.target.value)}
                value={input1CoinPrice}
              >
                <option value="" className={classes.optionText}>
                  {' '}
                </option>
                {coins.map((coin) => {
                  return (
                    <>
                      <option
                        value={coin.current_price}
                        className={classes.optionText}
                      >
                        {coin.name}
                      </option>
                    </>
                  );
                })}
              </select>
            </Grid>
            {/*input2  */}
            {tabValue === 0 ? (
              <Grid
                item
                container
                direction="column"
                justify="center"
                alignItems="center"
                xs
              >
                <Typography align="center" className={classes.inputUpText}>
                  Choose a coin
                </Typography>

                <select
                  className={classes.input1}
                  onChange={(e) => setInput2CoinPrice(e.target.value)}
                  value={input2CoinPrice}
                >
                  <option value="" className={classes.optionText}></option>
                  {coins.map((coin) => {
                    return (
                      <>
                        <option
                          value={coin.current_price}
                          className={classes.optionText}
                        >
                          {coin.name}
                        </option>
                      </>
                    );
                  })}
                </select>
              </Grid>
            ) : (
              <Grid
                item
                container
                direction="column"
                justify="center"
                alignItems="center"
                xs
              >
                <Typography align="center" className={classes.inputUpText}>
                  Choose a currency
                </Typography>

                <select
                  onChange={(e) => setSelectedCurrency(e.target.value)}
                  className={classes.input1}
                >
                  <option value="" className={classes.optionText}></option>
                  {Object.entries(namesOfCurrencies).map((currency) => {
                    return (
                      <>
                        <option
                          value={currency[0]}
                          className={classes.optionText}
                        >
                          {`${currency[1]}  (${currency[0]})`}
                        </option>
                      </>
                    );
                  })}
                </select>
              </Grid>
            )}
          </Grid>
          {/*inputText  */}
          <Grid container direction="row" justify="center">
            <Grid item>
              <Typography align="center" className={classes.inputUpText}>
                Enter a quantity
              </Typography>

              <input
                className={classes.inputText}
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Typography align="center" className={classes.inputUpText}>
                Total amount
              </Typography>

              <input
                className={classes.inputTotalAmount}
                type="text"
                readOnly
                value={
                  tabValue === 1
                    ? currencyFormatter(calcResult, 4, selectedCurrency)
                    : numberFormatter(calcResult, 4)
                }
              />
            </Grid>
          </Grid>
          {input1CoinPrice && (
            <Typography align="center" className={classes.inputUpText}>
              1 {coinSelected1[0]?.name} = {input1CoinPrice} $
            </Typography>
          )}
        </Grid>
      </Popover>
    </div>
  );
};

export default CoinCurrencyCal;
