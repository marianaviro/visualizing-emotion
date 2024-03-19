<script>
	export let dataset;
	export let selectedImage;
</script>

<div class="details">
	{#if selectedImage}
		<img src={selectedImage.file_path} alt="" />
		<h1>{selectedImage.emotion}</h1>
		<h6>{selectedImage.color}</h6>
	{/if}
</div>

<style>
	.details {
		flex: 1;
		height: 100%;
	}
</style>
