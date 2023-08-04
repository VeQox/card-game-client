<script lang="ts">
	import { json } from "@sveltejs/kit";
	import { onMount } from "svelte";

    let id: string = "";

    enum WebSocketClientEvent {
        JoinRoom,
        StartGame,
        DealerAcceptCards,
        DealerRejectCards,
        PlayerSwapAll,
        PlayerSwapCard,
        PlayerSkipTurn,
        PlayerLockTurn,
    }

    let responses: string[] = [];
    $: responses = [...responses];
    onMount(async() => {

    });

    let ws : WebSocket | undefined;
    const startConnection = () => {
        ws = new WebSocket(`ws://localhost:5129/ws/rooms/${id}`);
        ws.onclose = () => {
            responses.push("Connection closed");
            responses = responses;   
        }

        ws.onmessage = (e) => {
            responses.push(e.data)
            responses = responses;  
        }

        ws.onopen = () => {
            responses.push("Connection opened");
            responses = responses;
        }
    }

    const createRoom = async() => {
        const response = await fetch("http://localhost:5129/api/rooms/", {
            method: "POST",
            headers: new Headers({"content-type": "application/json"}),
            body: JSON.stringify({
                name: "verycoolname",
                isPublic: true,
                capacity: 2
            })
        });

        id = await response.text();
    }

    let name: string = "";
</script>

<div>
    <button on:click={createRoom} >Create Room</button>
</div>

<div>
    <input bind:value={id}>
    <button on:click={startConnection} >Connect to Room</button>
</div>

<div>
    <input bind:value={name}>
    <button on:click={() => {
        ws?.send(JSON.stringify({
            "event": WebSocketClientEvent.JoinRoom,
            "name": name
        }))
    }} >Join Room</button>
</div>

<div>
    <button on:click={() => {
        ws?.send(JSON.stringify({
            "event": WebSocketClientEvent.StartGame,
        }))
    }}>Start game</button>
</div>

<div>
    <button on:click={() => {
        ws?.send(JSON.stringify({
            "event": WebSocketClientEvent.DealerAcceptCards,
        }))
    }}>Accept cards</button>
    <button on:click={() => {
        ws?.send(JSON.stringify({
            "event": WebSocketClientEvent.DealerRejectCards,
        }))
    }}>Reject cards</button>
</div>

<div>
    <button on:click={() => {
        ws?.send(JSON.stringify({
            "event": WebSocketClientEvent.PlayerSwapCard,
        }))
    }}>Swap cards</button>
    <button on:click={() => {
        ws?.send(JSON.stringify({
            "event": WebSocketClientEvent.PlayerSwapAll,
        }))
    }}>Swap all</button>
    <button on:click={() => {
        ws?.send(JSON.stringify({
            "event": WebSocketClientEvent.PlayerSkipTurn,
        }))
    }}>Skip turn</button>
    <button on:click={() => {
        ws?.send(JSON.stringify({
            "event": WebSocketClientEvent.PlayerLockTurn,
        }))
    }}>Lock turn</button>
</div>

<div>
    {#each responses as response}
        <p>{response}</p>
    {/each}
</div>