let changeLanguage = (e) => {
  let language = event.target.getAttribute('language');
  switch (language) {
    case "en":
      dutchText.forEach((item, i) => {
        item.classList.add("hidden")
      });
      englishText.forEach((item, i) => {
        item.classList.remove("hidden")
      });
      document.getElementById("english--button").classList.add("hidden");
      document.getElementById("dutch--button").classList.remove("hidden");
      break;
    case "du":
      englishText.forEach((item, i) => {
        item.classList.add("hidden")
      });
      dutchText.forEach((item, i) => {
        item.classList.remove("hidden")
      });
      document.getElementById("dutch--button").classList.add("hidden");
      document.getElementById("english--button").classList.remove("hidden");
      break;

    default:
    break;
  }
}

document.getElementById("dutch--button").classList.add("hidden"); // hide all lang attributes on start.
document.getElementById("english--button").classList.remove("hidden"); // show just Korean text (you can change it)
document.getElementById("language--buttons").addEventListener("click", changeLanguage);

const englishText = document.querySelectorAll('[language="en"]');
const dutchText = document.querySelectorAll('[language="du"]');
