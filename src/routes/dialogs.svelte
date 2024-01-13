<script>
	import { createEventDispatcher } from 'svelte';
	import RandomDialog from './random-dialog.svelte';
	import RegisterDialog from './register-dialog.svelte';
	import SignInDialog from './sign-in-dialog.svelte';
	import NewTodoDialog from './new-todo-dialog.svelte';
	import EditUserDialog from './edit-user-dialog.svelte';
	import * as Types from '$lib/types';
	import ChangePassWordDialog from './change-pass-word-dialog.svelte';

	export let /** @type {Array.<string>} */ userNames;

	export let /** @type {?Types.User}*/ currentUser;

	const dispatch = createEventDispatcher();

	const closeSignIn = () => dispatch('closeSignIn');

	const closeRegister = () => dispatch('closeRegister');

	const closeRandom = () => dispatch('closeRandom');

	const signIn = (/** @type {{ detail: any; }} */ e) => dispatch('signIn', e.detail);

	const randomSignIn = (/** @type {{ detail: any; }} */ e) => dispatch('randomSignIn', e.detail);

	const register = (/** @type {{ detail: any; }} */ e) => dispatch('register', e.detail);

	const closeNewTodo = () => dispatch('closeNewTodo');

	const addTodo = (/** @type {{ detail: any; }} */ e) => dispatch('addTodo', e.detail);

	const closeEditUser = () => dispatch('closeEditUser');

	const updateUser = (/** @type {{ detail: any; }} */ e) => dispatch('updateUser', e.detail);

	const closeChangePassWord = () => dispatch('closeChangePassWord');

	const changePassWord = (/** @type {{ detail: any; }} */ e) =>
		dispatch('changePassWord', e.detail);
</script>

<div class="modal-overlay" id="modal-overlay">
	<SignInDialog on:cancel={closeSignIn} on:signIn={signIn} />
	<RegisterDialog on:cancel={closeRegister} on:register={register} />
	<RandomDialog on:cancel={closeRandom} on:signIn={randomSignIn} {userNames} />
	<NewTodoDialog on:cancel={closeNewTodo} on:addTodo={addTodo} />
	{#if currentUser}
		<EditUserDialog on:cancel={closeEditUser} on:updateUser={updateUser} {currentUser} />
		<ChangePassWordDialog on:cancel={closeChangePassWord} on:changePassWord={changePassWord} />
	{/if}
</div>
