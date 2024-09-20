import { RegExpFlagChar, RegExpFlags } from '../../src/types/mod.ts';

export const REGEXP_FLAGS: RegExpFlagChar[] = [
  'd',
  'g',
  'i',
  'm',
  's',
  'u',
  'v',
  'y',
];

export const REGEXP_FLAG_MAP: Record<RegExpFlagChar, RegExpFlags> = {
  d: RegExpFlags.Indices,
  g: RegExpFlags.Global,
  i: RegExpFlags.IgnoreCase,
  m: RegExpFlags.Multiline,
  s: RegExpFlags.DotAll,
  u: RegExpFlags.Unicode,
  v: RegExpFlags.UnicodeSets,
  y: RegExpFlags.Sticky,
};
