import { useState, useEffect } from "react";

import "./App.css";

const App = () => {
  const [value, setValue] = useState(50);

  useEffect(() => {
    const range = document.getElementById("range");

    const handleSliderChange = (e) => {
      const value = +e.target.value;
      const label = e.target.nextElementSibling;

      const rangeWidth = getComputedStyle(e.target).getPropertyValue("width");
      const labelWidth = getComputedStyle(label).getPropertyValue("width");

      const numWidth = +rangeWidth.substring(0, rangeWidth.length - 2);
      const numLabelWidth = +labelWidth.substring(0, labelWidth.length - 2);

      const max = +e.target.max;
      const min = +e.target.min;

      const left =
        value * (numWidth / max) -
        numLabelWidth / 2 +
        scale(value, min, max, 10, -10);

      label.style.left = `${left}px`;

      label.innerHTML = value;
    };

    range.addEventListener("input", handleSliderChange);

    return () => {
      range.removeEventListener("input", handleSliderChange);
    };
  }, []);

  const scale = (num, inMin, inMax, outMin, outMax) =>
    ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

  return (
    <div className="App">
      <h2>Custom Range Slider</h2>
      <div className="range-container">
        <input
          type="range"
          id="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <label htmlFor="range">{value}</label>
      </div>
    </div>
  );
};

export default App;
