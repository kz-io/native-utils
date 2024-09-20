/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file Exports the StringTemplate class.
 */

import { type ObjectPaths } from '../object/mod.ts';

import * as StringUtil from './utils.ts';

import type { TemplateStringCallback } from './types/mod.ts';

import type { AnyObject } from '@kz/core/types';

/**
 * A string template class that allows for dynamic string interpolation.
 *
 * @template T The type of the object.
 * @template S The paths of the object.
 *
 * @example //TODO(ebntly): Add an example from tests
 */
export class StringTemplate<
  T extends AnyObject,
  S extends ObjectPaths<T> = ObjectPaths<T>,
> {
  /**
   * Creates a new `StringTemplate` instance.
   *
   * @param strings The template strings.
   * @param keys The keys to interpolate.
   * @returns A new `StringTemplate` instance.
   *
   * @template T The type of the object.
   * @template S The paths of the object.
   */
  public static from<
    T extends AnyObject,
    S extends ObjectPaths<T> = ObjectPaths<T>,
  >(
    strings: TemplateStringsArray,
    ...keys: (S | TemplateStringCallback<T>)[]
  ): StringTemplate<T, S> {
    return new StringTemplate(strings, keys);
  }

  /**
   * Creates a new `StringTemplate` instance.
   *
   * @param strings The template strings.
   * @param keys The keys to interpolate.
   */
  constructor(
    protected strings: TemplateStringsArray,
    protected keys: (S | TemplateStringCallback<T>)[],
  ) {}

  /**
   * Renders the template with the provided data.
   *
   * @param data The data to interpolate.
   * @returns The interpolated string.
   */
  public render(data: T): string {
    const { strings, keys } = this;
    const renderer = StringUtil.getTemplateRenderer(strings, ...keys);
    const result = renderer(data);

    return result;
  }
}
