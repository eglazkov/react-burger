import {createBrowserHistory} from 'history';

const basename = process.env.PUBLIC_URL || "";
const history = createBrowserHistory({basename});

export default history;
