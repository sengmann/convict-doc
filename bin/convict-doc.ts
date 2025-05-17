#!/usr/bin/env tsx

import yargs from "yargs";
import { resolve } from "node:path";
import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { renderDoc } from "../src";
import * as prettier from "prettier";

const args = yargs(process.argv.slice(2))
  .options({
    input: {
      type: "string",
      alias: "i",
      demandOption: true,
      description: "Path to the config file",
    },
    output: {
      type: "string",
      alias: "o",
      demandOption: false,
      description: "Path to the output file",
    },
    pretty: {
      type: "boolean",
      alias:"p",
      default: false,
      description: "Pretty print the output",
    },
  })
  .parseSync();

const inputPath = args.input;
const outputPath = args.output;

const absolutePath = resolve(process.cwd(), inputPath);

if (!existsSync(absolutePath)) {
  console.error(`File ${absolutePath} does not exist`);
  process.exit(1);
}

const config = (await import(absolutePath)).default;

if (!config) {
  console.error(`File ${absolutePath} does not export a default value`);
  process.exit(1);
}

const markdown = renderDoc(config);

const output = args.pretty
  ? await prettier.format(markdown, { parser: "markdown" })
  : markdown;

if (outputPath) {
  const outputAbsolutePath = resolve(process.cwd(), outputPath);
  await writeFile(outputAbsolutePath, output, "utf-8");
} else {
  console.log(output);
}
