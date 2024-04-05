<script>
  import FeatureSelect from "./FeatureSelect.svelte";

  export let dataset;
  export let xFeature;
  export let yFeature;
  export let colorFeature;

  $: axisColumns = dataset.columns.filter(
    (col) => typeof dataset[0][col] === "number"
  );

  $: colorColumns = dataset.columns.filter((col) => {
    const numUnique = new Set(dataset.map((d) => d[col])).size;
    return numUnique <= 10;
  });
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
  <!-- <FeatureSelect
    bind:value={colorFeature}
    options={colorColumns}
    label={"Color"}
  /> -->
</div>

<style>
  div {
    display: flex;
    gap: 4em;
  }
</style>
