import React, { lazy, Suspense } from 'react';
import { Redirect, RouteComponentProps } from '@reach/router';

// import authHelpers from '@/services/helpers';

const retryLoadComponent = (fn: () => Promise<unknown>, retriesLeft = 5, interval = 1000): any =>
  new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            reject(error);
            return;
          }

          retryLoadComponent(fn, retriesLeft - 1, interval).then(resolve, reject);
        }, interval);
      });
  });

// public
const SignUp = lazy(() => retryLoadComponent(() => import('@/pages/public/SignUp')));
const Error = lazy(() => retryLoadComponent(() => import('@/pages/public/Error')));

// private
const Home = lazy(() => retryLoadComponent(() => import('@/pages/private/Home')));

export const PrefixPaths = {};

export const LayoutPaths = {
  Auth: '/auth',
  Main: '/',
};

export const Paths = {
  // public
  LogIn: '/login',
  SignUp: '/signup',
  Error: '/error',

  // private
  Home: '/home',

  Rest: '*',
};

export const Pages = {
  Home,
  SignUp,
  Error,
};

interface IRouteProps extends RouteComponentProps {
  component: React.FC;
}

export const ProtectedRoute: React.FC<IRouteProps> = ({ component: Component, ...rest }) => {
  // const loggedIn = authHelpers.getUserInfo();
  const loggedIn = true;

  return loggedIn ? (
    <Suspense fallback={<div />}>
      <Component {...rest} />
    </Suspense>
  ) : (
    <Redirect from="" to={`${LayoutPaths.Auth}${Paths.LogIn}`} noThrow />
  );
};

export const PublicRoute: React.FC<IRouteProps> = ({ component: Component, ...rest }) => (
  <Suspense fallback={<div />}>
    <Component {...rest} />
  </Suspense>
);
