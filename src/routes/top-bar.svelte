<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const openSignIn = () => dispatch('openSignIn');

	const openRegister = () => dispatch('openRegister');

	const openRandom = () => dispatch('openRandom');
</script>

<div class="flex justify-between">
	<h1>ToDo App</h1>
	<div class="flex">
		<button on:click={openRegister}>Register</button>
		<button class="ml-2" on:click={openSignIn}>Sign In</button>
		<button class="ml-2" on:click={openRandom}>Random</button>
	</div>
</div>
