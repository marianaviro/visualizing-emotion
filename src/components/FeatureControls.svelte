<script>
  import FeatureSelect from "./FeatureSelect.svelte";

  export let dataset;
  export let xFeature;
  export let yFeature;

  $: axisColumns = dataset.columns.filter(
    (col) => typeof dataset[0][col] === "number"
  );
</script>

<div>
  <FeatureSelect
    bind:value={xFeature}
    options={axisColumns}
    label={"feature X:"}
  />
  <FeatureSelect
    bind:value={yFeature}
    options={axisColumns}
    label={"feature Y:"}
  />
</div>

<style>
  div {
    display: flex;
    gap: 4em;
  }
</style>
