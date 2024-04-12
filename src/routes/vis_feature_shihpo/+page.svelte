<script>
	import * as d3 from 'd3';
	// import Scatterplot from './Scatterplot.svelte';
	import './style.css';
	// import Details from './Details.svelte';
	// import Details_selected from './Details_selected.svelte';
	// import Scatterplot_Selected from './Scatterplot_selected.svelte';
	import ColorHue from './ColorHue.svelte';
	import ColorLegend from './ColorLegend.svelte';
	import FeatureControls from './FeatureControls.svelte';
	import npyjs from "npyjs";
	// data comes from the load function in +page.js
	export let data;

	// default features to visualize
	let xFeature = 'lc_tsne2_f1';
	let yFeature = 'lc_tsne2_f2';
	// let bFeature = 'lc_tsne3_f3';
	let colorFeature = 'color';
	let emotionFeature = 'emotion';
	let feature_maps = 'empty';
	let id = 1;
	let idx = 0;

	let selectedImage = data.dataset[0];
	// let clickedImage1 = data.dataset[0];
	// let clickedImage2 = data.dataset[0];
	let merge_x = 100.0;
	let merge_y = 100.0;
	

	function draw_add(obj_id) {
		const c = document.getElementById(obj_id);
		const ctx = c.getContext("2d");
		ctx.moveTo(0, 150);
		ctx.lineTo(40, 150);
		ctx.moveTo(20, 120);
		ctx.lineTo(20, 180);
		ctx.lineWidth = 10;
		ctx.stroke();
	}

	function draw_eq(obj_id) {
		const c = document.getElementById(obj_id);
		const ctx = c.getContext("2d");
		ctx.moveTo(0, 135);
		ctx.lineTo(40, 135);
		ctx.moveTo(0, 165);
		ctx.lineTo(40, 165);
		ctx.lineWidth = 10;
		ctx.stroke();
	}


	function onhover(image) {
		selectedImage = image;
		// console.log(image);
	}

	let n = new npyjs();
	async function onclick(){
		selectedImage = data.dataset[idx];
		// console.log(selectedImage.lc_feat_path);
		feature_maps = await n.load("http://localhost:5173/"+selectedImage.lc_feat_path);
		var feat_array = feature_maps['data'];
		console.log(feat_array);
		// console.log(selectedImage);
		// console.log(feature_maps['data']);
		idx += 1;
	}

	function loadImage(src, onload) {
		// http://www.thefutureoftheweb.com/blog/image-onload-isnt-being-called
		var img = new Image();
		
		img.onload = onload;
		img.src = src;
		img.width = '250px';

		return img;
	}
	function merge(){
		var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
		var img1 = loadImage(clickedImage1.file_path);
		var img2 = loadImage(clickedImage2.file_path);
		ctx.drawImage(img1, 0, 0, 250, 310);
        ctx.globalAlpha = 0.5;
        ctx.drawImage(img2, 0, 0, 250, 310);
		// let img = document.getElementById("img1");
		// img.setAttribute("border", "");
		// img = document.getElementById("img2");
		// img.setAttribute("border", "");
		document.getElementById("img1").style.border="";
		document.getElementById("img2").style.border="";
		document.getElementById("plot1").style.border="3px solid black";
		document.getElementById("plot2").style.border="3px solid black";
		merge_x = (clickedImage1.x + clickedImage2.x) / 2;
		merge_y = (clickedImage1.y + clickedImage2.y) / 2;
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
		<button on:click={() => onclick()}>
			Select
		</button>
	</div>
	<div class="main">
		<ColorHue
			{selectedImage}
			{feature_maps}
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
