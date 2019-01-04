// @flow
import Transport from 'winston-transport';
import pgp from 'pg-promise';

export default class PGTransport extends Transport {
  db: pgpConnection

  async init() {
    this.db = pgp()({
      host: 'db',
      port: 5432,
      database: 'postgres',
      user: 'postgres',
    });
    await this.waitForConnection();
    await this.createSchema();
  }

  async waitForConnection() {
    while (1) {
      try {
        await this.db.proc('version');
        break;
      } catch (e) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  async createSchema() {
    await this.db.none(`
      CREATE TABLE IF NOT EXISTS logs (
        id bigserial primary key,
        timestamp timestamp,
        level varchar(8),
        message varchar(1024),
        data jsonb
      );
    `);
  }

  async log(info: Object, callback: Function) {
    await this.db.none(`insert into logs (timestamp, level, message, data)
      values ($(timestamp), $(level), $(message), $(data))`, info);
    callback();
  }
}
