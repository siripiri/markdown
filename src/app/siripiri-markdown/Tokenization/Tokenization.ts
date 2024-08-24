import { Element } from "./TokenizationTypes";
import { TokenStrategy } from "./Strategy/TokenStrategy";
import { HeaderTokenStrategy } from "./Strategy/HeaderTokenStrategy";
import { ParagraphTokenStrategy } from "./Strategy/ParagraphTokenStrategy";

class Tokenization {
    public markdownString: string;
    public line: number;
    private __tokenStrategies: TokenStrategy[];

    constructor(markdownString: string) {
        this.markdownString = markdownString;
        this.line = 0;
        this.__tokenStrategies = [
            new HeaderTokenStrategy(),
            new ParagraphTokenStrategy()
        ]
    }

    noMoreTokens(markdownLines: string[]): boolean {
        return this.line >= markdownLines.length;
    }

    getNextToken(): { element: Element } | null {
        let markdownLines = this.markdownString.split(`\n`);
        let childrenToken: { element: Element } | null = null;

        if (this.noMoreTokens(markdownLines))
            return null;

        for (const strategy of this.__tokenStrategies) {

            if (this.noMoreTokens(markdownLines))
                return childrenToken;

            while (this.line < markdownLines.length && markdownLines[this.line].trim() === '')
                this.line++;

            if(this.line > markdownLines.length)
                break;

            if (strategy.isMatch(this.markdownString, this.line)) {
                childrenToken = strategy.tokenize(this.markdownString, this.line);
                if (childrenToken != null) {
                    this.line = childrenToken.element.position.end.line;
                    console.log(`Updated Line: ${this.line}`);
                }
                break;
            }
        }
        return childrenToken;
    }
}

export {
    Tokenization
}