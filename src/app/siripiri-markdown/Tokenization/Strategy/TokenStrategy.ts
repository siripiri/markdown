import { Element } from "../TokenizationTypes";

interface TokenStrategy {
    isMatch(markdown: string, line: number): boolean;
    tokenize(markdown: string, line: number): { element: Element } | null;
}

export {
    TokenStrategy
}