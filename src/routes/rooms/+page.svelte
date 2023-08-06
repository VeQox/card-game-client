<script lang="ts">
	import AccountIcon from './../../lib/components/accountIcon.svelte';
	import OnlineCardGamesLogo from './../../lib/components/onlineCardGamesLogo.svelte';
	import { AppBar, SlideToggle } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";

    let username: string = "";
    $: username = username.trim();

    let isPrivate: boolean = true;
    $: sliderLabel = isPrivate ? "Private" : "Public";

    onMount(() => {
        username = localStorage.getItem("username") ?? "";
    })
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
            <input bind:value={username} on:change={() => {
                localStorage.setItem("username", username);
            }} type="search" placeholder="username" class="outline-none p-1" />
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
                <input type="search" placeholder="abcd" class="input outline-none p-1" />
            </section>
            <footer class="card-footer flex justify-center">
                <button class="btn variant-filled-primary btn-md">Join</button>
            </footer>
        </div>
        <div class="card card-hover">
            <header class="card-header flex justify-center">
                <h3 class="h3">Create room</h3>
            </header>
            <section class="p-4 space-y-2">
                <div>
                    <p>Enter a room name</p>
                    <input type="search" placeholder="{username}'s room" class="input outline-none p-1" />
                </div>
                <div>
                    <p>Enter room capacity</p>
                    <input type="search" placeholder="2" class="input outline-none p-1" />
                </div>
                <SlideToggle 
                    name="slider-label" 
                    bind:checked={isPrivate}
                    active="bg-primary-500">{sliderLabel}</SlideToggle>
            </section>
            <footer class="card-footer flex justify-center">
                <button class="btn variant-filled-primary btn-md">Create Room</button>
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
