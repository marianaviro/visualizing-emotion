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
	let rFeature = 'lc_tsne2_f1';
	let gFeature = 'lc_tsne2_f2';
	let bFeature = 'lc_tsne3_f3';
	let colorFeature = 'color';
	let emotionFeature = 'emotion';
	let id = 1;

	let selectedImage = data.dataset[0];
	let clickedImage1 = data.dataset[0];
	let clickedImage2 = data.dataset[0];
	function onhover(image) {
		selectedImage = image;
		// console.log(image);
	}

	function onclick(image){
		if (id == 1){
			id = 2;
			clickedImage1 = image;
		}
		else {
			id = 1;
			clickedImage2 = image;
		}
		console.log(id);
	}

	function loadImage(src, onload) {
		// http://www.thefutureoftheweb.com/blog/image-onload-isnt-being-called
		var img = new Image();
		
		img.onload = onload;
		img.src = src;
		img.width = '100px';

		return img;
	}
	function merge(){
		var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
		var img1 = loadImage(clickedImage1.file_path);
		var img2 = loadImage(clickedImage2.file_path);
		ctx.drawImage(img1, 0, 0, 100, 100);
        ctx.globalAlpha = 0.5;
        ctx.drawImage(img2, 0, 0, 100, 100);
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
		<FeatureControls dataset={data.dataset} bind:rFeature bind:gFeature bind:bFeature bind:colorFeature />
		<ColorLegend {color} />
		<button on:click={() => onclick(selectedImage)}>
			Select
		</button>
		<button on:click={() => merge()}>
			Merge
		</button>
	</div>
	<div class="main">
		<Details
			dataset={data.dataset}
			{rFeature}
			{gFeature}
			{colorFeature}
			{emotionFeature}
			{selectedImage}
			{clickedImage1}
			{clickedImage2}
		/>
		<Scatterplot
			{onhover}
			dataset={data.dataset}
			{rFeature}
			{gFeature}
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
