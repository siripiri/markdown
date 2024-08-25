import { Text, Element, Position } from "../TokenizationTypes";
import { TokenUtils } from "../TokenUtils";
import { TokenStrategy } from "./TokenStrategy";

class HeaderTokenStrategy implements TokenStrategy {

    private regExp: RegExp = /(?:\s|^)(#{1,6})(?:\s{1})(.+)/;
    tokenUtils: TokenUtils;

    constructor(tokenUtils: TokenUtils) {
        this.tokenUtils = tokenUtils;
    }

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
            return this.headerJsonBuilder(results, lines[0], line);
        }
        return null;
    }

    private headerJsonBuilder(results: RegExpExecArray, line: string, lineLen: number) {
        let tagLen: number = results[1].length;
        let value = results[2];
        const position: Position = this.tokenUtils.positionJsonBuilder(lineLen, 0, lineLen, 0);
        const textToken: { text: Text } = this.tokenUtils.textTokenJsonBuilder(value, position);
        return this.tokenUtils.elementWithinTextTokenJsonBuilder(`h${tagLen}`, textToken, position);
    }
}

export {
    HeaderTokenStrategy
}
