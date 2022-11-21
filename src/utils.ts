import * as Convict from "convict";

export const primitiveConstructors = [String, Object, Number, RegExp, Boolean];

export function isSchemaObject<T>(
  obj: Convict.Schema<T> | Convict.SchemaObj<unknown>
): obj is Convict.SchemaObj<unknown> {
  return Object.keys(obj).includes("default");
}
