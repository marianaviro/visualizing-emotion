<script>
  import * as d3 from "d3";
  import { fade } from "svelte/transition";
  export let color;
  export let confidence;
  export let confidenceScale;

  let borderBoxSize;
  let height = 50;

  $: width = borderBoxSize
    ? Math.min(borderBoxSize[0].blockSize, borderBoxSize[0].inlineSize)
    : 410;
</script>

<div class="meter-container">
  {#key confidence}
    <svg {width} {height}>
      <defs>
        <linearGradient id="gradient">
          <stop offset="5%" stop-color="white" />
          <stop offset="95%" stop-color={color} />
        </linearGradient>
      </defs>
      <g>
        <rect {height} {width} fill="url(#gradient)" />
      </g>
      <g transform="translate({confidenceScale(confidence)}, 0)">
        <g transform="translate({confidence})">
          <line y2={6} stroke="black" />
          <text
            text-anchor="middle"
            dominant-baseline="hanging"
            fill="black"
            y={10}>{confidence}</text
          >
        </g>
      </g>
    </svg>
  {/key}
  <p>{confidence}</p>
</div>

<style>
</style>
