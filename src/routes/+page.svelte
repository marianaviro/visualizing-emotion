<script>
	import * as d3 from 'd3';
	import Scatterplot from './Scatterplot.svelte';
	import './style.css';
	import Details from './Details.svelte';
	import ColorLegend from './ColorLegend.svelte';
	import FeatureControls from './FeatureControls.svelte';

	// data comes from the load function in +page.js
	export let data;

	// default features to visualize
	let xFeature = 'lc_tsne2_f1';
	let yFeature = 'lc_tsne2_f2';
	let colorFeature = 'color';
	let emotionFeature = 'emotion';

	let selectedImage = data.dataset[0];
	function onhover(image) {
		selectedImage = image;
		console.log(image);
	}

	$: categories = d3
		.groupSort(
			data.dataset,
			(g) => g.length,
			(d) => d[colorFeature]
		)
		.reverse();

	$: color = d3.scaleOrdinal().domain(categories).range(d3.schemeTableau10);
</script>

<div class="container">
	<div class="header">
		<FeatureControls dataset={data.dataset} bind:xFeature bind:yFeature bind:colorFeature />
		<ColorLegend {color} />
	</div>
	<div class="main">
		<Details
			dataset={data.dataset}
			{xFeature}
			{yFeature}
			{colorFeature}
			{emotionFeature}
			{selectedImage}
		/>
		<Scatterplot
			{onhover}
			dataset={data.dataset}
			{xFeature}
			{yFeature}
			{colorFeature}
			{emotionFeature}
			{color}
			{selectedImage}
		/>
	</div>
</div>

<style>
	.container {
		/* set the font */
		font-family: system-ui, sans-serif;
		font-size: 16px;
		padding: 2em;
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
		gap: 2em;
	}

	.main {
		/* Use rest of vertical space not used by header */
		flex: 1;
		/* Allowing main to shrink */
		min-height: 0;
		display: flex;
		gap: 2em;
		flex-wrap: wrap;
	}
	.header {
		display: flex;
		align-items: center;
		gap: 2em;
	}
</style>
