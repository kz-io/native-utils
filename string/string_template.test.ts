/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file This file tests the StringTemplate class.
 */

import { describe, it } from '@std/testing/bdd';
import { assertEquals } from '@std/assert';

import { StringTemplate } from './mod.ts';

describe('StringTemplate', () => {
  describe('render', () => {
    it('should render the template with the provided data', () => {
      const data = {
        name: 'World',
        age: 123,
        meta: {
          username: 'world123',
        },
      };

      const template = StringTemplate.from<
        typeof data
      >`Hello, ${'name'}! I am ${'age'} years old. My username is ${'meta.username'}`;
      const result = template.render(data);

      assertEquals(
        result,
        'Hello, World! I am 123 years old. My username is world123',
      );
    });
  });
});
