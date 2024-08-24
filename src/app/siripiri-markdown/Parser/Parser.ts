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
    }

    parse(): HTMLElement | DocumentFragment {
        let ast = this.documentToken();
        console.log(ast);
        console.log(this.astToHtml(ast));
        return this.astToHtml(ast);
    }

    documentToken(): AstRoot {
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
        let childrenToken: Array<{ element: Element } | null> = [this.lookAhead];
        let lines = this.markdownString.split(`\n`);
        while (!this.token.noMoreTokens(lines)) {
            console.log(`In collectChild()`);
            this.lookAhead = this.token.getNextToken();
            console.log(`asd: ` + JSON.stringify(this.lookAhead));
            if (this.lookAhead != null)
                childrenToken.push(this.lookAhead);
            else
                break;
        }
        return childrenToken;
    }

    astToHtml(ast: AstRoot): HTMLElement | DocumentFragment {
        console.log(`inside astToHtml:`);
        console.log(ast);
        const fragment = document.createDocumentFragment();

        ast.children.forEach((child) => {
            if (child != null) {
                const htmlElement = this.convertElementToHtml(child.element);
                fragment.appendChild(htmlElement);
            }
        });

        return fragment;
    }

    convertElementToHtml(element: Element): HTMLElement {
        const htmlElement = document.createElement(element.tagName);

        if(element.children == null)
            return htmlElement;

        element.children.forEach((child: { text: { value: string; }; } | null) => {
            if (child !== null && child.text) {
                const textNode = document.createTextNode(child.text.value);
                htmlElement.appendChild(textNode);
            }
        });

        return htmlElement;
    }
}

export {
    Parser
}