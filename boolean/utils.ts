/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file Exports the boolean utility functions.
 */

import { type IPrimitiveConvertible, PrimitiveSymbols } from '@kz/core/types';

// TODO(ebntly): These will be merged with the globalization truthy strings, once g11n is stable.
const TRUTHY_STRINGS = ['true', 'yes', '1', 'on', 'enabled', 'active', 'open'];

/**
 * Converts a value to a boolean.
 *
 * @param value The value to convert to a boolean.
 * @returns A boolean value.
 */
export function nativeCoersion(value: unknown): boolean {
  return Boolean(value);
}

/**
 * Converts a value to a boolean.
 *
 * @param value The value to convert to a boolean.
 * @returns A boolean value.
 */
function fromValueBase(value: unknown): boolean {
  switch (true) {
    case (typeof value === 'number'):
      return fromNumber(value as number);
    case (typeof value === 'string'):
      return fromString(value as string);
    case (typeof value === 'object' && value instanceof Error):
      return true;
    case (typeof value === 'object' &&
      typeof (value as IPrimitiveConvertible)[PrimitiveSymbols.toBoolean] ===
        'function'):
      return (value as IPrimitiveConvertible)[PrimitiveSymbols.toBoolean]();
    default:
      return nativeCoersion(value);
  }
}

/**
 * Converts a value to a boolean.
 *
 * @param value The value to convert to a boolean.
 * @returns A boolean value.
 */
// export const fromValue = unstableFunction(fromValueBase, {
//   "featureName": "fromValue",
//   message: 'This function is unstable and may be changed in the future.',
// });

/**
 * Converts a number to a boolean.
 *
 * @param value The number to convert to a boolean.
 * @returns A boolean value.
 */
function fromNumber(value: number): boolean {
  return value !== 0;
}

/**
 * Converts a string to a boolean.
 *
 * @param value The string to convert to a boolean.
 * @returns A boolean value.
 *
 * @remarks
 * Will changes once we have globalization support.
 */
function fromString(value: string): boolean {
  return TRUTHY_STRINGS.includes(value.toLowerCase());
}
