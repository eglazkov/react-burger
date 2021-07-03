import React, {FC} from 'react';
import {ConnectedRouter} from 'connected-react-router';
import appStyles from './app.module.css';
import {
  AppHeader,
  AppFooter,
  AppSpinner
} from '../components';
import {useOrder, history, MainRouter} from '../services';

const App: FC = () => {
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
