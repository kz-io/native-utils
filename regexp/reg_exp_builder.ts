import { RegExpFlagChar } from './types/mod.ts';
import { REGEXP_FLAG_MAP, REGEXP_FLAGS } from './_internal/mod.ts';

export class RegExpBuilder {
  public flagsToEnum(flagString: string): number {
    const flags = flagString.split('');
    const result = flags.reduce((acc, flag) => {
      if (!REGEXP_FLAGS.includes(flag as RegExpFlagChar)) {
        throw new Error(`Invalid flag: ${flag}`);
      }

      const value = REGEXP_FLAG_MAP[flag as RegExpFlagChar];

      return acc | value;
    }, 0);

    return result;
  }

  public enumToFlags(flags: number): string {
    return REGEXP_FLAGS.filter((flag) =>
      (flags & REGEXP_FLAG_MAP[flag]) === REGEXP_FLAG_MAP[flag]
    ).join('');
  }

  // join(...regexs: (RegExp | string)[]): RegExp {
  //   let flags =

  //   return new RegExp(regexs.map(r => r.source).join(''));
  // }
}
