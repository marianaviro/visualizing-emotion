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
    if (step == 5) {
      zoom.set(1);
    }
  }

  $: grid = step == 2 ? true : false;

  $: grids = step === 4 ? true : false;

  $: cell = step == 3 ? true : false;

  $: emotion = step == 5 ? true : false;
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
  {:else if emotion}
    <div class="emotion" transition:fly={{ x: 200, duration: 1000 }}>
      <div class="emotion-value">
        <h3>Happiness</h3>
        <p>Confidence: 0.89</p>
      </div>
    </div>
  {:else if grids}
    <div class="grids" transition:fade>
      <div class="superposed">
        <img id="superposed-3" src={grid_path} alt="Pixel grid" />
        <p>Blue</p>
      </div>
      <div class="superposed">
        <img id="superposed-2" src={grid_path} alt="Pixel grid" />
        <p>Green</p>
      </div>
      <div class="superposed">
        <img id="superposed-1" src={grid_path} alt="Pixel grid" />
        <p>Red</p>
      </div>
    </div>
  {/if}
</div>

<style>
  .emotion {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 40%;
    place-items: center;
    justify-content: center;
    background-color: white;
  }
  .emotion-value {
    text-align: left;
    padding: 20px 20px;
  }
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

  .grids {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
  }

  .superposed {
    width: 100%;
    height: 100%;
    opacity: 0.8;
  }
  .superposed p {
    background-color: beige;
    padding: 5px;
    font-weight: bold;
  }
  .superposed img {
    box-shadow: -5px -5px 10px rgba(0, 0, 0, 0.2);
  }
  #superposed-1 {
    background-color: crimson;
    position: absolute;
    left: 70px;
    top: 70px;
  }
  #superposed-2 {
    background-color: mediumseagreen;
    position: absolute;
    left: 40px;
    top: 40px;
  }
  #superposed-3 {
    background-color: dodgerblue;
    position: absolute;
    left: 10px;
    top: 10px;
  }
  #superposed-1 ~ p {
    background-color: crimson;
    position: absolute;
    left: 80px;
    top: 75px;
  }
  #superposed-2 ~ p {
    background-color: mediumseagreen;
    position: absolute;
    left: 50px;
    top: 45px;
  }
  #superposed-3 ~ p {
    background-color: dodgerblue;
    position: absolute;
    left: 20px;
    top: 15px;
  }
</style>
