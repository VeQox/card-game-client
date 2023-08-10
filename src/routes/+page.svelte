<script lang="ts">
	import type { User } from "$lib/types/user";
	import { focusTrap } from "@skeletonlabs/skeleton";
	import { onMount, setContext } from "svelte";
	import { user } from "$lib/stores/userStore"

    const onSubmit = () => {
        if($user.name.length == 0) return;
        location.href = "/rooms";
    }
</script>



<div class="w-full h-full flex justify-center items-center flex-col">
    <h3 class="h3">Welcome to</h3>
    <h1 class="h1">Online Card Games</h1>
    <form on:submit|preventDefault={onSubmit} use:focusTrap={true} class="w-1/2 mt-10 space-y-1">
        <h4 class="h4 -my-1">Enter your username</h4>
        <input bind:value={$user.name} class="input outline-none p-1" placeholder="chad123">
        <button type="submit" class="btn variant-filled-primary btn-sm float-right">Play</button>
    </form>
</div>