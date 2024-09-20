import { AnyObject } from '@kz/core/types';

/**
 * A callback for a template string.
 *
 * @template T - The object type.
 */
export type TemplateStringCallback<T extends AnyObject> = (data: T) => string;

/**
 * A format string placeholder.
 *
 * @template T - The available pipe function names.
 *
 * @example //TODO(ebntly): Add an example
 */
export type FormatStringPlaceholder<T extends string = string> =
  | `${number}`
  | `${number},${number}`
  | `${number}|${T}${string}`
  | `${number},${number}|${T}${string}`;
