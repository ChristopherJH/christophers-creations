import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense

interface CoordsObject {
  initialRadius: number;
  xCoord: number;
  yCoord: number;
}
export function LayersOfCircles(): JSX.Element {
  /* Program that randomly generates a canvas of concentric circles */

  /* Program that randomly generates a canvas of concentric circles */

  const numOfCircles = 25;
  let coordsArray: CoordsObject[] = [];
  const palette = [
    "#d9ed92",
    "#b5e48c",
    "#99d98c",
    "#76c893",
    "#52b69a",
    "#34a0a4",
    "#168aad",
    "#1a759f",
    "#1e6091",
    "#184e77",
  ];
  const numOfLayers = palette.length - 1;
  let meanRadius = 250;
  let radiusSpread = 50;
  const width = 500;
  const height = 500;

  function setup(p5: p5Types, canvasParentRef: Element) {
    p5.frameRate(0.5);
    const canvas = p5.createCanvas(width, height);
    canvas.mousePressed(onMousePress);
    createCenters(p5);
    //p5.drawingContext.shadowColor = p5.color(0, 0, 0, 150);
  }

  function draw(p5: p5Types) {
    p5.background(palette[0]);
    drawLayers(p5);
  }

  function createCenters(p5: p5Types) {
    for (let i = 0; i < numOfCircles; i++) {
      let circleObject = {
        initialRadius: p5.randomGaussian(meanRadius, radiusSpread),
        xCoord: p5.random(0, width),
        yCoord: p5.random(0, height),
      };
      coordsArray.push(circleObject);
    }
  }

  function drawLayers(p5: p5Types) {
    /* Here we draw each layer twice, one with the shadow and
		 one without
		 */
    for (let j = 0; j < numOfLayers; j++) {
      //p5.drawingContext.shadowBlur = 25;
      drawLayer(p5, j);
      //p5.drawingContext.shadowBlur = 0;
      drawLayer(p5, j);
    }
  }

  function drawLayer(p5: p5Types, j: number) {
    p5.fill(palette[j]);
    p5.noStroke();
    for (let circ of coordsArray) {
      // Created our own function to decrease circle radius
      const radius =
        circ.initialRadius - ((j * 0.8) / numOfLayers) * circ.initialRadius;
      p5.circle(circ.xCoord, circ.yCoord, radius * 2);
    }
  }

  function onMousePress(p5: p5Types) {
    createCenters(p5);
    p5.redraw();
    console.log("Mouse pressed!");
  }

  return (
    <div className="layers-of-circles">
      <h2>Layers of circles</h2>
      <Sketch setup={setup} draw={draw} />
    </div>
  );
}
