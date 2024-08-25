interface AstRoot {
    type: TokenType;
    children: Array<{ element: Element } | null>;
    position: Position;
}

interface Element {
    type: TokenType;
    tagName: string;
    children: Array<{ text: Text } | {element: Element} | null>;
    position: Position
}

interface Text {
    type: TokenType;
    value: string;
    position: Position
}

interface BoldElement {
    type: TokenType,
    tagName: string,
    children: Array<{ text: Text } | { element: ItalicElement }>
}

interface ItalicElement {
    type: TokenType,
    tagName: string,
    children: Array<{ text: Text }>
}

interface Position {
    start: {
        line: number;
        column: number;
    };
    end: {
        line: number;
        column: number;
    };
}


enum TokenType {
    ROOT = `ROOT`,
    ELEMENT = `ELEMENT`,
    TEXT = `TEXT`,
}

export {
    TokenType,
    // AST Root
    AstRoot,
    // Html Elements
    Element,
    // Text
    Text,
    Position
}
