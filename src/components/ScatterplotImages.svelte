<script>
  import * as d3 from "d3";
  import Axis from "./Axis.svelte";

  export let onhover;
  export let dataset;
  export let xFeature;
  export let yFeature;
  export let selectedImage;
  export let isIntact;
  export let reset;
  export let showAll;

  const margin = { top: 20, right: 60, bottom: 60, left: 0 };

  let borderBoxSize;

  let voronoi;

  $: width = borderBoxSize ? borderBoxSize[0].inlineSize : 400;

  $: height = borderBoxSize ? borderBoxSize[0].blockSize : 400;

  $: x = d3
    .scaleLinear()
    .domain(d3.extent(dataset, (d) => d[xFeature]))
    .range([margin.left, width - margin.right]);

  $: y = d3
    .scaleLinear()
    .domain(d3.extent(dataset, (d) => d[yFeature]))
    .range([height - margin.bottom, margin.top]);

  $: renderedData = dataset.map((d) => {
    return {
      x: x(d[xFeature]),
      y: y(d[yFeature]),
      color: d.color,
      file_path: d.file_path,
      emotion: d.emotion,
      confidence: d.confidence,
    };
  });

  // Adjust positions to prevent overlap
  const padding = 10; // Adjust as needed

  $: if (renderedData) {
    renderedData.forEach((d, i) => {
      let overlap = true;
      while (overlap) {
        overlap = false;
        for (let j = 0; j < i; j++) {
          const dx = d.x - renderedData[j].x;
          const dy = d.y - renderedData[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          //const isOutside = d.x + 40 > width || d.y + 60 > height;
          if (distance < 2 * padding) {
            d.x += padding;
            d.y += padding;
            overlap = true;
            break;
          }
        }
      }
    });
  }

  $: if (width && height) {
    const delaunay = d3.Delaunay.from(
      renderedData,
      (d) => d.x,
      (d) => d.y
    );
    voronoi = delaunay.voronoi([
      0 + margin.left,
      0 + margin.top,
      width - margin.right,
      height - margin.bottom,
    ]);
  }
</script>

<div
  class="scatter-container"
  bind:borderBoxSize
  on:mouseout={() => reset()}
  on:blur={() => reset()}
  aria-label="Scatterplot"
  role="presentation"
>
  <svg {width} {height}>
    {#if voronoi}
      {#each renderedData as d, i}
        <path
          class="cell"
          d={voronoi.renderCell(i)}
          fill="transparent"
          stroke-width="0"
          stroke="#eee"
          role="button"
          tabindex={d}
          aria-label="Point at ____"
          on:mouseover={() => onhover(d)}
          on:focus={() => onhover(d)}
        />
        <rect
          class={(selectedImage &&
            !isIntact &&
            selectedImage.emotion == d.emotion) ||
          showAll
            ? ""
            : "disabled"}
          x={d.x - 8}
          y={d.y - 10}
          width="16"
          height="20"
          fill="none"
          stroke-width="5"
          stroke={d.color}
        />
        <image
          class={(selectedImage &&
            !isIntact &&
            selectedImage.emotion == d.emotion) ||
          showAll
            ? "pic " + d.color
            : "pic-disabled"}
          xlink:href={d.file_path}
          x={d.x - 10}
          y={d.y - 10}
          width="20"
          height="20"
          role="button"
          aria-label="Point at ____"
          tabindex={d}
          on:mouseover={() => onhover(d)}
          on:focus={() => onhover(d)}
        />
      {/each}
      {#if selectedImage && !isIntact}
        <rect
          x={selectedImage.x - 26}
          y={selectedImage.y - 32}
          width="52"
          height="63"
          fill="none"
          stroke-width="5"
          stroke={selectedImage.color}
          stroke-linecap="round"
        />
        <image
          class={"pic " + selectedImage.color}
          xlink:href={selectedImage.file_path}
          x={selectedImage.x - 30}
          y={selectedImage.y - 30}
          width="60"
          height="60"
          role="button"
          aria-label="Point at ____"
          tabindex={selectedImage}
          on:mouseover={() => onhover(selectedImage)}
          on:focus={() => onhover(selectedImage)}
        />
      {/if}
    {/if}
  </svg>
</div>

<style>
  .scatter-container {
    height: 100%;
  }
  .cell,
  .pic,
  rect {
    cursor: pointer;
    transition:
      x 250ms,
      y 250ms;
  }

  .pic-disabled {
    opacity: 20%;
  }

  .disabled {
    display: none;
  }
</style>
