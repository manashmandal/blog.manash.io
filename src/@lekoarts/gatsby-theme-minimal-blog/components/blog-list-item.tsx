/** @jsx jsx */
import React from "react";
import { jsx, Link as TLink } from "theme-ui";
import { Box } from "@theme-ui/components";
import { Link } from "gatsby";
import ItemTags from "./item-tags";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import { Technologies } from "../texts/technologies";
import { Keywords } from "./keywords";

type BlogListItemProps = {
  post: {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    description: string;
    timeToRead?: number;
    tags?: {
      name: string;
      slug: string;
    }[];
  };
  showTags?: boolean;
};

const BlogListItem = ({ post, showTags = true }: BlogListItemProps) => (
  <Row>
    <Col lg={24 - 2 * post.tags?.length} xs={24 - 4 * post.tags?.length}>
      <Box mb={4}>
        <TLink
          as={Link}
          to={post.slug}
          sx={{ fontSize: [1, 2, 3], color: `text` }}
        >
          {post.title}
        </TLink>
        <p
          sx={{
            color: `secondary`,
            mt: 1,
            a: { color: `secondary` },
            fontSize: [1, 1, 2],
          }}
        >
          <time>{post.date}</time>
          <Keywords description={post.description} delimiter="," />
          {post.tags && showTags && (
            <React.Fragment>
              {` — `}
              <ItemTags tags={post.tags} />
            </React.Fragment>
          )}
        </p>
      </Box>
    </Col>
    {post.tags?.map((t, idx) => (
      <Col style={{ float: "right" }} xs={4} lg={2} key={idx}>
        <img
          src={Technologies[t.name]}
          width={50}
          style={{ marginRight: "15px" }}
        />
      </Col>
    ))}
  </Row>
);

export default BlogListItem;
