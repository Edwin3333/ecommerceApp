import { Carousel, Button } from 'react-bootstrap';
import { NavLink, Navigate } from 'react-router-dom'
import BG1 from '../img/bgf1.jpg'
import BG2 from '../img/bgf2.jpg'
import BG3 from '../img/bgf3.jpg'
import BG4 from '../img/bgf4.jpg'

const Showcase = () => {
  return (
    <Carousel variant="dark" className="carousel-Container">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={BG1}
          alt="First slide"
        />
        <Carousel.Caption>
          <Button variant="warning" as={NavLink} to="/products">Shop Now!</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-150"
          src={BG2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <Button variant="warning" as={NavLink} to="/products">Shop Now!</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={BG3}
          alt="Third slide"
        />
        <Carousel.Caption>
          <Button variant="warning" as={NavLink} to="/products">Shop Now!</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={BG4}
          alt="Fourth slide"
        />
        <Carousel.Caption>
          <Button variant="warning" as={NavLink} to="/products">Shop Now!</Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default Showcase