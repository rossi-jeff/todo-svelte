<script>
	import { createEventDispatcher } from 'svelte';
	import * as Types from '$lib/types';

	export let /** @type Types.Session */ session;

	const dispatch = createEventDispatcher();

	const openSignIn = () => dispatch('openSignIn');

	const openRegister = () => dispatch('openRegister');

	const openRandom = () => dispatch('openRandom');

	const signOut = () => dispatch('signOut');
</script>

<div class="flex justify-between">
	<h1>ToDo App</h1>
	{#if session.SignedIn}
		<div class="flex">
			<div>{session.UserName}</div>
			<button class="ml-2" on:click={signOut}>Sign Out</button>
		</div>
	{:else}
		<div class="flex">
			<button on:click={openRegister}>Register</button>
			<button class="ml-2" on:click={openSignIn}>Sign In</button>
			<button class="ml-2" on:click={openRandom}>Random</button>
		</div>
	{/if}
</div>
