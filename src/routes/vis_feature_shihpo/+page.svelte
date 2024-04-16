<script>
	import * as d3 from 'd3';
	// import Scatterplot from './Scatterplot.svelte';
	import './style.css';
	import Details from './Details.svelte';
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
	// let lc_colorhue = none;
	// let lb_colorhue = none;
	// let la_colorhue = none;
	let lc_colorhue = new Array(8);
	let lb_colorhue = new Array(8);
	let la_colorhue = new Array(8);
	for (let i = 0; i < 8; i ++){
		lc_colorhue[i] = new Array(4);
		lb_colorhue[i] = new Array(4);
		la_colorhue[i] = new Array(4);
	}
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
		var lc_feature_maps = await n.load("http://localhost:5173/"+selectedImage.lc_feat_path);
		var lb_feature_maps = await n.load("http://localhost:5173/"+selectedImage.lb_feat_path);
		var la_feature_maps = await n.load("http://localhost:5173/"+selectedImage.la_feat_path);
		var lc_feat_array = lc_feature_maps['data'];
		var lb_feat_array = lb_feature_maps['data'];
		var la_feat_array = la_feature_maps['data'];
		console.log(lc_feat_array.length);
		console.log(lb_feat_array.length);
		console.log(la_feat_array.length);
		
		for (let i = 0; i < 8; i ++){
			for (let j = 0; j < 4; j++){
				lc_colorhue[i][j] = 0;
				lb_colorhue[i][j] = 0;
				la_colorhue[i][j] = 0;
			}
		}
		
		var lc_max = d3.max(lc_feat_array, d => d);
		var lc_min = d3.min(lc_feat_array, d => d);
		var lb_max = d3.max(lb_feat_array, d => d);
		var lb_min = d3.min(lb_feat_array, d => d);
		var la_max = d3.max(la_feat_array, d => d);
		var la_min = d3.min(la_feat_array, d => d);

		// lc_feat_array = (lc_feat_array - lc_max) / (lc_max - lc_min);
		lc_feat_array = d3.map(lc_feat_array, d => (d - lc_min) / (lc_max - lc_min));
		lb_feat_array = d3.map(lb_feat_array, d => (d - lb_min) / (lb_max - lb_min));
		la_feat_array = d3.map(la_feat_array, d => (d - la_min) / (la_max - la_min));
		
		console.log('frst', lc_colorhue);
		
		for (let i = 0; i < 8; i++){
			for (let j = 0; j < lc_feat_array.length / 32; j++){
				lc_colorhue[i][0] += lc_feat_array[j + i * (lc_feat_array.length / 8)];
			}
			for (let j = 0; j < lb_feat_array.length / 32; j++){
				lb_colorhue[i][0] += lb_feat_array[j + i * (lb_feat_array.length / 8)];
			}
			for (let j = 0; j < la_feat_array.length / 32; j++){
				la_colorhue[i][0] += la_feat_array[j + i * (la_feat_array.length / 8)];
			}
			
			
			for (let j = lc_feat_array.length / 32; j < lc_feat_array.length / 24; j++){
				lc_colorhue[i][1] += lc_feat_array[j + i * (lc_feat_array.length / 8)];
			}
			for (let j = lb_feat_array.length / 32; j < lb_feat_array.length / 24; j++){
				lb_colorhue[i][1] += lb_feat_array[j + i * (lb_feat_array.length / 8)];
			}
			for (let j = la_feat_array.length / 32; j < la_feat_array.length / 24; j++){
				la_colorhue[i][1] += la_feat_array[j + i * (la_feat_array.length / 8)];
			}
			
			// something wrong, don't know
			for (let j = lc_feat_array.length / 24; j < lc_feat_array.length / 16; j++){
				lc_colorhue[i][2] += lc_feat_array[j + i * (lc_feat_array.length / 8)];
			}
			for (let j = lb_feat_array.length / 24; j < lb_feat_array.length / 16; j++){
				lb_colorhue[i][2] += lb_feat_array[j + i * (lb_feat_array.length / 8)];
			}
			for (let j = la_feat_array.length / 24; j < la_feat_array.length / 16; j++){
				la_colorhue[i][2] += la_feat_array[j + i * (la_feat_array.length / 8)];
			}
		

			for (let j = lc_feat_array.length / 16; j < lc_feat_array.length / 8; j++){
				lc_colorhue[i][3] += lc_feat_array[j + i * (lc_feat_array.length / 8)];
			}
			for (let j = lb_feat_array.length / 16; j < lb_feat_array.length / 8; j++){
				lb_colorhue[i][3] += lb_feat_array[j + i * (lb_feat_array.length / 8)];
			}
			for (let j = la_feat_array.length / 16; j < la_feat_array.length / 8; j++){
				la_colorhue[i][3] += la_feat_array[j + i * (la_feat_array.length / 8)];
			}
		}
		// console.log(lc_colorhue);
		for (let i = 0; i < 8; i ++){
			for (let j = 0; j < 4; j++){
				lc_colorhue[i][j] /= (lc_feat_array.length / 32);
				lb_colorhue[i][j] /= (lb_feat_array.length / 32);
				la_colorhue[i][j] /= (la_feat_array.length / 32);
			}
		}

		// console.log(lc_colorhue);
		console.log(lb_colorhue);
		
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
		<button on:click={() => onclick()}>
			Select
		</button>
	</div>
	<div class="main">
		<ColorHue
			bind:lc_colorhue={lc_colorhue}
			bind:lb_colorhue={lb_colorhue}
			bind:la_colorhue={la_colorhue}
		/>
		<Details
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
