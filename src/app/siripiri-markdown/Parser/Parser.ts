import { Tokenization } from "../Tokenization/Tokenization";
import { AstRoot, Element, TokenType } from "../Tokenization/TokenizationTypes";

class Parser {
    private markdownString: String;
    private token: Tokenization;
    private lookAhead;

    constructor(markdownString: string) {
        this.markdownString = markdownString;
        this.token = new Tokenization(markdownString);
        this.lookAhead = this.token.getNextToken();
        console.log(`lookahead: ` + this.lookAhead);

        console.log(this.documentToken());
        console.log(JSON.stringify(this.documentToken()));
    }

    documentToken() : AstRoot {
        return {
            type: TokenType.ROOT,
            children: this.collectChildrenTokens(),
            position: {
                start: {
                    column: 0,
                    line: 1
                },
                end: {
                    column: 0,
                    line: 0
                }
            }
        };
    }

    collectChildrenTokens(): Array<any | null> {
        let childrenToken:Array<{element: Element} | null> = [this.lookAhead];
        let lines = this.markdownString.split(`\n`);
        while(!this.token.noMoreTokens(lines)) {
            console.log(`In collectChild()`);
            this.lookAhead = this.token.getNextToken();
            console.log(`asd: ` + JSON.stringify(this.lookAhead));
            if(this.lookAhead != null)
                childrenToken.push(this.lookAhead);
            else
                break;
        }
        return childrenToken;
    }
}

export {
    Parser
}