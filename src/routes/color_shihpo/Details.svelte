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
	{#if selectedImage}
		<img src={selectedImage.file_path} width='250px' alt="" />
		<h3>{selectedImage.emotion}</h3>
	{/if}
</div>

<style>
	.details {
		flex: 1;
		float: left;
		/* height: 50%; */
	}
</style>
