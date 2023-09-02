import { Col, Container, Row } from 'react-grid-system';

interface IContainer {
  xs?: number;
  md?: number;
  xl?: number;
  children: JSX.Element;
}

function Containers({xs, md, xl, children}: IContainer) {
  return (
    <Container>
      <Row>
        <Col xs={xs} md={md} xl={xl}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default Containers;
