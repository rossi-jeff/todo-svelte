<script>
	import * as Types from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	export let /** @type Types.Todo */ todo;
	let editing = false;

	const dispatch = createEventDispatcher();

	const completedChanged = () => {
		const { Id, Completed } = todo;
		dispatch('setCompleted', { Id, Completed });
	};

	const updateTask = () => {
		const { Id, Task } = todo;
		dispatch('updateTask', { Id, Task });
		editing = false;
	};

	const deleteTodo = () => {
		const { Id } = todo;
		dispatch('deleteTodo', { Id });
	};
</script>

<div class="todo-card">
	<div>
		<input
			type="checkbox"
			name="Completed"
			bind:checked={todo.Completed}
			on:change={completedChanged}
			class="mr-2"
		/>
	</div>
	<div class="flex-grow">
		{#if editing}
			<div>
				<textarea name="Task" bind:value={todo.Task}></textarea>
				<div class="flex justify-between">
					<button on:click={() => (editing = false)}>Cancel</button>
					<button on:click={updateTask}>Update</button>
				</div>
			</div>
		{:else}
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div on:dblclick={() => (editing = true)} class="cursor-pointer">{todo.Task}</div>
		{/if}
	</div>
	<div>
		<button class="ml-2" on:click={deleteTodo}>Delete</button>
	</div>
</div>
