<script lang="ts">
	import { json } from "@sveltejs/kit";
	import { onMount } from "svelte";

    let responses: string[] = [];
    $: responses = [...responses];
    let id = "";

    onMount(async() => {

    });

    let ws : WebSocket | undefined;
    const startConnection = (roomId: string) => {
        ws = new WebSocket(`ws://localhost:5129/ws/rooms/${roomId}`);
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
        const response = await fetch("http://localhost:5129/api/rooms", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "Name": "Very cool room",
                "Capacity": 2,
                "IsPublic": true,
            })
        });

        let { id } = await response.json();

        responses.push(`Created room[${id}]`)

        startConnection(id)
    }

    let name: string;

</script>

<div>
    <input bind:value={id}>
    <button on:click={() => startConnection(id)}>Connect</button>
</div>

<div>
    <button on:click={() => createRoom()} >Create</button>
</div>

<div>
    <input bind:value={name}>
    <button on:click={() => {
        ws?.send(JSON.stringify({
            "event": 0,
            "name": name
        }))
    }}>Join as {name}</button>
</div>

<div>
    <button on:click={() => {
        ws?.send(JSON.stringify({
            "event": 1,
        }))
    }}>Start game</button>
</div>

<div>
    <button on:click={() => {
        ws?.send(JSON.stringify({
            "event": 2,
        }))
    }}>Accept cards</button>
    <button on:click={() => {
        ws?.send(JSON.stringify({
            "event": 3,
        }))
    }}>Reject cards</button>
</div>

<div>
    <button on:click={() => {
        ws?.send(JSON.stringify({
            "event": 4,
        }))
    }}>Swap cards</button>
    <button on:click={() => {
        ws?.send(JSON.stringify({
            "event": 5,
        }))
    }}>Skip turn</button>
    <button on:click={() => {
        ws?.send(JSON.stringify({
            "event": 6,
        }))
    }}>Lock turn</button>
</div>

<div>
    {#each responses as response}
        <p>{response}</p>
    {/each}
</div>