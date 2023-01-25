<script lang="ts">
	import { socket } from '$lib/webSocketConnection';

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(async () => {
		socket.on('newGame', ({ userId }) => {
			goto(`/u/${userId}`);
		});
	});

	let userName = '';
</script>

<h1>Welcome to Gato</h1>

<input bind:value={userName} />
<button
	on:click={() => {
		socket.emit('newGame', {
			userName
		});
	}}>Start game</button
>
