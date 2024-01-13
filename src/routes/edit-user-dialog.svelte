<script>
	import { createEventDispatcher } from 'svelte';
	import * as Payloads from '$lib/payloads';
	import * as Types from '$lib/types';

	/** @type {?Types.User}*/
	export let currentUser;

	/** @type Payloads.UpdateUser */
	const credentials = {
		UserName: currentUser ? currentUser.UserName : '',
		Email: currentUser ? currentUser.Email : ''
	};

	const dispatch = createEventDispatcher();

	const cancel = () => dispatch('cancel');

	const updateUser = () => dispatch('updateUser', credentials);
</script>

<div class="dialog-30" id="edit-user-dialog">
	<div class="dialog-header">
		<h3>Update User</h3>
	</div>
	<div class="dialog-content">
		<div class="field">
			<label for="user-name" class="block">User Name</label>
			<input
				type="text"
				name="user-name"
				id="edit-user-user-name"
				bind:value={credentials.UserName}
			/>
		</div>
	</div>
	<div class="field">
		<label for="email" class="block">Email</label>
		<input type="email" name="email" id="edit-user-email" bind:value={credentials.Email} />
	</div>
	<div class="dialog-button">
		<button on:click={cancel}>Cancel</button>
		<button on:click={updateUser}>Update User</button>
	</div>
</div>
