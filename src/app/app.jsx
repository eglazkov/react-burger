import React from 'react';
import {ConnectedRouter} from 'connected-react-router';
import appStyles from './app.module.css';
import AppHeader from '../components/app-header';
import AppFooter from '../components/app-footer';
import AppSpinner from '../components/app-spinner';
import {useOrder, history, MainRouter} from '../services';
 
const App = () => {
  const [{isSendingDataOrder}] = useOrder();
  return (
    <>          
      <ConnectedRouter history={history}>
        <AppHeader />
          <main
            className={`pb-5 ${appStyles.mainContainer}`}>
              <MainRouter/>
          </main>
        <AppFooter />
        {isSendingDataOrder && <AppSpinner />}
      </ConnectedRouter>
    </>
  );
}
 
export default App;
