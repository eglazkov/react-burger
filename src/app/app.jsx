import React from 'react';
import {  
  Switch,
  Route
} from 'react-router-dom';
import {ConnectedRouter} from 'connected-react-router';
import appStyles from './app.module.css';
import AppHeader from '../components/app-header';
import AppFooter from '../components/app-footer';
import AppSpinner from '../components/app-spinner';
import {useOrder, history, routes} from '../services';

 
const App = () => {
  const [{isSendingDataOrder}] = useOrder();
  return (
    <>          
      <ConnectedRouter history={history}>
        <AppHeader />
          <main
            className={`pb-5 ${appStyles.mainContainer}`}>
              <Switch>
                {
                  routes.map(({exact, path, component: Component}, i) => {
                    return (                      
                      <Route
                        key={i}
                        exact={exact}
                        path={`${path}`}
                        render={(props) => (
                          <Component {...props} />
                        )}
                      />
                    );
                  })
                }
              </Switch>
          </main>
        <AppFooter />
        {isSendingDataOrder && <AppSpinner />}
      </ConnectedRouter>
    </>
  );
}
 
export default App;
