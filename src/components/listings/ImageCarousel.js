import React from "react";
import {Carousel} from "react-bootstrap";

const ImageCarousel = props => {
    return (
        <Carousel>
                {props.images.map((image, index) => {
                return (
                    <Carousel.Item key={index}>
                        <img
                            className="listing-header-image"
                            src={image}
                            alt="First slide"
                        />
                    </Carousel.Item>
                );
            })}
        </Carousel>
    )
}

export default ImageCarousel;