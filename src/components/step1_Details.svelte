<script>
	export let selectedImage;
</script>


<div class="details">
	{#if selectedImage}
		<img src={selectedImage.file_path} width='40px' alt="" />
	{/if}
</div>
<div class="details">
	<h3>{selectedImage.emotion}</h3>
</div>
	




<style>
	.details {
		/* flex: 1;
		float: left; */
		/* height: 50%; */
	}
</style>
