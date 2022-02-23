import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import "../App.css";
interface CoordsObject {
  initialRadius: number;
  xCoord: number;
  yCoord: number;
}

interface LayersOfCirclesProps {
  circleCount: number;
}

export function LayersOfCircles(props: LayersOfCirclesProps): JSX.Element {
  /* Program that randomly generates a canvas of concentric circles */

  let coordsArray: CoordsObject[] = [];
  let width: number;
  let height: number;

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

  function setup(p5: p5Types, canvasParentRef: Element) {
    p5.frameRate(0.5);
    width = p5.windowWidth;
    height = p5.windowHeight;
    p5.createCanvas(width, height);
    createCenters(p5);
    //p5.drawingContext.shadowColor = p5.color(0, 0, 0, 150);
  }

  function draw(p5: p5Types) {
    p5.background(palette[0]);
    drawLayers(p5);
  }

  function createCenters(p5: p5Types) {
    for (let i = 0; i < props.circleCount; i++) {
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

  function mousePressed(p5: p5Types) {
    coordsArray = [];
    createCenters(p5);
    p5.redraw();
    console.log("Mouse pressed!");
  }

  return (
    <div className="layers-of-circles">
      <h2 className="layers-of-circles-title">Layers of circles</h2>
      <h3 className="layers-of-circles-helper">(Click to change)</h3>

      <Sketch setup={setup} draw={draw} mousePressed={mousePressed} />
    </div>
  );
}
