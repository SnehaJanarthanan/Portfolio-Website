document.addEventListener("DOMContentLoaded", function () {
  const words = [
    "Back-end Developer",
    "Student",
    "Hackathon Enthusiast",
    "Public Speaker",
  ];
  const intervalDuration = 3000;
  let index = 0;
  const flipParagraph = document.getElementById("flip-paragraph");

  function updateText() {
    flipParagraph.classList.add("flipped"); // Add the 'flipped' class to trigger the flip animation
    setTimeout(() => {
      flipParagraph.textContent = words[index] + ".";
      flipParagraph.classList.remove("flipped"); // Remove the 'flipped' class to reset the flip animation
      index = (index + 1) % words.length;
    }, 250); // Wait for a short duration before changing the text
  }

  setInterval(updateText, intervalDuration);
  updateText();
});
