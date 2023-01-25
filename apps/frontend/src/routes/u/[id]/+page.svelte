<script lang="ts">
	import { socket } from '$lib/webSocketConnection';
	import type { Game, UserId } from 'core';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { match, P } from 'ts-pattern';
	import Gato from '$components/Gato.svelte';
	import { goto } from '$app/navigation';

	/** @type {import('./$types').PageData} */
	export let data: PageData;

	onMount(async () => {
		socket.on('joinGame', (payload) => {
			match(payload)
				.with({ game: P.select() }, (g) => {
					game = g;
				})
				.with({ error: P.select('e') }, ({ e }) => {
					goto('/');
				})
				.exhaustive();
		});

		socket.on('updateBoard', ({ board }) => {
			if (!game) {
				throw Error('Game is not on!');
			}

			game.board = board;
		});

		socket.emit('joinGame', {
			userId: data.userId
		});
	});

	let game: Game | null = null;
</script>

{#if game}
	<Gato {game} userId={data.userId} />
{:else}
	<div>Loading...</div>
{/if}
