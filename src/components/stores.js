import { tweened } from "svelte/motion";
import { cubicOut } from "svelte/easing";

const tweenOptions = {
  delay: 0,
  duration: 1000,
  easing: cubicOut,
};

export const zoom = tweened(1, tweenOptions);
