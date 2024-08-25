import { Text, Element, Position } from "../TokenizationTypes";
import { TokenUtils } from "../TokenUtils";
import { TokenStrategy } from "./TokenStrategy";

class ParagraphTokenStrategy implements TokenStrategy {

    private regExp: RegExp = /^(?!\s*$)(?!(\d+)\.\s+(.*))(?![#>\-*`]).+/;
    tokenUtils: TokenUtils;
    
    constructor(tokenUtils: TokenUtils) {
        this.tokenUtils = tokenUtils;
    }

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

    private paragraphJsonBuilder(markdown: string[], startLine: number, endLine: number): { element: Element } {
        let value: string = markdown[startLine];
        for(let i=startLine+1; i<endLine; i++)
            value = `${value}\n${markdown[i]}`;
        const position: Position = this.tokenUtils.positionJsonBuilder(startLine+1, 0, endLine, 0);
        const textToken: { text: Text } = this.tokenUtils.textTokenJsonBuilder(value, position);
        const element: {element: Element} = this.tokenUtils.elementWithinTextTokenJsonBuilder(`p`, textToken, position);
        return element;
    }
}

export {
    ParagraphTokenStrategy
}
