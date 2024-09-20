/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file Exports the object utility functions.
 */

import { ObjectPaths, type ObjectPathValue } from './types/mod.ts';

import type { AnyObject } from '@kz/core/types';

/**
 * Reads a value from an object at a specified path.
 *
 * @param object The object to read from.
 * @param path The dot-separated path to read from the object.
 *
 * @returns The value at the specified path.
 *
 * @template T The type of the object.
 * @template P The paths of the object.
 *
 * @example //TODO(ebntly): Add an example from tests
 */
export function readPath<T extends AnyObject, P extends ObjectPaths<T>>(
  object: T,
  path: P,
): ObjectPathValue<T, P> {
  return path.split('.').reduce((acc, key) => {
    if (acc === undefined) return;

    return acc[key];
  }, object) as unknown as ObjectPathValue<T, P>;
}

/**
 * Writes a value to an object at a specified path.
 *
 * @param object The object to write to.
 * @param path The dot-separated path to write to the object.
 * @param value The value to write to the object at the specified path.
 *
 * @template T The type of the object.
 * @template P The paths of the object.
 *
 * @example //TODO(ebntly): Add an example from tests
 */
export function writePath<T extends AnyObject, P extends ObjectPaths<T>>(
  object: T,
  path: P,
  value: ObjectPathValue<T, P>,
): void {
  const keys = path.split('.');
  const lastKey = keys.pop() as string;
  const target = keys.reduce((acc, key) => {
    if (!acc[key]) {
      acc[key as keyof typeof acc] = {} as (typeof acc)[keyof typeof acc];
    }

    return acc[key];
  }, object);

  target[lastKey as keyof typeof target] = value;
}
