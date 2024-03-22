<script>
  export let color;
  export let emotions;
</script>

<div class="swatches">
  {#each color.domain() as d}
    <div class="swatch">
      <div class="swatches">
        <div class="square" style:background-color={d}></div>
        <p class="name">
          {emotions.find((emotion) => emotion.color == d)["emotion"]}
        </p>
      </div>
    </div>
  {/each}
</div>

<style>
  .swatches {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1em;
  }

  .swatch {
    display: flex;
    align-items: center;
    gap: 0.25em;
  }

  .square {
    width: 15px;
    height: 15px;
    border-radius: 3px;
  }
</style>
