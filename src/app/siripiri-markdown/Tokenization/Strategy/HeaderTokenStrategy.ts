import { TokenType, Text, Element } from "../TokenizationTypes";
import { TokenStrategy } from "./TokenStrategy";

class HeaderTokenStrategy implements TokenStrategy {
    private regExp: RegExp = /(?:\s|^)(#{1,6})(?:\s{1})(.+)/;

    isMatch(markdown: string, line: number): boolean {
        console.log(`In Header`);
        let lines = markdown.split(`\n`);
        return this.regExp.test(lines[line]);
    }

    tokenize(markdown: string, line: number): { element: Element } | null {
        let lines: string[] = markdown.split(`\n`);
        console.log(`After Slice:${lines}`);
        let results = this.regExp.exec(lines[line].trim());
        if (results != null) {
            line = line + 1;
            return {element: this.headerElementJsonBuilder(results, lines[0], line)};
        }
        return null;
    }

    private textJsonBuilder(results: RegExpExecArray, line: number) {
        let tag = results[1];
        let value = results[2];

        const textToken: Text = {
            type: TokenType.TEXT,
            value: value,
            position: {
                start: {
                    line: line,
                    column: tag.length + 1,
                },
                end: {
                    line: line,
                    column: tag.length + 1 + value.length
                }
            }
        }
        return textToken;
    }

    private headerElementJsonBuilder(results: RegExpExecArray, line: string, linecounter: number) {
        let tag = results[1];
        const token: Element = {
            type: TokenType.ELEMENT,
            tagName: `h${tag.length}`,
            children: [
                { text: this.textJsonBuilder(results, linecounter) }
            ],
            position: {
                start: {
                    line: linecounter,
                    column: 0
                },
                end: {
                    line: linecounter,
                    column: line.length + 1
                }
            }
        }
        return token;
    }
}

export {
    HeaderTokenStrategy
}