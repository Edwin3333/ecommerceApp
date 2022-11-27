import { Row, Col, Button, Container } from 'react-bootstrap'
import { NavLink } from "react-router-dom";
const Banner = ({ bannerProp }) => {

  const { title, content, label } = bannerProp;
  return (

    <Row>
      <Col className='pt-0 text-center'>
        <h1>{title}</h1>
        <p>{content}</p>

      </Col>
    </Row>
  )
}

export default Banner