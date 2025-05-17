import * as Convict from "convict";

export interface Config {
  env: string;
  database: {
    port: number;
    host: string;
    pw: string;
  };
}

export const configSchema: Convict.Schema<Config> = {
  env: {
    default: "TEST",
    format: ["TEST", "PROD"],
  },
  database: {
    host: {
      env: "DB_HOST",
      arg: "host",
      default: "localhost",
      format: "url",
      doc: "The host of foo",
    },
    port: {
      env: "DB_PORT",
      default: 3333,
      format: PortGreaterThausend,
      doc: "the port of foo",
    },
    pw: {
      default: "changeMe",
      env: "DB_PW",
      arg: "pw",
      format: String,
      sensitive: true,
      doc: "the database password. Choose with care or pay the price!",
    },
  },
};

export default configSchema;

function PortGreaterThausend(port: string): never {
  throw new Error("not implented");
}
