# convict-doc

Easily generate Markdown documentation from your [Convict](https://github.com/mozilla/node-convict) schema.

Currently, documentation is rendered as a Markdown table.  
Other output formats may be supported in the future.

## CLI Usage Guide:

### Installation
Install globally (if published to npm):
```
npm install -g convict-doc
```
Or use directly with `pnpm`, `npx`, or `yarn`:
```
npx convict-doc ...
```

### Command Syntax
```
convict-doc --input <schema-file> [--output <output-file>] [--pretty]
```

### Options

| Option         | Alias | Required | Description                                             |
|----------------|-------|----------|---------------------------------------------------------|
| --input        | -i    | Yes      | Path to the Convict schema file (must export `default`) |
| --output       | -o    | No       | Path to write the generated Markdown file               |
| --pretty       | -p    | No       | Pretty-print the Markdown output                        |

### Example

Generate documentation and print to console:
```
convict-doc --input ./config/schema.js
```

Generate and save pretty-printed Markdown to a file:
```
convict-doc -i ./config/schema.js -o ./docs/config.md -p
```

### Notes

- The input file must export the Convict schema as its default export.
- If `--output` is not specified, the documentation is printed to stdout.
- Use `--pretty` to format the Markdown output using Prettier.

## API Usage

Simply pass the Convict schema object into the `renderDoc`-function

```ts
import {renderDoc} from "convict-doc"

const configSchema: Convict.Schema<YourSchema>;

const documentation = renderDoc(configSchema)

console.log(documentation)
```
