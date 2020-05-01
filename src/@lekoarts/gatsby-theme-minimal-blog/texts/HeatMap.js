import React from "react";
import { graphql, StaticQuery } from "gatsby";
import { Bar } from "@vx/shape";
import { Group } from "@vx/group";
import { GradientTealBlue } from "@vx/gradient";
import { scaleBand, scaleLinear } from "@vx/scale";
import { useState, useCallback } from "react";
import * as _ from "lodash";

// const HeatMap = () => (
//   <StaticQuery
//     query={graphql`
//       query TagQuery {
//         allPost {
//           nodes {
//             tags {
//               name
//               slug
//             }
//           }
//         }
//       }
//     `}
//     render={(data) => {
//       console.log({ data });
//       return <div>FUCK</div>;
//     }}
//   />
// );

// const data = letterFrequency.slice(5);

// console.log({ data });

// accessors
// const x = (d) => d.letter;

export default () => {
  // solved using this solution: https://stackoverflow.com/questions/58222004/how-to-get-parent-width-height-in-react-using-hooks
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const x = (d) => d.tag;
  // const y = (d) => +d.frequency * 100;
  const y = (d) => +d.count;

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
          tag: gt,
          count: groupTags[gt].length,
        }));
        // bounds
        const xMax = width;
        const yMax = height - 50;

        // scales
        const xScale = scaleBand({
          rangeRound: [0, xMax],
          domain: data.map(x),
          padding: 0.4,
        });
        const yScale = scaleLinear({
          rangeRound: [yMax, 0],
          domain: [0, Math.max(...data.map(y))],
        });

        // console.log(countByTag);
        // console.log(y(countByTag[2]));

        return (
          <div ref={div}>
            <svg width={width} height={height}>
              <GradientTealBlue id="teal" />
              <rect width={width} height={height} fill={"url(#teal)"} rx={14} />
              <Group top={40}>
                {data.map((d, i) => {
                  const letter = x(d);
                  const barWidth = xScale.bandwidth();
                  const barHeight = yMax - yScale(y(d));
                  const barX = xScale(letter);
                  const barY = yMax - barHeight;
                  return (
                    <Bar
                      key={`bar-${letter}`}
                      x={barX}
                      y={barY}
                      width={barWidth}
                      height={barHeight}
                      fill="rgba(23, 233, 217, .5)"
                      onClick={(event) => {
                        alert(`clicked: ${JSON.stringify(Object.values(d))}`);
                      }}
                    />
                  );
                })}
              </Group>
            </svg>
          </div>
        );
      }}
    />
  );

  // return (
  //   <div ref={div}>
  //     <svg width={width} height={height}>
  //       <GradientTealBlue id="teal" />
  //       <rect width={width} height={height} fill={"url(#teal)"} rx={14} />
  //       <Group top={40}>
  //         {data.map((d, i) => {
  //           const letter = x(d);
  //           const barWidth = xScale.bandwidth();
  //           const barHeight = yMax - yScale(y(d));
  //           const barX = xScale(letter);
  //           const barY = yMax - barHeight;
  //           return (
  //             <Bar
  //               key={`bar-${letter}`}
  //               x={barX}
  //               y={barY}
  //               width={barWidth}
  //               height={barHeight}
  //               fill="rgba(23, 233, 217, .5)"
  //               onClick={(event) => {
  //                 alert(`clicked: ${JSON.stringify(Object.values(d))}`);
  //               }}
  //             />
  //           );
  //         })}
  //       </Group>
  //     </svg>
  //   </div>
  // );
};

// export default HeatMap;
