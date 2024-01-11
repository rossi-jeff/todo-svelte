<script>
	import { createEventDispatcher } from 'svelte';
	import * as Payloads from '$lib/payloads';

	/** @type Payloads.Register */
	const credentials = {
		UserName: '',
		PassWord: '',
		Email: ''
	};

	const dispatch = createEventDispatcher();

	const cancel = () => dispatch('cancel');

	const register = () => {
		if (!credentials.UserName || !credentials.PassWord) return;
		dispatch('register', credentials);
	};
</script>

<div class="dialog-30" id="register-dialog">
	<div class="dialog-header">
		<h3>Register</h3>
	</div>
	<div class="dialog-content">
		<div class="field">
			<label for="user-name" class="block">User Name</label>
			<input
				type="text"
				name="user-name"
				id="register-user-name"
				bind:value={credentials.UserName}
			/>
		</div>
		<div class="field">
			<label for="pass-word" class="block">Password</label>
			<input
				type="password"
				name="pass-word"
				id="register-pass-word"
				bind:value={credentials.PassWord}
			/>
		</div>
		<div class="field">
			<label for="email" class="block">Email</label>
			<input type="email" name="email" id="register-email" bind:value={credentials.Email} />
		</div>
	</div>
	<div class="dialog-button">
		<button on:click={cancel}>Cancel</button>
		<button on:click={register}>Register</button>
	</div>
</div>
