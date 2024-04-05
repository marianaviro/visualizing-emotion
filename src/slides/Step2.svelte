<script>
  import * as d3 from "d3";
  import Voronoi from "../components/Voronoi.svelte";
  import ScatterplotHover from "../components/ScatterplotHover.svelte";
  import Details from "../components/Details.svelte";
  import ColorLegend from "../components/ColorLegend.svelte";
  import FeatureControls from "../components/FeatureControls.svelte";

  // data comes from the load function in +page.js
  export let data;

  // default features to visualize
  let xFeature = "lc_tsne2_f1";
  let yFeature = "lc_tsne2_f2";
  let colorFeature = "color";
  let emotionFeature = "emotion";

  let selectedImage = data.dataset[0];
  function onhover(image) {
    selectedImage = image;
  }

  $: categories = Array.from(new Set(data.dataset.map((d) => d.color)));
  $: emotions = Array.from(
    data.dataset.map((d) => ({
      emotion: d.emotion,
      color: d.color,
    }))
  );

  $: color = d3.scaleOrdinal().domain(categories).range(d3.schemeTableau10);

  function onclick() {
    console.log("Click!");
  }
</script>

<div class="main">
  <div class="controls">
    <FeatureControls
      dataset={data.dataset}
      bind:xFeature
      bind:yFeature
      bind:colorFeature
    />
  </div>
  <div class="scatterplot">
    <ScatterplotHover
      {onclick}
      {onhover}
      dataset={data.dataset}
      {xFeature}
      {yFeature}
      {colorFeature}
      {emotionFeature}
      {color}
      {selectedImage}
    />
  </div>
  <div class="color">
    <ColorLegend {emotions} {color} {selectedImage} />
  </div>
</div>
<div class="details">
  <Details dataset={data.dataset} {selectedImage} />
</div>

<style>
  .main {
    max-width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 2em;
    flex: 1;
  }

  .details {
    flex: 1;
    height: 100%;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 2em;
  }

  .scatterplot {
    flex: 0.3;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
</style>
