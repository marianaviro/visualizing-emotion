<script>
  import * as d3 from "d3";
  import Voronoi from "../components/Voronoi.svelte";
  import ScatterplotHover from "../components/ScatterplotHover.svelte";
  import Details from "../components/Details.svelte";
  import ColorLegend from "../components/ColorLegend.svelte";
  import FeatureControls from "../components/FeatureControls.svelte";

  // data comes from the load function in +page.js
  import { onMount } from "svelte";
  export let data;

  let selectedImage = data.dataset[0];
  let scale = 1;

  // Function to zoom the image
  function zoomImage() {
    scale += 0.01;
    // Repeat the animation until the pixel grid is visible
    if (scale < 10) {
      // Adjust the scale limit as needed
      requestAnimationFrame(zoomImage);
    }
  }
  onMount(() => {
    // Start the animation on mount
    zoomImage();
  });
</script>

<div class="main">
  <div class="image-container">
    <img
      id="zoomImage"
      src={selectedImage.file_path}
      alt="Person showing {selectedImage.emotion}"
      style="transform: scale({scale});"
    />
  </div>
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
  .image-container {
    position: relative;
    width: 500px;
    height: 500px;
    overflow: hidden;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform-origin: center center;
    transition: transform 3s ease; /* Adjust duration as needed */
  }
</style>
