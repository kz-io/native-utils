/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file This file tests the StringUtil utility class.
 */

import { describe, it } from '@std/testing/bdd';
import { assertEquals } from '@std/assert';

import * as StringUtil from './mod.ts';

type TestData = {
  name: string;
  age: number;
};

describe('string utils', () => {
  describe('getTemplateRenderer', () => {
    it('should return a function that renders a template with the provided data', () => {
      const data: TestData = {
        name: 'World',
        age: 123,
      };

      const username = (d: TestData) => `${d.name}${d.age}`;
      const fn1 = StringUtil.getTemplateRenderer<
        TestData
      >`Hello, ${'name'}! I am ${'age'} years old. My username is ${username}`;
      const actual1 = fn1(data);
      const expected1 =
        'Hello, World! I am 123 years old. My username is World123';

      assertEquals(actual1, expected1);

      const fn2 = StringUtil.getTemplateRenderer<
        TestData
      >`${'name'}! I am tired`;
      const actual2 = fn2(data);
      const expected2 = 'World! I am tired';

      assertEquals(actual2, expected2);
    });
  });

  describe('empty', () => {
    it('should be an empty string', () => {
      assertEquals(StringUtil.EMPTY, '');
    });
  });

  describe('escapeHtml', () => {
    it('should escape HTML entities', () => {
      const html = '<div class="test">Hello, World!</div>';
      const actualHtml = StringUtil.escapeHtml(html);
      const expectedHtml =
        '&lt;div class=&quot;test&quot;&gt;Hello, World!&lt;/div&gt;';

      const md = "This is `code` for 'code'.";
      const actualMd = StringUtil.escapeHtml(md);
      const expectedMd = 'This is &grave;code&grave; for &apos;code&apos;.';

      assertEquals(actualHtml, expectedHtml);
      assertEquals(actualMd, expectedMd);
    });
  });

  describe('unescapeHtml', () => {
    it('should unescape HTML entities', () => {
      const html =
        '&lt;div class=&quot;test&quot;&gt;Hello, World!&lt;/div&gt;';
      const actualHtml = StringUtil.unescapeHtml(html);
      const expectedHtml = '<div class="test">Hello, World!</div>';

      const md = 'This is &grave;code&grave; for &apos;code&apos;.';
      const actualMd = StringUtil.unescapeHtml(md);
      const expectedMd = "This is `code` for 'code'.";

      assertEquals(actualHtml, expectedHtml);
      assertEquals(actualMd, expectedMd);
    });
  });

  describe('escapeRegExp', () => {
    it('should escape regular expression characters', () => {
      const str =
        '[i11n](https://integereleven.com/test?filter={number.bin|lt[2^4]}';
      const actual = StringUtil.escapeRegExp(str);
      const expected =
        '\\[i11n\\]\\(https://integereleven\\.com/test\\?filter=\\{number\\.bin\\|lt\\[2\\^4\\]\\}';

      assertEquals(actual, expected);
    });
  });
});
