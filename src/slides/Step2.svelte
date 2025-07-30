<script>
  // import FeatureControls from "../components/FeatureControls.svelte";
  // import Voronoi from "../components/Voronoi.svelte";
  import * as d3 from "d3";
  import ScatterplotImages from "../components/ScatterplotImages.svelte";
  import Details from "../components/Details.svelte";
  import ColorLegend from "../components/ColorLegend.svelte";

  import FeatureFilter from "../components/FeatureFilter.svelte";

  export let data;

  let selected = 2;

  $: xFeature =
    selected == 2
      ? "lc_tsne2_f1"
      : selected == 1
        ? "lb_tsne2_f1"
        : "la_tsne2_f1";
  $: yFeature =
    selected == 2
      ? "lc_tsne2_f2"
      : selected == 1
        ? "lb_tsne2_f2"
        : "la_tsne2_f2";

  let selectedImage = data.dataset[0];
  let isIntact = true;
  let showAll = true;

  function onhover(image) {
    selectedImage = image;
    isIntact = false;
    showAll = false;
  }

  function reset() {
    showAll = true;
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

<div class="main">
  <div class="controls">
    <FeatureFilter bind:selected />
  </div>
  <div class="scatterplot">
    <ScatterplotImages
      {onhover}
      dataset={data.dataset}
      {xFeature}
      {yFeature}
      {selectedImage}
      {isIntact}
      {showAll}
      {reset}
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
    /* max-width: 50%; */
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1em;
    flex: 1;
  }

  .details {
    flex: 0.5;
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
