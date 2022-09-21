import anime from "animejs";

export let slideUp = {
  distance: "20px",
  origin: "bottom",
  opacity: 0,
  duration: 800,
  interval: 400,
  easing: "ease",
};

export let slideUpFast = {
  distance: "15px",
  origin: "bottom",
  opacity: 0,
  duration: 400,
  interval: 100,
  easing: "ease",
};

export function AnimeJs() {
  anime.timeline({ loop: false }).add({
    targets: ".ml12 .letter",
    translateX: [40, 0],
    translateZ: 0,
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 1200,
    delay: (el, i) => 500 + 30 * i,
  });
}
