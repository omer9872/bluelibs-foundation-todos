import {
  Bundle,
  Service,
  ContainerInstance,
  Token,
  Inject
} from '@bluelibs/core';
import { Pool, PoolClient } from 'pg';
import ENV from '../env';

export const DB_SERVICE_TOKEN = new Token<DatabaseService>();

@Service()
export class DatabaseService {

  pool: Pool;
  poolClient?: PoolClient;

  constructor() {
    console.log("DBService - DatabaseService service is initialized...")
    this.pool = new Pool({
      user: ENV.PSQL_USER,
      host: ENV.PSQL_HOSTNAME,
      database: ENV.PSQL_DATABASE,
      password: ENV.PSQL_PASSWORD,
      port: ENV.PSQL_PORT,
    })
    this.pool.connect()
      .then((poolClient) => {
        console.log("DBService - pool client initialized...");
        this.poolClient = poolClient;
      })
      .catch((err: Error) => {
        console.log(err.message);
      })
  }

  public getPoolClient(): PoolClient {
    if (this.poolClient) {
      return this.poolClient!;
    } else {
      throw Error("DBService - Error - pool client not initialized yet");
    }
  }

}