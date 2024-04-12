<script>
  /**
      Component based on Svelte Scrollytelling Starter by Connor Rothschild https://twitter.com/CL_Rothschild
  */
  export let data;
  import Scrolly from "../components/Scrolly.svelte";
  import PixelZoomIn from "../components/PixelZoomIn.svelte";
  import Step2 from "./Step2.svelte";
  import Step3 from "./Step3.svelte";

  let value;
  const steps = [
    "<p>Have you ever wondered how machines understand images and detect features in them? How can a machine detect the emotion that is being shown in an image?</p>",
    "<p>Although we don't see them, an image is composed of thousands of pixels arranged in a grid.</p>",
    "<p>It is essentially a matrix.</p>",
    "<p>In each cell, the matrix stores 3 values, which correspond to the values of colors that digital displays use: red, green, and blue.</p>",
  ];
</script>

<div class="wrapper">
  <div class="hero">
    <h1>
      A <span><div class="gradient-text">chromatic analysis</div></span> of how machines
      identify emotions
    </h1>
    <h4>By Mariana Villamizar & Shih-Po Lee</h4>
  </div>
  <div class="section-container">
    <div class="steps-container">
      <Scrolly bind:value>
        {#each steps as text, i}
          <div class="step" class:active={value === i}>
            <div class="step-content">{@html text}</div>
          </div>
        {/each}
        <div class="spacer" />
      </Scrolly>
    </div>
    <div class="sticky">
      <PixelZoomIn step={value} {data} />
    </div>
  </div>
  <div class="spacer" />
  <div class="dashboard">
    <Step2 {data} />
  </div>
  <div class="short-spacer" />
  <div class="dashboard">
    <Step3 {data} />
  </div>
</div>

<style>
  :global(body) {
    overflow-x: hidden;
  }

  .gradient-text {
    background-image: linear-gradient(
      to right,
      rgb(255, 0, 0, 1),
      rgb(255, 179, 210, 1),
      rgb(255, 179, 210, 0),
      rgb(255, 179, 210, 1),
      rgb(255, 179, 210, 0)
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    -webkit-text-stroke: 1px black; /* Width and color of the stroke */
    text-stroke: 1px black;
    width: fit-content;
    margin: 0;
  }

  .wrapper {
    width: 100%;
  }

  .dashboard {
    padding: 2em;
    height: 80vh;
    width: 100vw;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    gap: 4em;
  }

  .hero {
    height: 80vh;
    display: flex;
    place-items: start;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    padding-right: 300px;
  }

  .hero h1 {
    line-height: 1.2;
    font-size: 5em;
    font-family: "mono45-headline", monospace;
    font-weight: 700;
    font-style: normal;
    letter-spacing: 0.08em;
  }

  .hero h4 {
    margin-top: 0;
    font-weight: 200;
  }

  .spacer {
    height: 60vh;
  }

  .short-spacer {
    height: 30vh;
  }

  .sticky {
    position: sticky;
    top: 10%;
    flex: 1 1 60%;
    width: 60%;
    display: flex;
    place-items: center;
    justify-content: center;
  }

  .section-container {
    margin-top: 1em;
    text-align: center;
    display: flex;
  }

  .step {
    height: 80vh;
    display: flex;
    place-items: center;
    justify-content: center;
  }

  .step-content {
    font-size: 1rem;
    color: #ccc;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: background 500ms ease;
    text-align: left;
    width: 75%;
    margin: auto;
    max-width: 500px;
  }

  .step.active .step-content {
    color: black;
  }

  .steps-container,
  .sticky {
    height: 100%;
  }

  .steps-container {
    flex: 1 1 40%;
    z-index: 10;
  }

  /* Comment out the following line to always make it 'text-on-top' */
  @media screen and (max-width: 768px) {
    .section-container {
      flex-direction: column-reverse;
    }
    .sticky {
      width: 95%;
      margin: auto;
    }
  }
</style>