<script>
	export let selectedImage;
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
