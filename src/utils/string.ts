
const RE_TRIMLINES = /(.+)(\n|\r\n)?/g;
const CHAR_CODE_0 = '0'.charCodeAt(0);
const CHAR_CODE_9 = '9'.charCodeAt(0);
// eslint-disable-next-line camelcase
const CHAR_CODE_a = 'a'.charCodeAt(0);
// eslint-disable-next-line camelcase
const CHAR_CODE_z = 'z'.charCodeAt(0);
const CHAR_CODE_A = 'A'.charCodeAt(0);
const CHAR_CODE_Z = 'Z'.charCodeAt(0);


export function trimlines(str: string, separator = ''): string {
  let index = 0;
  const output: string[] = [];

  while (index < str.length && index !== -1) {
    const matches = RE_TRIMLINES.exec(str);

    if (!matches) {
      break;
    }

    index = matches.index;
    output.push(matches[0].trim());
  }

  return output.join(separator);
}

function isLowerCode(code: number) {
  // eslint-disable-next-line camelcase
  return code >= CHAR_CODE_a && code <= CHAR_CODE_z;
}

function isNumberCode(code: number) {
  // eslint-disable-next-line camelcase
  return code >= CHAR_CODE_0 && code <= CHAR_CODE_9;
}

export type ParseCaseOptions = {
  escapedChars?: string[];
  separator: string;
};

// eslint-disable-next-line radar/cognitive-complexity
export function parseCase(str: string, { escapedChars = [], separator }: ParseCaseOptions): string {
  let output = '';

  for (let index = 0; index < str.length; index++) {
    const char = str.charAt(index);

    if (escapedChars.includes(char)) {
      output += char;
    } else {
      const code = str.charCodeAt(index);

      if (code >= CHAR_CODE_A && code <= CHAR_CODE_Z) {
        if (index) {
          const previousToken = output.at(-1);

          if (previousToken !== separator && !escapedChars.includes(previousToken)) {
            const previousCode = str.charCodeAt(index - 1);

            if (isLowerCode(previousCode) || isNumberCode(previousCode)) {
              output += separator;
            }
          }
        }

        output += String.fromCharCode(code + 32);
      } else if (isLowerCode(code) || isNumberCode(code)) {
        output += char;
      } else {
        output += separator;
      }
    }
  }

  return output;
}

export function toKebabCase(str: string, escapedChars: string[] = []): string {
  return parseCase(str, { escapedChars, separator: '-' });
}
