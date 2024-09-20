/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file Type aliases for the module. For interfaces, see ./interfaces.ts.
 */

import { AnyObject } from '@kz/core/types';

/**
 * Returns whether a value is any value.
 *
 * @template T - The value type.
 */
type Any<T> = unknown extends T ? [keyof T] extends [never] ? false
  : true
  : false;

/**
 * Extracts the paths of an object.
 *
 * @template T - The object type.
 * @template K - The key type.
 */
type PathExtractor<T extends AnyObject, K extends keyof T> = K extends string
  ? Any<Required<T>[K]> extends true ? K
  : Required<T>[K] extends AnyObject ?
      | `${K}.${
        & PathExtractor<
          Required<T>[K],
          Exclude<keyof Required<T>[K], keyof []>
        >
        & string}`
      | `${K}.${Exclude<keyof Required<T>[K], keyof []> & string}`
  : K
  : K;

/**
 * The internal string path type.
 *
 * @template T - The object type.
 */
type InternalStringPath<T extends AnyObject> =
  | PathExtractor<T, keyof T>
  | keyof T;

/**
 * Extracts the string paths of an object.
 *
 * @template T - The object type.
 *
 * @example
 * ```ts
 * import type { ObjectPaths } from './type_aliases.ts';
 *
 * type MyObject = {
 *   a: {
 *     b: {
 *       c: string;
 *       d: number;
 *       e: boolean;
 *       f?: {
 *         g: string;
 *       };
 *     };
 *   };
 * };
 *
 * const toC: ObjectPaths<MyObject> = 'a.b.c';
 * const toD: ObjectPaths<MyObject> = 'a.b.d';
 * const toE: ObjectPaths<MyObject> = 'a.b.e';
 * const toF: ObjectPaths<MyObject> = 'a.b.f';
 * const toG: ObjectPaths<MyObject> = 'a.b.f.g';
 * ```
 */
export type ObjectPaths<T extends AnyObject> = keyof T extends string
  ? InternalStringPath<T> extends infer P ? P extends string | keyof T ? P
    : keyof T
  : keyof T
  : never;

/**
 * The value at a specified object path.
 *
 * @template T - The object type.
 * @template P - The object path.
 *
 * @example //TODO(ebntly): Add an example
 */
export type ObjectPathValue<
  T extends AnyObject = AnyObject,
  P extends ObjectPaths<T> = ObjectPaths<T>,
> = P extends `${infer K}.${infer R}`
  ? K extends keyof T
    ? R extends ObjectPaths<Required<T>[K]> ? ObjectPathValue<Required<T>[K], R>
    : never
  : never
  : P extends keyof Required<T> ? Required<T>[P]
  : never;
