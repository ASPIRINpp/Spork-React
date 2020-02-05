import React, { Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'query-string';
import { makeStyles } from '@material-ui/styles';
import { LinearProgress } from '@material-ui/core';
import ReactRouterPropTypes from 'react-router-prop-types';

import { fetchUserInfo } from '../../actions';
import { Topbar } from './components';

const useStyles = makeStyles((theme) => ({
  content: {
    height: '100%',
    paddingTop: 56,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64,
    },
  },
}));

const Main = (props) => {
  const { route, location, history } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const { token } = qs.parse(location.search, { ignoreQueryPrefix: true });
  if (token) {
    dispatch(fetchUserInfo(token));
    history.push('/');
  }

  const user = useSelector((state) => state.user);

  return (
    <>
      <Topbar user={user} />
      <main className={classes.content}>
        <Suspense fallback={<LinearProgress />}>
          {renderRoutes(route.routes)}
        </Suspense>
      </main>
    </>
  );
};

Main.propTypes = {
  location: ReactRouterPropTypes.location.isRequired,
  route: ReactRouterPropTypes.route.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

export default Main;
