<script>
	import { createEventDispatcher } from 'svelte';
	import RandomDialog from './random-dialog.svelte';
	import RegisterDialog from './register-dialog.svelte';
	import SignInDialog from './sign-in-dialog.svelte';
	export let /** @type {Array.<string>} */ userNames;

	const dispatch = createEventDispatcher();

	const closeSignIn = () => dispatch('closeSignIn');

	const closeRegister = () => dispatch('closeRegister');

	const closeRandom = () => dispatch('closeRandom');

	const signIn = (/** @type {{ detail: any; }} */ e) => dispatch('signIn', e.detail);

	const randomSignIn = (/** @type {{ detail: any; }} */ e) => dispatch('randomSignIn', e.detail);

	const register = (/** @type {{ detail: any; }} */ e) => dispatch('register', e.detail);
</script>

<div class="modal-overlay" id="modal-overlay">
	<SignInDialog on:cancel={closeSignIn} on:signIn={signIn} />
	<RegisterDialog on:cancel={closeRegister} on:register={register} />
	<RandomDialog on:cancel={closeRandom} on:signIn={randomSignIn} {userNames} />
</div>
