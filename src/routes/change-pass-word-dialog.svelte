<script>
	import { createEventDispatcher } from 'svelte';
	import * as Payloads from '$lib/payloads';

	/** @type Payloads.ChangePassWord */
	const credentials = {
		OldPassWord: '',
		NewPassWord: '',
		Confirmation: ''
	};

	const dispatch = createEventDispatcher();

	const cancel = () => dispatch('cancel');

	const changePassWord = () => dispatch('changePassWord', credentials);
</script>

<div class="dialog-30" id="change-pass-word-dialog">
	<div class="dialog-header">
		<h3>Change PassWord</h3>
	</div>
	<div class="dialog-content">
		<div class="field">
			<label for="old-pass-word">Old PassWord</label>
			<input
				type="password"
				name="old-pass-word"
				id="old-pass-word"
				bind:value={credentials.OldPassWord}
			/>
		</div>
		<div class="field">
			<label for="new-pass-word">New PassWord</label>
			<input
				type="password"
				name="new-pass-word"
				id="new-pass-word"
				bind:value={credentials.NewPassWord}
			/>
		</div>
		<div class="field">
			<label for="confirmation">Confirmation</label>
			<input
				type="password"
				name="confirmation"
				id="confirmation"
				bind:value={credentials.Confirmation}
			/>
		</div>
	</div>
	<div class="dialog-button">
		<button on:click={cancel}>Cancel</button>
		<button on:click={changePassWord}>Change PassWord</button>
	</div>
</div>
