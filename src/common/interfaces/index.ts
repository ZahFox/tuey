export interface Type<T> extends Function {
  new (...args: any[]): T
}

export interface JsonMap {
  [member: string]: string | number | boolean | null | JsonArray | JsonMap
}
export interface JsonArray extends Array<string | number | boolean | null | JsonArray | JsonMap> {}
export type Json = JsonMap | JsonArray | string | number | boolean | null

export * from './events'
