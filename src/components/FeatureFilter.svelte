<script>
  export let selected;
  const opts = ["First layer", "Second layer", "Final layer"];
  console.log(selected);
</script>

<h4>Feature layer:</h4>
<div class="label-and-select">
  {#each opts as opt}
    <label>
      <input type="radio" name="layers" value={opt} bind:group={selected} />
      {opt}
    </label>
  {/each}
</div>

<style>
  label {
    font-style: italic;
  }
  .label-and-select {
    display: flex;
    align-items: center;
    gap: 2em;
  }
</style>
