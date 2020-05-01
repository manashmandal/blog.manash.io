import React, { PureComponent } from "react";
import { graphql, StaticQuery } from "gatsby";
import { useState, useCallback } from "react";
import * as _ from "lodash";
import { BarChart, Bar, Cell } from "recharts";

const tagColorMap = {
  "C++": "#f34b7d",
  python: "#3572A5",
  javascript: "#f1e05a",
  aws: "#FF9900",
  django: "#092e20",
  go: "#00ADD8",
  react: "#61DBFB",
};

export default () => {
  // solved using this solution: https://stackoverflow.com/questions/58222004/how-to-get-parent-width-height-in-react-using-hooks
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);

  const div = useCallback((node) => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  return (
    <StaticQuery
      query={graphql`
        query TagQuery {
          allPost {
            nodes {
              tags {
                name
                slug
              }
            }
          }
        }
      `}
      render={(_data) => {
        let tags = _data.allPost.nodes
          .map((node) => node.tags.map((t) => t.name))
          .flat(2);
        let groupTags = _.groupBy(tags);
        let data = Object.keys(groupTags).map((gt) => ({
          name: gt,
          count: groupTags[gt].length,
          fill: tagColorMap[gt],
        }));
        // bounds
        const xMax = width - 500;

        console.log({ data });

        return (
          <div ref={div}>
            <BarChart width={xMax} height={100} data={data}>
              <Bar dataKey="count" label={true}>
                {data.map((d, idx) => (
                  <Cell fill={d.fill} key={idx} />
                ))}
              </Bar>
            </BarChart>
          </div>
        );
      }}
    />
  );
};
