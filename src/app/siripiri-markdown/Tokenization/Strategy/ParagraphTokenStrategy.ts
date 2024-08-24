import { TokenType, Text, Element } from "../TokenizationTypes";
import { TokenStrategy } from "./TokenStrategy";

class ParagraphTokenStrategy implements TokenStrategy {
    private regExp: RegExp = /^(?!\s*$)(?![#>\-*`]).+/;

    isMatch(markdown: string, line: number): boolean {
        let lines = markdown.split(`\n`);
        return this.regExp.test(lines[line]);
    }
    tokenize(markdown: string, line: number): { element: Element; } | null {
        let lines: string[] = markdown.split(`\n`);
        console.log(`lines: ${lines}, lineCounter: ${line}`);

        let canBeAdded: string[] = [];
        canBeAdded[0] = lines[line];
        let lineCounter = line;

        while(lineCounter<lines.length && this.isMatch(markdown, lineCounter)) {
            canBeAdded.push(lines[lineCounter]);
            lineCounter++;
        }

        return this.paragraphJsonBuilder(lines, line, lineCounter);
    }

    private paragraphJsonBuilder(markdown: string[], startLine: number, endLine: number) {
        let value: string = markdown[startLine];
        for(let i= startLine+1; i<endLine; i++) {
            value = `${value}\n${markdown[i]}`;
        }
        console.log(value, startLine, endLine);
        const textToken: Text = {
            type: TokenType.TEXT,
            value: value,
            position: {
                start: {
                    line: startLine+1,
                    column: 0
                },
                end: {
                    line: endLine,
                    column: markdown[endLine-1].length
                }
            }
        };
        const token: Element = {
            type: TokenType.ELEMENT,
            tagName: `p`,
            children: [{text: textToken}],
            position: {
                start: {
                    line: startLine+1,
                    column: 0
                },
                end: {
                    line: endLine,
                    column: markdown[endLine-1].length
                }
            }
        }
        return {element: token};
    }

}

export {
    ParagraphTokenStrategy
}