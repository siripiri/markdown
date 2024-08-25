import { Element } from "../TokenizationTypes";
import { TokenUtils } from "../TokenUtils";

interface TokenStrategy {

    tokenUtils: TokenUtils;

    isMatch(markdown: string, line: number): boolean;
    tokenize(markdown: string, line: number): { element: Element } | null;
}

export {
    TokenStrategy
}
