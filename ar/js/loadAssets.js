// a-scene
let closeStaticsButton = document.getElementById("button--close-static");
let scene = document.querySelector("a-scene");
let camera = document.querySelector("[camera]");
let audioControl = document.getElementById("audio-control");
let audioSource = document.getElementById("audio-source");
let markers = document.querySelectorAll("a-marker");
let lastObject;
let id;
let staticMarkers = ["14", "7", "16", "25", "2", "3"]; // id == 14 || id == 7 || id == 16 || id == 25


// console.log(markers);
markers.forEach((marker, i) => {
  marker.addEventListener("markerFound", (e) => {
    closeStaticsButton.classList.add("hidden");
    id = e.target.attributes.value.value;
    setOrbitControls(false, 0);
    deleteStatics();
    // if (staticMarkers.includes(id)) {
      lastObject = e.srcElement.cloneNode(true);
    // }
    startMusic(id);
  });

  marker.addEventListener("markerLost", (e) => {
    // if (staticMarkers.includes(id)) {
      console.log("lost");
      setOrbitControls(true);
      closeStaticsButton.classList.remove("hidden");
      createObjects(-5);
    // }
  });
});

function deleteStatics() {
  let itemsToRemove = document.querySelectorAll(`.static`);
  itemsToRemove.forEach((item, i) => {
    item.parentNode.removeChild(item);
  });
  closeStaticsButton.classList.add("hidden");
}
// Create object createObject
function createObjects(zaxis, element = undefined) {
  // if createObject exist, remove
  let children = lastObject.children;
  console.log(lastObject.children);
  Array.from(children).forEach((item, i) => {
    console.log(item);
    let itemToAdd = lastObject.lastElementChild;
    if (itemToAdd.getAttribute("static-position") != null) {
      itemToAdd.attributes.position.value = itemToAdd.getAttribute("static-position");
    }
    else{
        itemToAdd.attributes.position.value = "0 -5 0";
    }
    if (itemToAdd.getAttribute("static-rotation") != null) {
      itemToAdd.attributes.rotation.value = itemToAdd.getAttribute("static-rotation");
    }
    else{
      itemToAdd.attributes.rotation.value = "0 0 0";
    }
    if (itemToAdd.attributes.scale) {
      itemToAdd.attributes.scale.value = itemToAdd.getAttribute("static-scale");
    }
    itemToAdd.setAttribute("gesture-handler", '');
    itemToAdd.classList.add("static");
    scene.appendChild(itemToAdd);
  });



}
// let playVideo = (target) => {
//   // console.log(target);
//   target.play();
// }
let startMusic = (markerID) => {
  switch (parseInt(markerID)) {
    case 14: case 28:
      if (audioSource.src != `${window.location.href}assets/mp3/TuchthuisAankomst1.mp3`) {
        audioSource.src = "assets/mp3/TuchthuisAankomst1.mp3";
        audioControl.load(); //call this to just preload the audio without playing
        audioControl.classList.remove("hidden");
      }
      break;
    case 16:
      if (audioSource.src != `${window.location.href}assets/mp3/TuchthuisBrief3.mp3`) {
        audioSource.src = "assets/mp3/TuchthuisBrief3.mp3";
        audioControl.load(); //call this to just preload the audio without playing
        audioControl.classList.remove("hidden");
      }
      break;
    case 7:
      if (audioSource.src != `${window.location.href}assets/mp3/TuchthuisNachtelijkeoverpeinzing2.mp3`) {
        audioSource.src = "assets/mp3/TuchthuisNachtelijkeoverpeinzing2.mp3";
        audioControl.load(); //call this to just preload the audio without playing
        audioControl.classList.remove("hidden");
      }
      break;
    case 25:
      if (audioSource.src != `${window.location.href}assets/mp3/TuchthuisWritingsonthewall4.mp3`) {
        audioSource.src = "assets/mp3/TuchthuisWritingsonthewall4.mp3";
        audioControl.load(); //call this to just preload the audio without playing
        audioControl.classList.remove("hidden");
      }
      break;
    case 4:
      if (audioSource.src != `${window.location.href}assets/mp3/TuchthuisOutroMETAFTITELING5.mp3`) {
        audioSource.src = "assets/mp3/TuchthuisOutroMETAFTITELING5.mp3";
        audioControl.load(); //call this to just preload the audio without playing
        audioControl.classList.remove("hidden");
      }
      break;
    case 2:
      if (audioSource.src != `${window.location.href}assets/mp3/Vilvoorde-muzikale-ruimte-1.mp3`) {
        audioSource.src = "assets/mp3/Vilvoorde-muzikale-ruimte-1.mp3";
        audioControl.load(); //call this to just preload the audio without playing
        audioControl.classList.remove("hidden");
      }
      break;
    case 31:
      if (audioSource.src != `${window.location.href}assets/mp3/Vilvoorde-muzikale-ruimte-2.mp3`) {
        audioSource.src = "assets/mp3/Vilvoorde-muzikale-ruimte-2.mp3";
        audioControl.load(); //call this to just preload the audio without playing
        audioControl.classList.remove("hidden");
      }
      break;
    case 3:
      if (audioSource.src != `${window.location.href}assets/mp3/Vilvoorde-muzikale-ruimte-3.mp3`) {
        audioSource.src = "assets/mp3/Vilvoorde-muzikale-ruimte-3.mp3";
        audioControl.load(); //call this to just preload the audio without playing
        audioControl.classList.remove("hidden");
      }
      break;
    default:
      audioControl.classList.add("hidden");
      break;
  }
}

function setOrbitControls(lost, markerValue) {
  // console.log(lost);
  if (!lost) {
    camera.attributes['orbit-controls'].nodeValue = "enabled: false;";
    camera.getObject3D('camera').position.set(0, 0, 0);
    camera.getObject3D('camera').rotation.set(0, 0, 0);
    return;
  }

  camera.attributes['orbit-controls'].nodeValue = `target: 0 0 -5; minDistance: 0.5; maxDistance: 180; initialPosition: 0 0 0; enabled: true;`;

}
