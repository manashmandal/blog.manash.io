<Row>
  <Col xs={10} sm={8} md={6} lg={4} xl={2}></Col>
  <Col>
    <span>
      {Object.values(Technologies).map((d, i) => (
        <img src={d} key={i} width={100} style={{ marginRight: "10px" }} />
      ))}
    </span>
  </Col>
  <Col xs={10} sm={8} md={6} lg={4} xl={2}></Col>
</Row>;
