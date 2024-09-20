/**
 * @copyright 2020-2024 integereleven. All rights reserved. MIT license.
 * @file This file tests the ObjectUtil utility class.
 */

import { describe, it } from '@std/testing/bdd';
import { assertEquals } from '@std/assert';
import { ObjectUtil } from './mod.ts';

describe('ObjectUtil', () => {
  type ObjectData = {
    a: {
      b: {
        c: string;
        d: number;
        e: boolean;
        f?: {
          g: string;
        };
      };
    };
  };

  describe('readPath', () => {
    it('should read a value from an object at a specified path', () => {
      const object: ObjectData = {
        a: {
          b: {
            c: 'value',
            d: 123,
            e: true,
          },
        },
      };

      const bValue = ObjectUtil.readPath(object, 'a.b');
      const cValue = ObjectUtil.readPath(object, 'a.b.c');
      const dValue = ObjectUtil.readPath(object, 'a.b.d');
      const eValue = ObjectUtil.readPath(object, 'a.b.e');
      const fValue = ObjectUtil.readPath(object, 'a.b.f');
      const gValue = ObjectUtil.readPath(object, 'a.b.f.g');

      assertEquals(bValue, object.a.b);
      assertEquals(cValue, 'value');
      assertEquals(dValue, 123);
      assertEquals(eValue, true);
      assertEquals(fValue, undefined);
      assertEquals(gValue, undefined);
    });
  });

  describe('writePath', () => {
    it('should write a value to an object at a specified path', () => {
      const object: ObjectData = {
        a: {
          b: {
            c: 'value',
            d: 123,
            e: true,
          },
        },
      };

      assertEquals(object.a.b.f, undefined);

      ObjectUtil.writePath(object, 'a.b.c', 'new value');
      ObjectUtil.writePath(object, 'a.b.d', 456);
      ObjectUtil.writePath(object, 'a.b.e', false);
      ObjectUtil.writePath(object, 'a.b.f.g', 'hello');

      assertEquals(object.a.b.c, 'new value');
      assertEquals(object.a.b.d, 456);
      assertEquals(object.a.b.e, false);
      assertEquals(object.a.b.f!.g, 'hello');
    });
  });
});
