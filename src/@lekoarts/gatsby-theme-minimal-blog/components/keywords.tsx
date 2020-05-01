/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import { Tag } from "antd";
import * as _ from "lodash";
import "antd/dist/antd.css";

type KeywordsProps = {
  description: string;
  delimiter: string;
};

export const Keywords = ({ description, delimiter }: KeywordsProps) => (
  <span style={{ marginLeft: "10px" }}>
    {description.split(delimiter).map((item, idx) => (
      <Tag
        key={idx}
        style={{ fontSize: "16px" }}
        color={_.sample([
          "magenta",
          "red",
          "volcano",
          "orange",
          "geekblue",
          "purple",
          "cyan",
          "blue",
          "green",
        ])}
      >
        {item}
      </Tag>
    ))}
  </span>
);

// export Keywords;
