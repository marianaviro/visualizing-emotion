<script>
	import * as d3 from 'd3';
	import Scatterplot from './Scatterplot.svelte';
	import './style.css';
	import Details from './Details.svelte';
	import Details_selected from './Details_selected.svelte';
	import Scatterplot_Selected from './Scatterplot_selected.svelte';
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
	let merge_r = 0.0;
	let merge_g = 0.0;

	function draw_add(obj_id) {
		const c = document.getElementById(obj_id);
		const ctx = c.getContext("2d");
		ctx.moveTo(0, 150);
		ctx.lineTo(100, 150);
		ctx.moveTo(50, 90);
		ctx.lineTo(50, 210);
		ctx.lineWidth = 10;
		ctx.stroke();
	}

	function draw_eq(obj_id) {
		const c = document.getElementById(obj_id);
		const ctx = c.getContext("2d");
		ctx.moveTo(0, 135);
		ctx.lineTo(100, 135);
		ctx.moveTo(0, 165);
		ctx.lineTo(100, 165);
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
		document.getElementById("plot1").style.border="";
		document.getElementById("plot2").style.border="";
		merge_r = (clickedImage1[rFeature] + clickedImage2[rFeature]) / 2;
		merge_g = (clickedImage1[gFeature] + clickedImage2[gFeature]) / 2;
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
		<Details_selected
			dataset={data.dataset}
			{rFeature}
			{gFeature}
			{colorFeature}
			{emotionFeature}
			{selectedImage}
			{clickedImage1}
			{clickedImage2}
		/>
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
		
		<Scatterplot_Selected
			{onhover}
			dataset={data.dataset}
			{rFeature}
			{gFeature}
			{colorFeature}
			{emotionFeature}
			{color}
			{clickedImage1}
			{clickedImage2}
			{merge_r}
			{merge_g}
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
