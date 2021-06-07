import React from 'react';
import {  
  Switch,
  Route
} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
// import history from '../services/history';
import appStyles from './app.module.css';
import AppHeader from '../components/app-header';
import AppFooter from '../components/app-footer';
import AppSpinner from '../components/app-spinner';
import {useOrder, history, routes} from '../services';

 
const App = () => {
  const [{isSendingDataOrder}] = useOrder();
  return (
    <>
      <AppHeader />
        <main
          className={`pb-5 ${appStyles.mainContainer}`}>          
          <ConnectedRouter history={history}>
            <Switch>
              {
                routes.map((route, i) => (
                  <Route
                    key={i}
                    exact={route.exact}
                    path={`${route.path}`}
                    render={(props) => (
                      <route.component {...props} />
                    )}
                  />
                ))
              }
            </Switch>
          </ConnectedRouter>
        </main>
      <AppFooter />
      {isSendingDataOrder && <AppSpinner />}
    </>
  );
}
 
export default App;
