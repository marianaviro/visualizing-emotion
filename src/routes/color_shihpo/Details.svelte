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

<div class="details">
	{#if clickedImage1}
		<img src={clickedImage1.file_path} width='50%' alt="" />
		<h3>{clickedImage1.emotion}</h3>
		<h3>{clickedImage1.color}</h3>
	{/if}
</div>
<div class="details">
	{#if clickedImage2}
		<img src={clickedImage2.file_path} width='50%' alt="" />
		<h3>{clickedImage2.emotion}</h3>
		<h3>{clickedImage2.color}</h3>
	{/if}
</div>
<div class="details">
	{#if selectedImage}
		<img src={selectedImage.file_path} width='50%' alt="" />
		<h3>{selectedImage.emotion}</h3>
		<h3>{selectedImage.color}</h3>
	{/if}
</div>
<div class="details">
	{#if selectedImage}
		<canvas id="myCanvas" style="border:1px solid grey"></canvas>
		<h3>{selectedImage.emotion}</h3>
		<h3>{selectedImage.color}</h3>
	{/if}
</div>
<style>
	.details {
		flex: 1;
		float: left;
		height: 100%;
	}
</style>
