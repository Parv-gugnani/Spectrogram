// Spectrogram.js
import React, { useEffect } from "react";
import p5 from "p5";
import "p5/lib/addons/p5.sound";

const Spectrogram = () => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle the selected audio file here
      console.log("Selected audio file:", file);
    }
  };

  useEffect(() => {
    const sketch = (p) => {
      let mic;
      let fft;

      p.setup = () => {
        p.createCanvas(400, 400);
        mic = new p5.AudioIn();
        mic.start();
        fft = new p5.FFT();
        fft.setInput(mic);
      };

      p.draw = () => {
        p.background(0);
        let spectrum = fft.analyze();
        p.noStroke();
        for (let i = 0; i < spectrum.length; i++) {
          let amp = spectrum[i];
          let y = p.map(amp, 0, 256, p.height, 0);
          p.fill(i, 255, 255);
          p.rect(i * 4, y, 4, p.height - y);
        }
      };
    };

    new p5(sketch);
  }, []);

  return (
    <div>
      <h1>Basic Spectrogram</h1>
      <div id="canvas-container"></div>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
    </div>
  );
};

export default Spectrogram;
