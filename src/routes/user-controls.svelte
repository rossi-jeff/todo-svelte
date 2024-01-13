<script>
	import { createEventDispatcher } from 'svelte';

	/**
	 * @type {string}
	 */
	export let userName;

	const dispatch = createEventDispatcher();

	const edit = () => dispatch('openEditUser');

	const changePW = () => dispatch('openChangePassWord');
</script>

<div class="w-full text-right mt-2">
	<button on:click={edit}>Edit {userName}</button>
	<button on:click={changePW} class="ml-2">Change Password</button>
</div>
