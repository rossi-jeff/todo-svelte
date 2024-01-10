<script>
	import TopBar from './top-bar.svelte';
	import BottomBar from './bottom-bar.svelte';
	import Dialogs from './dialogs.svelte';
</script>

<div class="flex flex-col max-h-screen h-screen m-0 p-2">
	<TopBar />

	<Dialogs />

	<div class="flex-grow overflow-y-auto">Content</div>

	<BottomBar />
</div>
