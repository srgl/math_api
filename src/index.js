// @flow
import fs from 'fs';
import app from './app';

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

app.listen(3000);
