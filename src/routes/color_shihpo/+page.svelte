<script>
	import * as d3 from 'd3';
	import Scatterplot from './step3_Scatterplot.svelte';
	import './style.css';
	import Details from './step3_Details.svelte';
	import Details_selected from './step3_Details_selected.svelte';
	import Scatterplot_Selected from './step3_Scatterplot_selected.svelte';
	import ColorLegend from './ColorLegend.svelte';
	import FeatureControls from './FeatureControls.svelte';

	// data comes from the load function in +page.js
	export let data;

	// default features to visualize
	let xFeature = 'lc_tsne2_f1';
	let yFeature = 'lc_tsne2_f2';
	// let bFeature = 'lc_tsne3_f3';
	let colorFeature = 'color';
	let emotionFeature = 'emotion';
	let id = 1;

	let selectedImage = data.dataset[0];
	let clickedImage1 = data.dataset[0];
	let clickedImage2 = data.dataset[0];
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

	function onclick(image){
		if (id == 1){
			id = 2;
			clickedImage1 = image;
			// console.log(clickedImage1.file_path);
			// let img = document.getElementById("img1");
			// img.setAttribute("border", "6px");
			
			document.getElementById("img1").style.border="3px solid red";
			document.getElementById("plot1").style.border="3px solid red";
			draw_add("add_img_fig");
			draw_add("add_plot_fig");
		}
		else {
			id = 1;
			clickedImage2 = image;
			// let img = document.getElementById("img2");
			// img.setAttribute("border", "6px");
			
			document.getElementById("img2").style.border="3px solid red";
			document.getElementById("plot2").style.border="3px solid red";
			draw_eq("eq_img_fig");
			draw_eq("eq_plot_fig");
		}
		console.log(id);
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

	// let n = new npyjs();
	// n.load("CS229/m20_dfs_a_la_feat.npy", (array, shape) => {
	// 	console.log('test');
	// 	console.log(array);
	// 	console.log(array['data']);
	// 	console.log(array['shape']);
	// });
</script>

<div class="container">
	<div class="header">
		<FeatureControls dataset={data.dataset} bind:xFeature bind:yFeature bind:colorFeature />
		<ColorLegend {color} />
		<button on:click={() => merge()}>
			Merge
		</button>
	</div>
	<div class="main">
		<Scatterplot
			{onhover}
			{onclick}
			dataset={data.dataset}
			{xFeature}
			{yFeature}
			{selectedImage}
		/>
		<Details_selected
			{clickedImage1}
			{clickedImage2}
			{selectedImage}
		/>
	</div>
	
	<div class="main">
		<Details
			{selectedImage}
		/>
		<Scatterplot_Selected
			dataset={data.dataset}
			{xFeature}
			{yFeature}
			{clickedImage1}
			{clickedImage2}
			{merge_x}
			{merge_y}
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
