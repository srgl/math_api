// @flow
import Transport from 'winston-transport';
import pgp from 'pg-promise';

export default class PGTransport extends Transport {
  db: pgpConnection

  table: string

  constructor(table: string = 'logs') {
    super();
    this.table = table;
  }

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
      CREATE TABLE IF NOT EXISTS ${this.table} (
        id bigserial primary key,
        timestamp timestamp,
        level varchar(8),
        message varchar(1024),
        data jsonb
      );
    `);
  }

  async log(info: $winstonInfo<$winstonNpmLogLevels>, callback: () => void) {
    await this.db.none(`insert into ${this.table} (timestamp, level, message, data)
      values ($(timestamp), $(level), $(message), $(data))`, info);
    callback();
  }
}
