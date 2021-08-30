import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useFormatter from '../../../shared/hooks/useFormatter';
import AppBarCoins from '../AppBarCoins';
import CoinTableCharts from './CoinTableCharts';
import CoinCard from '../CoinCard';

import {
  Grid,
  TableBody,
  TableHead,
  TableRow,
  Typography,
  TableContainer,
  TableCell,
  Table,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import Pagination from '@material-ui/lab/Pagination';
import LinearProgress from '@material-ui/core/LinearProgress';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { IconButton } from '@material-ui/core';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 12,
    borderRadius: 5,
  },
}))(LinearProgress);

const useStyles = makeStyles((theme) => ({
  containerTable: {
    paddingLeft: '3em',
    paddingRight: '3em',
  },
  table: {
    backgroundColor: 'white',
    border: '6px solid ',
    borderColor: theme.palette.primary.light,
    paddingRight: '3em',
  },
  coinImage: {
    maxWidth: '2em',
    maxHeight: '2em',
    marginLeft: '3em',
    marginRight: '5em',
  },
  bookMarker: {
    marginLeft: '2em',
  },
  paginationGrid: {
    marginBottom: '2em',
  },
  paginationUl: {
    color: 'white',
    padding: '1em',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderLeft: '0.4em solid',
    borderRight: '0.4em solid',
    borderBottom: '0.4em solid',
    borderLeftColor: theme.palette.primary.light,
    borderRightColor: theme.palette.primary.light,
    borderBottomColor: theme.palette.primary.light,
  },
  iconButton: {
    height: '1em',
    width: '1em',
  },
}));

