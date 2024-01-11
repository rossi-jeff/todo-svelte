<script>
	import TopBar from './top-bar.svelte';
	import BottomBar from './bottom-bar.svelte';
	import Dialogs from './dialogs.svelte';
	import * as Payloads from '$lib/payloads';

	const openOverlay = () => {
		const overlay = document.getElementById('modal-overlay');
		if (overlay) overlay.classList.add('open');
	};

	const closeOverlay = () => {
		const overlay = document.getElementById('modal-overlay');
		if (overlay) overlay.classList.remove('open');
	};

	const openDialog = (/** @type {string} */ id) => {
		const dialog = document.getElementById(id);
		if (dialog) dialog.classList.add('open');
		openOverlay();
	};

	const closeDialog = (/** @type {string} */ id) => {
		const dialog = document.getElementById(id);
		if (dialog) dialog.classList.remove('open');
		closeOverlay();
	};

	const openSignIn = () => openDialog('sign-in-dialog');

	const openRegister = () => openDialog('register-dialog');

	const openRandom = () => openDialog('random-dialog');

	const closeSignIn = () => closeDialog('sign-in-dialog');

	const closeRegister = () => closeDialog('register-dialog');

	const closeRandom = () => closeDialog('random-dialog');

	const signIn = (/** @type {{ detail: Payloads.SignIn; }} */ event) => {
		/** @type Payloads.SignIn */
		const credentials = event.detail;
		const { UserName, PassWord } = credentials;
		console.log({ UserName, PassWord });
		closeDialog('sign-in-dialog');
	};

	const randomSignIn = (/** @type {{ detail: Payloads.SignIn; }} */ event) => {
		/** @type Payloads.SignIn */
		const credentials = event.detail;
		const { UserName, PassWord } = credentials;
		console.log({ UserName, PassWord });
		closeDialog('random-dialog');
	};

	const register = (/** @type {{ detail: Payloads.Register; }} */ event) => {
		/** @type Payloads.Register */
		const credentials = event.detail;
		const { UserName, PassWord, Email } = credentials;
		console.log({ UserName, PassWord, Email });
		closeDialog('register-dialog');
	};
</script>

<div class="flex flex-col max-h-screen h-screen m-0 p-2">
	<TopBar on:openRandom={openRandom} on:openRegister={openRegister} on:openSignIn={openSignIn} />

	<Dialogs
		on:closeRandom={closeRandom}
		on:closeRegister={closeRegister}
		on:closeSignIn={closeSignIn}
		on:signIn={signIn}
		on:randomSignIn={randomSignIn}
		on:register={register}
	/>

	<div class="flex-grow overflow-y-auto">Content</div>

	<BottomBar />
</div>
