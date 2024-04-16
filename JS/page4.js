class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.colors = ["#FFFF00", "#800080", "#00FFFF", "#00FF00", "#FF00FF"]; // Red, Blue, Green, Yellow
    this.specialCharColors = {}; // Object to store colors for special characters
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 10); // Reduced randomness of animation start
      const end = start + 30; // Reduced number of frames for animation
      this.queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = "";
    let complete = 0;

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.4) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        let color;
        if (this.specialCharColors[char]) {
          color = this.specialCharColors[char];
        } else {
          color = this.randomColor();
          this.specialCharColors[char] = color;
        }
        output += `<span class="dud" style="color: ${color}; font-weight: bold;">${char}</span>`;
      } else {
        output += from;
      }
    }

    this.el.innerHTML = output;

    if (complete === this.queue.length) {
      this.resolve();
      const lastPhrase = this.queue[this.queue.length - 1].to;
      const lastColor =
        this.colors[Math.floor(Math.random() * this.colors.length)]; // Choose a random color for the last phrase
      if (lastPhrase === phrases[phrases.length - 1]) {
        this.el.innerHTML = `<span class="dud" style="color: ${lastColor}; font-weight: bold;">${lastPhrase}</span>`;
      }
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }

  randomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }
}

// Example usage
const phrases = [
  "Backend Developer.",
  "Hackathon Enthusiast.",
  "Leader.",
  "Public Speaker.",
];

const el = document.querySelector(".text");
const fx = new TextScramble(el);
let counter = 0;
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 2000);
  });
  counter = (counter + 1) % phrases.length;
};

next();
