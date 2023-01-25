<script lang="ts">
	import { getState, whoseTurn, type Game, type UserId } from 'core';

	import Board from './Board.svelte';

	export let game: Game;

	export let userId: string;

	const getOpponentId = (game: Game): UserId => {
		if (game.players[0].id === userId) {
			return game.players[1].id;
		}

		return game.players[0].id;
	};

	$: opponentId = getOpponentId(game);
	$: gameState = getState(game.board);
	$: mySide = game.players[0].id === userId ? 'X' : 'O';
	$: isMyTurn = whoseTurn(game.board) === mySide;
</script>

<div>
	Invite your friend to play with this link: {import.meta.env.VITE_FRONTEND_URL}/u/{opponentId}
</div>

{#if (gameState === 'X_WON' && mySide === 'X') || (gameState === 'O_WON' && mySide === 'O')}
	<p>You won!</p>
{:else if (gameState === 'X_WON' && mySide === 'O') || (gameState === 'O_WON' && mySide === 'X')}
	<p>You lost!</p>
{:else if gameState === 'DRAW'}
	<p>Draw!</p>
{:else if isMyTurn}
	<p>It's your turn!</p>
{:else}
	<p>It's your opponent's turn!</p>
{/if}

<Board {game} />

{#if gameState !== 'IN_PROGRESS'}
	<a href="/">Go back to home</a>
{/if}
