// @flow

import * as http from 'http';
import App from './app';

const server = http.createServer(App);
server.listen(3000);
