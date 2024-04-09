<script>
  import { style } from "d3";
  import Step0 from "../slides/Step0.svelte";
  import Step2 from "../slides/Step2.svelte";
  import "./style.css";
  export let data;
</script>

<div class="container">
  <Step0 {data} />
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
</style>
