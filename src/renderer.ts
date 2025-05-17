import * as Convict from "convict";
import { isSchemaObject, primitiveConstructors } from "./utils";

const defaultOrder = [
  "name",
  "default",
  "arg",
  "env",
  "format",
  "nullable",
  "sensitive",
  "doc",
];

export function renderField(
  fieldName: keyof Convict.SchemaObj<unknown> | "name",
  name: string,
  obj: Convict.SchemaObj<unknown>,
): string {
  switch (fieldName) {
    case "arg":
      return `${obj.arg ?? "-"}`;
    case "doc":
      return `${obj.doc ?? "-"}`;
    case "default":
      return `${JSON.stringify(obj.default)}`;
    case "format":
      return renderFormat(obj);
    case "nullable":
      return renderNullable(obj);
    case "sensitive":
      return renderSensitive(obj);
    case "env":
      return `${obj.env ?? "-"}`;
    case "name":
      return name;
    default:
      return `unknown`;
  }
}

export function renderDoc<T = any>(
  schema: Convict.Schema<T>,
  order: string[] = defaultOrder,
): string {
  const header = renderHeader(order);
  return renderSchema(schema, "", order, header);
}

export function renderSchemaObj(
  name: string,
  obj: Convict.SchemaObj<unknown>,
  order: string[] = defaultOrder,
): string {
  return `|${order.map((fieldName) => renderField(fieldName, name, obj)).join("|")}|\n`;
}

export function renderSchema<T>(
  schema: Convict.Schema<T>,
  namePrefix: string = "",
  order: string[] = defaultOrder,
  render = "",
): string {
  let res = render;

  for (let [key, value] of Object.entries(schema)) {
    if (isSchemaObject(value as any)) {
      res += renderSchemaObj(
        `${namePrefix ? namePrefix + "." + key : key}`,
        value as any,
        order,
      );
    } else {
      res += renderSchema(value as any, key, order);
    }
  }
  return res;
}

function renderHeader(order: string[] = defaultOrder): string {
  return `
# Configuration Parameters

|${order.join("|")}|
|${order.map((s) => s.replaceAll(/./g, "-")).join("|")}|\n`;
}

export function renderNullable(obj: Convict.SchemaObj<unknown>): string {
  return `${obj.nullable ?? false}`;
}

export function renderSensitive(obj: Convict.SchemaObj<unknown>): string {
  return `${obj.sensitive ?? false}`;
}

export function renderFormat(obj: Convict.SchemaObj<unknown>): string {
  if (Array.isArray(obj.format)) {
    return obj.format.join(" &#124; ");
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
