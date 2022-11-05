import React, { useEffect } from 'react';
import { Router, Redirect } from '@reach/router';
import { useDispatch } from 'react-redux';

import { uiActions } from '@/redux/actions';
import { LayoutPaths, Paths, Pages, ProtectedRoute, PublicRoute } from '@/pages/routers';
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const updateSize = (): void => {
      dispatch(uiActions.setDevice(window.innerWidth));
    };
    window.addEventListener('resize', updateSize);
    return (): void => window.removeEventListener('resize', updateSize);
  }, [dispatch]);

  return (
    <Router primary={false}>
      <MainLayout path={LayoutPaths.Main}>
        <ProtectedRoute path={Paths.Home} component={Pages.Home} />
      </MainLayout>

      <AuthLayout path={LayoutPaths.Auth}>
        <PublicRoute path={Paths.SignUp} component={Pages.SignUp} />
      </AuthLayout>

      <PublicRoute path={Paths.Error} component={Pages.Error} />
      <Redirect noThrow from={Paths.Rest} to={`${LayoutPaths.Main}${Paths.Home}`} />
    </Router>
  );
};

export default App;
