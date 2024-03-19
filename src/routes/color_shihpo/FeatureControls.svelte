<script>
	import FeatureSelect from './FeatureSelect.svelte';

	export let dataset;
	export let rFeature;
	export let gFeature;
	export let bFeature;
	export let colorFeature;

	$: axisColumns = dataset.columns.filter((col) => typeof dataset[0][col] === 'number');

	$: colorColumns = dataset.columns.filter((col) => {
		const numUnique = new Set(dataset.map((d) => d[col])).size;
		return numUnique <= 10;
	});
</script>

<div>
	<FeatureSelect bind:value={rFeature} options={axisColumns} label={'R value'} />
	<FeatureSelect bind:value={gFeature} options={axisColumns} label={'G value'} />
	<FeatureSelect bind:value={bFeature} options={axisColumns} label={'B value'} />
	<FeatureSelect bind:value={colorFeature} options={colorColumns} label={'Color'} />
</div>

<style>
	div {
		display: flex;
		gap: 1em;
	}
</style>
