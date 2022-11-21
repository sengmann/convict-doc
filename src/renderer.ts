import * as Convict from "convict";
import { isSchemaObject, primitiveConstructors } from "./utils";

export function renderDoc<T = any>(schema: Convict.Schema<T>): string {
  const header = `
# Configuration Parameters

|name|default|arg|env|format|nullable|sensitive|doc|
|----|-------|---|---|------|--------|---------|---|
`;
  return renderSchema(schema, "", header);
}

export function renderSchema<T>(
  schema: Convict.Schema<T>,
  namePrefix: string = "",
  render = ""
): string {
  let res = render;

  for (let [key, value] of Object.entries(schema)) {
    if (isSchemaObject(value as any)) {
      res += renderSchemaObj(
        `${namePrefix ? namePrefix + "." + key : key}`,
        value as any
      );
    } else {
      res += renderSchema(value as any, key);
    }
  }
  return res;
}

export function renderSchemaObj(
  name: string,
  obj: Convict.SchemaObj<unknown>
): string {
  return `|${name}|${JSON.stringify(obj.default)}|${obj.arg ?? "-"}|${
    obj.env ?? "-"
  }|${renderFormat(obj)}|${renderNullable(obj)}|${renderSensitive(obj)}|${
    obj.doc ?? "-"
  }|
`;
}

export function renderNullable(obj: Convict.SchemaObj<unknown>): string {
  return `${obj.nullable ?? false}`;
}

export function renderSensitive(obj: Convict.SchemaObj<unknown>): string {
  return `${obj.nullable ?? false}`;
}

export function renderFormat(obj: Convict.SchemaObj<unknown>): string {
  if (Array.isArray(obj.format)) {
    return obj.format.join(" \\| ");
  }

  if (primitiveConstructors.includes(obj.format as any)) {
    return `${(obj.format as Function).name}`;
  }

  switch (typeof obj.format) {
    case "function":
      return `${(obj as any).format.name ?? "unknown format function"}`;
    case "string":
      return `${obj.format}`;
    case undefined:
      return "any";
    default:
      return "unknown";
  }
}
