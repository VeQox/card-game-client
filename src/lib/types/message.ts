import type { Card } from "./card";
import type { Player } from "./player";
import type { User } from "./user";

export enum WebSocketClientEvent {
	StartGame,
	DealerAcceptCards,
	DealerRejectCards,
	PlayerSwapAll,
	PlayerSwapCard,
	PlayerSkipTurn,
	PlayerLockTurn,
}

export enum WebSocketServerEvent {
	UpdateRoom,
    StartGame,
    NotifyDealer,
    NotifyPlayer,
    UpdatePlayer,
    UpdateHand,
    UpdateCommunityCards,
    EndRound,
    EndGame,
    Error
}

export interface WebSocketClientMessage {
	event: WebSocketClientEvent;
}


export interface WebSocketServerMessage {
	event: WebSocketServerEvent;
}