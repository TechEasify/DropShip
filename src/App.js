import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ROUTES, { RenderRoutes } from './routes';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ROUTESADMIN from './routes/adminRoutes';
import { RenderAdminRoutes } from './routes/helper';

export default function App() {
  return (
    <>
      <Switch>
        
        <Route path="/admin">
          <RenderAdminRoutes routes={ROUTESADMIN} />
        </Route>

        <Route path="/">
          <RenderRoutes routes={ROUTES} />
        </Route>
        <Route component={() => <h1>Not Found!</h1>} />
      </Switch>
    </>
  );
}
