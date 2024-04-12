<script>
	export let selectedImage;
	export let feature_maps;
	// draw();
	
</script>


<div class="shorter">
	{#if selectedImage}
		<img src={selectedImage.file_path} width='250px' alt="" />
		<h3>{selectedImage.emotion}</h3>
	{/if}
</div>
<!-- <div class="longer">longer hue</div> -->



<style>
	div {
		height: 50vh;
		width: 50%;
		color: white;
		font-weight: bolder;
	}

	.shorter {
		/* background: linear-gradient(90deg in hsl shorter hue, red, blue); */
		background: linear-gradient(red 0%, orange 25%, yellow 50%, green 75%, blue 100%);
	}

	/* .longer {
		background: linear-gradient(90deg in hsl longer hue, red, blue);
	} */

</style>
