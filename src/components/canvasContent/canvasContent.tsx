import React, { useEffect, useState } from "react";
import styles from "./canvasContent.module.less";
import { fabric } from "fabric";
import { Rect, Canvas, Circle } from "fabric/fabric-impl";

interface IProps {
  activeKey: string;
}

function CanvasContent(props: IProps): JSX.Element {
  const { activeKey } = props;
  const [canvas, setCanvas] = useState<Canvas>();

  useEffect(() => {
    const canvasDom = new fabric.Canvas("canvas");
    setCanvas(canvasDom);
  }, []);

  useEffect(() => {
    if (!canvas) {
      return;
    }
    canvas.off("mouse:down");
    canvas.off("mouse:move");
    canvas.off("mouse:up");
    const colorArr = [
      "#f40",
      "green",
      "pink",
      "yellow",
      "blue",
      "#fb0000",
      "#17df27",
      "#0fdbd2",
      "#d421d6",
      "#b9eb21",
    ];
    let graph: any = null;
    let isDown = false;
    let originX = 0;
    let originY = 0;
    let radius = 10;

    canvas.on("mouse:down", function (o) {
      if (canvas.getActiveObject()) {
        isDown = false;
        return;
      }
      const fillColor = colorArr[Math.floor(Math.random() * colorArr.length)];
      switch (activeKey) {
        case "0":
          graph = new fabric.Rect({
            left: originX,
            top: originY,
            fill: fillColor,
          });
          break;
        case "1":
          graph = new fabric.Circle({
            left: originX,
            top: originY,
            fill: fillColor,
            radius: radius,
          });
          break;
        case "2":
          graph = new fabric.Line();
          break;
      }
      const pointer = canvas.getPointer(o.e);
      isDown = true;
      originX = pointer.x;
      originY = pointer.y;
      radius = 10;
      graph.set({ top: originY, left: originX });
    });

    canvas.on("mouse:move", function (o) {
      if (!isDown) return;
      const pointer = canvas.getPointer(o.e);
      if (originX > pointer.x) {
        graph.set({ left: Math.abs(pointer.x) });
      }
      if (originY > pointer.y) {
        graph.set({ top: Math.abs(pointer.y) });
      }
      switch (activeKey) {
        case "0":
          graph.set({ width: Math.abs(originX - pointer.x) });
          graph.set({ height: Math.abs(originY - pointer.y) });
          break;
        case "1":
          const radius =
            Math.min(
              Math.abs(originX - pointer.x),
              Math.abs(originY - pointer.y)
            ) / 2;
          graph.set({ radius });
          break;
        case "2":
          const fillColor =
            colorArr[Math.floor(Math.random() * colorArr.length)];
          const lineX = originX > pointer.x ? Math.abs(pointer.x) : originX;
          graph = new fabric.Line(
            [
              lineX,
              Math.abs(pointer.y),
              lineX + Math.abs(originX - pointer.x),
              Math.abs(pointer.y),
            ],
            {
              fill: fillColor,
              stroke: fillColor,
            }
          );
          break;
      }

      canvas.renderAll();
    });

    canvas.on("mouse:up", function (o) {
      isDown = false;
      canvas.add(graph);
    });
  }, [canvas, activeKey]);

  return (
    <div className={styles.canvas_box}>
      <canvas
        className={styles.canvas_dom}
        id="canvas"
        width="800"
        height="600"
      ></canvas>
    </div>
  );
}

export default CanvasContent;
