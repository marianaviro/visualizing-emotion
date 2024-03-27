<script>
	import * as d3 from 'd3';
	import Axis from './Axis.svelte';

	export let onhover;
	export let dataset;
	export let rFeature;
	export let gFeature;
	export let colorFeature;
	export let color;
	export let selectedImage;

	const margin = { top: 35, right: 20, bottom: 50, left: 60 };

	let borderBoxSize;

	$: width = borderBoxSize
		? Math.min(borderBoxSize[0].blockSize, borderBoxSize[0].inlineSize)
		: 400;

	$: height = borderBoxSize
		? Math.min(borderBoxSize[0].blockSize, borderBoxSize[0].inlineSize)
		: 400;

	$: x = d3
		.scaleLinear()
		.domain(d3.extent(dataset, (d) => d[rFeature]))
		.range([margin.left, width - margin.right]);

	$: y = d3
		.scaleLinear()
		.domain(d3.extent(dataset, (d) => d[gFeature]))
		.range([height - margin.bottom, margin.top]);

</script>

<div class="scatterplot" bind:borderBoxSize>
	<svg {width} {height}>
		<g>
			{#each dataset as d}
				<circle
					cx={x(d[rFeature])}
					cy={y(d[gFeature])}
					fill={d.color}
					r={3}
					role="button"
					aria-label="Point at ____"
					tabindex={d}
					on:mouseover={() => onhover(d)}
					on:focus={() => onhover(d)}
					
				/>
			{/each}

			{#if selectedImage}
				<circle
					cx={x(selectedImage[rFeature])}
					cy={y(selectedImage[gFeature])}
					fill={selectedImage.color}
					r={6}
					stroke={'black'}
					strokeWidth={2}
				/>
			{/if}
		</g>
		<Axis label={rFeature} scale={y} orientation={'left'} {width} {height} {margin} />
		<Axis label={gFeature} scale={x} orientation={'bottom'} {width} {height} {margin} />
	</svg>
</div>

<style>
	.scatterplot {
		height: 100%;
		/* Take up any available extra space */
		flex: 1;
	}
	circle {
		cursor: pointer;
		transition:
			cx 250ms,
			cy 250ms;
	}
</style>
