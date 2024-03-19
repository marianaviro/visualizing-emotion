<script>
  import * as d3 from "d3";
  import ConfidenceMeter from "./ConfidenceMeter.svelte";
  export let dataset;
  export let selectedImage;

  $: confidenceScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, (d) => d.confidence))
    .range([0, 410]);
</script>

<div class="details">
  {#if selectedImage}
    <img
      src={selectedImage.file_path}
      alt="Person showing {selectedImage.emotion}"
    />
    <h1>
      {selectedImage.emotion}<span class="color">({selectedImage.color})</span>
    </h1>
  {/if}
  <ConfidenceMeter
    color={selectedImage.color}
    confidence={selectedImage.confidence}
    {confidenceScale}
  />
</div>

<style>
  .details {
    flex: 1;
    height: 100%;
  }
  img {
    max-height: 80%;
  }
  .color {
    font-size: 1em;
    font-style: italic;
    font-weight: normal;
    margin-left: 10px;
  }
</style>
