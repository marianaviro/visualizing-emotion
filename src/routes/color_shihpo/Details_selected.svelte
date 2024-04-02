<script>
	export let dataset;
	export let selectedImage;
	export let clickedImage1;
	export let clickedImage2;
	function draw() {
		const c = document.getElementById("myCanvas");
		const ctx = c.getContext("2d");
		const img = document.getElementById("scream");
		ctx.drawImage(img, 10, 10);
	}
</script>

<div id="img1" class="details_selected">
	{#if clickedImage1}
		<img src={clickedImage1.file_path} width='250px' alt="" />
		<!-- <h3>{clickedImage1.emotion}</h3>
		<h3>{clickedImage1.color}</h3> -->
	{/if}
</div>
<!-- <div class='add'>
	<img  src='addition.jpg' height='40px' alt="" />
</div> -->

<div id="img2" class="details_selected">
	{#if clickedImage2}
		<img src={clickedImage2.file_path} width='250px' alt="" />
		<!-- <h3>{clickedImage2.emotion}</h3>
		<h3>{clickedImage2.color}</h3> -->
	{/if}
</div>

<div id="img_merge" class="details_selected">
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
		margin-left: auto;
		margin-right: auto;

	}
	/* img {
		border: #DFFF00 4px solid;
	} */
</style>
