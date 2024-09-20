/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file xports the string utility functions.
 */

import { readPath } from '../object/mod.ts';
import { NEW_LINE } from './regex_util.ts';

import type { AnyObject } from '../types/mod.ts';
import type { ObjectPaths, TemplateStringCallback } from './types/mod.ts';

import htmlEntities from './_internal/data/html_entities.json' with {
  type: 'json',
};

/**
 * An empty string.
 */
export const EMPTY = '';

/**
 * Returns a function that can be used to render a template string with provided data.
 *
 * @param strings  The template strings.
 * @param keys The keys to interpolate.
 * @returns A function that can be used to render a template string with provided data.
 *
 * @template T The type of the object.
 * @template S The paths of the object.
 */
export function getTemplateRenderer<
  T extends AnyObject,
  S extends ObjectPaths<T> = ObjectPaths<T>,
>(
  strings: TemplateStringsArray,
  ...keys: (S | TemplateStringCallback<T>)[]
): TemplateStringCallback<T> {
  const cleanedValues = [...strings.raw.values()];
  const initValue = cleanedValues.shift() || '';

  const callback = (data: T) => {
    const resolved = keys.reduce((result, key) => {
      const value = typeof key === 'function' ? key(data) : readPath(data, key);
      const next = cleanedValues.shift();
      const acc = `${String(result)}${value}${next}`;

      return acc;
    }, initValue);

    return resolved;
  };

  return callback;
}

/**
 * Escapes HTML characters into their respective entities.
 *
 * @param str The string to escape.
 * @returns The escaped string.
 */
export function escapeHtml(str: string): string {
  const entities = Object.entries(htmlEntities);
  const result = entities.reduce((acc, [entity, escape]) => {
    const rx = new RegExp(`${entity}`, 'gm');

    return acc.replace(rx, `&${escape};`);
  }, str);

  return result;
}

/**
 * Unescapes HTML entities into their respective characters.
 *
 * @param str The string to unescape.
 * @returns The unescaped string.
 */
export function unescapeHtml(str: string): string {
  const entities = Object.entries(htmlEntities);
  const result = entities.reduceRight((acc, [entity, escape]) => {
    const rx = new RegExp(`&${escape};`, 'gm');

    return acc.replace(rx, entity);
  }, str);

  return result;
}

/**
 * Escapes regular expression characters.
 *
 * @param str The string to escape.
 * @returns The escaped string.
 */
export function escapeRegExp(str: string): string {
  const regex = /[.*+?^${}()|[\]\\]/gm;

  return str.replace(regex, '\\$&');
}

export function isEmptyOrWhitespace(str: string): boolean {
  return !str.trim();
}

export function isEmpty(str: string): boolean {
  return str.length === 0;
}

export function getLines(str: string): string[] {
  const regex = new RegExp(NEW_LINE, 'gm');
  const lines: string[] = [];

  while (true) {
    const match = regex.exec(str);

    if (!match) {
      break;
    }

    lines.push(match[0]);

    str = str.slice(match.index + match[0].length);
  }

  return lines;
}

export function collapseWhitespace(str: string): string {
  return str.replace(/\s+/gm, ' ');
}

export function normalizeNewLines(str: string): string {
  return str.replace(NEW_LINE, '\n');
}

export function normalizeSpaces(str: string): string {
  return str.replace(/\s+/gm, ' ');
}

//truncate options: start, end, middle
