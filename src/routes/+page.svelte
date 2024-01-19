<script>
	export let data;
	import TopBar from './top-bar.svelte';
	import BottomBar from './bottom-bar.svelte';
	import Dialogs from './dialogs.svelte';
	import * as Payloads from '$lib/payloads';
	import * as Types from '$lib/types';
	import { baseUrl, buildHeaders } from '$lib';
	import { blankSession, userSession } from '$lib/session.store';
	import { get } from 'svelte/store';
	import TodoCard from './todo-card.svelte';
	import UserControls from './user-controls.svelte';

	const { userNames } = data;
	let session = get(userSession);

	/** @type {Array.<Types.Todo>}*/
	let todos = [];

	/** @type {?Types.User}*/
	let currentUser = null;

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
		const { UserName, PassWord } = event.detail;
		fetch(`${baseUrl}/auth/login`, {
			method: 'POST',
			body: JSON.stringify({ UserName, PassWord }),
			headers: buildHeaders(blankSession)
		})
			.then((result) => result.json())
			.then((result) => {
				/** @type Types.LoginResponse */
				const body = result;
				const { Token, UserName } = body;
				userSession.set({ UserName, Token, SignedIn: true });
				session = get(userSession);
				loadTodos();
				loadCurrentUser();
				closeDialog('sign-in-dialog');
			});
	};

	const randomSignIn = (/** @type {{ detail: Payloads.SignIn; }} */ event) => {
		const { UserName, PassWord } = event.detail;
		fetch(`${baseUrl}/auth/login`, {
			method: 'POST',
			body: JSON.stringify({ UserName, PassWord }),
			headers: buildHeaders(blankSession)
		})
			.then((result) => result.json())
			.then((result) => {
				/** @type Types.LoginResponse */
				const body = result;
				const { Token, UserName } = body;
				userSession.set({ UserName, Token, SignedIn: true });
				session = get(userSession);
				loadTodos();
				loadCurrentUser();
				closeDialog('random-dialog');
			});
	};

	const register = (/** @type {{ detail: Payloads.Register; }} */ event) => {
		const { UserName, PassWord, Email } = event.detail;
		console.log({ UserName, PassWord, Email });
		closeDialog('register-dialog');
	};

	const signOut = () => {
		userSession.set(blankSession);
		session = get(userSession);
		todos = [];
		currentUser = null;
	};

	const loadTodos = () => {
		fetch(`${baseUrl}/todo`, { headers: buildHeaders(session) })
			.then((result) => result.json())
			.then((/** @type {Array.<Types.Todo>}*/ result) => {
				todos = result;
			});
	};

	const loadCurrentUser = () => {
		fetch(`${baseUrl}/user/current`, { headers: buildHeaders(session) })
			.then((result) => result.json())
			.then((/** @type Types.User */ result) => {
				currentUser = result;
			});
	};

	const getTodoByID = (/** @type {string} */ Id) => {
		for (const todo of todos) {
			if (todo.Id == Id) return todo;
		}
		return null;
	};

	const updateTodo = (/** @type {{ Id: string; Completed: boolean; Task: string; }} */ args) => {
		const { Id, Completed, Task } = args;
		fetch(`${baseUrl}/todo/${Id}`, {
			method: 'PATCH',
			body: JSON.stringify({ Task, Completed }),
			headers: buildHeaders(session)
		}).then(() => loadTodos());
	};

	const setCompleted = (/** @type {{ detail: Payloads.SetCompleted; }} */ event) => {
		const { Id, Completed } = event.detail;
		const todo = getTodoByID(Id);
		if (!todo) return;
		const { Task } = todo;
		updateTodo({ Id, Completed, Task });
	};

	const updateTask = (/** @type {{ detail: Payloads.UpdateTask; }} */ event) => {
		const { Id, Task } = event.detail;
		const todo = getTodoByID(Id);
		if (!todo) return;
		const { Completed } = todo;
		updateTodo({ Id, Completed, Task });
	};

	const deleteTodo = (/** @type {{ detail: { Id: string; }; }} */ event) => {
		const { Id } = event.detail;
		if (confirm('Are you sure?')) {
			fetch(`${baseUrl}/todo/${Id}`, {
				method: 'DELETE',
				headers: buildHeaders(session)
			}).then(() => loadTodos());
		}
	};

	const openNewTodo = () => openDialog('new-todo-dialog');

	const closeNewTodo = () => closeDialog('new-todo-dialog');

	const addTodo = (/** @type {{ detail: Payloads.NewTodo; }} */ event) => {
		const { Task, Completed } = event.detail;
		fetch(`${baseUrl}/todo`, {
			method: 'POST',
			body: JSON.stringify({ Task, Completed }),
			headers: buildHeaders(session)
		}).then(() => {
			loadTodos();
			closeDialog('new-todo-dialog');
		});
	};

	const openEditUser = () => openDialog('edit-user-dialog');

	const closeEditUser = () => closeDialog('edit-user-dialog');

	const updateUser = (/** @type {{ detail: { UserName: string; Email: string; }; }} */ event) => {
		const { UserName, Email } = event.detail;
		if (!currentUser) return;
		const { Id } = currentUser;
		fetch(`${baseUrl}/user/${Id}`, {
			method: 'PATCH',
			body: JSON.stringify({ UserName, Email }),
			headers: buildHeaders(session)
		}).then(() => {
			loadCurrentUser();
			closeDialog('edit-user-dialog');
		});
	};

	const openChangePassWord = () => openDialog('change-pass-word-dialog');

	const closeChangePassWord = () => closeDialog('change-pass-word-dialog');

	const changePassWord = (
		/** @type {{ detail: { OldPassWord: string; NewPassWord: string; Confirmation: string; }; }} */ event
	) => {
		const { OldPassWord, NewPassWord, Confirmation } = event.detail;
		fetch(`${baseUrl}/user/change`, {
			method: 'PATCH',
			body: JSON.stringify({}),
			headers: buildHeaders(session)
		}).then(() => {
			signOut();
			closeDialog('change-pass-word-dialog');
		});
	};
