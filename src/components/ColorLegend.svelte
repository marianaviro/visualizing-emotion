<script>
  export let color;
  export let emotions;
  export let selectedImage;
</script>

<div class="legend">
  {#each color.domain() as d}
    <div class={selectedImage.color == d ? "swatch border" : "swatch"}>
      <div class="square" style:background-color={d}></div>
      <p>
        {emotions.find((emotion) => emotion.color == d)["emotion"]}
      </p>
    </div>
  {/each}
</div>

<style>
  .legend {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.8em;
  }

  .swatch {
    display: flex;
    align-items: center;
    gap: 1em;
    border: 1px solid white;
    border-radius: 3px;
    padding: 0px 5px;
  }

  .border {
    border: 1px solid black;
    transition: border 500ms;
  }

  .square {
    width: 15px;
    height: 15px;
    border-radius: 3px;
  }
</style>
