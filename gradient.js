const redRatio = gradientCanvas.getAttribute("red");
const greenRatio = gradientCanvas.getAttribute("green");
const blueRatio = gradientCanvas.getAttribute("blue");
const variablePart = gradientCanvas.getAttribute("variable-part");
const darkRatio = gradientCanvas.getAttribute("dark-ratio");

let colorScheme = document.firstElementChild.getAttribute("color-scheme");
let actualDarkRatio = colorScheme == "light" ? 1 : darkRatio;

const setColor = (x, y, r, g, b) => {
  canvasContext.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
  canvasContext.fillRect(x, y, 1, 1);
};

const redComponent = (x, y, t, actualDarkRatio) => {
  return (
    Math.floor(256 * (1 - variablePart) * actualDarkRatio * redRatio) +
    Math.floor(
      256 *
        variablePart *
        actualDarkRatio *
        redRatio *
        Math.cos((x * x - y * y) / 300 + t)
    )
  );
};

const greenComponent = function (x, y, t, actualDarkRatio) {
  return (
    Math.floor(256 * (1 - variablePart) * actualDarkRatio * greenRatio) +
    Math.floor(
      256 *
        variablePart *
        actualDarkRatio *
        greenRatio *
        Math.sin((x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300)
    )
  );
};

const blueComponent = function (x, y, t, actualDarkRatio) {
  return (
    Math.floor(256 * (1 - variablePart) * actualDarkRatio * blueRatio) +
    Math.floor(
      256 *
        variablePart *
        actualDarkRatio *
        blueRatio *
        Math.sin(
          5 * Math.sin(t / 9) +
            ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100
        )
    )
  );
};

let t = 0;

const generateThatCanvas = () => {
  for (x = 0; x <= canvasWidth; x++) {
    for (y = 0; y <= canvasHeight; y++) {
      setColor(
        x,
        y,
        redComponent(x, y, t, actualDarkRatio),
        greenComponent(x, y, t, actualDarkRatio),
        blueComponent(x, y, t, actualDarkRatio)
      );
    }
  }
  t = t + 0.01;
  colorScheme = document.firstElementChild.getAttribute("color-scheme");
  if (colorScheme == "light") {
    actualDarkRatio = 1;
    blendHeading.style.mixBlendMode = "color-burn";
  } else {
    blendHeading.style.mixBlendMode = "color-dodge";
    actualDarkRatio = darkRatio;
  }
  window.requestAnimationFrame(generateThatCanvas);
};
generateThatCanvas();
