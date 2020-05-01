/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import { Tag } from "antd";
import "antd/dist/antd.css";

type KeywordsProps = {
  description: string;
  delimiter: string;
};

const px = [`32px`, `16px`, `8px`, `4px`];
const shadow = px.map((v) => `rgba(0, 0, 0, 0.15) 0px ${v} ${v} 0px`);

export const Keywords = ({ description, delimiter }: KeywordsProps) => (
  <h1>
    {description.split(delimiter).map((item) => (
      <Tag style={{ fontSize: "16px" }}>{item}</Tag>
    ))}
  </h1>
);

// export Keywords;
