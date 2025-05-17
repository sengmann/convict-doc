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
  jkuHeaderValue: {
    arg: "jkuHeaderValue",
    default: "https://localhost:3000/jwks",
    env: "JKU_HEADER_VALUE",
    format: String,
    nullable: true,
    doc: "If defined the value for the JKU header will be set to this value. If not defined the header will not be set.",
  },
  jwksOrigin: {
    arg: "jwksOrigin",
    default: null as any as string,
    env: "JWKS_BASE",
    format: String,
    nullable: true,
    doc: "The origin for the certificate",
  },
  jwksPath: {
    arg: "jwksPath",
    default: "/.well-known/jwks.json",
    env: "JWKS_PATH",
    format: String,
    doc: "The path to the JWKS endpoint",
  },
};

console.log(
  renderDoc(otherSchema, ["name", "env", "arg", "doc", "nullable", "default"]),
);

console.log(renderDoc(otherSchema));

function PortGreaterThausend(port: string): never {
  throw new Error("not implented");
}
