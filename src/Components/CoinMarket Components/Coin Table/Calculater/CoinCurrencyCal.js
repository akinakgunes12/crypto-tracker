import React, { useState, useEffect } from 'react';
import CalculaterTab from './CalculaterTab';
import useFormatter from '../../../../shared/hooks/useFormatter';

import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import ExposureIcon from '@material-ui/icons/Exposure';
import axios from 'axios';

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
    width: '9.2em',
    height: '1.6em',
    fontSize: '1.5em',
    backgroundColor: theme.palette.common.blue2,
    color: theme.palette.secondary.main,
    borderRadius: '1.5em',
    outline: 'none',
  },
  inputText: {
    width: '9em',
    height: '1.4em',
    fontSize: '1.5em',
    backgroundColor: theme.palette.common.blue2,
    color: theme.palette.secondary.main,
    margin: '0.1em 1em 1em 1em',
    borderRadius: '1.5em',
    outline: 'none',
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
  const { currencyFormatter, numberFourFormatter } = useFormatter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [input1CoinPrice, setInput1CoinPrice] = useState('');
  const [input2CoinPrice, setInput2CoinPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [tabValue, setTabValue] = React.useState(0);
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('AED');
  const [calcResult, setCalcResult] = useState('');

  // Handle Events
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
        (input1CoinPrice * quantity) /
          (currencies[selectedCurrency] === ''
            ? 1
            : currencies[selectedCurrency]) ===
        0
          ? ''
          : (input1CoinPrice * quantity) /
            (currencies[selectedCurrency] === ''
              ? 1
              : currencies[selectedCurrency]);
    }

    console.log(selectedCurrency);

    setCalcResult(result);
  }, [
    tabValue,
    currencies,
    input1CoinPrice,
    input2CoinPrice,
    quantity,
    selectedCurrency,
  ]);
  //data fetch
  useEffect(() => {
    const currencyData = async () => {
      const { data } = await axios.get(
        'http://data.fixer.io/api/latest?access_key=ece8096d24111741707772226f79c9b8',
        {}
      );
      setCurrencies(data.rates);
    };
    currencyData();
  }, [setCurrencies]);

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
                  {Object.keys(currencies).map((currency) => {
                    return (
                      <>
                        <option value={currency} className={classes.optionText}>
                          {currency}
                        </option>
                      </>
                    );
                  })}
                </select>
              </Grid>
            )}
          </Grid>
          {/*inputText  */}
          <Grid container direction="row">
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
                className={classes.inputText}
                type="number"
                readOnly
                value={calcResult}
              />
            </Grid>
          </Grid>
        </Grid>
      </Popover>
    </div>
  );
};

export default CoinCurrencyCal;