</script>

<svelte:head>
	<title>ToDo App in Svelte</title>
</svelte:head>

<main id="main" class="page-wrapper">
	<TopBar
		on:openRandom={openRandom}
		on:openRegister={openRegister}
		on:openSignIn={openSignIn}
		on:signOut={signOut}
		{session}
	/>

	<Dialogs
		on:closeRandom={closeRandom}
		on:closeRegister={closeRegister}
		on:closeSignIn={closeSignIn}
		on:signIn={signIn}
		on:randomSignIn={randomSignIn}
		on:register={register}
		on:closeNewTodo={closeNewTodo}
		on:addTodo={addTodo}
		on:closeEditUser={closeEditUser}
		on:updateUser={updateUser}
		on:closeChangePassWord={closeChangePassWord}
		on:changePassWord={changePassWord}
		{userNames}
		{currentUser}
	/>

	<div class="flex-grow overflow-y-auto">
		{#if session.SignedIn}
			<div>
				{#if currentUser && !currentUser.Random}
					<UserControls
						userName={currentUser.UserName}
						on:openEditUser={openEditUser}
						on:openChangePassWord={openChangePassWord}
					/>
				{/if}
				<button on:click={openNewTodo} class="my-2">New Todo</button>
				{#each todos as todo}
					<TodoCard
						{todo}
						on:setCompleted={setCompleted}
						on:updateTask={updateTask}
						on:deleteTodo={deleteTodo}
					/>
				{/each}
			</div>
		{:else}
			<div>
				<h2>Welcome</h2>
				<div class="mb-4">
					This site is a todo list application. Authentication is used so that each
					user will only see their own todos.
				</div>
				<div>
					For those who wish to avoid entering any personal information an option to
					log in as a randomly generated user has been provided.
				</div>
			</div>
		{/if}
	</div>

	<BottomBar />
</main>
