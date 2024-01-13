<script>
	import { createEventDispatcher } from 'svelte';
	import * as Payloads from '$lib/payloads';

	/** @type Payloads.NewTodo */
	const newTodo = {
		Task: '',
		Completed: false
	};

	const dispatch = createEventDispatcher();

	const cancel = () => dispatch('cancel');

	const addTodo = () => {
		dispatch('addTodo', newTodo);
	};
</script>

<div id="new-todo-dialog" class="dialog-50">
	<div class="dialog-header">
		<h3>Add a New ToDo</h3>
	</div>
	<div class="dialog-content">
		<div class="field">
			<label for="task" class="block">Task</label>
			<textarea name="task" id="new-todo-task" bind:value={newTodo.Task}></textarea>
		</div>
		<div class="field">
			<div class="flex">
				<div>
					<input
						type="checkbox"
						name="completed"
						id="new-todo-completed"
						bind:checked={newTodo.Completed}
					/>
				</div>
				<div>
					<label for="completed" class="inline-block ml-2">Completed</label>
				</div>
			</div>
		</div>
	</div>
	<div class="dialog-button">
		<button on:click={cancel}>Cancel</button>
		<button on:click={addTodo}>Add ToDo</button>
	</div>
</div>
