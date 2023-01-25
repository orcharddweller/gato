<script lang="ts">
	import type { Game } from 'core';
	import Field from './Field.svelte';

	export let game: Game;
</script>

<table>
	{#each [0, 1, 2] as row, i}
		<tr>
			{#each [0, 1, 2] as cell, j}
				<td
					style="border: 1px; 
                
                "
				>
					<Field {game} position={i * 3 + j} />
				</td>
			{/each}
		</tr>
	{/each}
</table>
