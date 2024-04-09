<script>
  import { fade } from "svelte/transition";
  import { fly } from "svelte/transition";
  import { zoom } from "./stores.js";
  export let step;
  export let data;

  let selectedImage = data.dataset[0];
  let grid_path = "grid.png";
  let cell_path = "cell.png";

  let width;
  let height;

  const margin = { top: 30, bottom: 30, left: 30, right: 30 };

  $: {
    if (step == 0) {
      zoom.set(1);
    }
    if (step == 1) {
      zoom.set(95);
    }
    if (step == 2) {
      zoom.set(95);
    }
  }

  $: grid = step == 2 ? true : false;

  $: cell = step == 3 ? true : false;
</script>

<div
  class="chart-container"
  bind:offsetWidth={width}
  bind:offsetHeight={height}
>
  <div class="image-container">
    <img
      id="zoomImage"
      src={selectedImage.file_path}
      alt="Person showing {selectedImage.emotion}"
      style="transform: scale({$zoom});"
    />
    {#if grid}
      <img transition:fade id="grid" src={grid_path} alt="Pixel grid" />
    {:else if cell}
      <img transition:fade id="cell" src={cell_path} alt="Pixel as a cell" />
    {/if}
  </div>
  {#if cell}
    <div class="vector" transition:fly={{ x: 200, duration: 1000 }}>
      <div class="vector-value"><h3>R 167</h3></div>
      <div class="vector-value"><h3>G 116</h3></div>
      <div class="vector-value"><h3>B 78</h3></div>
    </div>
  {/if}
</div>

<style>
  .vector {
    position: absolute;
    top: 350px;
    left: 350px;
    display: flex;
    flex-direction: row;
    place-items: center;
    justify-content: center;
  }
  .vector-value {
    padding: 20px 20px;
    border: 0.5px solid black;
    background-color: white;
    border-collapse: collapse;
  }
  .chart-container {
    height: 80vh;
    max-width: 100%;
    border-radius: 5px;
    position: relative;
  }
  .image-container {
    position: relative;
    aspect-ratio: 3/4;
    width: 100%;
    height: 80vh;
    overflow: hidden;
    border-radius: 5px;
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform-origin: center center;
    image-rendering: pixelated;
  }
</style>
