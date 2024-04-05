<script>
  export let value;
  export let options;
  export let label;
</script>

<div class="label-and-select">
  <div class="label">{label}</div>
  <select bind:value>
    {#each options as opt}
      <option>{opt}</option>
    {/each}
  </select>
</div>

<style>
  .label {
    font-style: italic;
  }
  .label-and-select {
    display: flex;
    align-items: center;
    gap: 0.25em;
  }
</style>
