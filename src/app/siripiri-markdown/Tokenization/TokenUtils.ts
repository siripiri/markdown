import { Text, TokenType, Position, Element } from "./TokenizationTypes";

class TokenUtils {
    textTokenJsonBuilder(value: string, position: Position): { text: Text } {
        const textToken: Text = {
            type: TokenType.TEXT,
            value: value,
            position: position
        }
        return { text: textToken };
    }
    
    elementWithinElementTokenJsonBuilder(tagName: string, elements: {element: Element}[], position: Position): { element: Element } {
        const element: Element = {
            type: TokenType.ELEMENT,
            tagName: tagName,
            children: elements,
            position: position
        }
        return { element: element };
    }
    
    elementWithinTextTokenJsonBuilder(tagName: string, textToken: {text: Text}, position: Position): { element: Element } {
        const element: Element = {
            type: TokenType.ELEMENT,
            tagName: tagName,
            children: [textToken],
            position: position
        }
        return { element: element };
    }
    
    positionJsonBuilder(startLine: number, startColumn: number, endLine: number, endColumn: number) {
        const position: Position = {
            start: {
                line: startLine,
                column: startColumn
            },
            end: {
                line: endLine,
                column: endColumn
            }
        }
        return position;
    }
}

export {
    TokenUtils
}
