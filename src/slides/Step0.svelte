<script>
  /**
      Component based on Svelte Scrollytelling Starter by Connor Rothschild https://twitter.com/CL_Rothschild
  */
  export let data;
  import Scrolly from "../components/Scrolly.svelte";
  import PixelZoomIn from "../components/PixelZoomIn.svelte";
  import Step1 from "./Step1.svelte";
  import Step2 from "./Step2.svelte";
  import Step3 from "./Step3.svelte";

  let value;
  const steps = [
    "<p>Have you ever wondered how machines understand images and detect features in them? How can a machine detect the emotion that is being shown in an image?</p>",
    "<p>Although we don't see them, an image is composed of thousands of pixels arranged in a grid.</p>",
    "<p>It is essentially a matrix.</p>",
    "<p>In each cell, the matrix stores 3 values, which correspond to the values of colors that digital displays use: red, green, and blue.</p>",
    "<p>As each cell stores 3 values, we could think of images as having 3 <i>layers</i>, one for red values, one for green, and one for blue.<br><br> This means that for each image we have <i><b>3 * {image width} * {image height}</b></i> different values.<br><br>For a 600 px * 800 px image, we would have 3 * 600 * 800 = <b>1,440,000 values!</b></p>",
    "<p>But to extract an emotion from an image, we only need one value: its <b>emotion</b>. Or maybe two: the <b>confidence</b> with which we can say 'Yeah, that image is showing this emotion'.<br><br>So, <b>how do we summarize 1,440,000 values into only one or two?</b>",
  ];
</script>

<div class="wrapper">
  <div class="hero">
    <h1>
      Visualizing machine understanding of <span
        ><div class="gradient-text">human emotion</div></span
      >
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
  <div class="x-short-spacer" />
  <div class="explanation">
    <p>
      To do this, we can use <b
        ><a href="https://en.wikipedia.org/wiki/Neural_network"
          >artificial neural networks</a
        ></b
      >, which are mathematical models used in machine-learning to train
      machines. In this case, we will use them to train a machine in the
      identification of emotions.
    </p>
    <p>
      But still, the results of a neural network are matrices full of floating
      numbers that won't mean anything to humans like us. How can we visualize
      these numbers?
    </p>
    <p>
      What if we take each one of the layers (or matrices) and compute the
      average of all the numbers inside them? We would get an array of values,
      right? We could then compute the average of each pair of values in that
      array until we end up with 8 colors, each comprised of 4 values (red,
      green, blue, and an opacity value). These are some of the results:
    </p>
  </div>
  <div class="x-short-spacer" />
  <div class="dashboard features">
    <Step1 {data} />
  </div>
  <div class="x-short-spacer" />
  <div class="explanation">
    <p>
      With these visualizations it is still hard to see the similarities and
      differences between the images. What if we tried another way of <b
        >lowering the dimensionality</b
      > of our initial layers?
    </p>
    <p>
      We can use an algorithm called <b
        ><a
          href="https://en.wikipedia.org/wiki/T-distributed_stochastic_neighbor_embedding"
          >t-SNE</a
        ></b
      >, which takes one highly-dimensional data point (in our case, an image)
      and projects it into a lower dimensional plane, like an X-Y plot. This
      scatterplot shows more clearly
      <b
        >how different or similar the images are to the machine in terms of
        their emotion.</b
      >
    </p>
  </div>
  <div class="x-short-spacer" />
  <div class="dashboard">
    <Step2 {data} />
  </div>
  <div class="x-short-spacer" />
  <div class="explanation">
    <p>
      So now we have the features of every image as x and y coordinates in a
      two-dimensional plane. What will happen if we add the images and features
      of two different emotions together?
    </p>
  </div>
  <div class="x-short-spacer" />
  <div class="dashboard features">
    <Step3 {data} />
  </div>
  <div class="x-short-spacer" />
  <div class="explanation">
    <p>
      It is hard to observe the emotion from the mixed face. However, we can see
      that in the feature space, happy feature + sad feature = disgust feature
      instead of neutral feature!
    </p>
  </div>
  <div class="short-spacer" />
</div>

<style>
  .explanation {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3em;
    align-items: center;
  }
  .explanation p {
    max-width: 600px;
  }

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

  .dashboard.features {
    height: auto;
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

  .x-short-spacer {
    height: 15vh;
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
