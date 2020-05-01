import React from "react";
import { Collapse } from "antd";
import "antd/dist/antd.css";

const { Panel } = Collapse;

export default ({ heading, text }) => (
  <Collapse
    bordered={false}
    defaultActiveKey={["1"]}
    style={{ fontSize: "20px" }}
  >
    <Panel header={`Definition of ${heading}`} key="1">
      <p style={{ paddingLeft: 24 }}>{text}</p>
    </Panel>
  </Collapse>
);
