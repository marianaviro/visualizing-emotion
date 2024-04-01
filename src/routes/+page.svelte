<script>
  import * as d3 from "d3";
  import Voronoi from "./Voronoi.svelte";
  import Scatterplot from "./Scatterplot.svelte";
  import ScatterplotHover from "./ScatterplotHover.svelte";
  import "./style.css";
  import Details from "./Details.svelte";
  import ColorLegend from "./ColorLegend.svelte";
  import FeatureControls from "./FeatureControls.svelte";

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
</script>

<div class="container">
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
      <Voronoi
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
</div>

<style>
  .container {
    padding: 2em;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
    gap: 4em;
  }

  .main {
    max-width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 2em;
    flex: 1;
  }

  .details {
    flex: 0.9;
    height: 100%;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 2em;
  }

  .scatterplot {
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
</style>
