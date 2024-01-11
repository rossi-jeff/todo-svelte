<script>
	import { createEventDispatcher } from 'svelte';
	import * as Payloads from '$lib/payloads';
	export let /** @type {Array.<string>} */ userNames;

	/** @type Payloads.SignIn */
	const credentials = {
		UserName: 'foo',
		PassWord: 'T0pS3cret!'
	};

	const dispatch = createEventDispatcher();

	const cancel = () => dispatch('cancel');

	const signIn = () => {
		if (!credentials.UserName || !credentials.PassWord) return;
		dispatch('signIn', credentials);
	};
</script>

<div class="dialog-30" id="random-dialog">
	<div class="dialog-header">
		<h3>Sign In</h3>
	</div>
	<div class="dialog-content">
		<div class="field">
			<label for="user-name" class="block">User Name</label>
			<select name="user-name" id="random-user-name" bind:value={credentials.UserName}>
				<option value=""> - Select - </option>
				{#each userNames as u}
					<option value={u}>{u}</option>
				{/each}
			</select>
		</div>
	</div>
	<div class="dialog-button">
		<button on:click={cancel}>Cancel</button>
		<button on:click={signIn}>Sign In</button>
	</div>
</div>
