import { Element, Position } from "../TokenizationTypes";
import { TokenUtils } from "../TokenUtils";
import { TokenStrategy } from "./TokenStrategy";

class OrderedListTokenStrategy implements TokenStrategy {

    private regExp: RegExp = /(^(\d+)\.\s+)(.*)/;
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
        let lineCounter = line;

        while(lineCounter<lines.length && this.isMatch(markdown, lineCounter))
            lineCounter++;

        for(let i=line; i<lineCounter; i++)
            console.log(lines[i]);

        return this.orderedListJsonBuilder(lines, line, lineCounter);
    }

    private orderedListJsonBuilder(markdown: string[], startLine: number, endLine: number): { element: Element } {
        const liTags: {element: Element} [] = [];
        for(let i=startLine; i<endLine; i++) {
            const position = this.tokenUtils.positionJsonBuilder(i,0,i,0);
            let temp: string = '';
            if(markdown[i].length > 3) {
                let index = this.regExp.exec(markdown[i]);
                if(index != null) {
                    temp = markdown[i].slice(index[1].length);
                }
            } 
            const textToken = this.tokenUtils.textTokenJsonBuilder(temp, position);
            const elementToken = this.tokenUtils.elementWithinTextTokenJsonBuilder(`li`, textToken, position);
            liTags.push(elementToken);
        }
        let position: Position = this.tokenUtils.positionJsonBuilder(startLine,0,endLine,0);
        const elementToken: {element: Element} = this.tokenUtils.elementWithinElementTokenJsonBuilder(`ol`, liTags, position);
        return elementToken;
    }
}

export {
    OrderedListTokenStrategy
}
