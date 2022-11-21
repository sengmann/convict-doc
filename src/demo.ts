import * as Convict from "convict";

import { renderDoc } from "./index";

interface Config {
  env: string;
  database: {
    port: number;
    host: string;
    pw: string;
  };
}

const configSchema: Convict.Schema<Config> = {
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

const otherSchema = {
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  ip: {
    doc: "The IP address to bind.",
    format: "ipaddress",
    default: "127.0.0.1",
    env: "IP_ADDRESS",
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 8080,
    env: "PORT",
    arg: "port",
  },
  db: {
    host: {
      doc: "Database host name/IP",
      format: "*",
      default: "server1.dev.test",
    },
    name: {
      doc: "Database name",
      format: String,
      default: "users",
    },
  },
  admins: {
    doc: "Users with write access, or null to grant full access without login.",
    format: Array,
    nullable: true,
    default: null,
  },
};

console.log(renderDoc(configSchema));

console.log(renderDoc(otherSchema));

function PortGreaterThausend(port: string): never {
    throw new Error('not implented');
}