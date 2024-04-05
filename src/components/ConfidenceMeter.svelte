<script>
  import * as d3 from "d3";
  import { fade } from "svelte/transition";
  export let color;
  export let confidence;
  export let confidenceScale;

  let borderBoxSize;
  let width = 50;
  let scaleValues = [0, 0.25, 0.5, 0.75, 100];

  $: height = borderBoxSize
    ? Math.min(borderBoxSize[0].blockSize, borderBoxSize[0].inlineSize)
    : 555;
</script>

<div class="meter-container">
  {#key confidence}
    <svg {width} {height}>
      <defs>
        <linearGradient id="gradient" x1="0%" y2="0%" x2="0%" y1="100%">
          <stop offset="5%" stop-color="white" />
          <stop offset="95%" stop-color={color} />
        </linearGradient>
      </defs>
      <g>
        <rect
          {height}
          {width}
          stroke="black"
          stroke-linejoin="round"
          fill="url(#gradient)"
          id="gradient"
        />
      </g>
      {#each scaleValues as scaleValue}
        <g transform="translate(0, {confidenceScale(scaleValue)})">
          <line
            x2={70}
            stroke="black"
            stroke-width="0.5px"
            stroke-dasharray="2,5"
            stroke-linecap="round"
            id="indicator"
          />
          <text
            class="scale"
            text-anchor="start"
            dominant-baseline="hanging"
            fill="black"
            y={8}
            x={5}
            >{scaleValue * 100}%
          </text>
        </g>
      {/each}
      <g transform="translate(0, {confidenceScale(confidence)})">
        <g transform="translateY({confidence})">
          <line x2={70} stroke="black" stroke-width="8px" id="indicator" />
        </g>
      </g>
    </svg>
  {/key}
</div>

<style>
  .meter-container {
    min-height: 100%;
    display: flex;
    align-items: end;
  }
  .scale {
    font-size: 0.8em;
  }
  #gradient {
    min-height: 100%;
  }
  #indicator {
    transition:
      y1 250ms,
      y2 250ms,
      x1 250ms,
      x2 250ms;
  }
</style>
