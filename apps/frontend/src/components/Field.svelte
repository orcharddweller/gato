<script lang="ts">
	import type { Game } from 'core';

	import { socket } from '$lib/webSocketConnection';

	export let game: Game;

	export let position: number;
</script>

{#if game.board[position] === 'X'}
	<p>X</p>
{:else if game.board[position] === 'O'}
	<p>O</p>
{:else}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		on:click={() =>
			socket.emit('makeMove', {
				position
			})}
	>
		{'p'}
	</div>
{/if}