const CoinTable = () => {
  const classes = useStyles();
  const [favoriteList, setFavoriteList] = useState([]);
  const [coins, setCoins] = useState([]);
  const [renderList, setRenderList] = useState([]);
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState('MarketCapAsc');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchedList, setSearchedList] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [favoriteCheck, setFavoriteCheck] = useState(false);
  const { currencyFormatter, percentageFormatter, numberFormatter } =
    useFormatter();

  // Data Fetching
  useEffect(() => {
    const coinData = async () => {
      const { data } = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
          params: {
            vs_currency: 'usd',
            per_page: 100,
            page: 1,
            sparkline: true,
          },
        }
      );
      setCoins(data);
    };
    coinData();
  }, []);

  //Search Logic
  useEffect(() => {
    const searchResult = coins.filter((coin) => {
      return coin.name.toLowerCase().includes(searchTerm.toLowerCase()); // true & false
    });
    setSearchedList(searchResult);
  }, [searchTerm, coins]);

  // Sorting Logic
  useEffect(() => {
    let sorted;
    switch (sortType) {
      case 'priceAsc':
        sorted = [...coins].sort((a, b) => b.current_price - a.current_price);
        break;
      case 'priceDesc':
        sorted = [...coins].sort((a, b) => a.current_price - b.current_price);
        break;

      case '24hAsc':
        sorted = [...coins].sort(
          (a, b) =>
            b.price_change_percentage_24h - a.price_change_percentage_24h
        );
        break;
      case '24hDesc':
        sorted = [...coins].sort(
          (a, b) =>
            a.price_change_percentage_24h - b.price_change_percentage_24h
        );
        break;

      case 'MarketCapAsc':
        sorted = [...coins].sort((a, b) => b.market_cap - a.market_cap);
        break;
      case 'MarketCapDesc':
        sorted = [...coins].sort((a, b) => a.market_cap - b.market_cap);
        break;

      case 'VolumeAsc':
        sorted = [...coins].sort((a, b) => b.total_volume - a.total_volume);
        break;
      case 'VolumeDesc':
        sorted = [...coins].sort((a, b) => a.total_volume - b.total_volume);
        break;

      case 'CirculatingSupplyAsc':
        sorted = [...coins].sort(
          (a, b) => b.circulating_supply - a.circulating_supply
        );
        break;
      case 'CirculatingSupplyDesc':
        sorted = [...coins].sort(
          (a, b) => a.circulating_supply - b.circulating_supply
        );
        break;

      default:
        break;
    }
    setRenderList(sorted);
  }, [sortType, coins]);

  // Render Logic
  useEffect(() => {
    // Case: searched with results
    if (searchTerm && searchedList.length > 0) {
      setRenderList(searchedList);
      setPage(1);
    }

    // Case : no search term
    if (!searchTerm) {
      setRenderList(coins);
    }

    // Case : searched with no results
    if (searchTerm && searchedList.length === 0) {
      setFeedbackMessage('No coins found');
      setRenderList([]);
    }

    // Case : favorite check
    if (favoriteCheck) {
      setRenderList(favoriteList);
      setPage(1);
    }

    // Case : favorite check and search with result
    if (favoriteCheck && searchTerm && searchedList.length > 0) {
      const searchResult1 = favoriteList.filter((coin) => {
        return coin.name.toLowerCase().includes(searchTerm.toLowerCase()); // true & false
      });
      setRenderList(searchResult1);
    }

    // Case :favorite search with no result

    if (searchTerm && searchedList.length === 0) {
      setFeedbackMessage('Favorite coin not found');
      setRenderList([]);
    }
  }, [searchTerm, searchedList, coins, favoriteCheck, favoriteList]);

  //Dom handlers
  const handlerPage = (e, newValue) => {
    setPage(newValue);
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };
  const toogleSort = (a, b) => {
    sortType === a ? setSortType(b) : setSortType(a);
  };
  const favoriteHandler = (coin) => {
    // 1 check the dublicates : returns boolean
    const isInclude = favoriteList.some((c) => c.name === coin.name);

    // 2 case :new coin
    if (!isInclude) {
      setFavoriteList([...favoriteList, coin]);
    }

    // 3 case : dublicate coin
    if (isInclude) {
      const newList = favoriteList.filter((c) => c.name !== coin.name);
      setFavoriteList(newList);
    }
  };

  // Page Counter Logic
  const pageCounter = () => {
    return renderList ? Math.ceil(renderList.length / 10) : 10;
  };

  return (
    <>
      {/* Cards */}
      <Grid
        item
        container
        spacing={2}
        style={{ paddingLeft: '3em', paddingRight: '3em' }}
      >
        <CoinCard coins={coins} />
      </Grid>
      <AppBarCoins
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setFavoriteCheck={setFavoriteCheck}
        coins={coins}
      />

      <TableContainer className={classes.containerTable}>
        {/* Table */}
        <Table
          className={classes.table}
          classes={{ root: classes.tableRoot }}
          aria-label="simple table"
        >
          {/** / Headlines **/}
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                onClick={() => {
                  toogleSort('MarketCapAsc', 'MarketCapDesc');
                }}
              >
                RANK BY MARKET CAP
              </TableCell>
              <TableCell
                align="center"
                onClick={() => {
                  toogleSort('priceAsc', 'priceDesc');
                }}
              >
                PRICE
              </TableCell>
              <TableCell
                align="center"
                onClick={() => {
                  toogleSort('24hAsc', '24hDesc');
                }}
              >
                24H
              </TableCell>
              <TableCell
                align="center"
                onClick={() => {
                  toogleSort('MarketCapAsc', 'MarketCapDesc');
                }}
              >
                MARKET CAP
              </TableCell>
              <TableCell
                align="center"
                onClick={() => {
                  toogleSort('VolumeAsc', 'VolumeDesc');
                }}
              >
                VOLUME(24H)
              </TableCell>
              <TableCell
                align="center"
                onClick={() => {
                  toogleSort('CirculatingSupplyAsc', 'CirculatingSupplyDesc');
                }}
              >
                CIRCULATING SUPPLY
              </TableCell>
              <TableCell align="center">LAST 7 DAYS</TableCell>
            </TableRow>
          </TableHead>

          {/**  Body **/}
          <TableBody>
            {renderList.slice((page - 1) * 10, page * 10).map((coin) => {
              return (
                <TableRow key={coin.id}>
                  {/***Logo & Name ***/}
                  <TableCell>
                    <Grid container alignItems="center">
                      <Grid item xs={2}>
                        {favoriteList.some((c) => c.name === coin.name) ? (
                          <IconButton
                            onClick={() => favoriteHandler(coin)}
                            className={classes.iconButton}
                          >
                            <BookmarkIcon
                              className={classes.bookMarker}
                              color="secondary"
                            />
                          </IconButton>
                        ) : (
                          <IconButton
                            onClick={() => favoriteHandler(coin)}
                            className={classes.iconButton}
                          >
                            <BookmarkBorderIcon
                              className={classes.bookMarker}
                              color="secondary"
                            />
                          </IconButton>
                        )}
                      </Grid>
                      <Grid item xs={3}>
                        <img
                          src={coin.image}
                          className={classes.coinImage}
                          alt="logo"
                        />
                      </Grid>
                      <Grid item xs={3}>
                        {coin.name}
                      </Grid>
                    </Grid>
                  </TableCell>

                  {/***  Price ***/}
                  <TableCell align="center">
                    {currencyFormatter(coin.current_price, 4)}
                  </TableCell>
                  {/***  Percentage ***/}
                  <TableCell align="center">
                    <Grid
                      container
                      justify="center"
                      style={{
                        color:
                          coin.price_change_percentage_24h > 0
                            ? 'green'
                            : 'red',
                      }}
                    >
                      {coin.price_change_percentage_24h > 0 ? (
                        <TrendingUpIcon />
                      ) : (
                        <TrendingDownIcon />
                      )}
                      <Typography>
                        {percentageFormatter(coin.price_change_percentage_24h)}
                      </Typography>
                    </Grid>
                  </TableCell>
                  {/***  MarketCap ***/}
                  <TableCell align="center">
                    {currencyFormatter(coin.market_cap, 10)}
                  </TableCell>
                  {/***  Volume ***/}
                  <TableCell align="center">
                    {currencyFormatter(coin.total_volume, 10)}
                  </TableCell>
                  {/***  Circulating Supply ***/}
                  <TableCell align="center">
                    {numberFormatter(coin.circulating_supply)}
                    <div className={classes.root}>
                      <BorderLinearProgress
                        variant="determinate"
                        value={
                          (coin.circulating_supply / coin.total_supply) * 100
                        }
                      />
                    </div>
                  </TableCell>
                  {/***  Last 7 days ***/}
                  <TableCell align="right">
                    <Grid item container justify="center">
                      <CoinTableCharts coin={coin} />
                    </Grid>
                  </TableCell>
                </TableRow>
              );
            })}
            {searchTerm && searchedList.length === 0 ? (
              <TableRow>
                <TableCell>
                  <Typography align="center">{feedbackMessage}</Typography>
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>

        {/* Pagination */}
        <Pagination
          count={pageCounter()}
          onChange={handlerPage}
          color="primary"
          classes={{ root: classes.paginationRoot, ul: classes.paginationUl }}
        />
      </TableContainer>
    </>
  );
};
export default CoinTable;
