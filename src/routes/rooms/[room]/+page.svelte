<script lang="ts">
	import { onMount } from "svelte";
	import type { PageServerData } from "./$types";
	import { user } from "$lib/stores/userStore";
	import { WebSocketClientEvent, WebSocketServerEvent, type WebSocketServerMessage } from "$lib/types/message";

    export let data: PageServerData;
    
    let responses: string[] = [];
    $: responses = [...responses];

    let gameStarted = false;
    let isCurrentPlayer = false;
    let isDealer = false;

    onMount(async() => {
        startConnection();
    });

    let ws : WebSocket | undefined;
    const startConnection = () => {
        ws = new WebSocket(`ws://localhost:5129/ws/rooms/${data.room}?username=${$user.name}`);
        condigureWebsocket(ws);
    }

    const reconnect = () => {
        ws = new WebSocket(`ws://localhost:5129/ws/rooms/${data.room}/reconnect/${$user.id}`)
        condigureWebsocket(ws)
    }

    const condigureWebsocket = (ws: WebSocket) => {
        ws.onclose = () => {
        }

        ws.onmessage = (e) => {
            let response = JSON.parse(e.data) as WebSocketServerMessage;
            //responses.push(response);
            //responses = responses;  

            handleMessage(response)
        }

        ws.onopen = () => {
        }
    }

    const handleMessage = (message: WebSocketServerMessage) => {
        console.log(message)
        if(message.event === WebSocketServerEvent.StartGame){
            gameStarted = true;
        }
        if(message.event === WebSocketServerEvent.NotifyDealer){
            isDealer = true;
        }
        if(message.event === WebSocketServerEvent.NotifyPlayer) {
            isCurrentPlayer = true;
        }
        if(message.event === WebSocketServerEvent.UpdateCommunityCards){
            responses.push(JSON.stringify(message));
        }
        if(message.event === WebSocketServerEvent.UpdateHand){
            responses.push(JSON.stringify(message));
        }
        if(message.event === WebSocketServerEvent.UpdatePlayer){
            responses.push(JSON.stringify(message));
        }
        if(message.event === WebSocketServerEvent.EndRound) {
            responses.length = 0;
        }
        if(message.event === WebSocketServerEvent.EndGame) {
            responses.push(JSON.stringify(message));
        }
        responses = responses;
    }
</script>

<div>
    <input bind:value={data.room}>
    <input bind:value={$user.id}>
    <button on:click={reconnect} >Reconnect</button>
</div>

<div>
    <button disabled={gameStarted} on:click={() => {
        ws?.send(JSON.stringify({
            "event": WebSocketClientEvent.StartGame,
        }))
    }}>Start game</button>
</div>

<div>
    <button disabled={!isDealer} on:click={() => {
        ws?.send(JSON.stringify({
            "event": WebSocketClientEvent.DealerAcceptCards,
        }))
        isDealer = false;
    }}>Accept cards</button>
    <button disabled={!isDealer} on:click={() => {
        ws?.send(JSON.stringify({
            "event": WebSocketClientEvent.DealerRejectCards,
        }))
        isDealer = false;
    }}>Reject cards</button>
</div>

<div>
    <button disabled={!isCurrentPlayer} on:click={() => {
        ws?.send(JSON.stringify({
            "event": WebSocketClientEvent.PlayerSwapCard,
        }))
        isCurrentPlayer = false;
    }}>Swap cards</button>
    <button disabled={!isCurrentPlayer} on:click={() => {
        ws?.send(JSON.stringify({
            "event": WebSocketClientEvent.PlayerSwapAll,
        }))
        isCurrentPlayer = false;
    }}>Swap all</button>
    <button disabled={!isCurrentPlayer} on:click={() => {
        ws?.send(JSON.stringify({
            "event": WebSocketClientEvent.PlayerSkipTurn,
        }))
        isCurrentPlayer = false;
    }}>Skip turn</button>
    <button disabled={!isCurrentPlayer} on:click={() => {
        ws?.send(JSON.stringify({
            "event": WebSocketClientEvent.PlayerLockTurn,
        }))
        isCurrentPlayer = false;
    }}>Lock turn</button>
</div>

<div>
    {#each responses as response}
        <p>{response}</p>
    {/each}
</div>