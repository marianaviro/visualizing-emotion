<script>
	export let dataset;
	export let selectedImage;
	export let clickedImage1;
	export let clickedImage2;
	
	// draw();
	
</script>

<div id="img1" class="details_selected">
	{#if clickedImage1}
		<img src={clickedImage1.file_path} width='250px' alt="" />
	{/if}
</div>
<div>
	<canvas class="add" id='add_img_fig' width='100px' height='310px'></canvas>
</div>

<div id="img2" class="details_selected">
	{#if clickedImage2}
		<img src={clickedImage2.file_path} width='250px' alt="" />
		<!-- <h3>{clickedImage2.emotion}</h3>
		<h3>{clickedImage2.color}</h3> -->
	{/if}
</div>

<div>
	<canvas class="add" id='eq_img_fig' width='100%' height='310px'></canvas>
</div>

<div  class="details_selected">
	<canvas id="myCanvas" width='250px' height='310px' style="border:1px solid grey"></canvas>
</div>

<style>
	.details_selected {
		flex: 1;
		/* float: left; */
		/* width: 20%; */
		height: 320px;
	}
	.add {
		/* display: block; */
		flex: 1;
		margin-left: auto;
		margin-right: auto;
	}
	/* img {
		border: #DFFF00 4px solid;
	} */
</style>
