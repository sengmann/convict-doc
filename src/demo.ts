import { renderDoc } from "./index";
import configSchema from "./test.config";

console.log(
  renderDoc(configSchema, ["name", "env", "arg", "doc", "nullable", "default"]),
);

console.log(renderDoc(configSchema));
