# convict-doc
converts a Convict schema into rendered documentation. At this Moment it will be rendered as a markdown table. 

Perhaps in the future other formats are added.

## Usage

Simply pass the Convict schema object into the `renderDoc`-function

```ts
import {renderDoc} from "convict-doc"

const configSchema: Convict.Schema<YourSchema>;

const documentation = renderDoc(configSchema)

console.log(documentation)
```