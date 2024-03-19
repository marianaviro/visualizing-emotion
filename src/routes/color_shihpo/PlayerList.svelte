<script>
	//This component receives a prop which is a dataset
	export let dataset;

	export let onhover;

	// default features to visualize
	let xFeature = 'strikeout';
	let yFeature = 'hit';
	let colorFeature = 'all_star';
</script>

<ul>
	{#each dataset as player}
		<li
			on:mouseover={() => onhover(player)}
			on:mouseleave={() => onhover(null)}
			on:focus={() => onhover(player)}
			on:focusout={() => onhover(null)}
		>
			{player.name} ({player.team})
		</li>
	{/each}
</ul>

<style>
	ul {
		list-style: none;
		padding: 0;
		width: 18em;
		/* List not higher than parent and enable scroll*/
		max-height: 100%;
		overflow: auto;
	}

	li + li {
		margin-top: 0.5em;
	}

	li:hover {
		background-color: #dddddd;
		font-weight: bold;
	}
</style>
