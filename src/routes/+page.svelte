<script>
  import { style } from "d3";
  import Step2 from "../slides/Step2.svelte";
  import "./style.css";
  // data comes from the load function in +page.js
  export let data;
</script>

<div class="container">
  <Step2 {data} />
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
