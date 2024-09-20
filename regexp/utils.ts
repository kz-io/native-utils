/*
  List of regexs to curate
  - All built from RFCs
  - IPv4 Address
  - IPv4Subnet mask
  - IPv4 Address with CIDR
  - IPv6 Address
  - IPv6 Address with CIDR
  - Email
  - Different text cases
  - ASCII/Non-ASCII
  - URL w/ Variants (based on the URLSchema Enum)
  - cron expression
  - permission expressions (linux, windows?)
  - HexColor
  - RGB color
  - HSL color
  - CMYK color
  - LAB Color
  - Color
  - Password w/ variants (might need to be moved elsewhere??, probably not even a regex)
    - Length
    - Uppercase
    - Lowercase
    - Numbers
    - Special Characters
    - Repeated Characters
    - Sequential Characters
    - Dictionary Words
    - Common Passwords
    - Keyboard Patterns (adjacent keys(distance, consecutive adjacent), shifted keys, etc.)
    - Username
    - Email
  - Others based on globalization (date, time (12/24), currency, etc.)
  - RegexBuilder (regex-utils, rescaled) offer bnf?


  - words(words) - Gets a regex for extracting "words"
  - assertMatch(regex, match, message) match ? void : throw AssertionException(message)
  - getAsserter(regex) => (match, message) => match ? void : throw AssertionException(message)
  - split(regex, word) - Splits a string based on a regex delimiter (replaces with a unique placeholder and then splits)
  - getSplitter(regex) => (text) => string[]
*/

export const NEW_LINE = /\r\n|\r|\n/;

export const ALPHA = /^[a-zA-Z]+$/;
export const ALPHA_NUMERIC = /^[a-zA-Z0-9]+$/;

export const NUMERIC = /^[0-9]+$/;
