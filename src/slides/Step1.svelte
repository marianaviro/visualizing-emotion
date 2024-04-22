<script>
	import * as d3 from 'd3';
	import Details from '../components/step1_Details.svelte';
	import ColorHue from '../components/step1_ColorHue.svelte';
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
	for (let j = 0; j < 8; j ++){
		lc_colorhue[j] = new Array(8);
		lb_colorhue[j] = new Array(8);
		la_colorhue[j] = new Array(8);
		for (let i = 0; i < 8; i ++){
			lc_colorhue[j][i] = new Array(4);
			lb_colorhue[j][i] = new Array(4);
			la_colorhue[j][i] = new Array(4);
		}
	}
	
	
	let id = 1;
	let idx = 0;
	let clicked = false;

	let selectedImage_list = [
		data.dataset[0],
		data.dataset[5],
		data.dataset[10],
		data.dataset[15],
		data.dataset[20],
		data.dataset[25],
		data.dataset[30],
		data.dataset[35]
	];
	console.log('test', selectedImage_list);
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

	let n = new npyjs();
	async function onclick(selectedImage){
		// for (let i = 0; i < data.dataset.length; i++){
		// 	console.log(i, data.dataset[i].emotion);
		// }
		clicked = true;
		// console.log(selectedImage.lc_feat_path);
		// selectedImage_list[idx] = selectedImage;
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
				lc_colorhue[idx][i][j] = 0.0;
				lb_colorhue[idx][i][j] = 0.0;
				la_colorhue[idx][i][j] = 0.0;
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
		
		// var lc_sum = d3.sum(lc_feat_array, d => d);
		// console.log('ff', lc_sum);
		// console.log('frst', lc_colorhue);
		
		for (let i = 0; i < 8; i++){
			let lc_size = lc_feat_array.length / (8 * 4); // 8 colors, each has 4 values
			let lb_size = lb_feat_array.length / (8 * 4);
			let la_size = la_feat_array.length / (8 * 4);
			for (let j = 0; j < lc_size; j++){
				lc_colorhue[idx][i][0] += lc_feat_array[j + i * (lc_feat_array.length / 8)];
			}
			for (let j = 0; j < lb_size; j++){
				lb_colorhue[idx][i][0] += lb_feat_array[j + i * (lb_feat_array.length / 8)];
			}
			for (let j = 0; j < la_size; j++){
				la_colorhue[idx][i][0] += la_feat_array[j + i * (la_feat_array.length / 8)];
			}
			
			
			for (let j = lc_size; j < lc_size * 2; j++){
				lc_colorhue[idx][i][1] += lc_feat_array[j + i * (lc_feat_array.length / 8)];
			}
			for (let j = lb_size; j < lb_size * 2; j++){
				lb_colorhue[idx][i][1] += lb_feat_array[j + i * (lb_feat_array.length / 8)];
			}
			for (let j = la_size; j < la_size * 2; j++){
				la_colorhue[idx][i][1] += la_feat_array[j + i * (la_feat_array.length / 8)];
			}
			

			for (let j = lc_size * 2; j < lc_size * 3; j++){
				lc_colorhue[idx][i][2] += lc_feat_array[j + i * (lc_feat_array.length / 8)];
			}
			for (let j = lb_size * 2; j < lb_size * 3; j++){
				lb_colorhue[idx][i][2] += lb_feat_array[j + i * (lb_feat_array.length / 8)];
			}
			for (let j = la_size * 2; j < la_size * 3; j++){
				la_colorhue[idx][i][2] += la_feat_array[j + i * (la_feat_array.length / 8)];
			}
		

			for (let j = lc_size * 3; j < lc_size * 4; j++){
				lc_colorhue[idx][i][3] += lc_feat_array[j + i * (lc_feat_array.length / 8)];
			}
			for (let j = lb_size * 3; j < lb_size * 4; j++){
				lb_colorhue[idx][i][3] += lb_feat_array[j + i * (lb_feat_array.length / 8)];
			}
			for (let j = la_size * 3; j < la_size * 4; j++){
				la_colorhue[idx][i][3] += la_feat_array[j + i * (la_feat_array.length / 8)];
			}
		}
		// console.log(lc_colorhue);
		for (let i = 0; i < 8; i ++){
			for (let j = 0; j < 4; j++){
				lc_colorhue[idx][i][j] /= (lc_feat_array.length / (8 * 4));
				lb_colorhue[idx][i][j] /= (lb_feat_array.length / (8 * 4));
				la_colorhue[idx][i][j] /= (la_feat_array.length / (8 * 4));
				// selected_colorhue[i][j] = lc_colorhue[i][j];
			}
		}
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
	// function next_layer(){
	// 	color_idx += 1;
	// 	clicked = true;
	// 	for (let i = 0; i < 8; i ++){
	// 		for (let j = 0; j < 4; j++){
	// 			if (color_idx % 3 == 0){
	// 				selected_colorhue[i][j] = lc_colorhue[i][j];
	// 			}
	// 			else if (color_idx % 3 == 1){
	// 				selected_colorhue[i][j] = lb_colorhue[i][j];
	// 			}
	// 			else if (color_idx % 3 == 2){
	// 				selected_colorhue[i][j] = la_colorhue[i][j];
	// 			}
	// 		}
	// 	}
	// }

	$: categories = d3
		.groupSort(
			data.dataset,
			(g) => g.length,
			(d) => d[colorFeature]
		)
		.reverse();

	$: color = d3.scaleOrdinal().domain(categories).range(d3.schemeTableau10);
	
	let img_idx = [0, 5, 10, 15, 20, 25, 30, 35];
	for (let i = 0 ; i < img_idx.length; i ++ ){
		console.log(img_idx[i], data.dataset[img_idx[i]].emotion);
		onclick(data.dataset[img_idx[i]]);
	}
	
</script>

<div class="container">
	<!-- <div class="header">
		<button on:click={() => onclick()}>
			Select
		</button>
		<button on:click={() => next_layer()}>
			Next layer
		</button> 
	</div> -->
	<div class="main">
		<h3 style='width: 22%;text-align:center'>Feature from first layer</h3>
		<h3 style='width: 22%;text-align:center'>Feature from second layer</h3>
		<h3 style='width: 22%;text-align:center'>Feature from last layer</h3>
		<h3 style='width: 14%;text-align:center'>Image/Emotion</h3>
		<ColorHue
			bind:lc_colorhue={lc_colorhue[0]}
			bind:lb_colorhue={lb_colorhue[0]}
			bind:la_colorhue={la_colorhue[0]}
		/>
		<!-- <ColorHue
			bind:selected_colorhue={selected_colorhue}
			bind:clicked={clicked}
		/> -->
		<Details
			selectedImage={selectedImage_list[0]}
		/>
		<ColorHue
			bind:lc_colorhue={lc_colorhue[1]}
			bind:lb_colorhue={lb_colorhue[1]}
			bind:la_colorhue={la_colorhue[1]}
		/>
		<Details
		selectedImage={selectedImage_list[1]}
		/>
		<ColorHue
			bind:lc_colorhue={lc_colorhue[2]}
			bind:lb_colorhue={lb_colorhue[2]}
			bind:la_colorhue={la_colorhue[2]}
		/>
		<Details
		selectedImage={selectedImage_list[2]}
		/>
		<ColorHue
			bind:lc_colorhue={lc_colorhue[3]}
			bind:lb_colorhue={lb_colorhue[3]}
			bind:la_colorhue={la_colorhue[3]}
		/>
		<Details
			selectedImage={selectedImage_list[3]}
		/>
		<ColorHue
			bind:lc_colorhue={lc_colorhue[4]}
			bind:lb_colorhue={lb_colorhue[4]}
			bind:la_colorhue={la_colorhue[4]}
		/>
		<Details
			selectedImage={selectedImage_list[4]}
		/>
		<ColorHue
			bind:lc_colorhue={lc_colorhue[5]}
			bind:lb_colorhue={lb_colorhue[5]}
			bind:la_colorhue={la_colorhue[5]}
		/>
		<Details
			selectedImage={selectedImage_list[5]}
		/>
		<ColorHue
			bind:lc_colorhue={lc_colorhue[6]}
			bind:lb_colorhue={lb_colorhue[6]}
			bind:la_colorhue={la_colorhue[6]}
		/>
		<Details
			selectedImage={selectedImage_list[6]}
		/>

		<ColorHue
			bind:lc_colorhue={lc_colorhue[7]}
			bind:lb_colorhue={lb_colorhue[7]}
			bind:la_colorhue={la_colorhue[7]}
		/>
		<Details
			selectedImage={selectedImage_list[7]}
		/>


	</div>
	
	
</div>

<style>
	.container {
		/* set the font */
		font-family: system-ui, sans-serif;
		font-size: 16px;
		padding: 1em;
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-direction: column;
		gap: 2em;
	}

	.main {
		/* Use rest of vertical space not used by header */
		/* flex: 1; */
		/* Allowing main to shrink */
		/* min-height: 0; */
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
