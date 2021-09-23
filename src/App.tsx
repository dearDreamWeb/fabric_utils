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
import filter from "./assets/icons/filter.svg";

const navList = [
  {
    key: "0",
    icon: rect,
    tip: "矩形",
  },
  {
    key: "1",
    icon: circle,
    tip: "圆形",
  },
  {
    key: "2",
    icon: line,
    tip: "直线",
  },
  {
    key: "3",
    icon: curve,
    tip: "折线",
  },
  {
    key: "4",
    icon: paintBrush,
    tip: "画笔",
  },
  {
    key: "5",
    icon: fontSvg,
    tip: "字体",
  },
  {
    key: "6",
    icon: imgSvg,
    tip: "图片",
  },
  {
    key: "7",
    icon: broom,
    tip: "清空画布",
  },
  {
    key: "8",
    icon: eraser,
    tip: "橡皮擦",
  },
  {
    key: "9",
    icon: group,
    tip: "打组",
  },
  {
    key: "10",
    icon: unGroup,
    tip: "拆组",
  },
  {
    key: "11",
    icon: select,
    tip: "选择",
  },
  {
    key: "12",
    icon: filter,
    tip: "滤镜",
  },
];

export interface FilterItem {
  type: string;
  text: string;
  value: number;
  min: number;
  max: number;
}

const initFilters = [
  {
    type: "brightness",
    text: "明度",
    value: 0,
    min: -1,
    max: 1,
  },
  {
    type: "contrast",
    text: "对比度",
    value: 0,
    min: -1,
    max: 1,
  },
  {
    type: "hue",
    text: "色调",
    value: 0,
    min: -1,
    max: 1,
  },
  // {
  //   type: "vibrance",
  //   text: "饱和度",
  //   value: 0,
  //   min: -1,
  //   max: 1,
  // },
  {
    type: "noise",
    text: "噪点",
    value: 0,
    min: 0,
    max: 1000,
  },
  {
    type: "blur",
    text: "模糊",
    value: 0,
    min: 0,
    max: 1,
  },
];

function App() {
  const [activeKey, setActiveKey] = useState<string>("0");
  const [filters, setFilters] = useState<FilterItem[]>(initFilters);
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
            title={item.tip}
          >
            <i
              style={{ backgroundImage: `url(${item.icon})` }}
              className={styles.nav_item_icon}
            ></i>
          </div>
        ))}
      </div>
      <CanvasContent activeKey={activeKey} filters={filters} />
      {activeKey === "12" && (
        <div className={styles.filter_box}>
          {filters.map((item, index) => (
            <div key={item.type} className={styles.filter_item}>
              <span>{item.text}</span>
              <input
                type="range"
                className={styles.filter_item_range}
                step={0.01}
                min={item.min}
                max={item.max}
                value={item.value}
                onChange={e => {
                  const newFilters = [...filters];
                  newFilters[index].value = Number(e.target.value);
                  setFilters(newFilters);
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
