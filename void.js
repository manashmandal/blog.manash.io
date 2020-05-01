{
  /* <Row>
  <Col xs={10} sm={8} md={6} lg={4} xl={2}></Col>
  <Col>
    <span>
      {Object.values(Technologies).map((d, i) => (
        <img src={d} key={i} width={100} style={{ marginRight: "10px" }} />
      ))}
    </span>
  </Col>
  <Col xs={10} sm={8} md={6} lg={4} xl={2}></Col>
</Row>; */
}

let data = JSON.parse(
  '{"allPost":{"nodes":[{"__typename":"MdxPost","tags":[{"name":"C++","slug":"c"}]},{"__typename":"MdxPost","tags":[{"name":"python","slug":"python"},{"name":"C++","slug":"c"},{"name":"aws","slug":"aws"}]},{"__typename":"MdxPost","tags":[{"name":"python","slug":"python"},{"name":"C++","slug":"c"},{"name":"aws","slug":"aws"}]}]}}'
);

const _ = require("lodash");
let tags = data.allPost.nodes
  .map((node) => node.tags.map((t) => t.name))
  .flat(2);
let groupTags = _.groupBy(tags);
let countByTag = Object.keys(groupTags).map((gt) => ({
  tag: gt,
  count: groupTags[gt].length,
}));

console.log(countByTag);

console.log(groupTags);

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

        return (
          <div ref={div}>
            <svg width={width} height={height}>
              <GradientDarkgreenGreen id="darkgreen" />
              <rect width={width} height={height} fill={"white"} rx={10} />
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
                      fill="url(#darkgreen)"
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
};

// console.log(_.groupBy(tags, "length"));
