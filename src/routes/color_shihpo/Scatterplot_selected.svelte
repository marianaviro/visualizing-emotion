<script>
	import * as d3 from 'd3';
	import Axis from './Axis.svelte';

	export let onhover;
	export let dataset;
	export let rFeature;
	export let gFeature;
	export let colorFeature;
	export let color;
	export let clickedImage1;
	export let clickedImage2;
	export let merge_r;
	export let merge_g;

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

<div id='plot1' class="scatterplot">
	<svg {width} {height}>
		<g>
			{#if clickedImage1}
				<circle
					cx={x(clickedImage1[rFeature])}
					cy={y(clickedImage1[gFeature])}
					fill={clickedImage1.color}
					r={6}
					stroke={'black'}
					strokeWidth={2}
				/>
			{/if}
		</g>
		<Axis scale={y} orientation={'left'} {width} {height} {margin} />
		<Axis scale={x} orientation={'bottom'} {width} {height} {margin} />
	</svg>
	<h3>{clickedImage1.emotion}</h3>
</div>

<div id='plot2' class="scatterplot" bind:borderBoxSize>
	<svg {width} {height}>
		<g>
			{#if clickedImage2}
				<circle
					cx={x(clickedImage2[rFeature])}
					cy={y(clickedImage2[gFeature])}
					fill={clickedImage2.color}
					r={6}
					stroke={'black'}
					strokeWidth={2}
				/>
			{/if}
		</g>
		<Axis scale={y} orientation={'left'} {width} {height} {margin} />
		<Axis scale={x} orientation={'bottom'} {width} {height} {margin} />
	</svg>
	<h3>{clickedImage2.emotion}</h3>
</div>

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

			{#if clickedImage2}
				<circle
					cx={x(merge_r)}
					cy={y(merge_g)}
					fill={'white'}
					r={6}
					stroke={'black'}
					strokeWidth={3}
					stroke-dasharray={"2,2"} 
				/>
			{/if}
		</g>
		<Axis scale={y} orientation={'left'} {width} {height} {margin} />
		<Axis scale={x} orientation={'bottom'} {width} {height} {margin} />
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
