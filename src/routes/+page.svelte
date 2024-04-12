<script>
  import { style } from "d3";
  import Step0 from "../slides/Step0.svelte";
  import Step2 from "../slides/Step2.svelte";
  import Step3 from "../slides/Step3.svelte";
  import "./style.css";
  export let data;
</script>

<div class="container">
  <Step0 {data} />
  <div class="spacer" />
  <div class="dashboard">
    <Step2 {data} />
  </div>
  <div class="spacer" />
  <div class="dashboard">
    <Step3 {data} />
  </div>
</div>

<style>
  .container {
    padding: 2em;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
    gap: 4em;
  }

  .dashboard {
    padding: 2em;
    height: 80vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
    gap: 4em;
  }

  :global(.spacer) {
    height: 60vh;
  }
</style>
