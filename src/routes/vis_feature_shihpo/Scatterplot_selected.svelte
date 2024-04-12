<script>
	import * as d3 from 'd3';
	import Axis from './Axis.svelte';

	export let dataset;
	export let xFeature;
	export let yFeature;
	export let clickedImage1;
	export let clickedImage2;
	export let merge_x;
	export let merge_y;

	import { onMount } from "svelte";
  
  const margin = { top: 30, right: 30, bottom: 30, left: 30 };

  let borderBoxSize;

  let voronoi;

  $: width = borderBoxSize ? borderBoxSize[0].inlineSize : 400;

  $: height = borderBoxSize ? borderBoxSize[0].blockSize : 400;

  $: x = d3
	.scaleLinear()
	.domain(d3.extent(dataset, (d) => d[xFeature]))
	.range([margin.left, width - margin.right]);

  $: y = d3
	.scaleLinear()
	.domain(d3.extent(dataset, (d) => d[yFeature]))
	.range([height - margin.bottom, margin.top]);

  $: renderedData = dataset.map((d) => {
	return {
	  x: x(d[xFeature]),
	  y: y(d[yFeature]),
	  color: d.color,
	  file_path: d.file_path,
	  emotion: d.emotion,
	  confidence: d.confidence,
	};
  });

  $: if (width && height) {
	const delaunay = d3.Delaunay.from(
	  renderedData,
	  (d) => d.x,
	  (d) => d.y
	);
	voronoi = delaunay.voronoi([0, 0, width, height]);
	console.log(voronoi.renderCell());
  }
</script>


<div id='plot1' style="border: 3px solid black" class="scatter-container">
  <svg {width} {height}>
	{#if voronoi}
	  <circle
		cx={clickedImage1.x}
		cy={clickedImage1.y}
		fill={clickedImage1.color}
		stroke={"black"}
		r={4}
		role="button"
		aria-label="Point at ____"
		tabindex={clickedImage1}
	/>
	{/if}
  </svg>
</div>

<div>
	<canvas class="add" id="add_plot_fig" width='40px' height='310px'></canvas>
</div>

<div id='plot2' style="border: 3px solid black" class="scatter-container">
	<svg {width} {height}>
	  {#if voronoi}
		<circle
		  cx={clickedImage2.x}
		  cy={clickedImage2.y}
		  fill={clickedImage2.color}
		  stroke={"black"}
		  r={4}
		  role="button"
		  aria-label="Point at ____"
		  tabindex={clickedImage2}
	  />
	  {/if}
	</svg>
</div>

<div>
	<canvas class="add" id="eq_plot_fig" width='40px' height='310px'></canvas>
</div>

<div class="scatter-container" bind:borderBoxSize>
	<svg {width} {height}>
		{#if voronoi}
		{#each renderedData as d, i}
		  <path
			class="cell"
			d={voronoi.renderCell(i)}
			fill="transparent"
			stroke-width="0"
			stroke="#eee"
			role="button"
			tabindex={d}
			aria-label="Point at ____"
		  />
		  <circle
			cx={d.x}
			cy={d.y}
			fill={d.color}
			r={4}
			role="button"
			aria-label="Point at ____"
			tabindex={d}
			opacity={0.3}
		  />
		{/each}
	  {/if}
	  	<circle
			cx={merge_x}
			cy={merge_y}
			fill={'black'}
			r={4}
		/>
	  	<circle
			cx={merge_x}
			cy={merge_y}
			r={8}
			opacity={0.3}
			stroke={'white'}
			strokeWidth={3} 
			role="button"
			aria-label="Point at ____"
			tabindex={0}
		/>
	</svg>
</div>

<style>
  .scatter-container {
	height: 100%;
  }
  circle {
	cursor: pointer;
	transition:
		  cx 250ms,
		  cy 250ms;
  }
  .cell {
	cursor: pointer;
  }
</style>
