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

// console.log(_.groupBy(tags, "length"));
