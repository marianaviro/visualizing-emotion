<script>
	import * as d3 from "d3";
	import Axis from "./Axis.svelte";
	import npyjs from "npyjs";

	export let onhover;
	export let onclick;
	export let dataset;
	export let xFeature;
	export let yFeature;
	export let selectedImage;
  
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
			on:mouseover={() => onhover(d)}
			on:focus={() => onhover(d)}
		  />
		  <circle
			cx={d.x}
			cy={d.y}
			fill={d.color}
			stroke={d.color == "black" ||
			(selectedImage.x == d.x && selectedImage.y == d.y)
			  ? selectedImage.x == d.x && selectedImage.y == d.y
				? "black"
				: "white"
			  : "none"}
			r={selectedImage.x == d.x && selectedImage.y == d.y ? 8 : 4}
			role="button"
			aria-label="Point at ____"
			tabindex={d}
			on:mouseover={() => onhover(d)}
			on:focus={() => onhover(d)}
			on:click={() => onclick(d)}
			on:keydown={() => onclick(d)}
		  />
		{/each}
	  {/if}
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
  