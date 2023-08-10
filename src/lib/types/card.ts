export enum CardSuit {
    Hearts,
    Leaves,
    Bells,
    Acorns
}

export enum CardRank {
    Seven,
    Eight,
    Nine,
    Ten,
    Unter,
    Ober,
    King,
    Ass
}

export interface Card {
    readonly suit: CardSuit;
    readonly rank: CardRank;
    readonly value: number;
}