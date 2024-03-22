<script>
  import * as d3 from "d3";
  import ConfidenceMeter from "./ConfidenceMeter.svelte";
  export let dataset;
  export let selectedImage;

  $: confidenceScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, (d) => d.confidence))
    .range([555, 0]);
</script>

<div class="details-container">
  <div class="top">
    <div class="column">
      <p class="label">source image</p>
      <div class="image">
        <img
          src={selectedImage.file_path}
          alt="Person showing {selectedImage.emotion}"
        />
      </div>
    </div>
    <div class="meter column">
      <ConfidenceMeter
        color={selectedImage.color}
        confidence={selectedImage.confidence}
        {confidenceScale}
      />
    </div>
  </div>
  <div class="bottom">
    <div class="metric column">
      <p class="label">emotion</p>
      <h1 class="value">
        {selectedImage.emotion}
      </h1>
    </div>
    <div class="metric column">
      <p class="label">confidence</p>
      <h1 class="value">
        {Math.round(selectedImage.confidence * 1000) / 1000}
      </h1>
    </div>
  </div>
</div>

<style>
  .details-container {
    max-height: 100%;
    padding-top: 31px;
    gap: 2em;
    display: flex;
    flex-direction: column;
  }

  .top {
    display: flex;
    flex-direction: row;
    gap: 2em;
  }

  .bottom {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 4em;
  }

  .column:first-of-type {
    width: 75%;
  }

  .column {
    width: 25%;
  }

  .meter {
    min-height: 100%;
  }

  .label {
    font-style: italic;
  }

  .metric {
    display: flex;
    flex-direction: column;
  }

  img {
    max-height: 90%;
  }

  .value {
    line-height: 0.9;
    font-size: 2.5em;
    font-family: "mono45-headline", monospace;
    font-weight: 700;
    font-style: normal;
    letter-spacing: 0.08em;
  }
</style>
