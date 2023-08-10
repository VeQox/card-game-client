<script lang="ts">
    import type { User } from '$lib/types/user'
	import type { Writable } from 'svelte/store';
	import AccountIcon from './../../lib/components/accountIcon.svelte';
	import OnlineCardGamesLogo from './../../lib/components/onlineCardGamesLogo.svelte';
	import { AppBar, SlideToggle } from "@skeletonlabs/skeleton";
    import { getContext, onMount } from "svelte";
    import { user } from '$lib/stores/userStore';

    let isPublic: boolean = true;
    let room: string | undefined;
    let capacity: string | undefined;
    $: sliderLabel = isPublic ? "Public" : "Private";   

    const createRoom = async() => {
        const response = await fetch("http://localhost:5129/api/rooms/", {
            method: "POST",
            headers: new Headers({"content-type": "application/json"}),
            body: JSON.stringify({
                name: room ?? `{$user.name}'s room`,
                isPublic: isPublic,
                capacity: isNaN(Number(capacity)) ? 2 : Number(capacity)
            })
        });

        if(response.status == 201){
            let { id } = await response.json();
            location.href = `/rooms/${id}`;
        }
    }


    let roomCode: string = "";
    const joinRoom = async() => {
        const response = await fetch(`http://localhost:5129/api/rooms/${roomCode}`);
        if(response.status === 200){
            location.href = `/rooms/${roomCode}`;
        }
    }
</script>


<AppBar 
    gridColumns="md:grid-cols-[auto_1fr_auto] grid-cols-1" 
    slotDefault="place-self-center" 
    slotTrail="place-content-end" 
    slotLead="md:block hidden" 
    gap="">

    <svelte:fragment slot="lead">
        <OnlineCardGamesLogo/>
    </svelte:fragment>
	<svelte:fragment slot="trail">
        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] outline-none">
            <div class="input-group-shim">
                <AccountIcon/>
            </div>
            <input bind:value={$user.name} type="search" placeholder="username" class="outline-none p-1" />
        </div>
    </svelte:fragment>
</AppBar>


<div class="w-full flex justify-center flex-col items-center mt-4">
    <div class="md:w-11/12 w-full space-y-4">
        <div class="card card-hover">
            <header class="card-header flex justify-center">
                <h3 class="h3">Join room</h3>
            </header>
            <section class="p-4">
                <p>Enter a room code</p>
                <input type="search" placeholder="abcd" bind:value={roomCode} class="input outline-none p-1" />
            </section>
            <footer class="card-footer flex justify-center">
                <button class="btn variant-filled-primary btn-md" on:click={joinRoom}>Join</button>
            </footer>
        </div>
        <div class="card card-hover">
            <header class="card-header flex justify-center">
                <h3 class="h3">Create room</h3>
            </header>
            <section class="p-4 space-y-2">
                <div>
                    <p>Enter a room name</p>
                    <input type="search" placeholder="{$user.name}'s room" bind:value={room} class="input outline-none p-1" />
                </div>
                <div>
                    <p>Enter room capacity</p>
                    <input type="search" placeholder="2" bind:value={capacity} class="input outline-none p-1" />
                </div>
                <SlideToggle 
                    name="slider-label" 
                    bind:checked={isPublic}
                    active="bg-primary-500">{sliderLabel}</SlideToggle>
            </section>
            <footer class="card-footer flex justify-center">
                <button class="btn variant-filled-primary btn-md" on:click={createRoom}>Create Room</button>
            </footer>
        </div> 
        <div class="card card-hover">
            <header class="card-header flex justify-center">
                <h3 class="h3">Public rooms</h3>
            </header>
            <section class="p-4 space-y-2">
                <div class="flex space-x-3">
                    <input type="search" placeholder="filter" class="input outline-none p-1" />
                    <button class="btn variant-filled-primary btn-sm">Refresh</button>
                </div>
                <div class="flex items-center justify-center h-10 rounded-md bg-surface-700">
                    <p class="text-xl font-bold text-center text-tertiary-700">No Public Rooms</p>
                </div>
            </section>
        </div> 
    </div>
</div>
