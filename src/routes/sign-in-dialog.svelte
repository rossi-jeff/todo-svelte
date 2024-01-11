<script>
	import { createEventDispatcher } from 'svelte';
	import * as Payloads from '$lib/payloads';

	/** @type Payloads.SignIn */
	const credentials = {
		UserName: '',
		PassWord: ''
	};

	const dispatch = createEventDispatcher();

	const cancel = () => dispatch('cancel');

	const signIn = () => {
		if (!credentials.UserName || !credentials.PassWord) return;
		dispatch('signIn', credentials);
	};
</script>

<div class="dialog-30" id="sign-in-dialog">
	<div class="dialog-header">
		<h3>Sign In</h3>
	</div>
	<div class="dialog-content">
		<div class="field">
			<label for="user-name" class="block">User Name</label>
			<input
				type="text"
				name="user-name"
				id="sign-in-user-name"
				bind:value={credentials.UserName}
			/>
		</div>
		<div class="field">
			<label for="pass-word" class="block">Password</label>
			<input
				type="password"
				name="pass-word"
				id="sign-in-pass-word"
				bind:value={credentials.PassWord}
			/>
		</div>
	</div>
	<div class="dialog-button">
		<button on:click={cancel}>Cancel</button>
		<button on:click={signIn}>Sign In</button>
	</div>
</div>
