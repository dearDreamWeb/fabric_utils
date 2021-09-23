import React, { useState } from "react";
import styles from "./app.module.less";
import CanvasContent from "./components/canvasContent/canvasContent";

import rect from "./assets/icons/rect.svg";
import circle from "./assets/icons/circle.svg";
import line from "./assets/icons/line.svg";
import curve from "./assets/icons/curve.svg";
import paintBrush from "./assets/icons/paintBrush.svg";
import fontSvg from "./assets/icons/font.svg";
import imgSvg from "./assets/icons/img.svg";
import broom from "./assets/icons/broom.svg";
import eraser from "./assets/icons/eraser.svg";
import group from "./assets/icons/group.svg";
import unGroup from "./assets/icons/unGroup.svg";
import select from "./assets/icons/select.svg";

const navList = [
  {
    key: "0",
    icon: rect,
  },
  {
    key: "1",
    icon: circle,
  },
  {
    key: "2",
    icon: line,
  },
  {
    key: "3",
    icon: curve,
  },
  {
    key: "4",
    icon: paintBrush,
  },
  {
    key: "5",
    icon: fontSvg,
  },
  {
    key: "6",
    icon: imgSvg,
  },
  {
    key: "7",
    icon: broom,
  },
  {
    key: "8",
    icon: eraser,
  },
  {
    key: "9",
    icon: group,
  },
  {
    key: "10",
    icon: unGroup,
  },
  {
    key: "11",
    icon: select,
  },
];

function App() {
  const [activeKey, setActiveKey] = useState<string>("0");
  return (
    <div className={styles.app_box}>
      <div className={styles.nav_box}>
        {navList.map(item => (
          <div
            key={item.key}
            className={`${styles.nav_item} ${
              activeKey === item.key ? styles.active_item : ""
            }`}
            onClick={() => setActiveKey(item.key)}
          >
            <i
              style={{ backgroundImage: `url(${item.icon})` }}
              className={styles.nav_item_icon}
            ></i>
          </div>
        ))}
      </div>
      <CanvasContent activeKey={activeKey} />
    </div>
  );
}

export default App;
