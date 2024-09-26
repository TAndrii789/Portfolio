
let greeting = {};
greeting.opacityIn = [0,1];
greeting.scaleIn = [0.2, 1];
greeting.scaleOut = 3;
greeting.durationIn = 800;
greeting.durationOut = 600;
greeting.delay = 500;

function newf(){
anime.timeline({ loop: false})
  .add({
    targets: '.greeting .letters-1',
    opacity: greeting.opacityIn,
    scale: greeting.scaleIn,
    duration: greeting.durationIn
  }).add({
    targets: '.greeting .letters-1',
    opacity: 0,
    scale: greeting.scaleOut,
    duration: greeting.durationOut,
    easing: "easeInExpo",
    delay: greeting.delay
  }).add({
    targets: '.greeting .letters-2',
    opacity: greeting.opacityIn,
    scale: greeting.scaleIn,
    duration: greeting.durationIn
  }).add({
    targets: '.greeting .letters-2',
    opacity: 0,
    scale: greeting.scaleOut,
    duration: greeting.durationOut,
    easing: "easeInExpo",
    delay: greeting.delay
  }).add({
    targets: '.greeting .letters-3',
    opacity: greeting.opacityIn,
    scale: greeting.scaleIn,
    duration: greeting.durationIn
  }).add({
    targets: '.greeting .letters-3',
    opacity: 0,
    scale: greeting.scaleOut,
    duration: greeting.durationOut,
    easing: "easeInExpo",
    delay: greeting.delay
  }).add({
    targets: '.greeting',
    opacity: 0,
    duration: 500,
    delay: 500
  });

}

  export { greeting, newf };


